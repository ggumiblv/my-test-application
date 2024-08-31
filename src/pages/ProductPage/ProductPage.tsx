import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './ProductPage.module.css';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === String(id))
  );

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  const handleBackToHome = () => {
    navigate('/'); // Переход на главную страницу
  };

  return (
    <div className={styles.productPage}>
      <h1 className={styles.title}>{product.title}</h1>
      <div className={styles.details}>
        <p><strong>Artist:</strong> {product.artist_display}</p>
        <p><strong>Origin:</strong> {product.place_of_origin}</p>
        <p><strong>Dimensions:</strong> {product.dimensions}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <img className={styles.image} src={product.thumbnail} alt={product.title} />
      </div>
      <button className={styles.backButton} onClick={handleBackToHome}>
        Back to Home
      </button>
    </div>
  );
};

export default ProductPage;
