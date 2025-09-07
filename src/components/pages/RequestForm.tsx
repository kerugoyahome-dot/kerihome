import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Calculator, CreditCard, Smartphone, Banknote } from 'lucide-react';

const RequestForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedService = location.state?.selectedService || '';

  const [formData, setFormData] = useState({
    service: selectedService,
    title: '',
    description: '',
    pickupLocation: '',
    deliveryLocation: '',
    urgency: 'standard',
    paymentMethod: 'mpesa',
    notes: ''
  });

  const [estimatedCost, setEstimatedCost] = useState(250);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Simple cost estimation logic
    if (name === 'urgency' || name === 'service') {
      const basePrice = 200;
      const urgencyMultiplier = value === 'urgent' ? 1.5 : value === 'express' ? 2 : 1;
      setEstimatedCost(Math.round(basePrice * urgencyMultiplier));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit to your backend
    console.log('Errand request submitted:', formData);
    navigate('/tracking');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Request New Errand</h1>
        <p className="text-gray-600">Fill out the details and we'll find the perfect person for your task</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="Grocery Shopping">Grocery Shopping</option>
                    <option value="Document Printing">Document Printing</option>
                    <option value="Bill Payments">Bill Payments</option>
                    <option value="Parcel Delivery">Parcel Delivery</option>
                    <option value="Custom Errand">Custom Errand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Brief description of what you need"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide detailed instructions, specific requirements, or any important notes"
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Location Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Location *
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="Where should we start? (e.g., Kerugoya Town, Kagumo Market)"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Location *
                  </label>
                  <input
                    type="text"
                    name="deliveryLocation"
                    value={formData.deliveryLocation}
                    onChange={handleInputChange}
                    placeholder="Where should we deliver? (Address or landmark)"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Options</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'standard', label: 'Standard', time: '2-4 hours', extra: '' },
                      { value: 'urgent', label: 'Urgent', time: '1-2 hours', extra: '+50%' },
                      { value: 'express', label: 'Express', time: '30-60 min', extra: '+100%' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                          formData.urgency === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={option.value}
                          checked={formData.urgency === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.time}</div>
                          {option.extra && (
                            <div className="text-xs text-orange-600 font-medium">{option.extra}</div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions, contact preferences, or additional information"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cost Estimate */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-green-600" />
                Cost Estimate
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Service Fee</span>
                  <span>KSh 200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Urgency Fee</span>
                  <span>KSh {estimatedCost - 200}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total Estimate</span>
                    <span className="text-green-600">KSh {estimatedCost}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              
              <div className="space-y-3">
                {[
                  { value: 'mpesa', label: 'M-Pesa', icon: Smartphone, popular: true },
                  { value: 'cash', label: 'Cash on Delivery', icon: Banknote, popular: false },
                  { value: 'card', label: 'Credit/Debit Card', icon: CreditCard, popular: false }
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.value}
                      className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.paymentMethod === method.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <Icon className="w-5 h-5 mr-3 text-gray-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{method.label}</div>
                        {method.popular && (
                          <div className="text-xs text-blue-600">Most Popular</div>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-colors shadow-lg"
            >
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;