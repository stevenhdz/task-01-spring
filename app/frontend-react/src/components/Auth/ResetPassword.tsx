import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../../api/auth';
import { useTranslation } from 'react-i18next';

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token') || '';
    setToken(tokenFromUrl);
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage(t('error') + ': Token missing');
      return;
    }

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
