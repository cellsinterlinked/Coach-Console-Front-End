import React, {useState} from 'react';
import { Line } from 'react-chartjs-2';

const WeightChart = props => {
  const weightArr = props.items.map(checkin => checkin.weight);
  console.log(weightArr);
  const dateArr = props.items.map(checkin => checkin.date.toString().slice(0, 10));
  console.log (dateArr);
  const leanBodyMassArr = props.items.map(checkin => checkin.leanBodyMass);
  console.log(leanBodyMassArr);
  console.log(dateArr[0].toString().slice(0, 10));
  // const fatMassArr = props.items.map(checkin => checkin.fatMass);

  const [infoGraph, setInfoGraph] = useState({
    chartData: { 
      labels: dateArr,
      datasets: [
        {
        label: 'Weight',
        fill: true,
        lineTension: .1,
        data: weightArr,
        borderColor: 'rgba(90, 204, 189, 0.698)',
        hoverBorderColor: 'rgba(90, 204, 189)', 
        backgroundColor: 'rgba(90, 204, 189, 0.3)',
        hoverBackgroundColor: 'rgba(90, 204, 189, 0.3)',
        pointBackgroundColor: 'rgba(255, 255, 255 )',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(255,255,255, 0.5)",
      },
      {
      label: 'Lean Body Mass',
      fill: true,
      lineTension: .1,
      data: leanBodyMassArr,
      borderColor:'rgba(187, 90, 204, 0.698)',
      hoverBorderColor: 'rgba(187, 90, 204)',
      backgroundColor: 'rgba(187, 90, 204, 0.3)',
      hoverBackgroundColor: 'rgba(187, 90, 204, 0.3)',
      pointBackgroundColor: 'rgba(255, 255, 255 )',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(255,255,255, 0.5)",
        
      },
      // {
      //   label: 'Fat Mass',
      //   fill: true,
      //   lineTension: .1,
      //   data: fatMassArr,
      //   borderColor:'rgba(49, 161, 195, 0.698)',
      //   backgroundColor: 'rgba(49, 161, 195, 0.3)',
      //   pointBackgroundColor: 'rgba(0, 0, 0 )',
      //   pointBorderWidth: 1,
      //   pointHoverRadius: 5,
      //   pointHoverBackgroundColor: "rgba(255,255,255, 0.5)"
      // }
    ]
    },
    // options: {
    //   scales: {
    //     yAxes: [{
    //       ticks: {
    //         beginAtZero: true
    //       }
    //     }]
    //   }
    // }
  }) 

  return (
    <div className="chart">
      <Line 
        data={infoGraph.chartData}
        options={{

        }}
      
      />
    </div>
  )
}

export default WeightChart;
    
    
    
    
