"use client";

import React, { useState } from 'react';
import { registerUser } from '../../api/auth';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await registerUser(form);
      setMessage(t('success') + ': ' + t('register'));
      setForm({ name: '', email: '', password: '' });
    } catch (error: any) {
      setMessage(error.response?.data?.message || t('error'));
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="form-register">
      <h2>{t('register')}</h2>

      <label>
        {t('name')}:
        <input name="name" type="text" value={form.name} onChange={onChange} required />
      </label>

      <label>
        {t('email')}:
        <input name="email" type="email" value={form.email} onChange={onChange} required />
      </label>

      <label>
        {t('password')}:
        <input name="password" type="password" value={form.password} onChange={onChange} required minLength={6} />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? t('loading') : t('submit')}
      </button>

      {message && <p role="alert">{message}</p>}
    </form>
  );
};

export default Register;
