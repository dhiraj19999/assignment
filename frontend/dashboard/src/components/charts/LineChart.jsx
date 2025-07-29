

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  LineElement, PointElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function LineChart({ data }) {
   function getUnique(key) {
  const values = data.map(d => d[key]);         
  const nonEmpty = values.filter(val => val);   
  const unique = [...new Set(nonEmpty)];        
  return unique;
}

  const years = getUnique('start_year').sort();
  const values = years.map(year =>
    data.filter(d => d.start_year === year).reduce((sum, d) => sum + d.likelihood, 0)
  );

  const chartData = {
    labels: years,
    datasets: [{
      label: 'Likelihood',
      data: values,
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.5)',
      fill: true,
      tension: 0.3
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Likelihood over Start Year', color: '#fff' },
      legend: { labels: { color: '#fff' } },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const d = data[ctx.dataIndex];
            return [
              `Title: ${d.title}`,
              `Insight: ${d.insight}`,
              `Source: ${d.source}`,
              `Impact: ${d.impact}`,
              `URL: ${d.url}`
            ];
          }
        }
      }
    },
    scales: {
      x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  };

  return <Line data={chartData} options={options} />;
}
