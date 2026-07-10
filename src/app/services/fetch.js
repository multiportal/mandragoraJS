export const versionJson = async (url) => { //console.log(url);
    try {
        const response = await fetch(url); //console.log(response);
        if (response.status == 200) {
            const res = await response.json();
            if (res) { //console.log(res);
                return res;
            }
        } else { console.log('Error 404'); }
    } catch (error) {
        console.log(error);
    }
}

