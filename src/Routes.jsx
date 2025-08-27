import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';
import ShoppingCart from './pages/shopping-cart';
import ProductDetail from './pages/product-detail';
import ProductCatalog from './pages/product-catalog';
import Login from './pages/login';
import Checkout from './pages/checkout';
import Register from './pages/register';
import ForgotPassword from './pages/forgot-password';

function Routes() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/product-catalog" element={<ProductCatalog />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default Routes;