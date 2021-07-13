function logout(){
    console.log('Logout/Salir');
    localStorage.clear();
    var token = localStorage.getItem("Token");
    if(token==null){
        console.warn('TOKEN CLEAR|');
        setTimeout(function(){window.location.href='#/';},3000);
    }
}

export {logout};