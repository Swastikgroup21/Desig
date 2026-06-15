/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertySearch from './components/PropertySearch';
import FeaturedProperties from './components/FeaturedProperties';
import WhyChooseUs from './components/WhyChooseUs';
import Locations from './components/Locations';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import InvestmentBenefits from './components/InvestmentBenefits';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ContactModal from './components/ContactModal';
import PropertiesPage from './components/PropertiesPage';
import PropertyDetailsPage from './components/PropertyDetailsPage';
import AdminPanel from './components/AdminPanel';
import WelcomePopup from './components/WelcomePopup';
import { Property, Inquiry } from './types';
import { PROPERTIES as INITIAL_PROPERTIES } from './data';

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentRoute, setCurrentRoute] = useState<'home' | 'properties' | 'property-details' | 'admin'>('home');

  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('swastik_properties');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('swastik_properties', JSON.stringify(INITIAL_PROPERTIES));
    return INITIAL_PROPERTIES;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('swastik_inquiries');
    if (saved) return JSON.parse(saved);
    return [];
  });

  // Effect to save properties changes
  useEffect(() => {
    localStorage.setItem('swastik_properties', JSON.stringify(properties));
  }, [properties]);

  // Effect to save inquiries changes
  useEffect(() => {
    localStorage.setItem('swastik_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const openPropertyDetails = (property: Property) => {
    setSelectedProperty(property);
    setCurrentRoute('property-details');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigate = (route: string) => {
    setCurrentRoute(route as 'home' | 'properties' | 'property-details' | 'admin');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleAddProperty = (p: Property) => setProperties([p, ...properties]);
  const handleDeleteProperty = (id: string) => setProperties(properties.filter(p => p.id !== id));
  
  const handleAddInquiry = (inq: Inquiry) => setInquiries([inq, ...inquiries]);
  const handleDeleteInquiry = (id: string) => setInquiries(inquiries.filter(i => i.id !== id));

  return (
    <div className="font-sans text-slate-800 bg-light-gray min-h-screen selection:bg-gold selection:text-navy">
      <Navbar onContactClick={openContactModal} currentRoute={currentRoute} onNavigate={handleNavigate} />
      
      {currentRoute === 'home' ? (
        <main>
          <Hero onContactClick={openContactModal} onNavigate={handleNavigate} />
          <PropertySearch onSearch={() => handleNavigate('properties')} />
          <FeaturedProperties properties={properties.filter(p => p.featured)} onViewProperty={openPropertyDetails} />
          <WhyChooseUs />
          <Locations />
          <Services />
          <AboutUs />
          <InvestmentBenefits />
          <Stats />
          <Testimonials />
          <ContactSection onSubmitInquiry={handleAddInquiry} />
          <CallToAction onContactClick={openContactModal} />
        </main>
      ) : currentRoute === 'properties' ? (
        <main>
          <PropertiesPage properties={properties} onViewProperty={openPropertyDetails} />
        </main>
      ) : currentRoute === 'property-details' ? (
        <main>
          <PropertyDetailsPage 
            property={selectedProperty} 
            onBack={() => handleNavigate('properties')} 
            onContactClick={openContactModal}
          />
        </main>
      ) : (
        <main>
          <AdminPanel 
            properties={properties} 
            inquiries={inquiries} 
            onAddProperty={handleAddProperty} 
            onDeleteProperty={handleDeleteProperty}
            onDeleteInquiry={handleDeleteInquiry}
          />
        </main>
      )}

      {currentRoute !== 'admin' && <Footer onNavigate={handleNavigate} />}
      
      {currentRoute !== 'admin' && <FloatingActions />}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} onSubmitInquiry={handleAddInquiry} />
      {currentRoute === 'home' && <WelcomePopup onContactClick={openContactModal} />}
    </div>
  );
}
