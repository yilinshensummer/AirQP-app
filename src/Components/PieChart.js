import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


function PieChart({ chartData }) {
  return (
    <div>
    <h4>Location: {chartData.name}</h4><h5> AirQuality Info(PieChart)</h5>
    <Pie data={chartData} />
    </div>)
}

export default PieChart;