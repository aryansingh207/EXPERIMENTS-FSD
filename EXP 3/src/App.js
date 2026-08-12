import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import AdminPanel from './components/AdminPanel';
import EditorPanel from './components/EditorPanel';
import ViewerPanel from './components/ViewerPanel';
import Navigation from './components/auth/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <Dashboard />
                  </>
                </ProtectedRoute>
              } />
              
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <>
                    <Navigation />
                    <AdminPanel />
                  </>
                </ProtectedRoute>
              } />
              
              <Route path="/editor" element={
                <ProtectedRoute requiredRole="editor">
                  <>
                    <Navigation />
                    <EditorPanel />
                  </>
                </ProtectedRoute>
              } />
              
              <Route path="/viewer" element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <ViewerPanel />
                  </>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;