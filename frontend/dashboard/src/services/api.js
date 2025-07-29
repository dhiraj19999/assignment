import axios from 'axios';

const BASE_URL = 'https://assignment-2-kzpf.onrender.com/api';

export const fetchAllData = async () => {
  const res = await axios.get(`${BASE_URL}/data`);
  return res.data;
};
