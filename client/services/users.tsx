import api from './api';

export const fetchAllUsers = async () => {
  const response = await api.get('/users');
  return response.data; 
};
