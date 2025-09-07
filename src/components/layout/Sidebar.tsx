import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  FileText, 
  MapPin, 
  User, 
  Truck,
  Shield,
  Menu,
  Zap
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRole, onRoleChange }) => {
  const userNavItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/services', icon: ShoppingCart, label: 'Services' },
    { path: '/request', icon: FileText, label: 'New Request' },
    { path: '/tracking', icon: MapPin, label: 'Track Orders' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const providerNavItems = [
    { path: '/provider', icon: Truck, label: 'Task Dashboard' },
    { path: '/tracking', icon: MapPin, label: 'Active Tasks' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const adminNavItems = [
    { path: '/admin', icon: Shield, label: 'Admin Panel' },
    { path: '/tracking', icon: MapPin, label: 'All Tasks' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const getNavItems = () => {
    switch (currentRole) {
      case 'provider': return providerNavItems;
      case 'admin': return adminNavItems;
      default: return userNavItems;
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Swift Assist</h2>
            <p className="text-xs text-gray-500">Your errands, done fast</p>
          </div>
        </div>
      </div>

      {/* Role Selector */}
      <div className="p-4 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">Switch Role</label>
        <select 
          value={currentRole} 
          onChange={(e) => onRoleChange(e.target.value as UserRole)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="user">Customer</option>
          <option value="provider">Service Provider</option>
          <option value="admin">Administrator</option>
        </select>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {getNavItems().map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg p-4 text-white">
          <h3 className="font-semibold text-sm">Need help?</h3>
          <p className="text-xs opacity-90 mt-1">Contact our support team 24/7</p>
          <button className="mt-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded text-xs font-medium transition-colors">
            Get Help
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;