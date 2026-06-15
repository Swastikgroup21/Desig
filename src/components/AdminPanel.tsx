import { useState } from 'react';
import { Property, Inquiry } from '../types';
import { Trash2, Plus, Users, Home as HomeIcon, Lock } from 'lucide-react';

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

  const [activeTab, setActiveTab] = useState<'dashboard' | 'properties' | 'inquiries'>('dashboard');
  const [isAdding, setIsAdding] = useState(false);
  const [newProperty, setNewProperty] = useState<Partial<Property>>({
    title: '',
    location: '',
    price: '',
    area: '',
    bedrooms: 0,
    bathrooms: 0,
    type: 'Apartment',
    image: '',
    status: 'For Sale',
    featured: false
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProperty({
      ...newProperty,
      id: Date.now().toString(),
    } as Property);
    setIsAdding(false);
    setNewProperty({
      title: '', location: '', price: '', area: '', bedrooms: 0, bathrooms: 0, type: 'Apartment', image: '', status: 'For Sale', featured: false
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
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input required type="text" className="w-full border rounded-lg p-2" placeholder="https://..." value={newProperty.image} onChange={e => setNewProperty({...newProperty, image: e.target.value})} />
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
                      <div className="flex justify-between pb-2">
                        <span className="text-slate-500 text-sm">Req:</span>
                        <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs">{inq.requirement}</span>
                      </div>
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
      </div>
    </div>
  );
}
