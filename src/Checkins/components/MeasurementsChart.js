import React from "react";
import { Line } from "react-chartjs-2";

const MeasurementChart = props => {
  const dateArr = props.items.map(checkin =>
    checkin.date.toString().slice(0, 10)
  );

  let infoArr = props.items.map((item) => item.neckMeasure + item.armMeasure + item.chestMeasure + item.waistMeasure + item.hipsMeasure + item.thighMeasure + item.calfMeasure)

  const infoGraph = {
    chartData: {
      labels: dateArr,
      datasets: [
        {
          label: "Total Size",
          fill: true,
          lineTension: 0.1,
          data: infoArr,
          borderColor: "rgba(90, 204, 189, 0.698)",
          hoverBorderColor: "rgba(90, 204, 189)",
          backgroundColor: "rgba(90, 204, 189, 0.3)",
          hoverBackgroundColor: "rgba(90, 204, 189, 0.3)",
          pointBackgroundColor: "rgba(255, 255, 255 )",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255,255,255, 0.5)"
        },
        // {
        //   label: "Arm",
        //   fill: true,
        //   lineTension: 0.1,
        //   data: [15, 15, 15.5, 15.5, 16],
        //   borderColor: "rgba(187, 90, 204, 0.698)",
        //   hoverBorderColor: "rgba(187, 90, 204)",
        //   backgroundColor: "rgba(187, 90, 204, 0.3)",
        //   hoverBackgroundColor: "rgba(187, 90, 204, 0.3)",
        //   pointBackgroundColor: "rgba(255, 255, 255 )",
        //   pointBorderWidth: 1,
        //   pointHoverRadius: 5,
        //   pointHoverBackgroundColor: "rgba(255,255,255, 0.5)"
        // },

        // {
        //   label: "Chest",
        //   fill: true,
        //   lineTension: 0.1,
        //   data: [40, 40, 39, 39, 38.5],
        //   borderColor: "rgba(187, 90, 204, 0.698)",
        //   hoverBorderColor: "rgba(187, 90, 204)",
        //   backgroundColor: "rgba(187, 90, 204, 0.3)",
        //   hoverBackgroundColor: "rgba(187, 90, 204, 0.3)",
        //   pointBackgroundColor: "rgba(255, 255, 255 )",
        //   pointBorderWidth: 1,
        //   pointHoverRadius: 5,
        //   pointHoverBackgroundColor: "rgba(255,255,255, 0.5)"
        // },

        // {
        //   label: "Waist",
        //   fill: true,
        //   lineTension: 0.1,
        //   data: [32, 32, 31, 31, 30],
        //   borderColor: "rgba(187, 90, 204, 0.698)",
        //   hoverBorderColor: "rgba(187, 90, 204)",
        //   backgroundColor: "rgba(187, 90, 204, 0.3)",
        //   hoverBackgroundColor: "rgba(187, 90, 204, 0.3)",
        //   pointBackgroundColor: "rgba(255, 255, 255 )",
        //   pointBorderWidth: 1,
        //   pointHoverRadius: 5,
        //   pointHoverBackgroundColor: "rgba(255,255,255, 0.5)"
        // },

        // {
        //   label: "Hips",
        //   fill: true,
        //   lineTension: 0.1,
        //   data: [36, 36, 35, 35, 34],
        //   borderColor: "rgba(187, 90, 204, 0.698)",
        //   hoverBorderColor: "rgba(187, 90, 204)",
        //   backgroundColor: "rgba(187, 90, 204, 0.3)",
        //   hoverBackgroundColor: "rgba(187, 90, 204, 0.3)",
        //   pointBackgroundColor: "rgba(255, 255, 255 )",
        //   pointBorderWidth: 1,
        //   pointHoverRadius: 5,
        //   pointHoverBackgroundColor: "rgba(255,255,255, 0.5)"
        // },

        // {
        //   label: "Thigh",
        //   fill: true,
        //   lineTension: 0.1,
        //   data: [22, 21.5, 21, 21, 20],
        //   borderColor: "rgba(187, 90, 204, 0.698)",
        //   hoverBorderColor: "rgba(187, 90, 204)",
        //   backgroundColor: "rgba(187, 90, 204, 0.3)",
        //   hoverBackgroundColor: "rgba(187, 90, 204, 0.3)",
        //   pointBackgroundColor: "rgba(255, 255, 255 )",
        //   pointBorderWidth: 1,
        //   pointHoverRadius: 5,
        //   pointHoverBackgroundColor: "rgba(255,255,255, 0.5)"
        // },
        // {
        //   label: "Calf",
        //   fill: true,
        //   lineTension: 0.1,
        //   data: [12, 12, 12.5, 13, 13],
        //   borderColor: "rgba(187, 90, 204, 0.698)",
        //   hoverBorderColor: "rgba(187, 90, 204)",
        //   backgroundColor: "rgba(187, 90, 204, 0.3)",
        //   hoverBackgroundColor: "rgba(187, 90, 204, 0.3)",
        //   pointBackgroundColor: "rgba(255, 255, 255 )",
        //   pointBorderWidth: 1,
        //   pointHoverRadius: 5,
        //   pointHoverBackgroundColor: "rgba(255,255,255, 0.5)"
        // }
      ]
    },
    options: {
        maintainAspectRatio: false,
    }
  };

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

export default MeasurementChart;
