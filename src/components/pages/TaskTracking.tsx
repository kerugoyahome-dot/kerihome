import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, Truck, Phone, MessageCircle, Navigation } from 'lucide-react';

const TaskTracking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const activeTasks = [
    {
      id: '1',
      title: 'Grocery Shopping at Kagumo Market',
      status: 'in-progress',
      provider: 'John Kamau',
      providerPhone: '+254 712 345 678',
      estimatedTime: '25 minutes',
      currentLocation: 'Kagumo Market - Section B',
      progress: 60,
      timeline: [
        { step: 'Order Placed', completed: true, time: '2:15 PM' },
        { step: 'Provider Assigned', completed: true, time: '2:18 PM' },
        { step: 'Shopping Started', completed: true, time: '2:30 PM' },
        { step: 'Items Collected', completed: false, time: 'In Progress' },
        { step: 'Delivery Started', completed: false, time: 'Pending' },
        { step: 'Delivered', completed: false, time: 'Pending' }
      ]
    },
    {
      id: '2',
      title: 'Document Printing - University Forms',
      status: 'accepted',
      provider: 'Mary Wanjiku',
      providerPhone: '+254 723 456 789',
      estimatedTime: '15 minutes',
      currentLocation: 'Heading to Print Shop',
      progress: 25,
      timeline: [
        { step: 'Order Placed', completed: true, time: '3:00 PM' },
        { step: 'Provider Assigned', completed: true, time: '3:02 PM' },
        { step: 'Heading to Location', completed: false, time: 'In Progress' },
        { step: 'Task Started', completed: false, time: 'Pending' },
        { step: 'Task Completed', completed: false, time: 'Pending' },
        { step: 'Delivered', completed: false, time: 'Pending' }
      ]
    }
  ];

  const completedTasks = [
    {
      id: '3',
      title: 'Bill Payment - KPLC Electricity',
      completedAt: '1:45 PM',
      provider: 'Peter Mwangi',
      cost: 'KSh 50',
      rating: 5
    },
    {
      id: '4',
      title: 'Parcel Delivery to CBD',
      completedAt: 'Yesterday, 4:30 PM',
      provider: 'Sarah Njeri',
      cost: 'KSh 300',
      rating: 4
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'text-orange-600 bg-orange-100';
      case 'accepted': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress': return <Truck className="w-5 h-5" />;
      case 'accepted': return <Clock className="w-5 h-5" />;
      case 'delivered': return <CheckCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Track Your Orders</h1>
          <p className="text-gray-600 mt-1">Monitor your errands in real-time</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'active'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Active ({activeTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'completed'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Active Tasks */}
      {activeTab === 'active' && (
        <div className="space-y-6">
          {activeTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Task Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {task.currentLocation}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        ETA: {task.estimatedTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(task.status)}`}>
                      {getStatusIcon(task.status)}
                      <span className="capitalize">{task.status.replace('-', ' ')}</span>
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{task.progress}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Task Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Timeline */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Order Timeline</h4>
                    <div className="space-y-3">
                      {task.timeline.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            item.completed 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300 bg-white'
                          }`}></div>
                          <div className="flex-1">
                            <div className={`font-medium ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {item.step}
                            </div>
                            <div className="text-sm text-gray-500">{item.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Provider Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Service Provider</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {task.provider.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{task.provider}</div>
                          <div className="text-sm text-gray-500">Service Provider</div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>Call</span>
                        </button>
                        <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>Chat</span>
                        </button>
                        <button className="bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                          <Navigation className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {activeTasks.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Orders</h3>
              <p className="text-gray-500">Your active errands will appear here for real-time tracking</p>
            </div>
          )}
        </div>
      )}

      {/* Completed Tasks */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedTasks.map((task) => (
            <div key={task.id} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                  <div className="text-sm text-gray-500">
                    Completed {task.completedAt} • {task.provider} • {task.cost}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < task.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-gray-600">({task.rating}.0)</span>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
          ))}

          {completedTasks.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Completed Orders</h3>
              <p className="text-gray-500">Your completed errands will appear here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskTracking;