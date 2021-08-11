$(document).ready(function() {
    pieChartData();
});

const pieChartData = async() => {
    let canvas = document.getElementById('myChart');
    let canvas1 = document.getElementById('myChart1');
    let canvas2= document.getElementById('myChart2');
    let canvas3 = document.getElementById('myChart3');
    let canvas4= document.getElementById('myChart4');
    
   

    let chart = document.getElementById('chartdata');
    let chartValue = chart.value.split(",");
  
  

    // DrawPieChart(canvas);
    drawChart(canvas, chartValue[0],chartValue[1]);
    drawChart(canvas1, chartValue[2],chartValue[3]);
    drawChart(canvas2, chartValue[4],chartValue[5]);
    drawChart(canvas3, chartValue[6],chartValue[7]);
    drawChart(canvas4, chartValue[8],chartValue[9]);
    
};

function drawChart(canvas, data1,data2) {
    let labels = ['True', 'False'];
    new Chart(canvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: ' Survey Response',
                backgroundColor: [
                    '#00ff00',
                    '#ff0000'
                ],
                data: [data1, data2],
            },],
        },
    });
}
