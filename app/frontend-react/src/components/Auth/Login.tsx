"use client";

import React, { useState } from 'react';
import { loginUser } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
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
      const res = await loginUser(form);

      if (res?.data) {
        login(res.data);
        navigate('/products', { replace: true }); // Redirect and replace history
      } else {
        setMessage(t('error'));
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
   <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '1rem',
    boxSizing: 'border-box',
  }}
>
  <form
    onSubmit={handleSubmit}
    aria-label="form-login"
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '400px',
      gap: '1rem',
      backgroundColor: '#f9f9f9',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}
  >
    <h2 style={{ textAlign: 'center' }}>{t('login')}</h2>

    <label style={{ display: 'flex', flexDirection: 'column', fontWeight: '600' }}>
      {t('email')}:
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        required
        style={{ padding: '0.5rem', fontSize: '1rem', marginTop: '0.25rem' }}
      />
    </label>

    <label style={{ display: 'flex', flexDirection: 'column', fontWeight: '600' }}>
      {t('password')}:
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
        required
        minLength={6}
        style={{ padding: '0.5rem', fontSize: '1rem', marginTop: '0.25rem' }}
      />
    </label>

    <button
      type="submit"
      disabled={loading}
      style={{
        padding: '0.75rem',
        fontSize: '1rem',
        fontWeight: '700',
        cursor: loading ? 'not-allowed' : 'pointer',
        backgroundColor: loading ? '#ccc' : '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      {loading ? t('loading') : t('submit')}
    </button>

    {message && (
      <p role="alert" style={{ color: 'red', textAlign: 'center', marginTop: '0.5rem' }}>
        {message}
      </p>
    )}
  </form>

  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
    <Link to="/register">{t('createAccount')}</Link> |{' '}
    <Link to="/forgot">{t('forgotPassword')}</Link>
  </div>
</div>

  );
};

export default Login;
