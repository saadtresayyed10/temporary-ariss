// src/components/Sidebar.tsx
import clsx from 'clsx';
import { ArrowLeftRight, Heart, Landmark, LayoutDashboard, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import SidebarProduct from './Sidebar/ProductSidebar';
import SidebarCategory from './Sidebar/CategoriesSidebar';
import SidebarCustomer from './Sidebar/Customers';
import SidebarDiscount from './Sidebar/Discount';
import SidebarCourse from './Sidebar/Course';

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
    return (
        <aside
            className={clsx(
                'dark:bg-stone-800 bg-stone-100 text-stone-800 dark:text-stone-100 h-full pt-4 transition-all duration-300 border-r border-stone-500 flex justify-start items-center flex-col lg:gap-y-2.5 lg:px-1.5 lg:py-2',
                isOpen ? 'w-12 px-1' : 'w-56',
                'overflow-hidden'
            )}
        >
            <button className="bg-transparent text-stone-800 dark:text-stone-100 hover:bg-transparent w-full shadow-none flex justify-between items-center lg:px-1.5 lg:py-2 text-base font-normal">
                <Link to="/">
                    <span className="flex items-center gap-x-2 text-lg font-work lg:mt-2">
                        <LayoutDashboard size={20} className="min-w-[20px] min-h-[20px] stroke-[1.5] mr-2" />
                        Dashboard
                    </span>
                    <span />
                </Link>
            </button>
            <button className="w-full">
                <SidebarCustomer />
            </button>
            <button className="w-full">
                <SidebarCategory />
            </button>
            <button className="w-full">
                <SidebarProduct />
            </button>
            <button className="w-full">
                <SidebarDiscount />
            </button>
            {/* <button className="w-full">
                <SidebarRMA />
            </button> */}
            <button className="bg-transparent text-stone-800 dark:text-stone-100 hover:bg-transparent w-full shadow-none flex justify-between items-center lg:px-1.5 lg:py-2 text-base font-normal">
                <Link to="/rma">
                    <span className="flex items-center gap-x-2 text-lg font-work">
                        <ArrowLeftRight size={20} className="min-w-[20px] min-h-[20px] stroke-[1.5] mr-2" />
                        RMA
                    </span>
                    <span />
                </Link>
            </button>
            <button className="bg-transparent text-stone-800 dark:text-stone-100 hover:bg-transparent w-full shadow-none flex justify-between items-center lg:px-1.5 lg:py-2 text-base font-normal">
                <Link to="/orders">
                    <span className="flex items-center gap-x-2 text-lg font-work">
                        <ShoppingCart size={20} className="min-w-[20px] min-h-[20px] stroke-[1.5] mr-2" />
                        Orders
                    </span>
                    <span />
                </Link>
            </button>
            <button className="bg-transparent text-stone-800 dark:text-stone-100 hover:bg-transparent w-full shadow-none flex justify-between items-center lg:px-1.5 lg:py-2 text-base font-normal">
                <Link to="/invoices">
                    <span className="flex items-center gap-x-2 text-lg font-work">
                        <Landmark size={20} className="min-w-[20px] min-h-[20px] stroke-[1.5] mr-2" />
                        Invoices
                    </span>
                    <span />
                </Link>
            </button>
            <button className="bg-transparent text-stone-800 dark:text-stone-100 hover:bg-transparent w-full shadow-none flex justify-between items-center lg:px-1.5 lg:py-2 text-base font-normal">
                <Link to="/wishlists">
                    <span className="flex items-center gap-x-2 text-lg font-work">
                        <Heart size={20} className="min-w-[20px] min-h-[20px] stroke-[1.5] mr-2" />
                        Wishlists
                    </span>
                    <span />
                </Link>
            </button>
            <button className="w-full">
                <SidebarCourse />
            </button>
        </aside>
    );
};

export default Sidebar;
