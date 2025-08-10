import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import ForgotPassword from '../components/Auth/ForgotPassword';
import ResetPassword from '../components/Auth/ResetPassword';
import ProductsPage from './ProductsPage';
import { useLanguage } from '../hooks/useLanguage';
import PrivateRoute from '../components/Auth/PrivateRoute';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { changeLanguage, currentLanguage } = useLanguage();
  const { token, logout } = useAuth();

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <select
        aria-label={t('header.changeLanguage')}
        value={currentLanguage}
        onChange={e => changeLanguage(e.target.value)}
        style={{ marginRight: '1rem' }}
      >
        <option value="pt">{t('languages.portuguese')}</option>
        <option value="es">{t('languages.spanish')}</option>
        <option value="en">{t('languages.english')}</option>
      </select>

      {token ? (
        <nav style={{ display: 'inline-flex', gap: '1rem' }}>
          <Link to="/products">{t('header.products')}</Link>
          <button onClick={logout}>{t('header.logout')}</button>
        </nav>
      ) : (
        <nav style={{ display: 'inline-flex', gap: '1rem' }}>
          <Link to="/register">{t('header.register')}</Link>
        </nav>
      )}
    </header>
  );
};

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <Router>
        <Header />

        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/reset" element={<ResetPassword />} />

            {/* Rutas privadas */}
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <ProductsPage />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<h2>{t('app.pageNotFound')}</h2>} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
