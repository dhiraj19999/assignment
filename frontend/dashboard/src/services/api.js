import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const fetchAllData = async () => {
  const res = await axios.get(`${BASE_URL}/data`);
  return res.data;
};
