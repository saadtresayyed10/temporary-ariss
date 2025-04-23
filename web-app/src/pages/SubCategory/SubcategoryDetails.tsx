import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from '../../hooks/use-toast';
import { fetchSingleSubcategory } from '../../api/subCategoryAPI';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Clipboard, Loader2 } from 'lucide-react';
import axios from 'axios';

interface Subcategory {
    subcategory_id: string;
    subcategory_name: string;
    subcategory_image: string;
    category: {
        category_name: string;
    };
}

const SubcategoryDetails = () => {
    const { subcategory_id } = useParams();
    const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
    const [loading, setLoading] = useState(false);
    const [subcategory_name, setSubcategoryName] = useState('');
    const [subcategory_image, setSubcategoryImage] = useState('');

    useEffect(() => {
        const fetchData = async (id: string) => {
            setLoading(true);
            try {
                const response = await fetchSingleSubcategory(id);
                const sub = response?.data?.data?.[0];

                if (!sub) throw new Error('No subcategory data found.');

                setSubcategory(sub);
                setSubcategoryName(sub.subcategory_name);
                setSubcategoryImage(sub.subcategory_image);
            } catch (error) {
                console.error(error);
                toast({
                    variant: 'destructive',
                    description: 'Failed to load subcategory data.',
                    className: 'rounded shadow-md border font-work',
                });
            } finally {
                setLoading(false);
            }
        };

        if (subcategory_id) {
            fetchData(subcategory_id);
            toast({
                description: 'NOTE: You can directly update values from here.',
                className: 'rounded shadow-md border font-work',
            });
        }
    }, [subcategory_id]);

    const handleClipboardPaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                setSubcategoryImage(text);
                toast({
                    description: 'Image URL pasted from clipboard!',
                    className: 'rounded shadow-md border font-work',
                });
            } else {
                toast({
                    variant: 'destructive',
                    description: 'Clipboard is empty.',
                    className: 'rounded shadow-md border font-work',
                });
            }
        } catch (err) {
            console.error(err);
            toast({
                variant: 'destructive',
                description: 'Failed to read clipboard.',
                className: 'rounded shadow-md border font-work',
            });
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subcategory_id) return;

        setLoading(true);
        try {
            const res = await axios.put(
                `https://ariss-app-production.up.railway.app/api/products/category/sub/${subcategory_id}`,
                {
                    subcategory_name,
                    subcategory_image,
                }
            );
            setSubcategory(res.data.data);
            toast({
                description: 'Subcategory updated successfully!',
                className: 'rounded shadow-md border font-work',
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                description: 'Error updating subcategory.',
                className: 'rounded shadow-md border font-work',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:gap-y-6 justify-start w-full h-full lg:p-12 bg-transparent lg:px-4 lg:py-8">
            <h1 className="font-work text-left text-6xl font-semibold capitalize dark:text-stone-100 text-stone-800">
                Subcategory Details:
            </h1>

            <div className="flex justify-between items-start w-full lg:mb-10">
                <form
                    onSubmit={handleUpdate}
                    className="flex justify-start items-start flex-col lg:gap-y-6 lg:mt-4 lg:mb-10"
                >
                    <div className="flex flex-col lg:gap-y-3 font-work capitalize dark:text-stone-100 text-stone-800">
                        <Label>Subcategory Name</Label>
                        <Input
                            type="text"
                            value={subcategory_name}
                            onChange={(e) => setSubcategoryName(e.target.value)}
                            placeholder="Subcategory Name"
                            className="rounded lg:w-[250px]"
                        />
                    </div>

                    <div className="flex flex-col lg:gap-y-3 font-work capitalize dark:text-stone-100 text-stone-800">
                        <Label>Subcategory Image</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={() =>
                                toast({
                                    variant: 'destructive',
                                    description: 'File uploads not supported. Use URL instead.',
                                    className: 'rounded shadow-md border font-work',
                                })
                            }
                            className="cursor-pointer rounded lg:w-[250px]"
                        />
                        <div className="flex items-center gap-x-2 mt-2">
                            <Input
                                type="text"
                                value={subcategory_image}
                                onChange={(e) => setSubcategoryImage(e.target.value)}
                                placeholder="Paste image URL here (Optional)"
                                className="placeholder:capitalize rounded lg:w-[250px]"
                            />
                            <Button
                                type="button"
                                onClick={handleClipboardPaste}
                                variant="outline"
                                className="rounded p-2"
                            >
                                <Clipboard
                                    size={18}
                                    className="text-stone-500 dark:text-stone-100 stroke-[1]"
                                />
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-3 font-work capitalize dark:text-stone-100 text-stone-800">
                        <Label>Subcategory ID</Label>
                        <Input
                            type="text"
                            value={subcategory?.subcategory_id ?? ''}
                            placeholder="Subcategory ID"
                            className="rounded lg:w-[250px]"
                            disabled
                        />
                    </div>

                    <div className="flex flex-col gap-y-3 font-work capitalize dark:text-stone-100 text-stone-800">
                        <Label>Category Name</Label>
                        <Input
                            type="text"
                            value={subcategory?.category?.category_name ?? ''}
                            placeholder="Category"
                            className="rounded lg:w-[250px]"
                            disabled
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-fit px-6 py-2 font-semibold rounded shadow bg-stone-800 text-white hover:bg-stone-700 disabled:opacity-60"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Update Subcategory'}
                    </Button>
                </form>

                {subcategory?.subcategory_image && (
                    <img
                        src={subcategory.subcategory_image}
                        alt={subcategory.subcategory_name ?? 'Subcategory image'}
                        className="object-contain lg:min-h-[400px] lg:max-h-[500px] lg:min-w-[400px] lg:max-w-[500px] shadow-md rounded border lg:mb-10 lg:mr-20"
                    />
                )}
            </div>
        </div>
    );
};

export default SubcategoryDetails;
