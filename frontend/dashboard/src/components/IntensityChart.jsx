import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IntensityChart = ({ data }) => {
  const sectors = data.map(d => d.sector || 'Unknown');
  const intensities = data.map(d => d.intensity || 0);

  const chartData = {
    labels: sectors,
    datasets: [
      {
        label: 'Intensity',
        data: intensities,
        backgroundColor: '#4f46e5'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Intensity by Sector'
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default IntensityChart;
