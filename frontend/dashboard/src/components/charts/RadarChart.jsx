// 📁 src/components/charts/RadarChart.jsx

import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS, RadialLinearScale, PointElement,
  LineElement, Filler, Tooltip, Legend, Title
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title);

export default function RadarChart({ data }) {
   function getUnique(key) {
  const values = data.map(d => d[key]);         
  const nonEmpty = values.filter(val => val);   
  const unique = [...new Set(nonEmpty)];        
  return unique;
}
  const pestles = getUnique('pestle');

  const intensity = pestles.map(p =>
    data.filter(d => d.pestle === p).reduce((sum, d) => sum + d.intensity, 0)
  );
  const relevance = pestles.map(p =>
    data.filter(d => d.pestle === p).reduce((sum, d) => sum + d.relevance, 0)
  );
  const likelihood = pestles.map(p =>
    data.filter(d => d.pestle === p).reduce((sum, d) => sum + d.likelihood, 0)
  );

  const chartData = {
    labels: pestles,
    datasets: [
      {
        label: 'Intensity',
        data: intensity,
        backgroundColor: 'rgba(59, 130, 246, 0.4)',
        borderColor: '#3b82f6'
      },
      {
        label: 'Relevance',
        data: relevance,
        backgroundColor: 'rgba(234, 179, 8, 0.4)',
        borderColor: '#eab308'
      },
      {
        label: 'Likelihood',
        data: likelihood,
        backgroundColor: 'rgba(16, 185, 129, 0.4)',
        borderColor: '#10b981'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'PESTLE Comparison Radar', color: '#fff' },
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
      r: {
        pointLabels: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
        angleLines: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#fff', backdropColor: 'transparent' }
      }
    }
  };

  return <Radar data={chartData} options={options} />;
}
