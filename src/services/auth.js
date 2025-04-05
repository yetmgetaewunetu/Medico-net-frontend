const API_BASE_URL = 'http://localhost:5500';

const api = {
  async login(email, password, role) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle specific error messages from backend
        const errorMsg = data.msg || 
          (response.status === 401 ? 'Invalid credentials' : 
           response.status === 404 ? 'User not found' : 
           'Login failed');
        throw new Error(errorMsg);
      }

      if (!data.success) {
        throw new Error(data.msg || 'Login failed');
      }
      console.log("🚀 ~ login ~ role:", data.role)
       
      return {
        id: data.userId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        role: data.role
      };
      
        
    } catch (error) {
      console.error('API login error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
};

export default api;