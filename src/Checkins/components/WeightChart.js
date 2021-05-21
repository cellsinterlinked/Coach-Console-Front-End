import React, {useState} from 'react';
import { Line } from 'react-chartjs-2';

const WeightChart = props => {
  const weightArr = props.items.map(checkin => checkin.weight);
  const dateArr = props.items.map(checkin => checkin.date.toString().slice(0, 10));
  const leanBodyMassArr = props.items.map(checkin => checkin.leanBodyMass);
 

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
    ],
    options: {
      scaleShowLavels: false,
      scales: {
        xAxes: [{
          ticks: {
            display: false
          }
        }]
      }
    }
    }
  }) 

  return (
    <div className="chart">
      <Line 
        data={infoGraph.chartData}
        options={{
            scaleShowLavels: false,
            scales: {
              xAxes: [{
                ticks: {
                  display: false
                }
              }]
            }
          }  
        }
      
      />
    </div>
  )
}

export default WeightChart;
    
    
    
    
