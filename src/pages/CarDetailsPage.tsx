import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Shield, 
  Zap, 
  CheckCircle, 
  Car, 
  Settings, 
  Fuel
} from 'lucide-react';

const CarDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  // Mock car data
  const car = {
    id: 1,
    make: "Range Rover",
    model: "Sport",
    year: 2023,
    type: "Luxury SUV",
    dailyRate: 600,
    location: {
      city: "Riyadh",
      district: "Al Olaya",
      latitude: 24.774265,
      longitude: 46.738586
    },
    owner: {
      id: "user123",
      name: "Abdullah Al-Saud",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 4.9,
      responseTime: "within an hour",
      verified: true,
      joinedDate: "2022-01-15"
    },
    rating: 4.8,
    reviewCount: 24,
    images: [
      "https://images.pexels.com/photos/7459425/pexels-photo-7459425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/9089358/pexels-photo-9089358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/9089357/pexels-photo-9089357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/8962514/pexels-photo-8962514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "Experience luxury and comfort with this powerful Range Rover Sport. Perfect for city driving or weekend adventures, this SUV combines style, performance, and cutting-edge technology. Freshly serviced and in excellent condition.",
    features: [
      "All-wheel Drive",
      "Premium Sound System",
      "Leather Seats",
      "Navigation",
      "Bluetooth",
      "Sunroof",
      "Backup Camera",
      "Heated Seats",
      "Smart Key",
      "Climate Control"
    ],
    specifications: {
      transmission: "Automatic",
      fuelType: "Petrol",
      seats: 7,
      mileage: 15000,
      color: "Metallic Black"
    },
    reviews: [
      {
        id: "rev1",
        reviewer: {
          name: "Mohammed",
          avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        rating: 5,
        date: "2023-12-10",
        comment: "Excellent vehicle and great owner. The car was spotless and Abdullah was very accommodating with pickup and return times."
      },
      {
        id: "rev2",
        reviewer: {
          name: "Sara",
          avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        rating: 4,
        date: "2023-11-22",
        comment: "Very comfortable ride for our family trip. Only minor issue was a slight delay at pickup, but otherwise perfect experience."
      },
      {
        id: "rev3",
        reviewer: {
          name: "Khalid",
          avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        rating: 5,
        date: "2023-10-15",
        comment: "Top-notch vehicle and service. Abdullah made the whole process easy and the Range Rover was a dream to drive."
      }
    ]
  };

  const navigateImages = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => (prev === 0 ? car.images.length - 1 : prev - 1));
    } else {
      setCurrentImageIndex(prev => (prev === car.images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Image Gallery */}
      <div className="relative h-96 md:h-[500px] bg-gray-200">
        <img 
          src={car.images[currentImageIndex]} 
          alt={`${car.make} ${car.model}`} 
          className="w-full h-full object-cover"
        />
        
        <button 
          onClick={() => navigateImages('prev')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={() => navigateImages('next')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 rtl:space-x-reverse">
          {car.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentImageIndex === index ? 'bg-primary-500' : 'bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{car.make} {car.model}</h1>
                  <p className="text-gray-600">{car.type}, {car.year}</p>
                </div>
                <div className="flex items-center">
                  <Star size={20} className="text-yellow-500 fill-current" />
                  <span className="ml-1 rtl:mr-1 rtl:ml-0 font-medium">{car.rating}</span>
                  <span className="text-gray-500 ml-1 rtl:mr-1 rtl:ml-0">({car.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <MapPin size={18} className="text-primary-500 mr-2 rtl:ml-2 rtl:mr-0" />
                <span className="text-gray-600">{car.location.district}, {car.location.city}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p className="text-gray-700 mb-6">{car.description}</p>
                
                <h2 className="text-xl font-bold mb-4">{t('carDetails.features')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle size={18} className="text-primary-500 mr-2 rtl:ml-2 rtl:mr-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <h2 className="text-xl font-bold mb-4">{t('carDetails.specifications')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center">
                    <Settings size={18} className="text-primary-500 mr-2 rtl:ml-2 rtl:mr-0" />
                    <div>
                      <p className="text-sm text-gray-500">Transmission</p>
                      <p className="font-medium">{car.specifications.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Fuel size={18} className="text-primary-500 mr-2 rtl:ml-2 rtl:mr-0" />
                    <div>
                      <p className="text-sm text-gray-500">Fuel Type</p>
                      <p className="font-medium">{car.specifications.fuelType}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User size={18} className="text-primary-500 mr-2 rtl:ml-2 rtl:mr-0" />
                    <div>
                      <p className="text-sm text-gray-500">Seats</p>
                      <p className="font-medium">{car.specifications.seats}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Car size={18} className="text-primary-500 mr-2 rtl:ml-2 rtl:mr-0" />
                    <div>
                      <p className="text-sm text-gray-500">Mileage</p>
                      <p className="font-medium">{car.specifications.mileage} km</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4.5 h-4.5 rounded-full bg-black mr-2 rtl:ml-2 rtl:mr-0"></div>
                    <div>
                      <p className="text-sm text-gray-500">Color</p>
                      <p className="font-medium">{car.specifications.color}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t('carDetails.reviews')}</h2>
                <button 
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="text-primary-500 font-medium"
                >
                  {showAllReviews ? 'Show Less' : 'View All'}
                </button>
              </div>
              
              <div className="space-y-6">
                {(showAllReviews ? car.reviews : car.reviews.slice(0, 2)).map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <img 
                        src={review.reviewer.avatar} 
                        alt={review.reviewer.name} 
                        className="w-10 h-10 rounded-full object-cover mr-4 rtl:ml-4 rtl:mr-0"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold">{review.reviewer.name}</h4>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <div className="flex text-yellow-500 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < review.rating ? "fill-current" : "stroke-current fill-none"} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Booking Card and Owner Info */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-2xl font-bold text-primary-500">{car.dailyRate} SAR</span>
                  <span className="text-gray-500"> / {t('carDetails.perDay')}</span>
                </div>
                <div className="flex items-center">
                  <Star size={18} className="text-yellow-500 fill-current" />
                  <span className="ml-1 rtl:mr-1 rtl:ml-0 font-medium">{car.rating}</span>
                </div>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none">
                      <Calendar size={18} className="text-gray-400" />
                    </div>
                    <input 
                      type="date" 
                      className="block w-full pl-10 rtl:pr-10 rtl:pl-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none">
                      <Calendar size={18} className="text-gray-400" />
                    </div>
                    <input 
                      type="date" 
                      className="block w-full pl-10 rtl:pr-10 rtl:pl-3 py-2 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Insurance Option
                  </label>
                  <select className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
                    <option value="basic">Basic Coverage - 50 SAR/day</option>
                    <option value="standard">Standard Coverage - 80 SAR/day</option>
                    <option value="premium">Premium Coverage - 120 SAR/day</option>
                  </select>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">3 days x {car.dailyRate} SAR</span>
                    <span>{car.dailyRate * 3} SAR</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Insurance (Basic)</span>
                    <span>150 SAR</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service fee</span>
                    <span>90 SAR</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>{car.dailyRate * 3 + 150 + 90} SAR</span>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-full py-3 text-lg"
                >
                  {t('carDetails.bookNow')}
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-gray-500 text-sm">You won't be charged yet</p>
              </div>
            </div>
            
            {/* Owner Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">{t('carDetails.owner')}</h3>
              <div className="flex items-center mb-4">
                <img 
                  src={car.owner.avatar} 
                  alt={car.owner.name} 
                  className="w-14 h-14 rounded-full object-cover mr-4 rtl:ml-4 rtl:mr-0"
                />
                <div>
                  <h4 className="font-bold">{car.owner.name}</h4>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="ml-1 rtl:mr-1 rtl:ml-0 text-sm">{car.owner.rating}</span>
                    {car.owner.verified && (
                      <div className="flex items-center ml-2 rtl:mr-2 rtl:ml-0 text-primary-500">
                        <Shield size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />
                        <span className="text-xs">Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">Member since {car.owner.joinedDate}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Zap size={16} className="text-primary-500 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>Responds {car.owner.responseTime}</span>
              </div>
              <button className="btn btn-outline w-full mt-4">
                Contact {car.owner.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;