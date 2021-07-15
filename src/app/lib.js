
function vars(){
/*VARIABLES SYS*/
var loc = window.location;
var dt = new Date();
var day = dt.getDate();
var mon = dt.getMonth() + 1;
var year = dt.getFullYear();
//var mod = '';//var ext = '';//var id = '';
var sub_path = '#/'; //SUB_PATH
var src_path = 'src/'; //RESOURCE PATH
var page_path = src_path + 'pages/'; //PAGE PATH
var proyecto = 'mandragoraJS'; //PROYECTO

const variables = {
 
};

return variables;
}

/* FUNCIONES */
function inicio() {
  console.log('Corriendo funcion inicio');
}
export {inicio};