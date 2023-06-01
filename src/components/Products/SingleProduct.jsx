import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../features/api/apiSlice';
import { ROUTES } from '../../utils/routes';
import Product from './Product';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProducts } from '../../features/products/productsSlice';

const SingleProduct = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, related } = useSelector(({ products }) => products); 

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
    // eslint-disable-next-line
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
    if (!data || !list.length) return
    if (data) {
      dispatch(getRelatedProducts(data.category.id));
    }
  }, [data, dispatch, list.length]);

  return !data ? (
    <section className='preloader'>Loading....</section>
  ) : (
    <>
      <Product {...data} />
      <Products  products={related} amount={5} title="Related product"/>
    </>
  );
};

export default SingleProduct;
