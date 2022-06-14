export const functionFetch = async (Api, endpoint, method, datos) => {
    const url = `${Api}/${endpoint}`;
    let token = localStorage.getItem("Token"); //consoleLocal('log','token='+token);
    const data = {...datos,token}
    const config = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        //body:JSON.stringify(data)
    }
    //try {} catch (error) {}
    const response = await fetch(url, config);
    if (!response.ok) {
        console.error('Error 404(Fetch): ');
        if(response=='Unauthorized'){
          console.error('Error 401(Fetch): ');
        }else if(response=='Forbidden'){
            console.error('Error 403(Fetch): ');
        }else if(response=='Not Found'){
            console.error('Error 404(Fetch): ');
        }
    } else {
        const res = await response.json();//console.log(res);
        return res;
    }
}

export const fetchProfile = async (Api) => {
    let token = localStorage.getItem("Token"); //consoleLocal('log','token='+token);
    const profile = await functionFetch(Api, 'v2/_token', 'GET', '');
    console.log('Profile:',profile);

    let userToken = profile.filter(dato => dato.Token == token);
    console.log(userToken);
}