

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


    let optionList = document.getElementById('optionList');
    let options = optionList.value.split(",");
   
    if(options.length>9){
        let  colors=[ '#400001',  '#b71439' ,"#f08993","#435d43"];
        let lable1=[options[0],options[1],options[2],options[3]];
        let lable2=[options[4],options[5],options[6],options[7]];
        let lable3=[options[8],options[9],options[10],options[11]];
        let lable4=[options[12],options[13],options[14],options[15]];
        let lable5=[options[15],options[16],options[17],options[18]];

        let data1=[chartValue[0],chartValue[1],chartValue[2],chartValue[3]];
        let data2=[chartValue[4],chartValue[5],chartValue[6],chartValue[7]];
        let data3=[chartValue[8],chartValue[9],chartValue[10],chartValue[11]];
        let data4=[chartValue[12],chartValue[13],chartValue[14],chartValue[15]];
        let data5=[chartValue[15],chartValue[16],chartValue[17],chartValue[18]];

        drawChart(canvas, data1,lable1,colors);
        drawChart(canvas1, data2,lable2,colors);
        drawChart(canvas2, data3,lable3,colors);
        drawChart(canvas3, data4,lable4,colors);
        drawChart(canvas4, data5,lable5,colors);
        
       
    }else{
        let labels = ['True', 'False'];
      let  colors=[ '#79a925',  '#f08993' ];
         // DrawPieChart(canvas);
    drawChart(canvas, [chartValue[0],chartValue[1]],labels,colors);
    drawChart(canvas1, [chartValue[2],chartValue[3]],labels,colors);
    drawChart(canvas2, [chartValue[4],chartValue[5]],labels,colors);
    drawChart(canvas3, [chartValue[6],chartValue[7]],labels,colors);
    drawChart(canvas4, [chartValue[8],chartValue[9]],labels,colors);
    }

   
    
};

function drawChart(canvas, data,labels,colors) {
   
    new Chart(canvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: ' Survey Response',
                backgroundColor: colors,
                data: data,
            },],
        },
    });
}
