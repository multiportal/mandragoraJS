//appCon.js index.php
let loc = window.location;
const {pathname} = loc;
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register(pathname+'sw.js').then(function(registration) {
		console.log(
		  'Service Worker registro correcto con scope: ',
		  registration.scope
		);
	  }).catch(function(err) {
		console.log('Service Worker registro fallo: ', err);
	  });
  }  