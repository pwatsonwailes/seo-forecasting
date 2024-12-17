import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { SignUpForm } from './components/auth/SignUpForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import { LogOut } from 'lucide-react';

function App() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {user && (
        <header className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                  SEO Traffic Forecasting
                </h1>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </div>
          </div>
        </header>
      )}

      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/" /> : <LoginForm />
        } />
        <Route path="/signup" element={
          user ? <Navigate to="/" /> : <SignUpForm />
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;