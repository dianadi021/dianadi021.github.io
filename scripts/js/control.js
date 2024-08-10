$(document).ready(() => {
	const HOST = window.location.host;
	const URL = HOST.includes("github.io") ? `https://${HOST}` : `http://${HOST}`;

	$.getScript(`${URL}/scripts/js/functions.js`, () => {
		DisableRightClickOnMouse();
	});
});
