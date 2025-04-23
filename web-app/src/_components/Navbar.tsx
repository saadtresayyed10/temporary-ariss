import { ModeToggle } from '../components/mode-toggle';
import { Bell, PanelLeftClose, PanelRightClose } from 'lucide-react';
import AdminAccount from './AdminAccount';

interface NavbarProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const Navbar = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
    return (
        <nav className="w-full h-16 dark:bg-stone-800 bg-stone-100 text-stone-800 dark:text-stone-100 flex items-center px-4 justify-between fixed top-0 left-0 z-50 border-b border-stone-500">
            <div className="flex justify-between items-center w-full lg:px-4">
                <div className="flex justify-center items-center lg:gap-x-8">
                    <button onClick={toggleSidebar}>
                        {isSidebarOpen ? (
                            <PanelRightClose
                                size={20}
                                className="text-stone-800 dark:text-stone-100 stroke-[1.5]"
                            />
                        ) : (
                            <PanelLeftClose
                                size={20}
                                className="text-stone-800 dark:text-stone-100 stroke-[1.5]"
                            />
                        )}
                    </button>
                    <h1 className="text-4xl font-light text-stone-800 dark:text-stone-100 font-posterama uppercase tracking-tight">
                        Ariss
                    </h1>
                </div>

                <div className="flex justify-center items-center lg:gap-x-4">
                    <ModeToggle />
                    {/* Notification Bell */}
                    <Bell size={16} className="text-stone-800 dark:text-stone-100 stroke-[1.5] lg:mr-6" />
                    {/* Account Profile */}
                    <AdminAccount />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
