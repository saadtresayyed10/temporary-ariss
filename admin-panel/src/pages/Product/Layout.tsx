import { Outlet } from 'react-router-dom';

const ProductLayout = () => {
    return (
        <div className="w-full">
            {/* Optional: place a back button or breadcrumbs here */}
            <Outlet />
        </div>
    );
};

export default ProductLayout;
