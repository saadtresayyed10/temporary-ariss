import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const Layout = () => {
    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <aside className="lg:w-64 fixed bg-black lg:p-4 lg:mt-4 lg:ml-4 rounded-md lg:h-[calc(100vh-2rem)] shadow-lg border border-gray-200 overflow-y-auto">
                <Sidebar />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Navbar */}
                <header className="bg-black lg:p-4 rounded-md shadow-md fixed lg:top-4 lg:left-70 lg:right-4 border border-gray-200">
                    <Navbar />
                </header>

                {/* Page Content */}
                <main className="lg:p-8 lg:pt-24">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
