import axios from 'axios';

export const getAllCribrooms = () => {
  return axios.get('http://127.0.0.1:8000/api/cribroom/');
};

export const getAllZones = () => {
  return axios.get('http://127.0.0.1:8000/api/zone/');
};

export const getAllShifts = async () => {
  return axios.get('http://127.0.0.1:8000/api/shift/');
};