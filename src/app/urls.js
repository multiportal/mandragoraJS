const {host} = window.location;
/* URL-API */
export const Api = (host!='localhost:9001')?'https://apirestm.000webhostapp.com/api':'http://localhost/MisSitios/apirestm/api';
//export const Api = 'https://apirestm.000webhostapp.com/api';
/* URL-LINKS */
export const api_links = Api + '/v2/links/';