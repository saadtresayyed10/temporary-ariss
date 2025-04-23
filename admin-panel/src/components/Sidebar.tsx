import { NavLink } from 'react-router-dom';
import {
    LogOut,
    LayoutDashboard,
    Users,
    Box,
    Book,
    ShoppingCart,
    ArrowRightLeft,
    Heart,
    ChartBarStacked,
} from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="h-full flex flex-col">
            {/* Logo Section */}
            <div className="flex items-center justify-center py-4">
                <h1 className="text-stone-100 text-4xl font-extralight font-posterama tracking-widest">
                    ARISS
                </h1>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto">
                <ul className="flex flex-col gap-y-4 px-2 font-unbounded font-light text-xs lg:mt-4">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex justify-between items-center gap-2 px-6 py-3 rounded-lg text-stone-100 hover:bg-stone-700 ${
                                    isActive ? 'bg-stone-800' : ''
                                }`
                            }
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                            <span />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/customers"
                            className={({ isActive }) =>
                                `flex justify-between items-center gap-2 px-6 py-3 rounded-lg text-stone-100 hover:bg-stone-700 ${
                                    isActive ? 'bg-stone-800' : ''
                                }`
                            }
                        >
                            <Users size={18} />
                            Customers
                            <span />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `flex justify-between items-center gap-2 px-6 py-3 rounded-lg text-stone-100 hover:bg-stone-700 ${
                                    isActive ? 'bg-stone-800' : ''
                                }`
                            }
                        >
                            <Box size={18} />
                            Products
                            <span />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/categories"
                            className={({ isActive }) =>
                                `flex justify-between items-center gap-2 px-6 py-3 rounded-lg text-stone-100 hover:bg-stone-700 ${
                                    isActive ? 'bg-stone-800' : ''
                                }`
                            }
                        >
                            <ChartBarStacked size={18} />
                            Categories
                            <span />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/discounts"
                            className={({ isActive }) =>
                                `flex justify-between items-center gap-2 px-6 py-3 rounded-lg text-stone-100 hover:bg-stone-700 ${
                                    isActive ? 'bg-stone-800' : ''
                                }`
                            }
                        >
                            <Book size={18} />
                            Discounts
                            <span />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/orders"
                            className={({ isActive }) =>
                                `flex justify-between items-center gap-2 px-6 py-3 rounded-lg text-stone-100 hover:bg-stone-700 ${
                                    isActive ? 'bg-stone-800' : ''
                                }`
                            }
                        >
                            <ShoppingCart size={18} />
                            Orders
                            <span />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/rma"
                            className={({ isActive }) =>
                                `flex justify-between items-center gap-2 px-6 py-3 rounded-lg text-stone-100 hover:bg-stone-700 ${
                                    isActive ? 'bg-stone-800' : ''
                                }`
                            }
                        >
                            <ArrowRightLeft size={18} />
                            RMA Inquiries
                            <span />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/wishlists"
                            className={({ isActive }) =>
                                `flex justify-between items-center gap-2 px-6 py-3 rounded-lg text-stone-100 hover:bg-stone-700 ${
                                    isActive ? 'bg-stone-800' : ''
                                }`
                            }
                        >
                            <Heart size={18} />
                            Wishlists
                            <span />
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Logout Button */}
            <div className="py-4 px-2">
                <button className="w-full flex justify-between items-center gap-2 px-6 py-3 rounded-lg bg-stone-200 text-black hover:bg-stone-300 font-unbounded font-light text-xs">
                    <LogOut size={18} />
                    Logout
                    <span />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
