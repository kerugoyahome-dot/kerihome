import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Briefcase, 
  Home, 
  GraduationCap, 
  User, 
  ArrowRight,
  Star,
  Clock
} from 'lucide-react';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const serviceCategories = [
    {
      id: 'shopping',
      name: 'Shopping & Delivery',
      icon: ShoppingCart,
      description: 'Groceries, electronics, clothing, and more',
      color: 'bg-green-500',
      services: [
        { name: 'Grocery Shopping', price: 'From KSh 200', rating: 4.8, time: '30-60 min' },
        { name: 'Electronics Purchase', price: 'From KSh 500', rating: 4.9, time: '1-2 hours' },
        { name: 'Clothing Shopping', price: 'From KSh 300', rating: 4.7, time: '45-90 min' }
      ]
    },
    {
      id: 'business',
      name: 'Business & Office',
      icon: Briefcase,
      description: 'Document handling, meetings, office tasks',
      color: 'bg-blue-500',
      services: [
        { name: 'Document Printing', price: 'From KSh 50', rating: 4.9, time: '15-30 min' },
        { name: 'Office Meetings', price: 'From KSh 1000', rating: 4.8, time: '2-4 hours' },
        { name: 'Banking Services', price: 'From KSh 150', rating: 4.7, time: '30-60 min' }
      ]
    },
    {
      id: 'household',
      name: 'Household Support',
      icon: Home,
      description: 'Bills, utilities, household maintenance',
      color: 'bg-orange-500',
      services: [
        { name: 'Bill Payments', price: 'From KSh 50', rating: 4.9, time: '15-30 min' },
        { name: 'Laundry Service', price: 'From KSh 300', rating: 4.6, time: '2-3 hours' },
        { name: 'Gas Refill', price: 'From KSh 100', rating: 4.8, time: '30-45 min' }
      ]
    },
    {
      id: 'student',
      name: 'Student Support',
      icon: GraduationCap,
      description: 'Academic assistance, supplies, printing',
      color: 'bg-purple-500',
      services: [
        { name: 'Assignment Printing', price: 'From KSh 30', rating: 4.8, time: '10-20 min' },
        { name: 'Stationery Purchase', price: 'From KSh 100', rating: 4.7, time: '20-40 min' },
        { name: 'Library Services', price: 'From KSh 80', rating: 4.6, time: '30-60 min' }
      ]
    },
    {
      id: 'personal',
      name: 'Personal Errands',
      icon: User,
      description: 'Tickets, parcels, personal tasks',
      color: 'bg-pink-500',
      services: [
        { name: 'Ticket Booking', price: 'From KSh 200', rating: 4.9, time: '15-30 min' },
        { name: 'Parcel Delivery', price: 'From KSh 150', rating: 4.8, time: '30-120 min' },
        { name: 'Airtime & Data', price: 'From KSh 20', rating: 4.9, time: '5-10 min' }
      ]
    }
  ];

  const filteredCategories = selectedCategory === 'all' 
    ? serviceCategories 
    : serviceCategories.filter(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Our Services</h1>
          <p className="text-gray-600 mt-1">Choose from our wide range of errand services</p>
        </div>
        <button 
          onClick={() => navigate('/request')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>Custom Request</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Services
          </button>
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Service Categories */}
      <div className="space-y-8">
        {filteredCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Category Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.services.map((service, index) => (
                    <div 
                      key={index} 
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => navigate('/request', { state: { selectedService: service.name } })}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {service.name}
                        </h4>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-600 font-semibold">{service.price}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{service.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{service.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Need Something Custom?</h2>
        <p className="mb-6 opacity-90">Can't find what you're looking for? We'll handle any errand you need!</p>
        <button 
          onClick={() => navigate('/request')}
          className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Create Custom Request
        </button>
      </div>
    </div>
  );
};

export default Services;