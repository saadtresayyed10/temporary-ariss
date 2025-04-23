import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import MDEditor from '@uiw/react-md-editor';
import toast, { Toaster } from 'react-hot-toast';

type ProductFormData = {
    product_title: string;
    product_sku: string;
    product_type: 'Normal' | 'Offer';
    product_description: string;
    product_image: string[];
    product_warranty: number;
    product_quantity: number;
    product_label: string;
    product_visibility: 'Public' | 'Private';
    product_usps: string;
    product_keywords: string[];
    product_price: number;
    category_name: string;
    subcategory_name: string;
};

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState<ProductFormData>({
        product_title: '',
        product_sku: '',
        product_type: 'Normal',
        product_description: '',
        product_image: ['', ''],
        product_warranty: 1,
        product_quantity: 0,
        product_label: '',
        product_visibility: 'Public',
        product_usps: '',
        product_keywords: [],
        product_price: 0,
        category_name: '',
        subcategory_name: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (name: keyof ProductFormData, index: number, value: string) => {
        if (!Array.isArray(productData[name])) return;
        const updatedArray = [...(productData[name] as string[])];
        updatedArray[index] = value;
        setProductData((prev) => ({ ...prev, [name]: updatedArray }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/products', productData);
            toast.success('Product added successfully!');
            console.log(response.data);
        } catch (err: unknown) {
            const error = err as AxiosError<{ message?: string }>;
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-10">
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />
            <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                <input
                    type="text"
                    name="product_title"
                    placeholder="Product Title"
                    value={productData.product_title}
                    onChange={handleChange}
                    className="bg-white text-black p-2 rounded"
                />
                <input
                    type="text"
                    name="product_sku"
                    placeholder="Product SKU"
                    value={productData.product_sku}
                    onChange={handleChange}
                    className="bg-white text-black p-2 rounded"
                />
                <select
                    name="product_type"
                    value={productData.product_type}
                    onChange={handleChange}
                    className="bg-white text-black p-2 rounded"
                >
                    <option value="Normal">Normal</option>
                    <option value="Offer">Offer</option>
                </select>
                <input
                    type="number"
                    name="product_price"
                    placeholder="Price"
                    value={productData.product_price}
                    onChange={handleChange}
                    className="bg-white text-black p-2 rounded"
                />
                <input
                    type="number"
                    name="product_quantity"
                    placeholder="Quantity"
                    value={productData.product_quantity}
                    onChange={handleChange}
                    className="bg-white text-black p-2 rounded"
                />
                <input
                    type="number"
                    name="product_warranty"
                    placeholder="Warranty (years)"
                    value={productData.product_warranty}
                    onChange={handleChange}
                    className="bg-white text-black p-2 rounded"
                />
                <input
                    type="text"
                    name="product_label"
                    placeholder="Label (Trending, etc)"
                    value={productData.product_label}
                    onChange={handleChange}
                    className="bg-white text-black p-2 rounded"
                />
                <select
                    name="product_visibility"
                    value={productData.product_visibility}
                    onChange={handleChange}
                    className="bg-white text-black p-2 rounded"
                >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                </select>
                <input
                    type="text"
                    name="product_usps"
                    placeholder="Product USPs"
                    value={productData.product_usps}
                    onChange={handleChange}
                    className="bg-white text-black p-2 rounded"
                />
                <input
                    type="text"
                    name="category_name"
                    placeholder="Category Name"
                    value={productData.category_name}
                    onChange={handleChange}
                    className="bg-white text-black p-2 rounded"
                />
                <input
                    type="text"
                    name="subcategory_name"
                    placeholder="Subcategory Name"
                    value={productData.subcategory_name}
                    onChange={handleChange}
                    className="bg-white text-black p-2 rounded"
                />
                <div className="col-span-2">
                    <label className="block mb-2">Product Description (Markdown)</label>
                    <MDEditor
                        value={productData.product_description}
                        onChange={(val) =>
                            setProductData((prev) => ({ ...prev, product_description: val || '' }))
                        }
                    />
                </div>
                <div className="col-span-2">
                    <label className="block mb-2">Product Images (2 links)</label>
                    {productData.product_image.map((img, i) => (
                        <input
                            key={i}
                            type="text"
                            value={img}
                            onChange={(e) => handleArrayChange('product_image', i, e.target.value)}
                            className="bg-white text-black p-2 rounded mb-2 w-full"
                            placeholder={`Image URL ${i + 1}`}
                        />
                    ))}
                </div>
                <div className="col-span-2">
                    <label className="block mb-2">Product Keywords (comma separated)</label>
                    <input
                        type="text"
                        onChange={(e) =>
                            setProductData((prev) => ({
                                ...prev,
                                product_keywords: e.target.value.split(',').map((word) => word.trim()),
                            }))
                        }
                        className="bg-white text-black p-2 rounded w-full"
                        placeholder="e.g. Cable, Speed"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="col-span-2 bg-white text-black font-bold py-3 rounded hover:bg-gray-300 transition"
                >
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
