import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../../styles/Product.module.css';
import { ROUTES } from '../../utils/routes';
import {
  addItemToCart,
  addItemToFavourite,
  deleteItemFromFavourites,
} from '../../features/user/userSlice';

const SIZES = [1, 2, 3, 4, 5];

const Product = (item) => {
  const { title, images, price, description, id } = item;
  const { favourites } = useSelector(({ user }) => user);
  const isFavourite = favourites.some((favourite) => favourite.id === id);

  const dispatch = useDispatch();

  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();

  useEffect(() => {
    if (!images.lenght) return;

    setCurrentImage(images[0]);
  }, [images]);

  const addToCart = () => {
    dispatch(addItemToCart(item));
  };

  const addToFavourite = () => {
    if (isFavourite) {
      dispatch(deleteItemFromFavourites(item));
    } else dispatch(addItemToFavourite(item));
  };

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles['images-list']}>
          {images.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price} $</div>
        <div className={styles.color}>
          <span>Color: </span> Green
        </div>
        <div className={styles.sizes}>
          <span>Size: </span>
          <div className={styles.list}>
            {SIZES.map((size) => (
              <div
                className={`${styles.size} ${
                  currentSize === size ? styles.active : ''
                }`}
                onClick={() => setCurrentSize(size)}
                key={size}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <button
            className={styles.add}
            disabled={!currentSize}
            onClick={addToCart}
          >
            Add to cart
          </button>
          <button className={styles.favourite} onClick={addToFavourite}>
            Add to favourites
          </button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purshased</div>
          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
