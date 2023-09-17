/** @format */
$(document).ready(function () {
  const serverURL = 'http://' + window.location.host + '/assets';

  $.getScript(serverURL + '/scripts/js/personal-function.js', function () {
    DisableRightClickOnMouse();
    BannerSwiper();
    CertificateSwiper();
  });

  $.getScript(serverURL + '/views/home.js', function () {
    CommunityDisplay(serverURL);
    ProjectsDisplay(serverURL);
  });
});
