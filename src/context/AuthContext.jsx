import { createContext, useContext, useState } from 'react';
import api from '../services/auth';
import { getRoutePrefix } from '../utils/roleUtils';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password, role) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await api.login(email, password, role);
      userData.role = userData.role.toLowerCase(); // Ensure role is in lowercase
      setUser(userData);
      
      const routePrefix = getRoutePrefix(role);
      console.log('Route prefix:', routePrefix); // Debugging line
      // eslint-disable-next-line no-constant-binary-expression
      navigate(routePrefix || '/');
      
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await api.logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      error,
      clearError: () => setError(null)
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
