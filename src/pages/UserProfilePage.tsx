import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, CreditCard, Bell, Settings, Shield, Camera } from 'lucide-react';

const UserProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('personal');
  
  // Mock user data
  const user = {
    name: "Abdullah Al-Saud",
    email: "abdullah@example.com",
    phone: "+966 50 123 4567",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    verificationStatus: "verified",
    joinDate: "January 2023",
    preferredLanguage: "ar",
    notifications: {
      email: true,
      sms: true,
      push: false
    },
    paymentMethods: [
      {
        type: "card",
        last4: "4242",
        brand: "Visa",
        expiryMonth: "12",
        expiryYear: "2025"
      }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              <div className="ml-6 rtl:mr-6 rtl:ml-0">
                <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                <p className="text-gray-600 mb-2">Member since {user.joinDate}</p>
                <div className="flex items-center text-sm text-primary-500">
                  <Shield size={16} className="mr-1 rtl:ml-1 rtl:mr-0" />
                  <span>Verified User</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('personal')}
                className={`flex items-center px-6 py-4 text-sm font-medium ${
                  activeTab === 'personal'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <User size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                {t('profile.personalInfo')}
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`flex items-center px-6 py-4 text-sm font-medium ${
                  activeTab === 'payment'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <CreditCard size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                {t('profile.paymentMethods')}
              </button>
              <button
                onClick={() => setActiveTab('preferences')}
                className={`flex items-center px-6 py-4 text-sm font-medium ${
                  activeTab === 'preferences'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Settings size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                {t('profile.preferences')}
              </button>
            </div>

            <div className="p-6">
              {/* Personal Information */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      className="input"
                      onChange={() => {}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      className="input"
                      onChange={() => {}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={user.phone}
                      className="input"
                      onChange={() => {}}
                    />
                  </div>
                  <button className="btn btn-primary">
                    {t('profile.saveChanges')}
                  </button>
                </div>
              )}

              {/* Payment Methods */}
              {activeTab === 'payment' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Saved Payment Methods</h3>
                    {user.paymentMethods.map((method, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg mb-4">
                        <div className="flex items-center">
                          <CreditCard size={24} className="text-gray-400 mr-4 rtl:ml-4 rtl:mr-0" />
                          <div>
                            <p className="font-medium">{method.brand} •••• {method.last4}</p>
                            <p className="text-sm text-gray-500">Expires {method.expiryMonth}/{method.expiryYear}</p>
                          </div>
                        </div>
                        <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-outline">
                    Add New Payment Method
                  </button>
                </div>
              )}

              {/* Preferences */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={user.notifications.email}
                          onChange={() => {}}
                          className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 rtl:mr-2 rtl:ml-0">Email Notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={user.notifications.sms}
                          onChange={() => {}}
                          className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 rtl:mr-2 rtl:ml-0">SMS Notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={user.notifications.push}
                          onChange={() => {}}
                          className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 rtl:mr-2 rtl:ml-0">Push Notifications</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Language Preference</h3>
                    <select
                      value={user.preferredLanguage}
                      onChange={() => {}}
                      className="select"
                    >
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>
                  <button className="btn btn-primary">
                    {t('profile.saveChanges')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;