import React, { useState, useEffect } from 'react';
import { Property, Inquiry } from '../types';
import { useAppSettings } from '../GlobalContext';
import { Trash2, Plus, Users, Home as HomeIcon, Lock, Settings, CheckCircle2, MapPin } from 'lucide-react';

interface AdminPanelProps {
  properties: Property[];
  inquiries: Inquiry[];
  onAddProperty: (property: Property) => void;
  onDeleteProperty: (id: string) => void;
  onDeleteInquiry: (id: string) => void;
}

export default function AdminPanel({ properties, inquiries, onAddProperty, onDeleteProperty, onDeleteInquiry }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { settings, updateSettings } = useAppSettings();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'properties' | 'inquiries' | 'settings' | 'locations'>('dashboard');
  const [isAdding, setIsAdding] = useState(false);

  const [localSettings, setLocalSettings] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (activeTab === 'settings' || activeTab === 'locations') {
      setLocalSettings(settings);
      setSaveSuccess(false);
    }
  }, [activeTab, settings]);
  const [newProperty, setNewProperty] = useState<Partial<Property>>({
    title: '',
    location: '',
    price: '',
    area: '',
    bedrooms: 0,
    bathrooms: 0,
    type: 'Apartment',
    image: '',
    images: [],
    status: 'For Sale',
    featured: false
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProperty({
      ...newProperty,
      id: Date.now().toString(),
    } as Property);
    setIsAdding(false);
    setNewProperty({
      title: '', location: '', price: '', area: '', bedrooms: 0, bathrooms: 0, type: 'Apartment', image: '', images: [], status: 'For Sale', featured: false
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'swastik@2220') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
          <div className="w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold font-serif text-navy text-center mb-2">Admin Access</h2>
          <p className="text-slate-500 text-center mb-8">Please enter the administrator password to continue.</p>
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-navy text-white font-bold py-3 px-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-navy/20"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-serif text-navy mb-8">Admin Dashboard</h1>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-navy text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'properties' ? 'bg-navy text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            Manage Properties
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'inquiries' ? 'bg-navy text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            Customer Inquiries
            {inquiries.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{inquiries.length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('locations')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'locations' ? 'bg-navy text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            <MapPin size={18} /> Manage Locations
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'settings' ? 'bg-navy text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            <Settings size={18} /> Frontend Settings
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                <HomeIcon size={32} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Properties</p>
                <h3 className="text-3xl font-bold text-navy">{properties.length}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                <Users size={32} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Inquiries</p>
                <h3 className="text-3xl font-bold text-navy">{inquiries.length}</h3>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-navy">All Properties</h2>
              <button 
                onClick={() => setIsAdding(!isAdding)}
                className="flex items-center gap-2 bg-royal text-white px-4 py-2 rounded-lg font-medium hover:bg-navy transition-colors"
              >
                {isAdding ? 'Cancel' : <><Plus size={20} /> Add Property</>}
              </button>
            </div>

            {isAdding && (
              <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mb-8">
                <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input required type="text" className="w-full border rounded-lg p-2" value={newProperty.title} onChange={e => setNewProperty({...newProperty, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input required type="text" className="w-full border rounded-lg p-2" value={newProperty.location} onChange={e => setNewProperty({...newProperty, location: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input required type="text" className="w-full border rounded-lg p-2" placeholder="e.g. ₹1.5 Cr or ₹15,000/mo" value={newProperty.price} onChange={e => setNewProperty({...newProperty, price: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Area</label>
                    <input required type="text" className="w-full border rounded-lg p-2" placeholder="e.g. 1500 sq.ft" value={newProperty.area} onChange={e => setNewProperty({...newProperty, area: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bedrooms</label>
                    <input required type="number" min="0" className="w-full border rounded-lg p-2" value={newProperty.bedrooms} onChange={e => setNewProperty({...newProperty, bedrooms: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bathrooms</label>
                    <input required type="number" min="0" className="w-full border rounded-lg p-2" value={newProperty.bathrooms} onChange={e => setNewProperty({...newProperty, bathrooms: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select className="w-full border rounded-lg p-2" value={newProperty.type} onChange={e => setNewProperty({...newProperty, type: e.target.value})}>
                      <option>Apartment</option>
                      <option>Villa</option>
                      <option>House</option>
                      <option>Commercial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select className="w-full border rounded-lg p-2" value={newProperty.status} onChange={e => setNewProperty({...newProperty, status: e.target.value as any})}>
                      <option>For Sale</option>
                      <option>For Rent</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Images (Up to 5)</label>
                    <div className="space-y-3">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-2">
                          <input 
                            type="text" 
                            className="w-full border rounded-lg p-2" 
                            placeholder={`Image URL ${index + 1}`} 
                            value={newProperty.images?.[index] || (index === 0 ? newProperty.image : '') || ''} 
                            onChange={e => {
                              const newImages = [...(newProperty.images || [])];
                              // Fill empty slots if necessary
                              for (let i = 0; i < index; i++) {
                                if (!newImages[i]) newImages[i] = i === 0 ? newProperty.image || '' : '';
                              }
                              newImages[index] = e.target.value;
                              
                              setNewProperty({
                                ...newProperty, 
                                images: newImages,
                                ...(index === 0 ? { image: e.target.value } : {})
                              });
                            }} 
                          />
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="w-full sm:w-auto border rounded-lg p-1.5 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-navy file:text-white hover:file:bg-slate-800"
                            onChange={(e) => handleImageUpload(e, (url) => {
                              const newImages = [...(newProperty.images || [])];
                              for (let i = 0; i < index; i++) {
                                if (!newImages[i]) newImages[i] = i === 0 ? newProperty.image || '' : '';
                              }
                              newImages[index] = url;
                              setNewProperty({
                                ...newProperty, 
                                images: newImages,
                                ...(index === 0 ? { image: url } : {})
                              });
                            })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input type="checkbox" id="featured" checked={newProperty.featured} onChange={e => setNewProperty({...newProperty, featured: e.target.checked})} />
                    <label htmlFor="featured" className="text-sm font-medium">Featured Property</label>
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="bg-navy text-white px-6 py-2 rounded-lg font-bold">Save Property</button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 text-sm font-medium text-slate-500">Property</th>
                    <th className="p-4 text-sm font-medium text-slate-500 hidden sm:table-cell">Location</th>
                    <th className="p-4 text-sm font-medium text-slate-500">Price</th>
                    <th className="p-4 text-sm font-medium text-slate-500 hidden md:table-cell">Status</th>
                    <th className="p-4 text-sm font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(p => (
                    <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt="" className="w-12 h-12 rounded object-cover hidden sm:block" />
                          <div>
                            <p className="font-bold text-navy truncate max-w-[150px] sm:max-w-[250px]">{p.title}</p>
                            <p className="text-xs text-slate-500 sm:hidden">{p.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden sm:table-cell text-slate-600 text-sm">{p.location}</td>
                      <td className="p-4 font-medium text-navy text-sm">{p.price}</td>
                      <td className="p-4 hidden md:table-cell text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.status === 'For Sale' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => onDeleteProperty(p.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="Delete Property"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div>
            <h2 className="text-2xl font-bold text-navy mb-6">Customer Inquiries</h2>
            {inquiries.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center text-slate-500">
                No inquiries yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inquiries.map(inq => (
                  <div key={inq.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-navy">{inq.name}</h3>
                        <p className="text-sm text-slate-500">{new Date(inq.date).toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => onDeleteInquiry(inq.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-slate-500 text-sm">Phone:</span>
                        <span className="font-medium text-navy">{inq.phone}</span>
                      </div>
                      <div className="flex justify-between pb-2 items-center">
                        <span className="text-slate-500 text-sm">Req:</span>
                        <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs text-right break-words max-w-[70%]">{inq.requirement}</span>
                      </div>
                      {inq.query && (
                        <div className="pt-2 pb-2">
                          <span className="text-slate-500 text-sm block mb-1">Message:</span>
                          <p className="text-sm font-medium text-navy bg-slate-50 p-2 rounded break-words max-h-24 overflow-y-auto">{inq.query}</p>
                        </div>
                      )}
                    </div>
                    <a 
                      href={`tel:${inq.phone.replace(/\\s+/g, '')}`}
                      className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-navy font-bold py-2 rounded-lg transition-colors text-sm"
                    >
                      Call Customer
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 relative mb-24">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-navy">Frontend Settings</h2>
              <button 
                onClick={() => {
                  setIsSaving(true);
                  updateSettings(localSettings);
                  setTimeout(() => {
                    setIsSaving(false);
                    setSaveSuccess(true);
                    setTimeout(() => setSaveSuccess(false), 3000);
                  }, 600);
                }}
                className="flex items-center gap-2 px-6 py-2 bg-emerald text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
              >
                {isSaving ? 'Saving...' : saveSuccess ? <><CheckCircle2 size={18}/> Saved!</> : 'Save Changes'}
              </button>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-navy mb-4">Google SEO Settings</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-600">SEO Title</label>
                    <input 
                      type="text" 
                      className="w-full border rounded-lg p-2" 
                      value={localSettings.seoTitle} 
                      onChange={e => setLocalSettings(prev => ({ ...prev, seoTitle: e.target.value }))} 
                      placeholder="e.g. Swastik Properties | Find your Dream Home"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-600">SEO Description</label>
                    <textarea 
                      className="w-full border rounded-lg p-2 min-h-[80px]" 
                      value={localSettings.seoDescription} 
                      onChange={e => setLocalSettings(prev => ({ ...prev, seoDescription: e.target.value }))} 
                      placeholder="e.g. Explore top real estate properties bridging buyers and sellers seamlessly..."
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-navy mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-600">Company Phone</label>
                    <input 
                      type="text" 
                      className="w-full border rounded-lg p-2" 
                      value={localSettings.companyPhone} 
                      onChange={e => setLocalSettings(prev => ({ ...prev, companyPhone: e.target.value }))} 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-navy mb-4">Hero Banner</h3>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-600">Background Image URL or Upload</label>
                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input 
                      type="text" 
                      className="w-full border rounded-lg p-2" 
                      value={localSettings.heroImage} 
                      onChange={e => setLocalSettings(prev => ({ ...prev, heroImage: e.target.value }))} 
                    />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="w-full sm:w-auto border rounded-lg p-1.5 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-navy file:text-white hover:file:bg-slate-800"
                      onChange={(e) => handleImageUpload(e, (url) => setLocalSettings(prev => ({ ...prev, heroImage: url })))}
                    />
                  </div>
                  {localSettings.heroImage && (
                    <img src={localSettings.heroImage} alt="Hero Banner Preview" className="w-full h-48 object-cover rounded-xl border border-slate-200" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'locations' && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 relative mb-24">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-navy">Manage Locations</h2>
              <button 
                onClick={() => {
                  setIsSaving(true);
                  updateSettings(localSettings);
                  setTimeout(() => {
                    setIsSaving(false);
                    setSaveSuccess(true);
                    setTimeout(() => setSaveSuccess(false), 3000);
                  }, 600);
                }}
                className="flex items-center gap-2 px-6 py-2 bg-emerald text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
              >
                {isSaving ? 'Saving...' : saveSuccess ? <><CheckCircle2 size={18}/> Saved!</> : 'Save Changes'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-navy">Locations Management</h3>
                  <button type="button" onClick={(e) => {
                    e.preventDefault();
                    const newLocations = [
                      ...localSettings.locations,
                      {
                        id: Date.now().toString() + Math.random().toString(),
                        name: 'New Location',
                        propertyCount: 0,
                        averagePrice: '₹...',
                        image: ''
                      }
                    ];
                    setLocalSettings(prev => ({ ...prev, locations: newLocations }));
                  }} className="flex items-center gap-1 bg-royal text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-navy transition-colors">
                    <Plus size={16} /> Add Location
                  </button>
                </div>
                <div className="space-y-4">
                  {localSettings.locations.map((loc, idx) => (
                    <div key={loc.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100 relative transition-transform hover:shadow-sm">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const newLocations = localSettings.locations.filter((_, i) => i !== idx);
                          setLocalSettings(prev => ({ ...prev, locations: newLocations }));
                        }}
                        className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="Delete Location"
                      >
                        <Trash2 size={16} />
                      </button>
                      <img src={loc.image || 'https://via.placeholder.com/150'} alt={loc.name} className="w-16 h-16 object-cover rounded shrink-0 bg-slate-200" />
                      <div className="w-full pr-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                          <div>
                            <label className="block text-xs font-bold mb-1 text-slate-500">Name</label>
                            <input 
                              type="text" 
                              className="w-full border rounded p-1 text-sm font-bold text-navy" 
                              value={loc.name} 
                              onChange={e => {
                                const newLocations = [...localSettings.locations];
                                newLocations[idx] = { ...loc, name: e.target.value };
                                setLocalSettings(prev => ({ ...prev, locations: newLocations }));
                              }} 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold mb-1 text-slate-500">Avg Price</label>
                            <input 
                              type="text" 
                              className="w-full border rounded p-1 text-sm text-slate-600" 
                              value={loc.averagePrice} 
                              onChange={e => {
                                const newLocations = [...localSettings.locations];
                                newLocations[idx] = { ...loc, averagePrice: e.target.value };
                                setLocalSettings(prev => ({ ...prev, locations: newLocations }));
                              }} 
                            />
                          </div>
                        </div>
                        <label className="block text-xs font-bold mb-1 text-slate-500">Image URL or Upload</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input 
                            type="text" 
                            className="w-full border rounded p-1.5 text-sm font-mono text-xs" 
                            value={loc.image} 
                            placeholder="https://..."
                            onChange={e => {
                              const newLocations = [...localSettings.locations];
                              newLocations[idx] = { ...loc, image: e.target.value };
                              setLocalSettings(prev => ({ ...prev, locations: newLocations }));
                            }} 
                          />
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="w-full sm:w-auto border rounded p-1 text-sm file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-navy file:text-white hover:file:bg-slate-800"
                            onChange={(e) => handleImageUpload(e, (url) => {
                              const newLocations = [...localSettings.locations];
                              newLocations[idx] = { ...loc, image: url };
                              setLocalSettings(prev => ({ ...prev, locations: newLocations }));
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
