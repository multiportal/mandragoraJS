/*VARIABLES DE ENTORNO*/
export default function env(){
  const proyecto = 'mandragoraJS'; //PROYECTO
  const path_hash = '#/'; //path_hash
  const path_src = 'src/'; //RESOURCE PATH
  const path_page = path_src + 'pages/'; //PAGE PATH

  const env = {
    proyecto,
    path_hash,
    path_src,
    path_page
  }
  return env;
}