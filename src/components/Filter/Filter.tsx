import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import { Product } from '../../types/Product';
import Pagination from '../Pagination/Pagination';
import styles from './Filter.module.css';

const ITEMS_PER_PAGE = 6; // Количество продуктов на странице

const Filter: React.FC = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const products = useSelector((state: RootState) => state.products.items) || [];
  const navigate = useNavigate(); 

  const filteredProducts = useMemo(() => {
    const filtered = showFavorites
      ? products.filter((product: Product) => product.liked)
      : products;

    return filtered.filter((product: Product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, showFavorites, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCreateProduct = () => {
    navigate('/create-product');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.filter_styles}>
      <div className={styles.filter_controls}>
        <button
          className={styles.filter_button}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? 'Show All' : 'Show Favorites'}
        </button>
        <button
          className={styles.filter_button}
          onClick={handleCreateProduct}
        >
          Create Product
        </button>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Сбрасываем на первую страницу при поиске
          }}
          className={styles.search_input}
        />
      </div>

      <div className={styles.card_list}>
        {paginatedProducts.length === 0 ? (
          <p>No products available</p>
        ) : (
          paginatedProducts.map((product: Product, index) => (
            <Card key={`${product.id}_${index}`} product={product} />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Filter;
