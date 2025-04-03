// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/auth';
import { getRoutePrefix } from '../utils/roleUtils';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await api.getUserProfile();
        setUser(userData);
        
        if (userData?.role) {
          const routePrefix = getRoutePrefix(userData.role);
          navigate(routePrefix);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const login = async (email, password, role) => {
    try {
      const userData = await api.login(email, password, role);
      const profileData = await api.getUserProfile();
      setUser(profileData);
      
      if (profileData?.role) {
        const routePrefix = getRoutePrefix(profileData.role);
        navigate(routePrefix);
      } else {
        navigate('/');
      }
      
      return profileData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
