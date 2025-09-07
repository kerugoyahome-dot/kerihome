import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/pages/Dashboard';
import Services from './components/pages/Services';
import RequestForm from './components/pages/RequestForm';
import TaskTracking from './components/pages/TaskTracking';
import Profile from './components/pages/Profile';
import Login from './components/auth/Login';
import ServiceProvider from './components/pages/ServiceProvider';
import Admin from './components/pages/Admin';
import { User, UserRole } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('user');

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar currentRole={currentRole} onRoleChange={setCurrentRole} />
        <div className="flex-1 flex flex-col">
          <Header user={user} />
          <main className="flex-1 overflow-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard currentRole={currentRole} />} />
              <Route path="/services" element={<Services />} />
              <Route path="/request" element={<RequestForm />} />
              <Route path="/tracking" element={<TaskTracking />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/provider" element={<ServiceProvider />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;