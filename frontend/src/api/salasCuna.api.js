import axios from 'axios';

export const getAllCribrooms = () => {
  return axios.get('http://127.0.0.1:8000/api/cribroom/');
};