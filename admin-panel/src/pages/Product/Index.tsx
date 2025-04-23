import { Eye, Loader, Loader2, Pencil, Search, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProductTypes } from '../../types/productInterface';
import { fetchAllProducts } from '../../api/productsApi';
import { Link } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState<ProductTypes[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetchAllProducts();
                console.log(response.data);
                setProducts(response.data.data);
                setTotal(response.data.total);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="flex justify-center items-center w-full flex-col bg-white lg:gap-y-6 lg:mt-8">
            <div className="flex justify-between items-center lg:px-2 w-full">
                <div className="bg-black text-center px-6 py-2 shadow-md rounded-lg">
                    {loading ? (
                        <Loader size={18} className="animate-spin text-stone-100" />
                    ) : (
                        <h2 className="font-unbounded font-light text-stone-100 text-base">
                            Total Products: {total}
                        </h2>
                    )}
                </div>
                <div />
                <Link
                    to="/products/add"
                    className="bg-black cursor-pointer text-stone-100 font-unbounded font-light px-6 py-2 shadow-md rounded-lg text-base"
                >
                    Add Product
                </Link>
            </div>
            <div className="flex justify-start items-center w-full lg:gap-x-4 bg-stone-100 lg:px-6 lg:py-2.5 rounded-full border border-stone-300">
                <Search size={22} />
                <input
                    type="text"
                    placeholder="Search for Products..."
                    className="placeholder:font-unbounded placeholder:text-sm text-sm placeholder:font-light w-full text-gray-600 placeholder:text-gray-600 font-unbounded font-light outline-none focus:outline-none focus:ring-0 focus:border-transparent bg-transparent"
                />
            </div>
            <div className="w-full overflow-x-auto mt-2 px-2">
                {loading ? (
                    <div className="flex justify-center items-center w-full lg:min-h-[202px]">
                        <Loader2 className="animate-spin text-stone-800" size={40} />
                    </div>
                ) : (
                    <table className="min-w-full bg-white border border-stone-300 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-black text-stone-100 text-left text-sm font-unbounded font-light">
                            <tr>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Quantity</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Subcategory</th>
                                <th className="px-4 py-3">Created</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product: ProductTypes, idx: number) => (
                                <tr
                                    key={idx}
                                    className={`text-sm font-unbounded font-light text-gray-700 ${
                                        idx % 2 === 0 ? 'bg-stone-100' : 'bg-white'
                                    }`}
                                >
                                    <td className="w-8 h-8">
                                        <img
                                            className="object-contain w-20 h-20"
                                            src={product.product_image[0]}
                                            alt="Product Image"
                                        />
                                    </td>
                                    <td className="px-4 py-3 w-10">{product.product_title}</td>
                                    <td className="px-4 py-3">₹{product.product_price}</td>
                                    <td className="px-4 py-3">{product.product_quantity}</td>
                                    <td className="px-4 py-3">{product.category.category_name}</td>
                                    <td className="px-4 py-3">{product.subcategory.subcategory_name}</td>
                                    <td className="px-4 py-3">
                                        {new Date(product.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-start items-center gap-x-4">
                                            <Eye size={20} />
                                            <Pencil size={20} />
                                            <Trash size={20} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Product;
