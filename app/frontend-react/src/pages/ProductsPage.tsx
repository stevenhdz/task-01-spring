"use client";

import React, { useState, useEffect } from 'react';
import { Product, getProducts, searchProducts } from '../api/products';
import ProductList from '../components/Products/ProductList';
import ProductDetail from '../components/Products/ProductDetail';
import ProductSearch from '../components/Products/ProductSearch';
import ProductCreate from '../components/Products/ProductCreate';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const { token } = useAuth();

  useEffect(() => {
    setLoading(true);
    getProducts(categoryFilter, token || '')
      .then(res => {
        setProducts(res.data);
        setError(null);
      })
      .catch(() => setError(t('products.loadError')))
      .finally(() => setLoading(false));
  }, [categoryFilter, token, t]);

  const onSearch = (query: string) => {
    if (!query) {
      setCategoryFilter(undefined);
      return;
    }
    setLoading(true);
    searchProducts(query, token || '')
      .then(res => {
        setProducts(res.data);
        setError(null);
      })
      .catch(() => setError(t('products.searchError')))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>🍔 {t('products.menuTitle')}</h1>

      <section style={{ marginBottom: '20px', textAlign: 'center' }}>
        <strong>{t('products.filterByCategory')}:</strong>
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => setCategoryFilter(undefined)}>{t('products.all')}</button>
          <button onClick={() => setCategoryFilter('hamburguesas')}>{t('products.hamburgers')}</button>
          <button onClick={() => setCategoryFilter('bebidas')}>{t('products.drinks')}</button>
          <button onClick={() => setCategoryFilter('postres')}>{t('products.desserts')}</button>
        </div>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <ProductSearch onSearch={onSearch} />
      </section>

      {loading && <p style={{ textAlign: 'center' }}>⏳ {t('products.loading')}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <section style={{ marginBottom: '20px' }}>
        <ProductList products={products} onSelect={id => setSelectedProductId(id)} />
      </section>

      {selectedProductId && (
        <section style={{ marginBottom: '20px' }}>
          <ProductDetail id={selectedProductId} onClose={() => setSelectedProductId(null)} />
        </section>
      )}

      <section>
        <h2>✏️ {t('products.updateProduct')}</h2>
        <ProductCreate token={token} />
      </section>
    </div>
  );
};

export default ProductsPage;
