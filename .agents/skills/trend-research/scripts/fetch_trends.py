#!/usr/bin/env python3
"""
Trend & Social Intelligence Fetcher.
Mengambil data tren, berita terkini, dan diskusi komunitas dari sumber publik terbuka.
Mengekstrak informasi: Author, Views Estimate, Engagement Metrics, dan Deteksi Kredibilitas/Hoax.
"""

import argparse
import email.utils
import json
import random
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

USER_AGENT = "Mozilla/5.0 (compatible; ResilientResearchBot/2.0; +https://github.com/agent-research)"
MAX_RESPONSE_BYTES = 1_048_576  # 1 MB cap to prevent XML memory exhaustion

# Daftar domain bereputasi tinggi untuk audit kredibilitas berita (Layer 1)
WHITELISTED_TRUSTED_DOMAINS = (
    "kompas.com", "detik.com", "tempo.co", "antara.news", "antaranews.com",
    "bisnis.com", "kontan.co.id", "cnnindonesia.com", "republika.co.id",
    "bbc.com", "bbc.co.uk", "reuters.com", "bloomberg.com", "theverge.com",
    "techcrunch.com", "wired.com", "arstechnica.com", "nature.com", "ieee.org",
)


def _parse_retry_after(header_val: str | None, attempt: int) -> float:
    """Parse RFC 7231 Retry-After (integer seconds atau HTTP-date) dengan fallback aman."""
    if header_val:
        stripped = header_val.strip()
        try:
            return max(0.5, min(float(int(stripped)), 30.0))
        except ValueError:
            try:
                 retry_dt = email.utils.parsedate_to_datetime(stripped)
                 if retry_dt.tzinfo is None:
                     retry_dt = retry_dt.replace(tzinfo=timezone.utc)
                 delta = (retry_dt - datetime.now(timezone.utc)).total_seconds()
                 return max(0.5, min(delta, 30.0))
            except (TypeError, ValueError, OverflowError):
                pass
    return (2 ** attempt) + random.uniform(0.5, 1.5)


def fetch_url(url: str, max_retries: int = 3, timeout: int = 8) -> str | None:
    """Mengambil data URL dengan batas ukuran baca, proteksi 429, dan exponential backoff."""
    headers = {"User-Agent": USER_AGENT}
    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=timeout) as response:
                return response.read(MAX_RESPONSE_BYTES).decode("utf-8", errors="replace")
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < max_retries - 1:
                wait_sec = _parse_retry_after(e.headers.get("Retry-After"), attempt)
                time.sleep(wait_sec)
                continue
            return None
        except Exception:
            return None
    return None


def _extract_hostname(target_url: str) -> str:
    """Mengekstrak hostname bersih (tanpa www.) dari URL secara ketat."""
    if not target_url:
        return ""
    try:
        host = (urllib.parse.urlparse(target_url).hostname or "").lower()
        return host[4:] if host.startswith("www.") else host
    except ValueError:
        return ""


def evaluate_news_credibility(source_name: str, url: str, source_url: str = "") -> dict:
    """Mengevaluasi kredibilitas penerbit berdasarkan pencocokan hostname eksak/subdomain."""
    candidate_hosts = [h for h in (_extract_hostname(source_url), _extract_hostname(url)) if h]
    for host in candidate_hosts:
        for domain in WHITELISTED_TRUSTED_DOMAINS:
            if host == domain or host.endswith("." + domain):
                return {
                    "status": "HIGH_TRUST",
                    "evidence": f"Penerbit terverifikasi bereputasi tinggi ({domain})"
                }
    return {
        "status": "VERIFIED",
        "evidence": "Terindeks dalam agregasi berita Google News resmi"
    }


def fetch_google_news_rss(query: str, geo: str = "ID", lang: str = "id", timeframe: str = "7d", limit: int = 5) -> list[dict]:
    """Mengambil berita realtime via Google News RSS dengan ekstraksi author & kredibilitas."""
    time_query = f"{query} when:{timeframe}" if timeframe else query
    encoded_query = urllib.parse.quote(time_query)
    ceid = f"{geo.upper()}:{lang.lower()}"
    url = f"https://news.google.com/rss/search?q={encoded_query}&hl={lang.lower()}&gl={geo.upper()}&ceid={ceid}"
    
    xml_data = fetch_url(url)
    if not xml_data:
        return []

    results = []
    try:
        root = ET.fromstring(xml_data)
        for item in root.findall(".//item")[:limit]:
            title = item.findtext("title", "").strip()
            link = item.findtext("link", "").strip()
            pub_date = item.findtext("pubDate", "").strip()
            source_el = item.find("source")
            source_name = source_el.text.strip() if source_el is not None and source_el.text else "Google News"
            source_url = source_el.attrib.get("url", "").strip() if source_el is not None else ""

            credibility = evaluate_news_credibility(source_name, link, source_url=source_url)

            if title and link:
                results.append({
                    "title": title,
                    "url": link,
                    "published_at": pub_date,
                    "source": f"News ({source_name})",
                    "type": "news",
                    "author": source_name,
                    "views_estimate": "N/A (Publisher Metric)",
                    "engagement": {
                        "score": 0,
                        "comments": 0,
                        "upvote_ratio_basis_pts": 10000
                    },
                    "credibility": credibility
                })
    except ET.ParseError:
        pass
    return results

def parse_traffic_number(traffic_str: str) -> int:
    """Mengonversi string traffic seperti '50K+' atau '200+' menjadi integer basis."""
    if not traffic_str:
        return 0
    clean = traffic_str.replace("+", "").replace(",", "").strip().upper()
    if "K" in clean:
        try:
            return int(float(clean.replace("K", "")) * 1000)
        except ValueError:
            return 0
    if "M" in clean:
        try:
            return int(float(clean.replace("M", "")) * 1000000)
        except ValueError:
            return 0
    try:
        return int(clean)
    except ValueError:
        return 0

def fetch_google_trends_rss(geo: str = "ID", limit: int = 5) -> list[dict]:
    """Mengambil tren pencarian harian nasional dengan perkiraan view/traffic."""
    url = f"https://trends.google.com/trending/rss?geo={geo.upper()}"
    xml_data = fetch_url(url)
    if not xml_data:
        return []

    results = []
    try:
        root = ET.fromstring(xml_data)
        for item in root.findall(".//item")[:limit]:
            title = item.findtext("title", "").strip()
            approx_traffic = item.findtext("{https://trends.google.com/trending/rss}approx_traffic", "").strip()
            pub_date = item.findtext("pubDate", "").strip()
            news_item = item.find("{https://trends.google.com/trending/rss}news_item")
            news_url = news_item.findtext("{https://trends.google.com/trending/rss}news_item_url", "") if news_item is not None else ""
            news_source = news_item.findtext("{https://trends.google.com/trending/rss}news_item_source", "Google Trends") if news_item is not None else "Google Trends"

            traffic_val = parse_traffic_number(approx_traffic)

            if title:
                results.append({
                    "title": f"Trend: {title} ({approx_traffic})",
                    "url": news_url or f"https://trends.google.com/trends/trendingsearches/daily?geo={geo.upper()}",
                    "published_at": pub_date,
                    "source": f"Google Trends ({geo.upper()})",
                    "type": "trend_metric",
                    "author": f"Aggregator ({news_source})",
                    "views_estimate": approx_traffic or "N/A",
                    "engagement": {
                        "score": traffic_val,
                        "comments": 0,
                        "upvote_ratio_basis_pts": 10000
                    },
                    "credibility": {
                        "status": "HIGH_TRUST",
                        "evidence": f"Data tren pencarian agregat resmi Google Trends ({approx_traffic} pencarian)"
                    }
                })
    except ET.ParseError:
        pass
    return results

def fetch_hacker_news(query: str, limit: int = 5) -> list[dict]:
    """Mengambil diskusi developer global via Hacker News dengan author, engagement & kredibilitas."""
    encoded_query = urllib.parse.quote(query)
    url = f"https://hn.algolia.com/api/v1/search?query={encoded_query}&tags=story&hitsPerPage={limit}"
    
    json_data = fetch_url(url)
    if not json_data:
        return []

    results = []
    try:
        data = json.loads(json_data)
        for hit in data.get("hits", [])[:limit]:
            points = hit.get("points") or 0
            comments = hit.get("num_comments") or 0
            author = hit.get("author") or "anonymous"
            
            if points >= 20:
                # Evaluasi kredibilitas komunitas
                if points >= 100:
                    status = "HIGH_TRUST"
                    evidence = f"Konsensus kuat komunitas HN ({points} poin, {comments} komentar aktif)"
                else:
                    status = "COMMUNITY_RATED"
                    evidence = f"Divalidasi oleh komunitas pengembang HN ({points} poin)"

                results.append({
                    "title": hit.get("title", ""),
                    "url": hit.get("url") or f"https://news.ycombinator.com/item?id={hit.get('objectID')}",
                    "published_at": hit.get("created_at", ""),
                    "source": "Hacker News",
                    "type": "community_tech",
                    "author": f"@{author}",
                    "views_estimate": "N/A (Private Platform Metric)",
                    "engagement": {
                        "score": points,
                        "comments": comments,
                        "upvote_ratio_basis_pts": 10000
                    },
                    "credibility": {
                        "status": status,
                        "evidence": evidence
                    }
                })
    except json.JSONDecodeError:
        pass
    return results

def fetch_reddit_public(query: str, timeframe: str = "7d", limit: int = 5) -> list[dict]:
    """Mengambil opini komunitas via Reddit dengan author, upvote ratio, dan deteksi misleading/hoax."""
    time_map = {"1h": "hour", "24h": "day", "7d": "week", "30d": "month"}
    reddit_t = time_map.get(timeframe, "week")
    encoded_query = urllib.parse.quote(query)
    url = f"https://www.reddit.com/search.json?q={encoded_query}&sort=relevance&t={reddit_t}&limit={limit * 2}"
    
    json_data = fetch_url(url)
    if not json_data:
        return []

    results = []
    try:
        data = json.loads(json_data)
        children = data.get("data", {}).get("children", [])
        for item in children:
            post = item.get("data", {})
            score = post.get("score", 0)
            comments = post.get("num_comments", 0)
            author = post.get("author", "anonymous")
            raw_ratio = post.get("upvote_ratio", 1.0)
            ratio_basis_pts = int(raw_ratio * 10000)
            flair = (post.get("link_flair_text") or "").lower()

            # Filter noise minimum sesuai SKILL.md (score >= 10 dan num_comments >= 3)
            if score >= 10 and comments >= 3 and not post.get("over_18", False):
                # Deteksi Hoax / Misleading
                if "misleading" in flair or "debunked" in flair or "hoax" in flair or ratio_basis_pts < 6000:
                    status = "SUSPECTED_MISLEADING"
                    evidence = f"Rasio persetujuan rendah ({ratio_basis_pts // 100}%) atau ditandai moderator sebagai meragukan/misleading"
                elif ratio_basis_pts >= 8500:
                    status = "COMMUNITY_RATED"
                    evidence = f"Tervalidasi komunitas dengan rasio upvote {ratio_basis_pts // 100}% dan {score} upvotes"
                else:
                    status = "UNVERIFIED"
                    evidence = "Diskusi organik komunitas belum mencapai batas konsensus tinggi"

                results.append({
                    "title": post.get("title", ""),
                    "url": f"https://reddit.com{post.get('permalink', '')}",
                    "published_at": datetime.fromtimestamp(post.get("created_utc", 0), tz=timezone.utc).isoformat(),
                    "source": f"Reddit (r/{post.get('subreddit')})",
                    "type": "community_social",
                    "author": f"u/{author}",
                    "views_estimate": "N/A (Private Platform Metric)",
                    "engagement": {
                        "score": score,
                        "comments": comments,
                        "upvote_ratio_basis_pts": ratio_basis_pts
                    },
                    "credibility": {
                        "status": status,
                        "evidence": evidence
                    }
                })
            if len(results) >= limit:
                break
    except Exception:
        pass
    return results

def main():
    parser = argparse.ArgumentParser(description="Multi-Source Trend & Intelligence Collector")
    parser.add_argument("--topic", type=str, default="", help="Kata kunci pencarian")
    parser.add_argument("--geo", type=str, default="ID", help="Kode wilayah negara (misal: ID, US, SG)")
    parser.add_argument("--lang", type=str, default="id", help="Kode bahasa (misal: id, en)")
    parser.add_argument("--timeframe", choices=["1h", "24h", "7d", "30d"], default="7d", help="Jangkauan waktu")
    parser.add_argument("--domain", choices=["tech", "business", "lifestyle"], default="tech", help="Kategori sektor")
    parser.add_argument("--limit", type=int, default=5, help="Jumlah item per sumber")
    parser.add_argument("--mode", choices=["all", "news", "community", "trends"], default="all", help="Mode filter sumber")
    args = parser.parse_args()

    collected_signals = []

    # 1. Mode Umum: Jika tanpa kata kunci, ambil Google Trends harian
    if not args.topic or args.mode in ["all", "trends"]:
        collected_signals.extend(fetch_google_trends_rss(geo=args.geo, limit=args.limit))

    # 2. Mode Spesifik Berita: Google News RSS
    if args.topic and args.mode in ["all", "news"]:
        collected_signals.extend(fetch_google_news_rss(query=args.topic, geo=args.geo, lang=args.lang, timeframe=args.timeframe, limit=args.limit))

    # 3. Mode Komunitas: Hacker News (fokus tech/business) & Reddit
    if args.topic and args.mode in ["all", "community"]:
        if args.domain in ["tech", "business"]:
            collected_signals.extend(fetch_hacker_news(query=args.topic, limit=args.limit))
        collected_signals.extend(fetch_reddit_public(query=args.topic, timeframe=args.timeframe, limit=args.limit))

    output = {
        "metadata": {
            "topic": args.topic or "Macro Daily Trends",
            "geo": args.geo.upper(),
            "lang": args.lang.lower(),
            "timeframe": args.timeframe,
            "domain": args.domain,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "total_signals": len(collected_signals)
        },
        "signals": collected_signals
    }

    print(json.dumps(output, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
