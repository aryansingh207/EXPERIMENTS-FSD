// JWT token generation and validation utilities

// Generate JWT Token
export const generateToken = (user) => {
  // In real application, this would be done on server
  // Here we're simulating JWT creation
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    id: user.id,
    username: user.username,
    role: user.role,
    exp: Date.now() + 3600000 // 1 hour expiry
  }));
  const signature = btoa('secret_signature');
  return `${header}.${payload}.${signature}`;
};

// Decode JWT Token
export const decodeToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

// Validate JWT Token
export const isTokenValid = (token) => {
  if (!token) return false;
  const decoded = decodeToken(token);
  if (!decoded) return false;
  // Check if token is expired
  if (decoded.exp && decoded.exp < Date.now()) return false;
  return true;
};

// Mock user database
export const USERS = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'editor', password: 'editor123', role: 'editor' },
  { id: 3, username: 'viewer', password: 'viewer123', role: 'viewer' }
];

// Authenticate user
export const authenticateUser = (username, password) => {
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

// Get user from token
export const getUserFromToken = (token) => {
  if (!token) return null;
  const decoded = decodeToken(token);
  if (!decoded) return null;
  return decoded;
};

// Check if user has specific role
export const hasRole = (token, role) => {
  const user = getUserFromToken(token);
  if (!user) return false;
  if (role === 'admin') return user.role === 'admin';
  if (role === 'editor') return user.role === 'admin' || user.role === 'editor';
  if (role === 'viewer') return true;
  return false;
};