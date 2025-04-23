import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Upload } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { addCategory, addSubcategory } from '../../api/categoriesApi'; // Adjust the import path

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [preview, setPreview] = useState<string | null>(null);

    const [subCategoryName, setSubCategoryName] = useState('');
    const [subImageURL, setSubImageURL] = useState('');
    const [subPreview, setSubPreview] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            setImageURL('');
        }
    };

    const handleSubImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setSubPreview(url);
            setSubImageURL('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!categoryName || (!imageURL && !preview)) {
            toast.error('Please enter a category name and upload/select an image.');
            return;
        }

        if (!subCategoryName || (!subImageURL && !subPreview)) {
            toast.error('Please enter a subcategory name and upload/select an image.');
            return;
        }

        setLoading(true);

        try {
            const categoryImage = imageURL || preview!;
            const subcategoryImage = subImageURL || subPreview!;

            await addCategory(categoryName, categoryImage);
            await addSubcategory(subCategoryName, subcategoryImage, categoryName);

            toast.success('Category and Subcategory added!');
            setTimeout(() => navigate('/categories'), 1000);
        } catch (err) {
            toast.error('Something went wrong while adding!');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-[calc(100vh-64px)] overflow-y-auto flex justify-center items-start px-4 py-10 mt-[64px]">
            <Toaster position="top-right" />
            <div className="w-full max-w-xl bg-stone-100 shadow-xl rounded-2xl p-6 space-y-6 border border-stone-200">
                <h1 className="text-2xl font-unbounded font-light text-center text-stone-800">
                    Add New Category
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 font-unbounded">
                    {/* Category Name */}
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-light text-stone-700">Category Name</label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="e.g. Routers/Fibers"
                            className="bg-stone-100 text-sm placeholder:text-gray-500 text-gray-700 px-4 py-2 rounded-full border border-stone-300 outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Category Image Upload */}
                    <div className="flex flex-col gap-y-2">
                        <label className="font-light text-sm text-stone-700">Category Image</label>
                        <div className="flex flex-col lg:flex-row items-stretch gap-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="fileInput"
                            />
                            <label
                                htmlFor="fileInput"
                                className="flex items-center justify-center gap-2 cursor-pointer bg-black text-white px-4 py-2 rounded-full text-xs hover:bg-stone-800 transition whitespace-nowrap"
                            >
                                <Upload size={12} />
                                Upload Image
                            </label>

                            <input
                                type="text"
                                value={imageURL}
                                onChange={(e) => {
                                    setImageURL(e.target.value);
                                    setPreview(e.target.value);
                                }}
                                placeholder="Paste image URL"
                                className="bg-stone-100 text-sm placeholder:text-gray-500 text-gray-700 px-4 py-2 rounded-full border border-stone-300 outline-none focus:ring-2 focus:ring-black flex-1"
                            />
                        </div>
                    </div>

                    {/* Subcategory Name */}
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-light text-stone-700">Subcategory Name</label>
                        <input
                            type="text"
                            value={subCategoryName}
                            onChange={(e) => setSubCategoryName(e.target.value)}
                            placeholder="e.g. ONU, Patch Cord"
                            className="bg-stone-100 text-sm placeholder:text-gray-500 text-gray-700 px-4 py-2 rounded-full border border-stone-300 outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Subcategory Image Upload */}
                    <div className="flex flex-col gap-y-2">
                        <label className="font-light text-sm text-stone-700">Subcategory Image</label>
                        <div className="flex flex-col lg:flex-row items-stretch gap-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleSubImageChange}
                                className="hidden"
                                id="subFileInput"
                            />
                            <label
                                htmlFor="subFileInput"
                                className="flex items-center justify-center gap-2 cursor-pointer bg-black text-white px-4 py-2 rounded-full text-xs hover:bg-stone-800 transition whitespace-nowrap"
                            >
                                <Upload size={12} />
                                Upload Image
                            </label>

                            <input
                                type="text"
                                value={subImageURL}
                                onChange={(e) => {
                                    setSubImageURL(e.target.value);
                                    setSubPreview(e.target.value);
                                }}
                                placeholder="Paste subcategory image URL"
                                className="bg-stone-100 text-sm placeholder:text-gray-500 text-gray-700 px-4 py-2 rounded-full border border-stone-300 outline-none focus:ring-2 focus:ring-black flex-1"
                            />
                        </div>
                    </div>

                    {/* Previews */}
                    {preview && (
                        <div className="w-full mt-4">
                            <h2 className="text-sm font-light text-stone-600 mb-2">Category Preview:</h2>
                            <img
                                src={preview}
                                alt="Category Preview"
                                className="w-full h-52 object-contain rounded-xl border border-stone-200 shadow-sm"
                            />
                        </div>
                    )}

                    {subPreview && (
                        <div className="w-full mt-4">
                            <h2 className="text-sm font-light text-stone-600 mb-2">Subcategory Preview:</h2>
                            <img
                                src={subPreview}
                                alt="Subcategory Preview"
                                className="w-full h-52 object-contain rounded-xl border border-stone-200 shadow-sm"
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-center cursor-pointer mt-4 bg-black text-white py-2 rounded-full text-sm transition ${
                            loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-stone-800'
                        }`}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin text-center" size={22} />
                        ) : (
                            'Add Category'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
