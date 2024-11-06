export const options = {
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 38,
    plugins: {
        datalabel: {
            display: false,
        },
        legend: false,
    },
    scales: {
        x: {
            border: {
                display: false,
            },
            grid: {
                display: false,
                drawOnChartArea: false,
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
                display: false,
            },
            border: {
                display: false,
            },
            grid: {
                display: false,
                drawOnChartArea: false,
            },
        },
    },
};

// Chart bar option
export const chart_light_bg = '#000000';
export const chart_dark_bg = '#2ecc71';

let br = 7;

// Project 1 data
const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export const data1 = {
    labels,
    datasets: [
        {
            data: [14, 21, 62, 40, 50, 42, 31, 56, 28, 32, 37, 48],
            borderRadius: br,
        },
    ],
};

// Project 2 data
export const data2 = {
    labels,
    datasets: [
        {
            data: [45, 60, 40, 35, 55, 30, 20, 50, 60, 35, 25, 40],
            borderRadius: br,
        },
    ],
};

// Project 3 data
export const data3 = {
    labels,
    datasets: [
        {
            data: [80, 30, 45, 50, 60, 70, 80, 55, 40, 35, 45, 55],
            borderRadius: br,
        },
    ],
};
