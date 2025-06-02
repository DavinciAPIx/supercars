import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, Star, MapPin, Clock, AlertCircle } from 'lucide-react';

const RenterDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'favorites'>('upcoming');

  // Mock data
  const upcomingTrips = [
    {
      id: 1,
      car: {
        make: "BMW",
        model: "3 Series",
        year: 2022,
        image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      startDate: "2025-03-15",
      endDate: "2025-03-18",
      location: "Riyadh",
      status: "confirmed",
      totalPrice: 1350
    }
  ];

  const pastTrips = [
    {
      id: 1,
      car: {
        make: "Toyota",
        model: "Camry",
        year: 2023,
        image: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      startDate: "2025-02-10",
      endDate: "2025-02-12",
      location: "Jeddah",
      status: "completed",
      totalPrice: 900,
      rating: 5
    }
  ];

  const favoriteCars = [
    {
      id: 1,
      make: "Range Rover",
      model: "Sport",
      year: 2023,
      type: "Luxury SUV",
      dailyRate: 600,
      location: "Riyadh",
      rating: 4.8,
      image: "https://images.pexels.com/photos/7459425/pexels-photo-7459425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('dashboard.renter.title')}</h1>

        {/* Upcoming Trip Alert */}
        {upcomingTrips.length > 0 && (
          <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-md mb-8">
            <div className="flex">
              <AlertCircle size={24} className="text-primary-500 mr-3 rtl:ml-3 rtl:mr-0" />
              <div>
                <h3 className="text-sm font-medium text-primary-800">Upcoming Trip</h3>
                <p className="mt-1 text-sm text-primary-700">
                  Your next trip with {upcomingTrips[0].car.make} {upcomingTrips[0].car.model} starts on {upcomingTrips[0].startDate}
                </p>
                <Link 
                  to={`/trips/${upcomingTrips[0].id}`}
                  className="mt-2 text-sm font-medium text-primary-800 hover:text-primary-900"
                >
                  View Trip Details →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'upcoming'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('dashboard.renter.upcomingTrips')}
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'past'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('dashboard.renter.pastTrips')}
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'favorites'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('dashboard.renter.favorites')}
            </button>
          </div>

          <div className="p-6">
            {/* Upcoming Trips */}
            {activeTab === 'upcoming' && (
              <div className="space-y-6">
                {upcomingTrips.map((trip) => (
                  <div key={trip.id} className="flex flex-col md:flex-row items-center bg-gray-50 rounded-lg p-4 gap-4">
                    <img 
                      src={trip.car.image} 
                      alt={`${trip.car.make} ${trip.car.model}`} 
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold">{trip.car.make} {trip.car.model}</h3>
                          <p className="text-gray-600">{trip.car.year}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center">
                          <Calendar size={18} className="text-gray-400 mr-2 rtl:ml-2 rtl:mr-0" />
                          <div>
                            <p className="text-sm text-gray-500">Dates</p>
                            <p className="font-medium">{trip.startDate} - {trip.endDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <MapPin size={18} className="text-gray-400 mr-2 rtl:ml-2 rtl:mr-0" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{trip.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2">
                      <Link 
                        to={`/trips/${trip.id}`}
                        className="btn btn-primary py-2 px-4"
                      >
                        View Details
                      </Link>
                      <button className="btn btn-outline py-2 px-4">
                        Contact Owner
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Past Trips */}
            {activeTab === 'past' && (
              <div className="space-y-6">
                {pastTrips.map((trip) => (
                  <div key={trip.id} className="flex flex-col md:flex-row items-center bg-gray-50 rounded-lg p-4 gap-4">
                    <img 
                      src={trip.car.image} 
                      alt={`${trip.car.make} ${trip.car.model}`} 
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold">{trip.car.make} {trip.car.model}</h3>
                          <p className="text-gray-600">{trip.car.year}</p>
                        </div>
                        <div className="flex items-center">
                          <Star size={16} className="text-yellow-500 fill-current" />
                          <span className="ml-1 rtl:mr-1 rtl:ml-0 font-medium">{trip.rating}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center">
                          <Calendar size={18} className="text-gray-400 mr-2 rtl:ml-2 rtl:mr-0" />
                          <div>
                            <p className="text-sm text-gray-500">Dates</p>
                            <p className="font-medium">{trip.startDate} - {trip.endDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <MapPin size={18} className="text-gray-400 mr-2 rtl:ml-2 rtl:mr-0" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{trip.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2">
                      <Link 
                        to={`/trips/${trip.id}`}
                        className="btn btn-outline py-2 px-4"
                      >
                        View Details
                      </Link>
                      <button className="btn btn-primary py-2 px-4">
                        Book Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Favorite Cars */}
            {activeTab === 'favorites' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCars.map((car) => (
                  <div key={car.id} className="card overflow-hidden group">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={car.image} 
                        alt={`${car.make} ${car.model}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button className="absolute top-4 right-4 rtl:left-4 rtl:right-auto bg-white rounded-full p-2">
                        <Star size={20} className="text-yellow-500 fill-current" />
                      </button>
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
                      <div className="flex items-center mb-4">
                        <MapPin size={16} className="text-gray-400 mr-2 rtl:ml-2 rtl:mr-0" />
                        <span className="text-gray-600">{car.location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xl font-bold text-primary-500">{car.dailyRate} SAR</span>
                          <span className="text-gray-500 text-sm"> / day</span>
                        </div>
                        <Link to={`/cars/${car.id}`} className="btn btn-primary py-2">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenterDashboardPage;