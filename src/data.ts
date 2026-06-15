import { Property, Location, Testimonial } from './types';

export const COMPANY_PHONE = '+91 89532 11182';
export const COMPANY_ADDRESS = 'Beg Tower, Shield Defence Academy Building, Lucknow–Faizabad Road, Near Lekhraj Metro Station, Indiranagar, Lucknow, Uttar Pradesh';
export const COMPANY_EMAIL = 'contact@swastikgroup.com';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa with Pool',
    location: 'Indiranagar, Lucknow',
    price: '₹2.5 Cr',
    area: '3,200 sq.ft',
    bedrooms: 4,
    bathrooms: 4,
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    status: 'For Sale',
    featured: true
  },
  {
    id: '2',
    title: 'Premium Apartment',
    location: 'Faizabad Road, Lucknow',
    price: '₹85 Lacs',
    area: '1,500 sq.ft',
    bedrooms: 3,
    bathrooms: 2,
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    status: 'For Sale',
    featured: true
  },
  {
    id: '3',
    title: 'Commercial Office Space',
    location: 'Ayodhya Road, Lucknow',
    price: '₹1.2 Cr',
    area: '2,000 sq.ft',
    bedrooms: 0,
    bathrooms: 2,
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    status: 'For Sale',
    featured: true
  },
  {
    id: '4',
    title: 'Modern Duplex House',
    location: 'City College Area, Lucknow',
    price: '₹1.8 Cr',
    area: '2,400 sq.ft',
    bedrooms: 4,
    bathrooms: 3,
    type: 'House',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    status: 'For Sale',
    featured: true
  },
  {
    id: '5',
    title: 'Independent Floor',
    location: 'Lachbar Bazar, Lucknow',
    price: '₹65 Lacs',
    area: '1,200 sq.ft',
    bedrooms: 2,
    bathrooms: 2,
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    status: 'For Sale',
    featured: true
  },
  {
    id: '6',
    title: 'Retail Shop Space',
    location: 'Indiranagar, Lucknow',
    price: '₹45 Lacs',
    area: '500 sq.ft',
    bedrooms: 0,
    bathrooms: 1,
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    status: 'For Sale',
    featured: true
  },
  {
    id: '7',
    title: 'Spacious Penthouse',
    location: 'Faizabad Road, Lucknow',
    price: '₹3.5 Cr',
    area: '4,500 sq.ft',
    bedrooms: 5,
    bathrooms: 5,
    type: 'Penthouse',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    status: 'For Sale',
    featured: true
  },
  {
    id: '8',
    title: 'Residential Plot',
    location: 'Ayodhya Road, Lucknow',
    price: '₹55 Lacs',
    area: '1,500 sq.ft',
    bedrooms: 0,
    bathrooms: 0,
    type: 'Land',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    status: 'For Sale',
    featured: true
  },
  {
    id: '9',
    title: 'Furnished Co-living Space',
    location: 'Indiranagar, Lucknow',
    price: '₹15,000/mo',
    area: '400 sq.ft',
    bedrooms: 1,
    bathrooms: 1,
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1522771731478-4ea7b6ce1e98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    status: 'For Rent',
    featured: true
  },
  {
    id: '10',
    title: 'Family Villa for Rent',
    location: 'Gomti Nagar, Lucknow',
    price: '₹45,000/mo',
    area: '2,000 sq.ft',
    bedrooms: 3,
    bathrooms: 3,
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    status: 'For Rent',
    featured: false
  }
];

export const LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'Ayodhya Road',
    propertyCount: 45,
    averagePrice: '₹80 Lacs - ₹2 Cr',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Indiranagar',
    propertyCount: 62,
    averagePrice: '₹1 Cr - ₹3 Cr',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Faizabad Road',
    propertyCount: 38,
    averagePrice: '₹60 Lacs - ₹1.5 Cr',
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'City College Area',
    propertyCount: 25,
    averagePrice: '₹75 Lacs - ₹2.5 Cr',
    image: 'https://images.unsplash.com/photo-1515263487920-c751a0d20015?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Lachbar Bazar',
    propertyCount: 18,
    averagePrice: '₹40 Lacs - ₹1 Cr',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajiv Srivastava',
    role: 'Home Buyer',
    rating: 5,
    content: 'Swastik Group made our dream of owning a home in Indiranagar a reality. Their transparent process and professional approach were exceptional.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Property Investor',
    rating: 5,
    content: 'The ROI on the commercial property I purchased through them on Ayodhya Road has been phenomenal. Highly recommend their consultation.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '3',
    name: 'Amit Verma',
    role: 'Business Owner',
    rating: 5,
    content: 'Found the perfect office space near Lekhraj Metro Station thanks to Swastik Group. The entire team is highly professional and trustworthy.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  }
];
