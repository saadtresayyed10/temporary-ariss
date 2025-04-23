import { ArrowLeft, Bell, Moon } from 'lucide-react';

const Navbar = () => {
    return (
        <div className="flex justify-between items-center w-full">
            <button>
                <ArrowLeft size={18} className="text-stone-200" />
            </button>
            <div className="flex justify-center items-center lg:gap-x-6 text-stone-200">
                <Moon size={18} />
                <Bell size={18} />
                <div className="w-8 h-8 bg-stone-200/30 rounded-[100%]" />
            </div>
        </div>
    );
};

export default Navbar;
