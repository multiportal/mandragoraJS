export function getModules(views){
  const divElement = document.createElement('div');
  divElement.innerHTML = views;      
  return divElement;
}

export function reload(mod){
  if(mod=='' || mod==undefined){
    window.location.href='#/';
  }
}

/*FUNCIONES GENERALES*/
export function ssl(){
    //const protocol = window.location.protocol;console.log("protocol=" + protocol);
    if(protocol=="http:"){window.location="https://"+host+"/"+path_root;}
  }
  
  export function consoleLocal(type,val){
    let host = window.location.host;
    if(host=='localhost' || host=='localhost:9001'){
      switch (type) {
        case 'log':
          console.log(val);
        break;
        case 'warn':
          console.warn(val);
        break;
        case 'error':
          console.error(val);
        break;
        default:
          console.log(val);
        break;
      }
    }
  }
  
  export function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }
  
  export function fecha() {
    var dt = new Date();
    var hora = dt.getHours();
    var minuto = dt.getMinutes();
    var segundo = dt.getSeconds();
    var dd = dt.getDate();
    var mm = dt.getMonth() + 1;
    var year = dt.getFullYear();
    var valtime = ((hora < 10) ? "0" : "") + hora;
    valtime += ((minuto < 10) ? ":0" : ":") + minuto;
    valtime += ((segundo < 10) ? ":0" : ":") + segundo;
    mm = (mm < 10) ? '0' + mm : mm;
    dd = (dd < 10) ? '0' + dd : dd;
    var fecha = year + '-' + mm + '-' + dd + ' ' + valtime;
    return fecha;
  }
  
  //Fecha de Actualización
  export function fecha_hora_update(val,inputId) {
    const inputUpdate = document.querySelector(inputId);
    var fecha1 = fecha();
    inputUpdate.value = fecha1;
    if(val==1){setTimeout(fecha_hora_update, 1000);}
  }
  
  //Fecha de Creación
  export function fecha_hora_create(val,inputId) {
    const inputCreate = document.querySelector(inputId);
    var fecha2 = fecha();
    inputCreate.value = fecha;
    if(val==1){setTimeout(fecha_hora_create, 1000);}
  }
  
  export function footer(){
    const f = document.querySelector("#footer_page");
    f.innerHTML = year + ' &copy; VcardAppJS v.1.2.14. Diseñada por <a target="_blank" href="http://multiportal.com.mx">[:MULTIPORTAL:]</a>.';
  }
  