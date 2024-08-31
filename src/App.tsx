import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './pages/Products/Products';
import styles from './App.module.css'
import ProductPage from './pages/ProductPage/ProductPage';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import EditProduct from './pages/EditProduct/EditProduct';

const App: React.FC = () => {
  return (
    <div className={styles.main}>
    <Router>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/" element={<Products />} /> {/* Домашняя страница или дефолтный маршрут */}
      </Routes>
    </Router>
    </div>
  );
};

export default App;
