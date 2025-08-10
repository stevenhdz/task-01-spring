"use client";

import React, { useState, useEffect } from 'react';
import { resetPassword } from '../../api/auth';
import { useTranslation } from 'react-i18next';

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setToken(urlParams.get('token') || '');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await resetPassword(token, newPassword);
      setMessage(`${t('success')}: ${t('resetPassword')}`);
      setNewPassword('');
    } catch (error: any) {
      setMessage(error.response?.data?.message || t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="form-reset-password">
      <h2>{t('resetPassword')}</h2>

      <label>
        Token:
        <input type="text" value={token} disabled />
      </label>

      <label>
        {t('password')}:
        <input
          name="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={6}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? t('loading') : t('submit')}
      </button>

      {message && <p role="alert">{message}</p>}
    </form>
  );
};

export default ResetPassword;
