"use client";

import React, { useState } from 'react';
import { forgotPassword } from '../../api/auth';
import { useTranslation } from 'react-i18next';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await forgotPassword(email);
      setMessage(t('success') + ': ' + t('forgotPassword'));
      setEmail('');
    } catch (error: any) {
      setMessage(error.response?.data?.message || t('error'));
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="form-forgot-password">
      <h2>{t('forgotPassword')}</h2>

      <label>
        {t('email')}:
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? t('loading') : t('submit')}
      </button>

      {message && <p role="alert">{message}</p>}
    </form>
  );
};

export default ForgotPassword;
