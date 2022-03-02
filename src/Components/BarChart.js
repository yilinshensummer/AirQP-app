import React from 'react'
import{Bar} from "react-chartjs-2"
import{Chart as ChartJS, BarElement} from 'chart.js/auto'


function BarChart({ chartData }) {
    return (
    <div>
    <h4>Location: {chartData.name}</h4><h5> AirQuality Info(BarChart)</h5>
    <Bar data={chartData} />
    </div>
    )
  }
  

export default BarChart
