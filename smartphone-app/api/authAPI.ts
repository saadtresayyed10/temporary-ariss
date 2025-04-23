import axios from 'axios';

import { apiEndpoint } from './apiEndpoint';

// Login users API
export const loginUsers = async (phone: string, email: string, userType: string) => {
  return await axios.post(`${apiEndpoint}/users/login`);
};
