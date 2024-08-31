import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditProduct.module.css';
import { updateProduct } from '../../store/slices/productsSlice';
import { RootState } from '../../store/store';
import { v4 as uuidv4 } from 'uuid';


const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === id)
  );

  const [title, setTitle] = useState('');
  const [artist_display, setArtistDisplay] = useState('');
  const [place_of_origin, setPlaceOfOrigin] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setArtistDisplay(product.artist_display);
      setPlaceOfOrigin(product.place_of_origin);
      setDimensions(product.dimensions);
      setDescription(product.description || '');
      setThumbnail(product.thumbnail);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title && artist_display && place_of_origin && dimensions) {
      dispatch(updateProduct({
        id:product?.id || '',
        title,
        artist_display,
        place_of_origin,
        dimensions,
        description,
        thumbnail,
        liked: product?.liked || false,
        image_url: product?.image_url || ''
      }));
      navigate('/products');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <div className={styles.editProduct}>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Artist:</label>
          <input 
            type="text" 
            value={artist_display} 
            onChange={(e) => setArtistDisplay(e.target.value)} 
            required 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Origin:</label>
          <input 
            type="text" 
            value={place_of_origin} 
            onChange={(e) => setPlaceOfOrigin(e.target.value)} 
            required 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Dimensions:</label>
          <input 
            type="text" 
            value={dimensions} 
            onChange={(e) => setDimensions(e.target.value)} 
            required 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Thumbnail URL:</label>
          <input 
            type="text" 
            value={thumbnail} 
            onChange={(e) => setThumbnail(e.target.value)} 
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={styles.saveButton}>Save</button>
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
