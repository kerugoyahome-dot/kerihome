export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
}

export type UserRole = 'user' | 'provider' | 'admin';

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  basePrice: number;
}

export interface ErrandRequest {
  id: string;
  userId: string;
  serviceId: string;
  title: string;
  description: string;
  pickupLocation: string;
  deliveryLocation: string;
  estimatedCost: number;
  status: ErrandStatus;
  createdAt: string;
  providerId?: string;
  notes?: string;
}

export type ErrandStatus = 'pending' | 'accepted' | 'in-progress' | 'delivered' | 'completed' | 'cancelled';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}