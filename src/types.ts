export interface Product {
  id: string;
  name: string;
  subname?: string;
  category: 'single-origin' | 'espresso' | 'cold-brew' | 'signature' | 'gear';
  categoryLabel: string;
  tag: string;
  tagColor?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  brewInfo: string;
  description: string;
  tastingNotes: string[];
  scaScore?: number;
  origin?: string;
  altitude?: string;
  process?: string;
  roastLevel?: 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  imageUrl: string;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  grindOption?: string;
  sweetness?: string;
  milkOption?: string;
  temperature?: 'Nóng' | 'Đá';
  size?: 'Tiêu chuẩn (M)' | 'Lớn (L)';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  comment: string;
}

export interface BranchLocation {
  id: string;
  branchNumber: string;
  city: string;
  category: 'roastery' | 'garden' | 'workspace' | 'slow-bar';
  categoryLabel: string;
  name: string;
  address: string;
  hotline: string;
  openingHours: string;
  description: string;
  features: string[];
  imageUrl: string;
  parkingInfo?: string;
  isPopular?: boolean;
}

export type ViewTab = 'home' | 'about' | 'menu' | 'locations';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  membershipTier: 'Thành viên Đồng' | 'Hội viên Bạc' | 'Hội viên Vàng' | 'Lumina Connoisseur';
  beansPoints: number;
  avatarUrl?: string;
  savedAddresses?: string[];
}

export interface QuickDeliveryOrder {
  id: string;
  recipientName: string;
  phone: string;
  address: string;
  deliverySpeed: 'express' | 'scheduled';
  scheduledTime?: string;
  items: CartItem[];
  paymentMethod: 'vietqr' | 'cod' | 'card' | 'momo';
  notes?: string;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  createdAt: string;
  status: 'pending' | 'preparing' | 'delivering' | 'completed';
}
