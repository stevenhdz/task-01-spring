"use client";

import React, { useState } from 'react';
import { createProduct, Product } from '../../api/products';
import { useTranslation } from 'react-i18next';

interface Props {
  token?: string | null;
}


const ProductCreate: React.FC<Props> = ({ token }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<Product>({
    name: '',
    category: {
      id: 0
    },
    price: 0,
    imageUrl: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);


  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
      category: name === 'category' ? { ...prev.category, id: Number(value) } : prev.category,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
        await createProduct(form, token || '');
        setMessage(t('updateProduct'));
        setForm({ name: '', category: { id: 0 }, price: 0, imageUrl: '', description: '' });
    } catch (error: any) {
        setMessage(error.response?.data?.message || t('error'));
    }
    setLoading(false);
  };

  return (
   <form
  onSubmit={handleSubmit}
  aria-label="product-create-form"
  style={{
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    gap: '12px',
    margin: '0 auto',
  }}
>

  <label htmlFor="id" style={{ display: 'flex', flexDirection: 'column' }}>
    {t('productId')}:
    <input
      id="id"
      name="id"
      type="number"
      value={form.id || ''}
      onChange={onChange}
      required
    />
  </label>

  <label htmlFor="name" style={{ display: 'flex', flexDirection: 'column' }}>
    {t('name')}:
    <input
      id="name"
      name="name"
      type="text"
      value={form.name}
      onChange={onChange}
      required
    />
  </label>

  <label
    htmlFor="category"
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    {t('category')}:
    <input
      id="category"
      name="category"
      type="number"
      min={1}
      value={form.category.id}
      onChange={onChange}
      required
    />
  </label>

  <label
    htmlFor="price"
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    {t('price')}:
    <input
      id="price"
      name="price"
      type="number"
      min={0}
      value={form.price}
      onChange={onChange}
      required
    />
  </label>

  <label
    htmlFor="imageUrl"
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    URL {t('imageUrl')}:
    <input
      id="imageUrl"
      name="imageUrl"
      type="url"
      value={form.imageUrl}
      onChange={onChange}
      required
    />
  </label>

  <label
    htmlFor="description"
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    {t('description')}:
    <textarea
      id="description"
      name="description"
      value={form.description}
      onChange={onChange}
      required
    />
  </label>

  <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
    {loading ? t('loading') : t('submit')}
  </button>

  {message && (
    <p role="alert" style={{ marginTop: '10px', color: 'red' }}>
      {message}
    </p>
  )}
</form>
  );
};

export default ProductCreate;
