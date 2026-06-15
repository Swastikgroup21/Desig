import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_PHONE as DEFAULT_PHONE, LOCATIONS as DEFAULT_LOCATIONS } from './data';
import { Location } from './types';

interface AppSettings {
  companyPhone: string;
  heroImage: string;
  locations: Location[];
  seoTitle: string;
  seoDescription: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  companyPhone: DEFAULT_PHONE,
  heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
  locations: DEFAULT_LOCATIONS,
  seoTitle: 'Swastik Properties',
  seoDescription: 'Find your dream home with Swastik Properties.',
};

interface AppSettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
}

const AppSettingsContext = createContext<AppSettingsContextType>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => {},
});

export const useAppSettings = () => useContext(AppSettingsContext);

export const AppSettingsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('swastik_settings');
    if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('swastik_settings', JSON.stringify(settings));
    
    // Apply SEO settings
    document.title = settings.seoTitle;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', settings.seoDescription);
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <AppSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AppSettingsContext.Provider>
  );
};
