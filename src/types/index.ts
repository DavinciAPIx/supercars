export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isVerified: boolean;
  rating: number;
  joinedDate: string;
  isCarOwner: boolean;
}

export interface Car {
  id: string;
  ownerId: string;
  make: string;
  model: string;
  year: number;
  type: CarType;
  images: string[];
  dailyRate: number;
  location: Location;
  features: string[];
  specifications: CarSpecifications;
  description: string;
  availability: DateRange[];
  rating: number;
  reviewCount: number;
}

export enum CarType {
  SEDAN = 'sedan',
  SUV = 'suv',
  SPORTS = 'sports',
  LUXURY = 'luxury',
  ECONOMY = 'economy',
  PICKUP = 'pickup',
}

export interface CarSpecifications {
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  mileage: number;
  color: string;
}

export interface Location {
  city: string;
  district: string;
  latitude: number;
  longitude: number;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface Booking {
  id: string;
  carId: string;
  renterId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  insuranceOption: InsuranceOption;
}

export enum BookingStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded',
  FAILED = 'failed',
}

export enum InsuranceOption {
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

export interface Review {
  id: string;
  bookingId: string;
  carId: string;
  reviewerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}