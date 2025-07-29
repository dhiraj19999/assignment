

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ data }) {
  function getUnique(key) {
  const values = data.map(d => d[key]);         
  const nonEmpty = values.filter(val => val);   // 2. null/undefined/empty removed
  const unique = [...new Set(nonEmpty)];        // 3. create  unique values  using Set
  return unique;
}


  const sectors = getUnique('sector');
  const values = sectors.map(sec =>
    data.filter(d => d.sector === sec).reduce((sum, d) => sum + d.intensity, 0)
  );

  const chartData = {
    labels: sectors,
    datasets: [{
      label: 'Intensity',
      data: values,
      backgroundColor: '#3b82f6'
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Intensity by Sector', color: '#fff' },
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

  return <Bar data={chartData} options={options} />;
}
