import views from '../pages/Home/index.html';

export default (nomPages) => {
    /*const views = `
    <h1>${nomPages}</h1>
    `;*/
    const divElement = document.createElement('div');
    divElement.innerHTML = views;
    return divElement;
}