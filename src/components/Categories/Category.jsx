import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';

import Products from '../Products/Products';

import styles from '../../styles/Category.module.css';
import { useSelector } from 'react-redux';

const Category = () => {
  const { id } = useParams();
  const  category  = useSelector(({ categories }) => categories);

  const defaultValues = {
    title: '',
    price_min: 0,
    price_max: 0,
  };
  const defaultParams = {
    categoryId: id,
    limit: 10,
    offset: 0,
    ...defaultValues,
  };

  const [params, setParams] = useState(defaultParams);
  const [isEnd, setIsEnd] = useState(false);
  const [values, setValues] = useState(defaultValues);
  const [cat, setCat] = useState(null);
  const [items, setItems] = useState([]);
  const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);


  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([])
    setIsEnd(false)
    setParams({ ...defaultParams, ...values });
  };

  const handleReset = (e) => {
    e.preventDefault()
    setValues(defaultValues);
    setParams(defaultParams);
    setIsEnd(false)
  }

  useEffect(() => {
    if (!id) return;


    setValues(defaultValues)
    setItems([])
    setIsEnd(false)
    setParams({ ...defaultParams, categoryId: id });
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (isLoading) return;

    if(!data.length) return setIsEnd(true)

    // const products = Object.values(data);

    // if (!products.length) return;

    setItems((_items) => ([..._items, ...data]));
  }, [data, isLoading]);


  useEffect(() => {
    if (!id || !category.length) return;

    const { name } = category.find((item) => item.id === id * 1);
    setCat(name);
  }, [category, id]);
  
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type='text'
            name='title'
            value={values.title}
            placeholder='Product name'
            onChange={handleChange}
          />
        </div>
        <div className={styles.filter}>
          <input
            type='number'
            name='price_min'
            value={values.price_min}
            placeholder='0'
            onChange={handleChange}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type='number'
            name='price_max'
            value={values.price_max}
            placeholder='0'
            onChange={handleChange}
          />
          <span>Price to</span>
        </div>

        <button type='submit'>Применить</button>

        <button onClick={handleReset}>Сбросить</button>
      </form>

      {isLoading ? (
        <div className={styles.preloader}>Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No result</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products
          title=''
          products={items}
          style={{ padding: 0 }}
          amount={items.length}
        />
      )}

      <div className={styles.more}>
        <button
          onClick={() =>
            setParams({ ...params, offset: params.offset + params.limit })
          }
          disabled={isEnd && "disabled" }
        >
          See more
        </button>
      </div>
    </section>
  );
};

export default Category;
