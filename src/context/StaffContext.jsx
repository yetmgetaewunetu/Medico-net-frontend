// src/context/StaffContext.jsx
import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

const StaffContext = createContext();
const API_BASE_URL = 'http://localhost:5500';

export function StaffProvider({ children }) {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStaff = async (role) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/${role.toLowerCase()}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch staff data');
      }
      const data = await response.json();
      setStaff(data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch staff data");
      console.error('Fetch staff error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addStaff = async (role, formData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/${role.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add staff');
      }

      const data = await response.json();
      setStaff(prev => [...prev, data.staff]);
      toast.success("Staff member added successfully");
      return true;
    } catch (error) {
      toast.error(error.message || "Failed to add staff");
      console.error('Add staff error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateStaff = async (role, id, formData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/${role.toLowerCase()}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update staff');
      }

      const data = await response.json();
      setStaff(prev =>
        prev.map(staff =>
          staff._id === id ? data.staff : staff
        )
      );
      toast.success("Staff member updated successfully");
      return true;
    } catch (error) {
      toast.error(error.message || "Failed to update staff");
      console.error('Update staff error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <StaffContext.Provider value={{
      staff,
      loading,
      fetchStaff,
      addStaff,
      updateStaff,
    }}>
      {children}
    </StaffContext.Provider>
  );
}

export const useStaff = () => useContext(StaffContext);