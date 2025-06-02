import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Car, DollarSign, Calendar, Plus, Star, MapPin, Settings, AlertCircle } from 'lucide-react';

const OwnerDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'cars' | 'bookings' | 'earnings'>('cars');

  // Mock data
  const myCars = [
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2023,
      status: "available",
      earnings: 2400,
      bookings: 8,
      rating: 4.8,
      image: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      make: "BMW",
      model: "3 Series",
      year: 2022,
      status: "rented",
      earnings: 3600,
      bookings: 12,
      rating: 4.9,
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const bookingRequests = [
    {
      id: 1,
      car: "Toyota Camry",
      renter: "Ahmed",
      startDate: "2025-03-15",
      endDate: "2025-03-18",
      status: "pending",
      amount: 900
    },
    {
      id: 2,
      car: "BMW 3 Series",
      renter: "Mohammed",
      startDate: "2025-03-20",
      endDate: "2025-03-25",
      status: "approved",
      amount: 2250
    }
  ];

  const earnings = {
    total: 6000,
    thisMonth: 2400,
    pending: 900,
    chart: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [1200, 1500, 2000, 1800, 2400, 2100]
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('dashboard.owner.title')}</h1>
          <Link 
            to="/owner/add-car" 
            className="btn btn-primary flex items-center"
          >
            <Plus size={20} className="mr-2 rtl:ml-2 rtl:mr-0" />
            {t('dashboard.owner.addCar')}
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-primary-500 text-white">
            <div className="flex items-start justify-between p-6">
              <div>
                <p className="text-white/80 mb-1">Total Earnings</p>
                <h3 className="text-3xl font-bold">{earnings.total} SAR</h3>
                <p className="text-white/80 text-sm mt-2">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <DollarSign size={24} />
              </div>
            </div>
          </div>

          <div className="card bg-secondary-400">
            <div className="flex items-start justify-between p-6">
              <div>
                <p className="text-gray-800/80 mb-1">Active Bookings</p>
                <h3 className="text-3xl font-bold text-gray-900">5</h3>
                <p className="text-gray-800/80 text-sm mt-2">2 pending requests</p>
              </div>
              <div className="w-12 h-12 bg-gray-800/10 rounded-full flex items-center justify-center">
                <Calendar size={24} className="text-gray-800" />
              </div>
            </div>
          </div>

          <div className="card bg-accent-500 text-white">
            <div className="flex items-start justify-between p-6">
              <div>
                <p className="text-white/80 mb-1">Listed Cars</p>
                <h3 className="text-3xl font-bold">2</h3>
                <p className="text-white/80 text-sm mt-2">1 currently rented</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Car size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'cars'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('cars')}
            >
              <Car size={20} className="inline-block mr-2 rtl:ml-2 rtl:mr-0" />
              {t('dashboard.owner.cars')}
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'bookings'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              <Calendar size={20} className="inline-block mr-2 rtl:ml-2 rtl:mr-0" />
              {t('dashboard.owner.bookings')}
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'earnings'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('earnings')}
            >
              <DollarSign size={20} className="inline-block mr-2 rtl:ml-2 rtl:mr-0" />
              {t('dashboard.owner.earnings')}
            </button>
          </div>

          <div className="p-6">
            {/* My Cars Tab */}
            {activeTab === 'cars' && (
              <div className="space-y-6">
                {myCars.map((car) => (
                  <div key={car.id} className="flex flex-col md:flex-row items-center bg-gray-50 rounded-lg p-4 gap-4">
                    <img 
                      src={car.image} 
                      alt={`${car.make} ${car.model}`} 
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold">{car.make} {car.model}</h3>
                          <p className="text-gray-600">{car.year}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          car.status === 'available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Total Earnings</p>
                          <p className="font-bold">{car.earnings} SAR</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Bookings</p>
                          <p className="font-bold">{car.bookings}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Rating</p>
                          <div className="flex items-center">
                            <Star size={16} className="text-yellow-500 fill-current" />
                            <span className="font-bold ml-1 rtl:mr-1 rtl:ml-0">{car.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2">
                      <button className="btn btn-outline py-2 px-4 flex items-center">
                        <Settings size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                        Manage
                      </button>
                      <button className="btn btn-primary py-2 px-4 flex items-center">
                        <MapPin size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                        Track
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Booking Requests Tab */}
            {activeTab === 'bookings' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left rtl:text-right">
                      <th className="pb-4 font-medium text-gray-500">Car</th>
                      <th className="pb-4 font-medium text-gray-500">Renter</th>
                      <th className="pb-4 font-medium text-gray-500">Dates</th>
                      <th className="pb-4 font-medium text-gray-500">Amount</th>
                      <th className="pb-4 font-medium text-gray-500">Status</th>
                      <th className="pb-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingRequests.map((booking) => (
                      <tr key={booking.id} className="border-t border-gray-200">
                        <td className="py-4">{booking.car}</td>
                        <td className="py-4">{booking.renter}</td>
                        <td className="py-4">
                          {booking.startDate} - {booking.endDate}
                        </td>
                        <td className="py-4">{booking.amount} SAR</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <button className="btn btn-primary py-1 px-3 text-sm">
                              View Details
                            </button>
                            {booking.status === 'pending' && (
                              <>
                                <button className="btn bg-green-500 hover:bg-green-600 text-white py-1 px-3 text-sm">
                                  Approve
                                </button>
                                <button className="btn bg-red-500 hover:bg-red-600 text-white py-1 px-3 text-sm">
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === 'earnings' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="card">
                    <div className="p-6">
                      <h4 className="text-lg font-bold mb-2">Total Earnings</h4>
                      <p className="text-3xl font-bold text-primary-500">{earnings.total} SAR</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="p-6">
                      <h4 className="text-lg font-bold mb-2">This Month</h4>
                      <p className="text-3xl font-bold text-primary-500">{earnings.thisMonth} SAR</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="p-6">
                      <h4 className="text-lg font-bold mb-2">Pending Payments</h4>
                      <p className="text-3xl font-bold text-primary-500">{earnings.pending} SAR</p>
                    </div>
                  </div>
                </div>

                {/* Earnings Chart Placeholder */}
                <div className="card p-6">
                  <h4 className="text-lg font-bold mb-4">Earnings Overview</h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart will be implemented here</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alerts and Notifications */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex">
            <AlertCircle size={24} className="text-yellow-400 mr-3 rtl:ml-3 rtl:mr-0" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
              <p className="mt-1 text-sm text-yellow-700">
                Please complete your insurance verification to continue receiving bookings.
              </p>
              <button className="mt-2 text-sm font-medium text-yellow-800 hover:text-yellow-900">
                Complete Verification →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardPage;