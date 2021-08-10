$(document).ready(function() {
    pieChartData();
});

const pieChartData = async() => {
    let canvas = document.getElementById('myChart');
    let labels = ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'];
    let data = [2478, 5267, 734, 784, 433];

    // DrawPieChart(canvas);
    new Chart(canvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: ' Survey Response',
                backgroundColor: [
                    '#3e95cd',
                    '#8e5ea2',
                    '#3cba9f',
                    '#e8c3b9',
                    '#c45850',
                ],
                data: data,
            }, ],
        },
    });
};