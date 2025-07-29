

import { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import PieChart from './charts/PieChart';
import RadarChart from './charts/RadarChart';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: '',
    start_year: '',
    topic: '',
    sector: '',
    region: '',
    country: '',
    pestle: '',
    source: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

 const filteredData = data.filter(item => {
  return (
    (filters.end_year === '' || item.end_year === filters.end_year) &&
    (filters.start_year === '' || item.start_year === filters.start_year) &&
    (filters.topic === '' || item.topic === filters.topic) &&
    (filters.sector === '' || item.sector === filters.sector) &&
    (filters.region === '' || item.region === filters.region) &&
    (filters.country === '' || item.country === filters.country) &&
    (filters.pestle === '' || item.pestle === filters.pestle) &&
    (filters.source === '' || item.source === filters.source)
  );
});


  const getUnique = (key) => {
  const values = [];

  data.forEach(item => {
    const value = item[key];
    if (value && !values.includes(value)) {
      values.push(value);
    }
  });

  return values;
};


  return (
    <div className="max-w-screen-2xl p-6 space-y-6 min-h-screen bg-gradient-to-br from-zinc-900 via-slate-800 to-black text-white">
      <h1 className="text-3xl font-bold mb-4 text-center animate-pulse">✨📊  Dashboard ✨</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(filters).map(key => (
          <select
            key={key}
            name={key}
            value={filters[key]}
            onChange={handleChange}
            className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1"
          >
            <option value="">All {key.replace('_', ' ')}</option>
            {getUnique(key).map(val => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        ))}
      </div>

      <div className="w-full flex flex-wrap gap-6 justify-center items-start">
  <div className="w-full md:w-[48%] bg-gray-900 p-4 rounded-xl shadow-lg">
    <BarChart data={filteredData} />
  </div>
  <div className="w-full md:w-[48%] bg-gray-900 p-4 rounded-xl shadow-lg">
    <LineChart data={filteredData} />
  </div>
  <div className="w-full md:w-[48%] bg-gray-900 p-4 rounded-xl shadow-lg">
    <PieChart data={filteredData} />
  </div>
  <div className="w-full md:w-[48%] bg-gray-900 p-4 rounded-xl shadow-lg">
    <RadarChart data={filteredData} />
  </div>
</div>

    </div>
  );
}

