import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { loadProducts } from '../../store/slices/productsSlice';
import Filter from '../../components/Filter/Filter';
import styles from './Products.module.css';

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <div className={styles.products_page}>
      <div className={styles.filter_container}>
        <h1 className={styles.title}>Harvard Art Museums</h1>
        <Filter />
      </div>
    </div>
  );
};

export default Products;
