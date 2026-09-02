import Chart from 'chart.js/auto';
import Html from './index.html?raw';
//import './style.css';

export function estadisticasAdmin() {

    const onLoad = () => {


        //<script>

        /*
         * ==========================================================
         * VISITAS POR FECHA
         * ==========================================================
         */

        const visitsCtx = document
            .getElementById('visitsChart');

        new Chart(visitsCtx, {

            type: 'line',

            data: {

                labels: [
                    '14 Jul',
                    '15 Jul',
                    '16 Jul',
                    '17 Jul',
                    '18 Jul',
                    '19 Jul',
                    '20 Jul',
                    '21 Jul',
                    '22 Jul',
                    '23 Jul',
                    '24 Jul',
                    '25 Jul',
                    '26 Jul',
                    '27 Jul',
                    '28 Jul',
                    '29 Jul',
                    '30 Jul',
                    '31 Jul',
                    '01 Ago',
                    '02 Ago',
                    '03 Ago',
                    '04 Ago',
                    '05 Ago',
                    '06 Ago',
                    '07 Ago',
                    '08 Ago',
                    '09 Ago',
                    '10 Ago',
                    '11 Ago',
                    '12 Ago',
                    '13 Ago'
                ],

                datasets: [

                    {
                        label: 'Visitas',

                        data: [
                            420,
                            780,
                            510,
                            1080,
                            1140,
                            980,
                            720,
                            680,
                            820,
                            940,
                            970,
                            1080,
                            950,
                            890,
                            820,
                            870,
                            920,
                            840,
                            880,
                            900,
                            960,
                            1050,
                            980,
                            1100,
                            1250,
                            1210,
                            970,
                            1050,
                            1060,
                            1180,
                            1100
                        ],

                        borderWidth: 3,

                        tension: 0.4,

                        pointRadius: 0,

                        fill: true
                    },


                    {
                        label: 'Visitantes',

                        data: [
                            250,
                            480,
                            350,
                            570,
                            690,
                            720,
                            580,
                            430,
                            480,
                            510,
                            570,
                            620,
                            580,
                            510,
                            470,
                            500,
                            530,
                            420,
                            450,
                            470,
                            520,
                            590,
                            540,
                            620,
                            650,
                            580,
                            500,
                            520,
                            540,
                            560,
                            590
                        ],

                        borderWidth: 2,

                        borderDash: [5, 5],

                        tension: 0.4,

                        pointRadius: 0,

                        fill: false
                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                interaction: {
                    intersect: false,
                    mode: 'index'
                },

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        grid: {
                            color: '#edf0f5'
                        },

                        ticks: {
                            color: '#7b8190'
                        }

                    },

                    x: {

                        grid: {
                            display: false
                        },

                        ticks: {
                            color: '#7b8190',
                            maxTicksLimit: 8
                        }

                    }

                }

            }

        });


        /*
         * ==========================================================
         * VISITANTES VS AUTENTICADOS
         * ==========================================================
         */

        const usersCtx = document
            .getElementById('usersChart');

        new Chart(usersCtx, {

            type: 'doughnut',

            data: {

                labels: [
                    'Visitantes',
                    'Autenticados'
                ],

                datasets: [{

                    data: [
                        7801,
                        1714
                    ],

                    borderWidth: 0,

                    cutout: '72%'

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                }

            }

        });


        /*
         * ==========================================================
         * DISPOSITIVOS
         * ==========================================================
         */

        const devicesCtx = document
            .getElementById('devicesChart');

        new Chart(devicesCtx, {

            type: 'doughnut',

            data: {

                labels: [
                    'Desktop',
                    'Mobile',
                    'Tablet'
                ],

                datasets: [{

                    data: [
                        62.1,
                        33.7,
                        4.2
                    ],

                    borderWidth: 0,

                    cutout: '68%'

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                }

            }

        });


        /*
         * ==========================================================
         * VISITAS POR HORA
         * ==========================================================
         */

        const hourlyCtx = document
            .getElementById('hourlyChart');

        new Chart(hourlyCtx, {

            type: 'bar',

            data: {

                labels: [
                    '00:00',
                    '01:00',
                    '02:00',
                    '03:00',
                    '04:00',
                    '05:00',
                    '06:00',
                    '07:00',
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00',
                    '13:00',
                    '14:00',
                    '15:00',
                    '16:00',
                    '17:00',
                    '18:00',
                    '19:00',
                    '20:00',
                    '21:00',
                    '22:00',
                    '23:00'
                ],

                datasets: [{

                    label: 'Visitas',

                    data: [
                        380,
                        280,
                        180,
                        120,
                        90,
                        80,
                        110,
                        180,
                        310,
                        420,
                        470,
                        520,
                        500,
                        540,
                        580,
                        690,
                        760,
                        850,
                        940,
                        890,
                        720,
                        620,
                        480,
                        380
                    ],

                    borderRadius: 4,

                    borderSkipped: false

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        grid: {
                            color: '#edf0f5'
                        },

                        ticks: {
                            color: '#7b8190'
                        }

                    },

                    x: {

                        grid: {
                            display: false
                        },

                        ticks: {
                            color: '#7b8190',
                            maxTicksLimit: 8
                        }

                    }

                }

            }

        });

        // </script>


    }

    setTimeout(onLoad, 0);
    return Html;
}