import React, {useState} from 'react';
import { Line } from 'react-chartjs-2';

const Chart = props => {
  const [infoGraph, setInfoGraph] = useState({
    chartData: { 
      labels: ['10/10/20', '10/20/20', '10/30/20'],
      datasets: [
        {
        label: 'Weight',
        fill: true,
        lineTension: .1,
        data: [140, 135, 130], // data will be sent in from checkinList as props
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
      data: [120, 121, 122],
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
      //   label: 'BodyFat',
      //   fill: true,
      //   lineTension: .1,
      //   data: [20, 14, 8],
      //   borderColor:'rgba(49, 161, 195, 0.698)',
      //   backgroundColor: 'rgba(49, 161, 195, 0.3)',
      //   pointBackgroundColor: 'rgba(0, 0, 0 )',
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

export default Chart;
    
    
    
    
