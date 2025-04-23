import axios from 'axios';
import { apiUrl } from './apiEndpoint';

export const fetchAllCategories = async () => {
    return axios.get(`${apiUrl}/products/category`);
};

export const addCategory = async (category_name: string, category_image: string) => {
    return axios.post(`${apiUrl}/products/category`, { category_name, category_image });
};

export const addSubcategory = async (
    subcategory_name: string,
    subcategory_image: string,
    category_name: string
) => {
    return axios.post(`${apiUrl}/products/category/sub`, {
        subcategory_name,
        subcategory_image,
        category_name,
    });
};

export const deleteCategory = async (category_id: string) => {
    return axios.delete(`${apiUrl}/products/category/${category_id}`);
};

// Test
