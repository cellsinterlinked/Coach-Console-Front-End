import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const BodyFatChart = props => {
  const bodyFatArr = props.items.map(checkin => checkin.bodyFat);
  console.log(bodyFatArr);
  const dateArr = props.items.map(checkin =>
    checkin.date.toString().slice(0, 10)
  );

  const [infoGraph, setInfoGraph] = useState({
    chartData: {
      labels: dateArr,
      datasets: [
        {
          label: "BodyFat",
          fill: true,
          lineTension: 0.1,
          data: bodyFatArr,
          borderColor: "rgba(90, 204, 189, 0.698)",
          hoverBorderColor: "rgba(90, 204, 189)",
          backgroundColor: "rgba(90, 204, 189, 0.3)",
          hoverBackgroundColor: "rgba(90, 204, 189, 0.3)",
          pointBackgroundColor: "rgba(255, 255, 255 )",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255,255,255, 0.5)"
        }
        //add more lines here
      ]
    }
    // add other stuff here
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

export default BodyFatChart;
