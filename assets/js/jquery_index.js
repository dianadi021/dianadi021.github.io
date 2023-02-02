var onClickTogglerHumburgerMenu = true;

/* SIMPLE JQUERY START */
$(document).ready(function () {
  /* Header HTML START*/
  $("#navbar_header").append(innerHeader());
  $("#navbar_hamburger_menu").click(function () {
    onClickHeaderHamburgerMenu(onClickTogglerHumburgerMenu);
  });
  /* Header HTML END*/
  /* Carousel HTML START*/
  $("#carousel_content").append(innerCarousel());
  /* Carousel HTML END*/
  /* Footer HTML START*/
  $("#navbar_footer").append(innerFooter());
  /* Footer HTML END*/
  /* Community Content START */
  $("#community_content").append(innerCommunityContent());
  /* Community Content END */
  /* Scroll START*/
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });
  $(".scroll-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      600
    );
    return false;
  });
  /* Scroll END*/
  /* CERTIFICATE HTML START */
  $("#certificate").append(innerCertificate());
  /* CERTIFICATE HTML END */
  /* PROJECTS HTML START */
  $("#projects").append(innerProjects());
  /* PROJECTS HTML END */
  /* MULTI CAROUSEL START */
  if (window.matchMedia("(max-width: 915px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 914px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 912px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 896px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 851px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 820px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 740px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 720px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 667px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 653px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 540px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 414px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 412px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 393px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }
  if (window.matchMedia("(max-width: 360px)").matches) {
    ifScreen();
  } else {
    elseScreen();
  }

  var arrayMultipleItemCarousel = $(".multiple_carousel_item").length;
  for (let i = 1; i <= arrayMultipleItemCarousel; i++) {
    $("#img_multiple_carousel-" + i).on("click", function () {
      var srcImgItem = $("#img_multiple_carousel-" + i + " img").attr("src");
      $("#img_preview div div img").attr("src", srcImgItem);
      console.log(srcImgItem);
    });
  }
  /* MULTI CAROUSEL END */

  /* METHODS TOPSIS START */
  $("#main_content").append(innerMethodTOPSIS());
  /* METHODS TOPSIS END */
});
/* SIMPLE JQUERY END*/

function ifScreen() {
  var carouselWidth = $("#multiple_carousel .carousel-inner")[0].scrollWidth;
  var cardWidth = $("#multiple_carousel .carousel-inner .carousel-item").width();
  var scrollPosition = 0;
  $("#multiple_carousel .carousel-control-next").on("click", function () {
    if (scrollPosition < carouselWidth - cardWidth) {
      scrollPosition += cardWidth;
      $("#multiple_carousel .carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
    }
  });
  $("#multiple_carousel .carousel-control-prev").on("click", function () {
    if (scrollPosition > 0) {
      scrollPosition -= cardWidth;
      $("#multiple_carousel .carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
    }
  });
}
function elseScreen() {
  var carouselWidth = $("#multiple_carousel .carousel-inner")[0].scrollWidth;
  var cardWidth = $("#multiple_carousel .carousel-inner .carousel-item").width();
  var scrollPosition = 0;
  $("#multiple_carousel .carousel-control-next").on("click", function () {
    if (scrollPosition < carouselWidth - cardWidth * 4) {
      scrollPosition += cardWidth;
      $("#multiple_carousel .carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
    }
  });
  $("#multiple_carousel .carousel-control-prev").on("click", function () {
    if (scrollPosition > 0) {
      scrollPosition -= cardWidth;
      $("#multiple_carousel .carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
    }
  });
}

function innerHeader() {
  var innerHTMLHeader = `
    <nav class="container">
        <div class="btn btn-dark" id="navbar_hamburger_menu">
            <button class="navbar-toggler" type="button">
                <i id="indicator_toggler" class="fa-solid fa-bars"></i>
            </button>
        </div>
        <div class="navbar navbar-dark" id="navbar_list_menu">
            <div class="navbar_list_menu">
                <legend style="padding: 1em;">Menu</legend>
                <hr id="hr_mainMenu"/>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="list_main_menu">
                    <li class="nav-item"><a class="nav-link" href="#page-top">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#community_content">Community</a></li>
                    <li class="nav-item"><a class="nav-link" href="#certificate">Certificate</a></li>
                    <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
                    <li class="nav-item"><a class="nav-link" href="mycv.html">Curriculum Vitae</a></li>
                </ul>
            </div>
        </div>
    </nav>
    `;
  return innerHTMLHeader;
}

function onClickHeaderHamburgerMenu(x) {
  if (x) {
    $("#indicator_toggler").attr("class", "fa-solid fa-xmark");
    $("#navbar_list_menu").attr("class", "navbar navbar-dark active");
    onClickTogglerHumburgerMenu = false;
  } else {
    $("#indicator_toggler").attr("class", "fa-solid fa-bars");
    $("#navbar_list_menu").attr("class", "navbar navbar-dark");
    onClickTogglerHumburgerMenu = true;
  }
}

function innerCarousel() {
  var innerHTMLCarousel = `
  <div id="carousel_header" class="carousel carousel-dark slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carousel_header" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carousel_header" data-bs-slide-to="1" aria-label="Slide 2"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item img_carousel active" data-bs-interval="5000">
              <img src="./assets/img/bg-masthead.jpg" class="d-block" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h1 class="mb-1">Dian Adi Nugroho</h1>
                <h3 class="mb-5">「<em>Programmer | Content Writer</em>」</h3>
                <h6>@dianadi021</h6>
                <ul class="list-inline mb-5">
                  <li class="list-inline-item">
                    <a class="social-link rounded-circle text-white mr-3" href="https://www.youtube.com/c/diannugroho" target="_blank">
                      <i class="fab fa-youtube"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="social-link rounded-circle text-white mr-3" href="https://dianadi021.blogspot.com/" target="_blank">
                      <i class="fab fa-blogger"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="social-link rounded-circle text-white mr-3" href="https://id.linkedin.com/in/dianadi021/" target="_blank">
                      <i class="fab fa-linkedin"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="social-link rounded-circle text-white mr-3" href="https://web.facebook.com/dianadi021/" target="_blank">
                      <i class="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="social-link rounded-circle text-white mr-3" href="https://instagram.com/dianadi021/" target="_blank">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="social-link rounded-circle text-white mr-3" href="https://twitter.com/dianadi021/" target="_blank">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="social-link rounded-circle text-white mr-3" href="https://bit.ly/joinSKUAD" target="_blank">
                      <i class="fab fa-discord"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="social-link rounded-circle text-white" href="https://github.com/dianadi021/" target="_blank">
                      <i class="fab fa-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="carousel-item img_carousel" data-bs-interval="5000">
              <img src="./assets/img/speakme.JPG" class="d-block" alt="..." />
              <div class="carousel-caption d-none d-md-block" id="caption_aboutme">
                <h2>Tentang Saya</h2>
                <p class="lead mb-5">Saya mempunyai tekad dan keinginan yang kuat untuk menjadi yang terbaik. Dengan kerja keras dan ilmu yang sudah saya peroleh, dapat membuat saya menjadi lebih baik daripada sebelumnya. Dan saya sudah terbiasa dengan adanya perbedaan pendapat yang terjadi selama proses diskusi. Serta saya sudah terbiasa dalam bekerjasama dalam kelompok atau kerja tim.</p>
                <a class="btn btn-dark btn-xl" href="mycv.html">Curriculum Vitae</a>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carousel_header" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carousel_header" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>`;
  return innerHTMLCarousel;
}

function innerCommunityContent() {
  var innerCommunity = `
  <div class="container">
          <div class="content-section-heading">
            <h3 class="text-secondary mb-0">Contribute</h3>
            <h2 class="mb-5">Community</h2>
          </div>
          <div class="row">
            <div class="col align-self-center">
              <span class="service-icon rounded-circle mx-auto mb-3">
                <!--<i class="icon-screen-smartphone"></i>-->
                <img class="mx-auto mb-3 icon-images-custom-me" src="./assets/img/skd.png" alt="" />
              </span>
              <h4>
                <a id="link_community" class="text-white" href="https://skuadproduction.github.io" target="_blank">
                  <strong>SKUAD</strong>
                </a>
              </h4>
              <p class="text-faded mb-0">playing and having fun together</p>
            </div>
          </div>
        </div>`;
  return innerCommunity;
}

function innerCertificate() {
  var innerCertificateHTML = `
  <div id="conteiner_img_section">
          <div class="content-section-heading text-center" id="certificate_content">
            <h3 class="text-secondary mb-0">Portfolio</h3>
            <h2>License or Certificate</h2>
          </div>
          <!-- MAGNIFY IMAGE START -->
          <div class="container">
            <div class="row mb-3" id="img_preview">
              <div class="col">
                <div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
                  <img src="./assets/img/S1.jpg" class="col-6 col-lg-6" />
                  <a href="#!" data-mdb-toggle="modal" data-mdb-target="#exampleModal1">
                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                  </a>
                </div>
              </div>
            </div>
            <div class="row" id="multiple_carousel_container">
              <div class="carousel carousel-dark slide justify-content-center" id="multiple_carousel" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <div id="img_multiple_carousel-1" class="carousel-item multiple_carousel_item">
                    <img src="./assets/img/S1.jpg" class="d-block w-100" alt="..." />
                  </div>
                  <div id="img_multiple_carousel-2" class="carousel-item multiple_carousel_item">
                    <img src="./assets/img/S2.jpg" class="d-block w-100" alt="..." />
                  </div>
                  <div id="img_multiple_carousel-3" class="carousel-item multiple_carousel_item">
                    <img src="./assets/img/S3.jpg" class="d-block w-100" alt="..." />
                  </div>
                  <div id="img_multiple_carousel-4" class="carousel-item multiple_carousel_item">
                    <img src="./assets/img/S4.jpg" class="d-block w-100" alt="..." />
                  </div>
                  <div id="img_multiple_carousel-5" class="carousel-item multiple_carousel_item">
                    <img src="./assets/img/S5.jpg" class="d-block w-100" alt="..." />
                  </div>
                </div>
                <div id="btn_multiple_carousel"">
                  <button class="carousel-control-prev" type="button" data-bs-target="#multiple_carousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#multiple_carousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- MAGNIFY IMAGE END -->
        </div>
  `;
  return innerCertificateHTML;
}

function innerProjects() {
  var innerProjectsHTML = `
  <div class="container">
          <div class="row pt-5">
            <div class="col">
              <div class="content-section-heading text-center" id="certificate">
                <h3 class="text-secondary mb-0">Projects</h3>
                <h2>Learning By Doing</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card-group">
                <div class="card">
                  <img src="./assets/img/portfolio-1.jpg" class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                  <div class="card-footer">
                    <a href="#" class="btn btn-primary">Read More</a>
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </div>
                </div>
                <div class="card">
                  <img src="./assets/img/portfolio-2.jpg" class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                  </div>
                  <div class="card-footer">
                    <a href="#" class="btn btn-primary">Read More</a>
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </div>
                </div>
                <div class="card">
                  <img src="./assets/img/portfolio-3.jpg" class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                  </div>
                  <div class="card-footer">
                    <a href="#" class="btn btn-primary">Read More</a>
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  `;
  return innerProjectsHTML;
}

function innerFooter() {
  var innerHTMLFooter = `
  <footer class="footer">
    <div class="container">
      <p class="text-muted small mb-0">Copyright&copy; <a href="https://dianadi021.github.io/">Dian Adi Nugroho</a> 2023</p>
    </div>
  </footer>
  `;
  return innerHTMLFooter;
}

function innerMethodTOPSIS() {
  var innerMethodRepoTOPSIS = `
  <div class="row">
        <div class="col-12">
          <hr />
          <legend>Sekilas Tentang Tools</legend>
          <p>Tools (Website) ini merupakan suatu final projek yang dibuat untuk melengkapi tugas akhir (skripsi) jurusan S1 - Informatika di Universitas AMIKOM Yogyakarta. Tools ini dibuat karena terinspirasi oleh <a href="https://decision-radar.com/Topsis.html" target="_blank" rel="noopener noreferrer dofollow" dofollow="dofollow">Decision Radar Ez-TOPSIS</a>. Namun semua sistem <i>back-end</i> dari tools ini dikerjakan secara <i>manual</i> atau tanpa campur tangan <i>framework</i> dengan menggunakan bahasa <i>JavaScript</i>. <i>Framework</i> yang digunakan hanyalah <a href="https://getbootstrap.com/docs/5.1/getting-started/introduction/" target="_blank" rel="noopener noreferrer dofollow" dofollow="dofollow">Bootstrap</a>. Untuk rumus perhitungan, mengikuti materi yang tertulis pada artikel <a href="https://bukuinformatika.com/contoh-cara-perhitungan-metode-topsis/" target="_blank" rel="noopener noreferrer dofollow" dofollow="dofollow">Buku Informatika</a>.</p>
        </div>
        <div class="col-12">
          <hr />
          <legend>Video Tutorial</legend>
          <p>Video yang terlampir merupakan sebuah contoh cara penggunaan dari tools ini. Mohon untuk disimak secara teliti supaya tidak bingung dalam menggunakannya.</p>
          <iframe width="100%" height="360px" src="https://www.youtube.com/embed/8JTXyhpRDiQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
        <div class="col-12">
          <hr />
          <legend>Tools</legend>
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><strong>#Menentukan Pilihan</strong></button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <div id="choices" class="col-sm-12">
                    <table class="table table-bordered" id="choice_field">
                      <thead>
                        <tr>
                          <th scope="col">Pilihan</th>
                          <th scope="col">Nama</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr id="choice-1">
                          <th scope="row">1</th>
                          <td>
                            <input type="text" class="form-control choices" value="name 1" id="choices-1" />
                          </td>
                        </tr>
                        <tr id="choice-2">
                          <th scope="row">2</th>
                          <td>
                            <input type="text" class="form-control choices" value="name 2" id="choices-2" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button type="button" class="btn btn-primary" id="add-choice"><i class="fa-solid fa-plus"></i></button>
                    <button type="button" disabled="disabled" class="btn btn-danger btn_remove" id="remove-choice"><i class="fa-solid fa-trash"></i></span></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><strong>#Menentukan Kriteria</strong></button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <div id="indicators" class="col-sm-12">
                    <table class="table table-bordered" id="indicator_field">
                      <thead>
                        <tr>
                          <th scope="col">Kriteria</th> 
                          <th scope="col">Nama</th> 
                          <th scope="col">Cost</th> 
                          <th scope="col">Bobot</th> 
                          <!--<th scope="col">Qualitative</th>-->
                        </tr>
                      </thead> 
                      <tbody>
                        <tr id="indicator-1"><th scope="row">1</th><td>
                          <input type="text" class="form-control indicator-name" value="name 1" id="indicator-name-1"></td><td>
                          <input type="checkbox" class="indicator-negatif" id="indicator-negatif-1"></td> <td>
                          <input type="number" class="form-control indicator-weight" id="indicator-weight-1" value="1"></td> 
                          <!--<td><input type="checkbox" class="indicator-qualitative" id="indicator-qualitative-1"></td>-->
                        </tr>
                        <tr id="indicator-2"><th scope="row">2</th><td>
                          <input type="text" class="form-control indicator-name" value="name 2" id="indicator-name-2"></td><td>
                          <input type="checkbox" class="indicator-negatif" id="indicator-negatif-2"></td> <td>
                          <input type="number" class="form-control indicator-weight" id="indicator-weight-2" value="1"></td>
                          <!--<td><input type="checkbox" class="indicator-qualitative" id="indicator-qualitative-2"></td>-->
                        </tr>
                      </tbody>
                    </table> 
                      <button type="button" class="btn btn-primary" id="add-indicator"><i class="fa-solid fa-plus"></i></button> 
                      <button type="button" disabled="disabled" class="btn btn-danger" id="remove-indicator"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><strong>#Menentukan Nilai Matriks</strong></button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <table class="table table-bordered" id="matrix_table">
                    <thead>
                    <tr id="valueChoicesName"></tr>
                  </thead> 
                    <tbody id="valueIndicatorName"></tr></tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 m-3">
          <center><button id="topsisResultModal" type="button" class="btn btn-warning btn-lg btn-block">Calculate With TOPSIS method <i class="fa-solid fa-calculator"></i></button></center>
        </div>
      </div>`;

      return innerMethodRepoTOPSIS;
}