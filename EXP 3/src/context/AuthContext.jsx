import React, { createContext, useState, useContext, useEffect } from 'react';
import { generateToken, decodeToken, isTokenValid, authenticateUser } from '../utils/jwtUtils';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken && isTokenValid(storedToken)) {
      const decoded = decodeToken(storedToken);
      setUser(decoded);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const authenticatedUser = authenticateUser(username, password);
    if (authenticatedUser) {
      const newToken = generateToken(authenticatedUser);
      localStorage.setItem('authToken', newToken);
      setToken(newToken);
      setUser(authenticatedUser);
      return { success: true, user: authenticatedUser };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  const hasRole = (requiredRole) => {
    if (!user) return false;
    if (requiredRole === 'admin') return user.role === 'admin';
    if (requiredRole === 'editor') return user.role === 'admin' || user.role === 'editor';
    if (requiredRole === 'viewer') return true;
    return false;
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    hasRole,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};