import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Camera, Upload, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(1); // 1: login/signup, 2: verification
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Verification states
  const [idUploaded, setIdUploaded] = useState(false);
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  
  useEffect(() => {
    // Check if signup parameter is in the URL
    const params = new URLSearchParams(location.search);
    const signupParam = params.get('signup');
    setIsSignUp(signupParam === 'true');

    // Redirect if already authenticated
    if (user) {
      navigate('/');
    }
  }, [location, user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await signUp(email, password, fullName, phoneNumber);
        setStep(2);
      } else {
        await signIn(email, password);
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!user) throw new Error('No user found');

      // Create verification documents records
      const { error: verificationError } = await supabase
        .from('verification_documents')
        .insert([
          {
            user_id: user.id,
            document_type: 'id_card',
            document_url: 'placeholder-url',
            status: 'pending'
          },
          {
            user_id: user.id,
            document_type: 'driving_license',
            document_url: 'placeholder-url',
            status: 'pending'
          },
          {
            user_id: user.id,
            document_type: 'selfie',
            document_url: 'placeholder-url',
            status: 'pending'
          }
        ]);

      if (verificationError) throw verificationError;

      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpload = async (type: 'id' | 'license' | 'selfie') => {
    // In a real implementation, this would handle file upload to Supabase storage
    // For now, we'll simulate the upload
    setTimeout(() => {
      if (type === 'id') setIdUploaded(true);
      if (type === 'license') setLicenseUploaded(true);
      if (type === 'selfie') setSelfieUploaded(true);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-heading font-bold text-primary-500">
            {t('general.appName')}
          </span>
        </Link>
        
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          {step === 1 
            ? (isSignUp ? t('auth.signup') : t('auth.login'))
            : t('auth.verification.title')
          }
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {step === 1 ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  <div>
                    <label htmlFor="fullName\" className="block text-sm font-medium text-gray-700">
                      {t('auth.fullName')}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-3 rtl:pr-3 rtl:pl-0 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        className="block w-full pl-10 rtl:pr-10 rtl:pl-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      {t('auth.phoneNumber')}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-3 rtl:pr-3 rtl:pl-0 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        required
                        className="block w-full pl-10 rtl:pr-10 rtl:pl-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('auth.email')}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-3 rtl:pr-3 rtl:pl-0 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 rtl:pr-10 rtl:pl-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t('auth.password')}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-3 rtl:pr-3 rtl:pl-0 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    required
                    className="block w-full pl-10 rtl:pr-10 rtl:pl-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              {isSignUp && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    {t('auth.confirmPassword')}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-3 rtl:pr-3 rtl:pl-0 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="block w-full pl-10 rtl:pr-10 rtl:pl-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary-500 hover:text-primary-600">
                      {t('auth.forgotPassword')}
                    </a>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : (isSignUp ? t('auth.signup') : t('auth.login'))}
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerificationSubmit}>
              <p className="text-sm text-gray-600 mb-6">
                {t('auth.verification.instructions')}
              </p>
              
              <div className="space-y-4">
                <div className="border border-gray-300 rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Camera className="h-5 w-5 text-gray-400 mr-2 rtl:ml-2 rtl:mr-0" />
                      <span className="text-sm font-medium">{t('auth.verification.idCard')}</span>
                    </div>
                    {idUploaded && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUpload('id')}
                    className={`w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
                      idUploaded ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    disabled={idUploaded}
                  >
                    <Upload className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {idUploaded ? 'Uploaded' : t('auth.verification.upload')}
                  </button>
                </div>
                
                <div className="border border-gray-300 rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Camera className="h-5 w-5 text-gray-400 mr-2 rtl:ml-2 rtl:mr-0" />
                      <span className="text-sm font-medium">{t('auth.verification.drivingLicense')}</span>
                    </div>
                    {licenseUploaded && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUpload('license')}
                    className={`w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
                      licenseUploaded ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    disabled={licenseUploaded}
                  >
                    <Upload className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {licenseUploaded ? 'Uploaded' : t('auth.verification.upload')}
                  </button>
                </div>
                
                <div className="border border-gray-300 rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Camera className="h-5 w-5 text-gray-400 mr-2 rtl:ml-2 rtl:mr-0" />
                      <span className="text-sm font-medium">{t('auth.verification.selfie')}</span>
                    </div>
                    {selfieUploaded && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUpload('selfie')}
                    className={`w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
                      selfieUploaded ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    disabled={selfieUploaded}
                  >
                    <Upload className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {selfieUploaded ? 'Uploaded' : t('auth.verification.upload')}
                  </button>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading || !(idUploaded && licenseUploaded && selfieUploaded)}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    idUploaded && licenseUploaded && selfieUploaded && !loading
                      ? 'bg-primary-500 hover:bg-primary-600 focus:ring-primary-500'
                      : 'bg-gray-400 cursor-not-allowed'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                  {loading ? 'Loading...' : t('auth.verification.submit')}
                </button>
              </div>
            </form>
          )}
          
          {step === 1 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {isSignUp ? t('auth.hasAccount') : t('auth.noAccount')}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {isSignUp ? t('auth.login') : t('auth.signup')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;