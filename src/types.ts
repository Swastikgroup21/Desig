export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  type: string;
  image: string;
  status: 'For Sale' | 'For Rent';
  featured?: boolean;
}

export interface Location {
  id: string;
  name: string;
  propertyCount: number;
  averagePrice: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  image: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  requirement: string;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
}
