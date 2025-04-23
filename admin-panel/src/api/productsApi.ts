import axios from 'axios';

import { apiUrl } from './apiEndpoint';

export const fetchAllProducts = async () => {
    return axios.get(`${apiUrl}/products`);
};
