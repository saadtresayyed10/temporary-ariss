import { Eye, Loader, Loader2, Pencil, Search, Trash } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { deleteCategory, fetchAllCategories } from '../../api/categoriesApi';
import { CategoryTypes } from '../../types/categoryInterface';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import { Link } from 'react-router-dom';

const Category = () => {
    const [categories, setCategories] = useState<CategoryTypes[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchAllCategories();
            setCategories(response.data.data);
            setTotal(response.data.total);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleDelete = async () => {
        if (!selectedCategoryId) return;
        try {
            await deleteCategory(selectedCategoryId);
            await fetchCategories(); // Refetch after deletion
        } catch (err) {
            console.error(err);
        } finally {
            setModalOpen(false);
            setSelectedCategoryId(null);
        }
    };

    return (
        <div className="flex justify-center items-center w-full flex-col bg-white lg:gap-y-6 lg:mt-8">
            <div className="flex justify-between items-center lg:px-2 w-full">
                <div className="bg-black text-center px-6 py-2 shadow-md rounded-lg">
                    {loading ? (
                        <Loader size={18} className="animate-spin text-stone-100" />
                    ) : (
                        <h2 className="font-unbounded font-light text-stone-100 text-base">
                            Total Categories: {total}
                        </h2>
                    )}
                </div>
                <div />
                <Link
                    to="/categories/add"
                    className="bg-black text-stone-100 font-unbounded font-light px-6 py-2 shadow-md rounded-lg text-base transition duration-300 hover:bg-stone-800"
                >
                    Add Category
                </Link>
            </div>

            <div className="flex justify-start items-center w-full lg:gap-x-4 bg-stone-100 lg:px-6 lg:py-2.5 rounded-full border border-stone-300">
                <Search size={22} />
                <input
                    type="text"
                    placeholder="Search for Categories..."
                    className="placeholder:font-unbounded placeholder:text-sm text-sm placeholder:font-light w-full text-gray-600 placeholder:text-gray-600 font-unbounded font-light outline-none focus:outline-none focus:ring-0 focus:border-transparent bg-transparent"
                />
            </div>

            <div className="w-full overflow-x-auto mt-2 px-2">
                {loading ? (
                    <div className="flex justify-center items-center w-full lg:min-h-[202px]">
                        <Loader2 className="animate-spin text-stone-800" size={40} />
                    </div>
                ) : categories.length === 0 ? (
                    <div className="w-full text-center py-16">
                        <h1 className="text-lg font-unbounded font-light text-gray-500">
                            No categories found. Add your first one
                        </h1>
                    </div>
                ) : (
                    <table className="min-w-full bg-white border border-stone-300 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-black text-stone-100 text-left text-sm font-unbounded font-light">
                            <tr>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Created</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, idx) => (
                                <tr
                                    key={category.category_id}
                                    className={`text-sm font-unbounded font-light text-gray-700 ${
                                        idx % 2 === 0 ? 'bg-stone-100' : 'bg-white'
                                    }`}
                                >
                                    <td className="w-8 h-8">
                                        <img
                                            className="object-contain w-20 h-20"
                                            src={category.category_image}
                                            alt="Category"
                                        />
                                    </td>
                                    <td className="px-4 py-3">{category.category_name}</td>
                                    <td className="px-4 py-3">
                                        {new Date(category.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => {
                                                setSelectedCategoryId(category.category_id);
                                                setModalOpen(true);
                                            }}
                                            className="hover:text-blue-600 transition cursor-pointer"
                                        >
                                            <Eye size={20} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedCategoryId(category.category_id);
                                                setModalOpen(true);
                                            }}
                                            className="hover:text-green-600 transition cursor-pointer mx-3"
                                        >
                                            <Pencil size={20} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedCategoryId(category.category_id);
                                                setModalOpen(true);
                                            }}
                                            className="hover:text-red-600 transition cursor-pointer"
                                        >
                                            <Trash size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <ConfirmDeleteModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Category;
