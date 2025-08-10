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
    <div>
      <form onSubmit={handleSubmit} aria-label="form-login">
        <h2>{t('login')}</h2>

        <label>
          {t('email')}:
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>

        <label>
          {t('password')}:
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            minLength={6}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? t('loading') : t('submit')}
        </button>

        {message && <p role="alert">{message}</p>}
      </form>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/register">{t('createAccount')}</Link> |{' '}
        <Link to="/forgot">{t('forgotPassword')}</Link>
      </div>
    </div>
  );
};

export default Login;
