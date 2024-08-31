import React from "react";
import { useDispatch } from "react-redux";
import { toggleLike, removeProduct } from "../../store/slices/productsSlice";
import { Product } from "../../types/Product";
import { useNavigate } from 'react-router-dom';

import styles from "./Card.module.css";

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    dispatch(toggleLike(product.id));
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    dispatch(removeProduct(product.id));
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    navigate(`/edit-product/${product.id}`);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <h3>{product.title}</h3>
      <p>
        <span>Artist:</span> {product.artist_display}
      </p>
      <p>
        <span>Origin:</span> {product.place_of_origin}
      </p>
     {product.description && (
        <p className={styles["card-description"]}> <span>Description:</span>{product.description}</p>
      )}
      <img className={styles.thumbnail} src={product.thumbnail} alt={`Full view of ${product.title}`} />
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${product.liked ? styles.liked : ""}`}
          onClick={handleLike}
        >
          {product.liked ? "Unlike" : "Like"}
        </button>
        <button className={styles.button} onClick={handleEdit}>
          Edit
        </button>
        <button className={styles.button} onClick={handleRemove}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
