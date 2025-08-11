"use client";

import React from 'react';
import { Product } from '../../api/products';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  products: Product[];
  onSelect: (id: number, token: string) => void;
}

const ProductList: React.FC<Props> = ({ products, onSelect }) => {
  const { t } = useTranslation();
  const { token } = useAuth();

  if (products.length === 0) return <p>{t('error')}: {t('no_products')}</p>;

  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>
          <h3>{p.name}</h3>
          <p>
            {t('category')}: {p.category.id} {p.category.name} | {t('price')}: ${p.price}
          </p>
          <button onClick={() => p.id && onSelect(p.id, token || '')}>
            {t('description')}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
