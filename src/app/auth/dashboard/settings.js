import Html from './index.html?raw';

export function settingsDashboard() {

    const onLoad = () => {

    }

    setTimeout(onLoad, 0);
    return `
    <section class="home-section">
        <div class="home-content">
            <i class='bx bx-menu'></i>
            <span class="text">DASHBOARD > SETTINGS</span>
        </div>
        <div id="content" class="container-fluid" style="margin-top: 25px;">
            <div class="row">
            </div>
        </div>
    </section>
    `;
}