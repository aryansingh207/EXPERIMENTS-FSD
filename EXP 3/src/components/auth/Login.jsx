import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { colors } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));
    const result = login(username, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Invalid credentials');
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container" style={{ backgroundColor: colors.background }}>
      <div className="login-card" style={{ 
        backgroundColor: colors.cardBackground,
        boxShadow: `0 10px 30px ${colors.shadow}`
      }}>
        <div className="login-header">
          <h1 style={{ color: colors.text }}>🔐 Authentication System</h1>
          <p style={{ color: colors.text }}>JWT Token-Based Login</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label style={{ color: colors.text }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username (admin/editor/viewer)"
              style={{
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.border
              }}
              required
            />
          </div>

          <div className="form-group">
            <label style={{ color: colors.text }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.border
              }}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
            style={{
              backgroundColor: colors.primary,
              color: 'white'
            }}
          >
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>

          <div className="demo-credentials" style={{ color: colors.text }}>
            <p>Demo Credentials:</p>
            <ul>
              <li><strong>Admin:</strong> admin / admin123</li>
              <li><strong>Editor:</strong> editor / editor123</li>
              <li><strong>Viewer:</strong> viewer / viewer123</li>
            </ul>
          </div>
        </form>

        <div className="jwt-info" style={{ color: colors.text }}>
          <h4>🔑 JWT Flow:</h4>
          <ol>
            <li>User submits credentials</li>
            <li>Server validates user</li>
            <li>JWT token generated with user data</li>
            <li>Token stored in localStorage</li>
            <li>Token sent with each request</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Login;