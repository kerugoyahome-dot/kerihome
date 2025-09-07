import React from 'react';
import { ArrowRight, Clock, CheckCircle, Package, TrendingUp } from 'lucide-react';
import { UserRole } from '../../types';

interface DashboardProps {
  currentRole: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ currentRole }) => {
  if (currentRole === 'provider') {
    return <ProviderDashboard />;
  }

  if (currentRole === 'admin') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
};

const UserDashboard: React.FC = () => {
  const recentOrders = [
    { id: '1', service: 'Grocery Shopping', status: 'delivered', date: '2024-01-15', cost: 'KSh 450' },
    { id: '2', service: 'Document Printing', status: 'in-progress', date: '2024-01-15', cost: 'KSh 120' },
    { id: '3', service: 'Bill Payment', status: 'pending', date: '2024-01-14', cost: 'KSh 50' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back to Swift Assist!</h1>
        <p className="text-blue-100 mb-6">Your trusted partner for errands in Kerugoya</p>
        <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2">
          <span>Book New Errand</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm">+15% this month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Orders</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
          <div className="mt-4">
            <span className="text-orange-500 text-sm">2 in progress</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-2xl font-bold text-gray-900">21</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm">98% success rate</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  order.status === 'delivered' ? 'bg-green-500' :
                  order.status === 'in-progress' ? 'bg-orange-500' : 'bg-gray-400'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">{order.service}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-900 font-medium">{order.cost}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProviderDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Service Provider Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900">Available Tasks</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">8</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900">Today's Earnings</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">KSh 2,450</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900">Completed Today</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">6</p>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">1,247</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900">Active Providers</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">89</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900">Today's Orders</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">156</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900">Revenue</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">KSh 45K</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;