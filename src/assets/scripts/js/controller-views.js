/** @format */
$(document).ready(() => {
  // const serverURL = `http://${window.location.host}/src/assets`;
  const serverURL = 'https://dianadi021.github.io/src/assets';

  $.getScript(serverURL + '/scripts/js/personal-function.js', function () {
    DisableRightClickOnMouse();
    BannerSwiper();
    CertificateSwiper();
  });

  $.getScript(serverURL + '/views/home.js', async () => {
    await CommunityDisplay(serverURL);
    await ProjectsDisplay(serverURL);
  });
});
