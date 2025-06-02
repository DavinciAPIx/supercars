import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, User, ChevronDown, Globe } from 'lucide-react';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = false; // This would come from your auth context

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-heading font-bold text-primary-500">
              {t('general.appName')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <Link
              to="/"
              className={`text-sm font-medium ${
                location.pathname === '/' ? 'text-primary-500' : 'text-gray-600 hover:text-primary-500'
              } transition-colors`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/search"
              className={`text-sm font-medium ${
                location.pathname === '/search' ? 'text-primary-500' : 'text-gray-600 hover:text-primary-500'
              } transition-colors`}
            >
              {t('nav.search')}
            </Link>
            <Link
              to="/#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-primary-500 transition-colors"
            >
              {t('nav.howItWorks')}
            </Link>
            <Link
              to="/owner"
              className="text-sm font-medium text-gray-600 hover:text-primary-500 transition-colors"
            >
              {t('nav.becomeOwner')}
            </Link>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 hover:text-primary-500 transition-colors flex items-center"
            >
              <Globe size={16} className="mr-1 rtl:ml-1 rtl:mr-0" />
              <span className="text-sm">
                {i18n.language === 'en' ? t('general.switchToArabic') : t('general.switchToEnglish')}
              </span>
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-primary-500"
                >
                  <div className="w-8 h-8 bg-secondary-400 rounded-full flex items-center justify-center">
                    <User size={16} className="text-gray-800" />
                  </div>
                  <ChevronDown size={16} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {t('nav.profile')}
                    </Link>
                    <Link
                      to="/owner-dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {t('nav.dashboard')}
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        // Logout logic
                        setIsUserMenuOpen(false);
                      }}
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Link to="/auth" className="text-sm font-medium text-gray-600 hover:text-primary-500">
                  {t('nav.login')}
                </Link>
                <Link to="/auth?signup=true" className="btn btn-primary text-sm">
                  {t('nav.signup')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-primary-500 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md pb-4 px-4 slide-in">
          <nav className="flex flex-col space-y-4 pt-2">
            <Link
              to="/"
              className={`text-base font-medium ${
                location.pathname === '/' ? 'text-primary-500' : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/search"
              className={`text-base font-medium ${
                location.pathname === '/search' ? 'text-primary-500' : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.search')}
            </Link>
            <Link
              to="/#how-it-works"
              className="text-base font-medium text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.howItWorks')}
            </Link>
            <Link
              to="/owner"
              className="text-base font-medium text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.becomeOwner')}
            </Link>

            <div className="border-t border-gray-200 pt-4 mt-2">
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="text-base font-medium text-gray-600 flex items-center"
              >
                <Globe size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                {i18n.language === 'en' ? t('general.switchToArabic') : t('general.switchToEnglish')}
              </button>
            </div>

            {!isAuthenticated && (
              <div className="flex flex-col space-y-2 pt-2">
                <Link
                  to="/auth"
                  className="btn btn-outline w-full justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/auth?signup=true"
                  className="btn btn-primary w-full justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col space-y-4">
                <Link
                  to="/profile"
                  className="text-base font-medium text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.profile')}
                </Link>
                <Link
                  to="/owner-dashboard"
                  className="text-base font-medium text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.dashboard')}
                </Link>
                <button
                  className="text-base font-medium text-gray-600 text-left"
                  onClick={() => {
                    // Logout logic
                    setIsMenuOpen(false);
                  }}
                >
                  {t('nav.logout')}
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;