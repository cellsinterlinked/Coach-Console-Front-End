import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const CardioChart = props => {
  const dateArr = props.items.map(checkin =>
    checkin.date.toString().slice(0, 10)
  );

  const [infoGraph, setInfoGraph] = useState({
    chartData: {
      labels: dateArr,
      datasets: [
        {
          label: "Total Cardio Duration (minutes)",
          fill: true,
          lineTension: 0.1,
          data: [250, 270, 250, 260, 280],
          borderColor: "rgba(90, 204, 189, 0.698)",
          hoverBorderColor: "rgba(90, 204, 189)",
          backgroundColor: "rgba(90, 204, 189, 0.3)",
          hoverBackgroundColor: "rgba(90, 204, 189, 0.3)",
          pointBackgroundColor: "rgba(255, 255, 255 )",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255,255,255, 0.5)"
        },
        {
          label: "Total Calories Burnt(* .1)",
          fill: true,
          lineTension: 0.1,
          data: [210, 230, 240, 210, 240],
          borderColor: "rgba(187, 90, 204, 0.698)",
          hoverBorderColor: "rgba(187, 90, 204)",
          backgroundColor: "rgba(187, 90, 204, 0.3)",
          hoverBackgroundColor: "rgba(187, 90, 204, 0.3)",
          pointBackgroundColor: "rgba(255, 255, 255 )",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255,255,255, 0.5)"
        }
      ],
    },
        options: {
          legend: {
            display: false
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem) {
                      return tooltipItem.yLabel;
              }
            }
          }
        }
    
  });

  return (
    <div className="chart">
      <Line data={infoGraph.chartData} options={{scaleShowLavels: false,
            scales: {
              xAxes: [{
                ticks: {
                  display: false
                }
              }]
            }}} />
    </div>
  );
};

export default CardioChart;
