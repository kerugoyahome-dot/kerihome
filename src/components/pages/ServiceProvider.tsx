import React, { useState } from 'react';
import { Clock, MapPin, DollarSign, CheckCircle, X, Eye, Star } from 'lucide-react';

const ServiceProvider: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'completed'>('available');

  const availableTasks = [
    {
      id: '1',
      title: 'Grocery Shopping at Kagumo Market',
      description: 'Need someone to buy vegetables, fruits, and household items. List provided.',
      location: 'Kagumo Market → Kerugoya Town',
      estimatedEarning: 350,
      estimatedTime: '45 minutes',
      distance: '2.5 km',
      urgency: 'standard',
      customer: 'Jane Wanjiru',
      postedTime: '5 minutes ago'
    },
    {
      id: '2',
      title: 'Document Printing & Binding',
      description: 'Print 50 pages and bind them. Files will be shared via WhatsApp.',
      location: 'Print Shop → University Campus',
      estimatedEarning: 150,
      estimatedTime: '30 minutes',
      distance: '1.8 km',
      urgency: 'urgent',
      customer: 'Peter Kariuki',
      postedTime: '10 minutes ago'
    },
    {
      id: '3',
      title: 'Bill Payment - Water & Electricity',
      description: 'Pay water and electricity bills at the respective offices.',
      location: 'Town Office → Home Delivery',
      estimatedEarning: 100,
      estimatedTime: '60 minutes',
      distance: '3.2 km',
      urgency: 'standard',
      customer: 'Mary Njeri',
      postedTime: '15 minutes ago'
    }
  ];

  const activeTasks = [
    {
      id: '4',
      title: 'Pharmacy Prescription Pickup',
      customer: 'John Kamau',
      location: 'Kerugoya Pharmacy',
      progress: 60,
      earning: 200,
      timeRemaining: '20 minutes'
    }
  ];

  const completedTasks = [
    {
      id: '5',
      title: 'Grocery Shopping',
      customer: 'Sarah Wanjiku',
      completedAt: '2 hours ago',
      earning: 400,
      rating: 5,
      tip: 50
    },
    {
      id: '6',
      title: 'Document Delivery',
      customer: 'James Mwangi',
      completedAt: '1 day ago',
      earning: 250,
      rating: 4,
      tip: 0
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    return urgency === 'urgent' 
      ? 'text-orange-600 bg-orange-100' 
      : urgency === 'express' 
      ? 'text-red-600 bg-red-100' 
      : 'text-blue-600 bg-blue-100';
  };

  const handleAcceptTask = (taskId: string) => {
    console.log('Accepting task:', taskId);
    // Here you would typically make an API call
  };

  const handleDeclineTask = (taskId: string) => {
    console.log('Declining task:', taskId);
    // Here you would typically make an API call
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Provider Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your tasks and earnings</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="text-green-800 font-semibold">Today's Earnings</div>
          <div className="text-2xl font-bold text-green-600">KSh 2,450</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{availableTasks.length}</div>
          <div className="text-gray-600 text-sm">Available Tasks</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-orange-600">{activeTasks.length}</div>
          <div className="text-gray-600 text-sm">Active Tasks</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-green-600">6</div>
          <div className="text-gray-600 text-sm">Completed Today</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">4.8</div>
          <div className="text-gray-600 text-sm">Average Rating</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2">
        {[
          { key: 'available', label: `Available (${availableTasks.length})` },
          { key: 'active', label: `Active (${activeTasks.length})` },
          { key: 'completed', label: 'Completed' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Available Tasks */}
      {activeTab === 'available' && (
        <div className="space-y-4">
          {availableTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(task.urgency)}`}>
                        {task.urgency}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{task.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {task.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {task.estimatedTime}
                      </div>
                      <div>Distance: {task.distance}</div>
                      <div>Posted {task.postedTime}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">KSh {task.estimatedEarning}</div>
                    <div className="text-sm text-gray-500">Estimated earning</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Customer: <span className="font-medium text-gray-900">{task.customer}</span>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleDeclineTask(task.id)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Decline</span>
                    </button>
                    <button className="px-4 py-2 border border-blue-300 text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button 
                      onClick={() => handleAcceptTask(task.id)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Accept</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active Tasks */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <p className="text-gray-600">Customer: {task.customer}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">KSh {task.earning}</div>
                  <div className="text-sm text-gray-500">{task.timeRemaining} remaining</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{task.progress}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Update Status
                </button>
                <button className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  Contact Customer
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Complete Task
                </button>
              </div>
            </div>
          ))}

          {activeTasks.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Tasks</h3>
              <p className="text-gray-500">Accept available tasks to start earning</p>
            </div>
          )}
        </div>
      )}

      {/* Completed Tasks */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <p className="text-gray-600">Customer: {task.customer}</p>
                  <p className="text-sm text-gray-500">Completed {task.completedAt}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    KSh {task.earning + task.tip}
                    {task.tip > 0 && (
                      <span className="text-sm text-orange-600 ml-1">(+{task.tip} tip)</span>
                    )}
                  </div>
                  <div className="flex items-center justify-end">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < task.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">({task.rating}.0)</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceProvider;