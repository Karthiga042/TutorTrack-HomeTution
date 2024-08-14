import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './AdminDashboard.css';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StaffChart = ({ data = {} }) => {
  const labels = Object.keys(data) || [];
  const chartData = Object.values(data) || [];

  const chartDataConfig = {
    labels: labels,
    datasets: [
      {
        label: 'Staff Registrations by Subject',
        data: chartData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Staff Registrations by Subject',
      },
    },
  };

  return (
    <div>
      {labels.length > 0 ? (
        <Line data={chartDataConfig} options={options} />
      ) : (
        <p>No data available to display.</p>
      )}
    </div>
  );
};

export default StaffChart;
