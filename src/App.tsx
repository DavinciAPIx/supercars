import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// Layout components
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CarDetailsPage from './pages/CarDetailsPage';
import UserProfilePage from './pages/UserProfilePage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import RenterDashboardPage from './pages/RenterDashboardPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="cars/:id" element={<CarDetailsPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="owner-dashboard" element={<OwnerDashboardPage />} />
            <Route path="renter-dashboard" element={<RenterDashboardPage />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;