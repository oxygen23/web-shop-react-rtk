import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import { ROUTES } from '../../utils/routes';
import SingleProduct from '../Products/SingleProduct';
import Profile from '../Profile/Profile';
import SingleCategory from '../Categories/SingleCategory';
import Cart from '../Cart/Cart';

const AppRoutes = () => (
  <Routes>
    <Route index element={<Home />}></Route>
    <Route path={ROUTES.PRODUCT} element={<SingleProduct />}></Route>
    <Route path={ROUTES.PROFILE} element={<Profile />}></Route>
    <Route path={ROUTES.CATEGORY} element={<SingleCategory />}></Route>
    <Route path={ROUTES.CART} element={<Cart />}></Route>
  </Routes>
);
export default AppRoutes;
