export const functionFetch = async (Api, endpoint, method, datos) => {
    const url = `${Api}/${endpoint}`;
    let token = localStorage.getItem("Token");
    token = (token && token != undefined)?token:'';
    const data = { ...datos, token };
    /*const config = (datos != null) ? {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    } : {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };*/
    const jsonData = (datos != null)?JSON.stringify(data):'';
    const config = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    }

    //try {} catch (error) {}
    const response = await fetch(url, config);
    if (!response.ok) {
        console.error('Error 404(Fetch): ');
        if (response == 'Unauthorized') {
            console.error('Error 401(Fetch): ');
        } else if (response == 'Forbidden') {
            console.error('Error 403(Fetch): ');
        } else if (response == 'Not Found') {
            console.error('Error 404(Fetch): ');
        }
    } else {
        const data = await response.json();//console.log(res);
        return data;
    }
}

export const functionFetch2 = async (url, method, datos) => {
    let token = localStorage.getItem("Token");
    token = (token && token != undefined)?token:'';
    const data = { ...datos, token };
    const jsonData = (datos != null)?JSON.stringify(data):'';
    const config = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    }
    //try {} catch (error) {}
    const response = await fetch(url, config);
    if (!response.ok) {
        console.error('Error 404(Fetch): ');
        if (response == 'Unauthorized') {
            console.error('Error 401(Fetch): ');
        } else if (response == 'Forbidden') {
            console.error('Error 403(Fetch): ');
        } else if (response == 'Not Found') {
            console.error('Error 404(Fetch): ');
        }
    } else {
        const data = await response.json();//console.log(res);
        return data;
    }
}

export const fetchProfile = async (Api, info) => {
    const {data} = await functionFetch(Api, 'profile/index.php', 'POST', '');//console.log('Profile:',data);
    switch (info) {
        case 'InfoUser':
            return data.InfoUser;
        break;
        case 'InfoToken':
            return data.InfoToken;
        break;
        default:
            return data;
        break;
    }
}

export const versionJson = async (url) => { //console.log(url);
    try {
        const response = await fetch(url); //console.log(response);
        if(response.status == 200){
            const res = await response.json();
            if(res){ //console.log(res);
                return res;
            }    
        }else{console.log('Error 404');}
    } catch (error) {
        console.log(error);
    }
}

