import Html from './index.html?raw';

export function profileDashboard() {

    const onLoad = () => {

    }

    setTimeout(onLoad, 0);
    return `
    <section class="home-section">
        <div class="home-content">
            <i class='bx bx-menu'></i>
            <span class="text">DASHBOARD > PROFILE</span>
        </div>
        <div id="content" class="container-fluid" >
            <div class="row">
            </div>
        </div>
    </section>
    `;
}