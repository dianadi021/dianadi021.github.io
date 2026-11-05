import type { Criterion, Alternative, RankedAlternative, TopsisCalculationResult } from '~/types/topsis'

export function useTopsis() {
  const calculate = (
    criteria: readonly Criterion[],
    alternatives: readonly Alternative[]
  ): TopsisCalculationResult => {
    const totalWeight = criteria.reduce((sum, criterion) => sum + (Number(criterion.weight) || 0), 0)

    if (criteria.length < 1 || alternatives.length < 2) {
      return {
        state: 'INSUFFICIENT_DATA',
        rankedAlternatives: [],
        bestAlternative: null,
        totalWeight,
        summary: 'Belum ada hasil. Minimal diperlukan 1 kriteria dan 2 alternatif.',
        errorMessage: 'Kriteria minimal 1 dan alternatif minimal 2.'
      }
    }

    if (totalWeight <= 0 || criteria.some((c) => Number(c.weight) < 0)) {
      return {
        state: 'INVALID_PARAMETERS',
        rankedAlternatives: [],
        bestAlternative: null,
        totalWeight,
        summary: 'Total bobot harus bernilai positif dan seluruh bobot kriteria non-negatif.',
        errorMessage: 'Bobot kriteria tidak valid.'
      }
    }

    const matrix = alternatives.map((alternative) =>
      criteria.map((_, index) => Number(alternative.values[index] ?? 0))
    )

    if (matrix.some((row) => row.some((value) => !Number.isFinite(value)))) {
      return {
        state: 'INVALID_PARAMETERS',
        rankedAlternatives: [],
        bestAlternative: null,
        totalWeight,
        summary: 'Terdapat nilai kriteria yang tidak valid atau bukan angka.',
        errorMessage: 'Matriks keputusan memuat nilai non-angka.'
      }
    }

    const norms = criteria.map((_, column) =>
      Math.sqrt(matrix.reduce((sum, row) => sum + (row[column] ?? 0) ** 2, 0))
    )

    if (norms.some((norm) => norm === 0)) {
      return {
        state: 'INVALID_PARAMETERS',
        rankedAlternatives: [],
        bestAlternative: null,
        totalWeight,
        summary: 'Terdapat kolom kriteria dengan seluruh nilai bernilai 0 sehingga tidak dapat dinormalisasi.',
        errorMessage: 'Norma kolom kriteria bernilai nol.'
      }
    }

    const normalized = matrix.map((row) =>
      row.map((value, column) => {
        const norm = norms[column] ?? 1
        const criterion = criteria[column]
        const weight = criterion ? Number(criterion.weight) : 0
        return norm === 0 ? 0 : (value / norm) * (weight / totalWeight)
      })
    )

    const idealPositive = criteria.map((criterion, column) => {
      const values = normalized.map((row) => row[column] ?? 0)
      return criterion.impact === 'benefit' ? Math.max(...values) : Math.min(...values)
    })

    const idealNegative = criteria.map((criterion, column) => {
      const values = normalized.map((row) => row[column] ?? 0)
      return criterion.impact === 'benefit' ? Math.min(...values) : Math.max(...values)
    })

    const scored = alternatives.map((alternative, index) => {
      const rowNorm = normalized[index] ?? []
      const positiveDistance = Math.sqrt(
        rowNorm.reduce((sum, value, column) => sum + (value - (idealPositive[column] ?? 0)) ** 2, 0)
      )
      const negativeDistance = Math.sqrt(
        rowNorm.reduce((sum, value, column) => sum + (value - (idealNegative[column] ?? 0)) ** 2, 0)
      )
      const score =
        positiveDistance + negativeDistance === 0 ? 0 : negativeDistance / (positiveDistance + negativeDistance)
      return {
        ...alternative,
        score,
        positiveDistance,
        negativeDistance,
        rank: 0
      }
    }).sort((a, b) => b.score - a.score)

    const rankedAlternatives: RankedAlternative[] = scored.map((item, index) => ({
      ...item,
      rank: index + 1
    }))

    const bestAlternative = rankedAlternatives[0] ?? null

    const lines = [
      'RINGKASAN ANALISIS TOPSIS',
      '=========================',
      bestAlternative ? `Alternatif terbaik: ${bestAlternative.name}` : '',
      bestAlternative ? `Skor preferensi: ${bestAlternative.score.toFixed(6)}` : '',
      `Jumlah alternatif: ${alternatives.length}`,
      `Jumlah kriteria: ${criteria.length}`,
      `Total bobot: ${totalWeight.toFixed(3)} (dinormalisasi otomatis)`,
      '',
      'PERINGKAT',
      ...rankedAlternatives.map((item) => `${item.rank}. ${item.name} — skor ${item.score.toFixed(6)}`),
      '',
      'Metode: normalisasi vektor, pembobotan, solusi ideal positif/negatif, jarak Euclidean, lalu skor kedekatan relatif.',
    ].filter(Boolean)

    return {
      state: 'READY_AND_RANKED',
      rankedAlternatives,
      bestAlternative,
      totalWeight,
      summary: lines.join('\n')
    }
  }

  return {
    calculate
  }
}
