//appCon.js index.php
let loc = window.location;
const {	pathname, host } = loc; console.log('host:',host)
if (host !== 'localhost' && host !== '127.0.0.1:5173') {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register(pathname + 'sw.js').then(function (registration) {
			console.log(
				'Service Worker registro correcto con scope: ',
				registration.scope
			);
		}).catch(function (err) {
			console.log('Service Worker registro fallo: ', err);
		});
	}
}