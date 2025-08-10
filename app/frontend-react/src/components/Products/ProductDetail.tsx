"use client";

import React, { useEffect, useState } from 'react';
import { getProductById, Product } from '../../api/products';
import { useTranslation } from 'react-i18next';

interface Props {
  id: number;
  onClose: () => void;
}

const ProductDetail: React.FC<Props> = ({ id, onClose }) => {
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then(res => {
        setProduct(res.data);
        setError(null);
      })
      .catch(() => setError(t('error')))
      .finally(() => setLoading(false));
  }, [id, t]);

  if (loading) return <p>{t('loading')}</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  return (
    <div aria-label="product-detail">
      <button onClick={onClose}>{t('close') || 'Close'}</button>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '300px' }} />
      <p>{t('category')}: {product.category.name}</p>
      <p>{t('price')}: ${product.price}</p>
      <p>{t('description')}: {product.description}</p>
    </div>
  );
};

export default ProductDetail;