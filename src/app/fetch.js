export const functionFetch = async (endpoint,method,datos) =>{
    const url = `${Api}/${endpoint}`;
    let token = localStorage.getItem("Token");//consoleLocal('log','token='+token);
    const data = {...datos,token}
    const config = {
        method: method,
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }
    //try {} catch (error) {}
    let response = await fetch(url,config);
    if(!response.ok){
        console.error('Error 404(Fetch): ');
    }else{
        let res = response.json();
        console.log(res);
    }
}