// src/services/api.js
const API_BASE_URL = 'https://localhost:5500'; // Replace with your actual API URL

const api = {
  async login(email, password, role) {
    try {
      const response =   await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include', // Required for cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Login failed');
      }

      const userData = await response.json();
      
      // Verify the response contains required user data
      if (!userData || !userData.userId) {
        throw new Error('Invalid user data received');
      }

      return {
        id: userData.userId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        // The role will be in the HTTP-only cookie
      };

    } catch (error) {
      console.error('API login error:', error);
      throw error; // Re-throw for handling in the component
    }
  },

  async getUserProfile() {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      credentials: 'include', // Required for cookies
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const userData = await response.json();
    return userData;
  },

  async logout() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  },
};

export default api;
