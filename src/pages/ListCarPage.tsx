import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Car, MapPin, DollarSign, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const ListCarPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    type: '',
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    mileage: 0,
    color: '',
    features: [] as string[],
    dailyRate: 0,
    location: '',
    description: ''
  });

  const carTypes = [
    'Sedan',
    'SUV',
    'Sports',
    'Luxury',
    'Economy',
    'Pickup'
  ];

  const features = [
    'GPS',
    'Bluetooth',
    'Leather Seats',
    'Sunroof',
    'Backup Camera',
    'Parking Sensors',
    'Premium Sound',
    'Smart Key',
    'Climate Control',
    'All-wheel Drive'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real implementation, this would handle file upload to Supabase storage
      // For now, we'll use placeholder URLs
      const newImages = Array.from(files).map(() => 
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      );
      setImages([...images, ...newImages]);
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // In a real implementation, this would create a car listing in Supabase
      // and upload images to storage
      navigate('/owner-dashboard');
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">List Your Car</h1>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 relative ${
                  s !== 3 ? 'after:content-[""] after:h-1 after:w-full after:absolute after:top-4 after:left-1/2 after:bg-gray-200' : ''
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                      s <= step ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s}
                  </div>
                  <span className="mt-2 text-sm text-gray-500">
                    {s === 1 ? 'Car Details' : s === 2 ? 'Photos' : 'Pricing & Location'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Car Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Make
                      </label>
                      <input
                        type="text"
                        required
                        className="input"
                        value={formData.make}
                        onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Model
                      </label>
                      <input
                        type="text"
                        required
                        className="input"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <input
                        type="number"
                        required
                        min="1900"
                        max={new Date().getFullYear()}
                        className="input"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        required
                        className="select"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      >
                        <option value="">Select type</option>
                        {carTypes.map((type) => (
                          <option key={type} value={type.toLowerCase()}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transmission
                      </label>
                      <select
                        required
                        className="select"
                        value={formData.transmission}
                        onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                      >
                        <option value="automatic">Automatic</option>
                        <option value="manual">Manual</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fuel Type
                      </label>
                      <select
                        required
                        className="select"
                        value={formData.fuelType}
                        onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                      >
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Seats
                      </label>
                      <input
                        type="number"
                        required
                        min="2"
                        max="10"
                        className="input"
                        value={formData.seats}
                        onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mileage (km)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        className="input"
                        value={formData.mileage}
                        onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      type="text"
                      required
                      className="input"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Features
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {features.map((feature) => (
                        <label key={feature} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.features.includes(feature)}
                            onChange={() => handleFeatureToggle(feature)}
                            className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                          />
                          <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-700">
                            {feature}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Photos */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                      <div className="text-sm text-gray-600 mb-4">
                        Upload high-quality photos of your car
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        id="car-photos"
                        onChange={handleImageUpload}
                      />
                      <label
                        htmlFor="car-photos"
                        className="btn btn-primary inline-flex items-center"
                      >
                        <Upload size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                        Upload Photos
                      </label>
                    </div>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Car photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {images.length === 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex">
                        <AlertCircle size={24} className="text-yellow-400 mr-3 rtl:ml-3 rtl:mr-0" />
                        <div>
                          <h3 className="text-sm font-medium text-yellow-800">
                            Photos Required
                          </h3>
                          <p className="mt-1 text-sm text-yellow-700">
                            Please upload at least one photo of your car.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Pricing & Location */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Daily Rate (SAR)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-3 rtl:pr-3 rtl:pl-0 flex items-center pointer-events-none">
                        <DollarSign size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="number"
                        required
                        min="0"
                        className="input pl-10 rtl:pr-10 rtl:pl-3"
                        value={formData.dailyRate}
                        onChange={(e) => setFormData({ ...formData, dailyRate: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-3 rtl:pr-3 rtl:pl-0 flex items-center pointer-events-none">
                        <MapPin size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="City, District"
                        className="input pl-10 rtl:pr-10 rtl:pl-3"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="input"
                      placeholder="Describe your car and any special features..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="btn btn-outline"
                  >
                    Previous
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="btn btn-primary ml-auto rtl:mr-auto rtl:ml-0"
                    disabled={step === 2 && images.length === 0}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary ml-auto rtl:mr-auto rtl:ml-0"
                  >
                    List Your Car
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCarPage;