const {host} = window.location;
/* URL-API */
export const Api = (host!='127.0.0.1:173')?'https://apirestm.webcindario.com/api':'http://localhost/MisSitios/apirestm/api';
/* URL-LINKS */
export const api_links = Api + '/v2/links/';