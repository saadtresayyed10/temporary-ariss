import { Clipboard, Loader2 } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { addCategoryAPI } from '../../api/categoryAPI';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [pasteImage, setPasteImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { toast } = useToast();

    const handleClipboardPaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setPasteImage(text);
            toast({
                description: 'Pasted URL from clipboard.',
                className: 'rounded font-work shadow-xl',
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                description: 'Failed to read clipboard.',
                className: 'rounded font-work shadow-xl',
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast({
                variant: 'destructive',
                className: 'rounded font-work shadow-xl',
                description: 'Category Name is required.',
            });
            return;
        }

        if (!image && !pasteImage) {
            toast({
                variant: 'destructive',
                className: 'rounded font-work shadow-xl',
                description: 'Provide either an image file or a pasted image URL.',
            });
            return;
        }

        if (image && pasteImage) {
            toast({
                variant: 'destructive',
                className: 'rounded font-work shadow-xl',
                description: 'Cannot use both file and pasted image URL.',
            });
            return;
        }

        setLoading(true);

        try {
            // If image file is selected, handle upload here
            let categoryImage = pasteImage;

            if (image) {
                // Upload image to your server or S3 bucket, get the URL
                // Here we simulate that and just create a fake URL
                categoryImage = `http://localhost:5000/uploads/${image.name}`;
            }

            await addCategoryAPI(name, categoryImage);
            toast({
                className: 'rounded font-work shadow-xl bg-green-500',
                description: 'Category added successfully.',
            });
            setTimeout(() => navigate('/categories'), 1000);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                className: 'rounded font-work shadow-xl',
                description: 'There was an error adding category...',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:gap-y-6 justify-start w-full h-full lg:p-12 bg-transparent lg:px-4 lg:py-8">
            <h1 className="font-work text-left text-6xl font-semibold capitalize dark:text-stone-100 text-stone-800">
                Add a Category:
            </h1>
            <form
                onSubmit={handleSubmit}
                className="flex justify-start items-start flex-col lg:gap-y-6 lg:mt-4"
            >
                <div className="flex justify-start items-start flex-col lg:gap-y-3 font-work capitalize dark:text-stone-100 text-stone-800">
                    <Label>
                        Category name<sup className="opacity-50">*</sup>
                    </Label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Routers"
                        className="rounded lg:w-[250px]"
                    />
                </div>

                <div className="flex justify-start items-start flex-col lg:gap-y-3 font-work capitalize dark:text-stone-100 text-stone-800">
                    <Label>
                        Category Image<sup className="opacity-50">*</sup>
                    </Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="cursor-pointer rounded lg:w-[250px]"
                    />

                    <div className="flex justify-start items-center lg:gap-x-2 font-work capitalize dark:text-stone-100 text-stone-800 mt-2">
                        <Input
                            type="text"
                            value={pasteImage}
                            onChange={(e) => setPasteImage(e.target.value)}
                            placeholder="Paste image URL here (Optional)"
                            className="placeholder:capitalize rounded lg:w-[250px]"
                        />
                        <Button
                            type="button"
                            onClick={handleClipboardPaste}
                            variant="outline"
                            className="rounded p-2"
                        >
                            <Clipboard size={18} className="text-stone-500 dark:text-stone-100 stroke-[1]" />
                        </Button>
                    </div>
                </div>

                <Button type="submit" className="lg:px-6 lg:py-2 rounded font-work">
                    {loading ? <Loader2 className="animate-spin" /> : 'Submit'}
                </Button>
            </form>
        </div>
    );
};

export default AddCategory;
