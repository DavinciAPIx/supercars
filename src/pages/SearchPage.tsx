import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ChevronDown, Search, Sliders, Star } from 'lucide-react';

const SearchPage: React.FC = () => {
  const { t } = useTranslation();
  const [priceRange, setPriceRange] = useState([100, 1000]);
  const [activeFilters, setActiveFilters] = useState(false);
  
  // Mock car data
  const cars = [
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2023,
      type: "Sedan",
      dailyRate: 300,
      location: "Riyadh",
      rating: 4.8,
      reviewCount: 24,
      image: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: ["Automatic", "5 Seats", "Bluetooth", "GPS"]
    },
    {
      id: 2,
      make: "BMW",
      model: "3 Series",
      year: 2022,
      type: "Sports Sedan",
      dailyRate: 450,
      location: "Jeddah",
      rating: 4.9,
      reviewCount: 16,
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: ["Automatic", "5 Seats", "Leather Seats", "Sunroof"]
    },
    {
      id: 3,
      make: "Range Rover",
      model: "Sport",
      year: 2023,
      type: "Luxury SUV",
      dailyRate: 600,
      location: "Dammam",
      rating: 4.7,
      reviewCount: 12,
      image: "https://images.pexels.com/photos/7459425/pexels-photo-7459425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: ["Automatic", "7 Seats", "All-wheel Drive", "Premium Sound"]
    },
    {
      id: 4,
      make: "Mercedes-Benz",
      model: "E-Class",
      year: 2022,
      type: "Luxury Sedan",
      dailyRate: 500,
      location: "Riyadh",
      rating: 4.9,
      reviewCount: 18,
      image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: ["Automatic", "5 Seats", "Leather Interior", "Smart Features"]
    },
    {
      id: 5,
      make: "Nissan",
      model: "Patrol",
      year: 2023,
      type: "Large SUV",
      dailyRate: 550,
      location: "Mecca",
      rating: 4.8,
      reviewCount: 14,
      image: "https://images.pexels.com/photos/14261357/pexels-photo-14261357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: ["Automatic", "7 Seats", "4WD", "Towing Package"]
    },
    {
      id: 6,
      make: "Lexus",
      model: "ES",
      year: 2022,
      type: "Luxury Sedan",
      dailyRate: 400,
      location: "Jeddah",
      rating: 4.6,
      reviewCount: 10,
      image: "https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: ["Automatic", "5 Seats", "Premium Sound", "Navigation"]
    }
  ];

  const handleFilterToggle = () => {
    setActiveFilters(!activeFilters);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('search.title')}</h1>
        
        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none">
                <MapPin size={20} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 rtl:pr-10 rtl:pl-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" 
                placeholder={t('search.filters.location')}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none">
                <Calendar size={20} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 rtl:pr-10 rtl:pl-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" 
                placeholder={t('search.filters.dates')}
              />
            </div>
            
            <div className="relative">
              <select className="block w-full py-3 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 appearance-none">
                <option value="">{t('search.filters.carType')}</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="sports">Sports</option>
                <option value="luxury">Luxury</option>
                <option value="economy">Economy</option>
              </select>
              <div className="absolute inset-y-0 right-0 rtl:left-0 rtl:right-auto flex items-center pr-3 rtl:pl-3 rtl:pr-0 pointer-events-none">
                <ChevronDown size={20} className="text-gray-400" />
              </div>
            </div>
            
            <button 
              className="btn btn-primary py-3 flex items-center justify-center"
            >
              <Search size={20} className="mr-2 rtl:ml-2 rtl:mr-0" />
              {t('search.filters.search')}
            </button>
          </div>
          
          <div className="mt-4 flex items-center">
            <button 
              onClick={handleFilterToggle}
              className="flex items-center text-primary-500 font-medium"
            >
              <Sliders size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
              More Filters
              <ChevronDown 
                size={18} 
                className={`ml-1 rtl:mr-1 rtl:ml-0 transition-transform ${activeFilters ? 'rotate-180' : ''}`} 
              />
            </button>
          </div>
          
          {activeFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('search.filters.price')}
                </label>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <input 
                    type="range" 
                    min="100" 
                    max="1000" 
                    step="50" 
                    value={priceRange[0]} 
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <span>{priceRange[0]} SAR</span>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse mt-2">
                  <input 
                    type="range" 
                    min="100" 
                    max="1000" 
                    step="50" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <span>{priceRange[1]} SAR</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('search.filters.features')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                    <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-700">GPS</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                    <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-700">Bluetooth</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                    <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-700">Leather Seats</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                    <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-700">Sunroof</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('search.sort.label')}
                </label>
                <select className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
                  <option value="recommended">{t('search.sort.recommended')}</option>
                  <option value="price_asc">{t('search.sort.priceAsc')}</option>
                  <option value="price_desc">{t('search.sort.priceDesc')}</option>
                  <option value="rating">{t('search.sort.rating')}</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">{cars.length} cars found</p>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-gray-600 text-sm">{t('search.sort.label')}:</span>
            <select className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
              <option value="recommended">{t('search.sort.recommended')}</option>
              <option value="price_asc">{t('search.sort.priceAsc')}</option>
              <option value="price_desc">{t('search.sort.priceDesc')}</option>
              <option value="rating">{t('search.sort.rating')}</option>
            </select>
          </div>
        </div>
        
        {/* Car Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="card overflow-hidden group">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={car.image} 
                  alt={`${car.make} ${car.model}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto bg-white rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{car.make} {car.model}</h3>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="ml-1 rtl:mr-1 rtl:ml-0 text-gray-700">{car.rating}</span>
                  </div>
                </div>
                <p className="text-gray-500 mb-4">{car.type}, {car.year}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl font-bold text-primary-500">{car.dailyRate} SAR</span>
                    <span className="text-gray-500 text-sm"> / day</span>
                  </div>
                  <Link to={`/cars/${car.id}`} className="btn btn-primary py-2">
                    {t('carDetails.bookNow')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;