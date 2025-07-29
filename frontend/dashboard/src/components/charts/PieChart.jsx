

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function PieChart({ data }) {
  function getUnique(key) {
  const values = data.map(d => d[key]);         
  const nonEmpty = values.filter(val => val);   
  const unique = [...new Set(nonEmpty)];        
  return unique;
}

  const countries = getUnique('country');
  const values = countries.map(c =>
    data.filter(d => d.country === c).reduce((sum, d) => sum + d.relevance, 0)
  );

  const chartData = {
    labels: countries,
    datasets: [{
      label: 'Relevance',
      data: values,
      backgroundColor: countries.map((_, i) =>
        `hsl(${(i * 360) / countries.length}, 70%, 60%)`
      )
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Relevance by Country', color: '#fff' },
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
    }
  };

  return <Pie data={chartData} options={options} />;
}
