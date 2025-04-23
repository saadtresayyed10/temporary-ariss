import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Product from './pages/Product/Index';
import Category from './pages/Category/Index';
import CategoryLayout from './pages/Category/Layout';
import AddCategory from './pages/Category/Add';
import { Toaster } from 'react-hot-toast';
import ProductLayout from './pages/Product/Layout';
import AddProduct from './pages/Product/AddProduct';

const App = () => {
    return (
        <Router>
            <Toaster position="top-right" />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<div>Dashboard Content</div>} />
                    <Route path="/customers" element={<div>Customers</div>} />
                    <Route path="/products" element={<ProductLayout />}>
                        <Route index element={<Product />} />
                        <Route path="add" element={<AddProduct />} />
                    </Route>
                    <Route path="/orders" element={<div>Orders</div>} />
                    <Route path="/categories" element={<CategoryLayout />}>
                        <Route index element={<Category />} />
                        <Route path="add" element={<AddCategory />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
