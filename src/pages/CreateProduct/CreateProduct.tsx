import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './CreateProduct.module.css';
import { addProduct } from '../../store/slices/productsSlice';
import { v4 as uuidv4 } from 'uuid';

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [artist_display, setArtistDisplay] = useState('');
  const [place_of_origin, setPlaceOfOrigin] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title && artist_display && place_of_origin && dimensions) {
      dispatch(addProduct({
        id: uuidv4(),
        title,
        artist_display,
        place_of_origin,
        dimensions,
        description,
        thumbnail,
        liked: false,
        image_url: ''
      }));
      navigate('/products');
      window.location.reload(); 
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleCancel = () => {
    navigate('/products'); 
    window.location.reload();
  };

  return (
    <div className={styles.createProduct}>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Artist:</label>
          <input 
            type="text" 
            value={artist_display} 
            onChange={(e) => setArtistDisplay(e.target.value)} 
            required 
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Origin:</label>
          <input 
            type="text" 
            value={place_of_origin} 
            onChange={(e) => setPlaceOfOrigin(e.target.value)} 
            required 
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Dimensions:</label>
          <input 
            type="text" 
            value={dimensions} 
            onChange={(e) => setDimensions(e.target.value)} 
            required 
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Thumbnail URL:</label>
          <input 
            type="text" 
            value={thumbnail} 
            onChange={(e) => setThumbnail(e.target.value)} 
            className={styles.formInput}
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={`${styles.button} ${styles.createButton}`}>Create</button>
          <button type="button" className={`${styles.button} ${styles.cancelButton}`} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
