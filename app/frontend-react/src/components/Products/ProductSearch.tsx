"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onSearch: (query: string) => void;
}

const ProductSearch: React.FC<Props> = ({ onSearch }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} aria-label="product-search-form">
      <input
        type="text"
        placeholder={t('search')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label={t('search')}
      />
      <button type="submit">{t('submit')}</button>
    </form>
  );
};

export default ProductSearch;
