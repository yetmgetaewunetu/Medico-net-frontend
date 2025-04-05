"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

const HospitalContext = createContext()

export const HospitalProvider = ({ children }) => {
  const API_BASE_URL = 'http://localhost:5500'
  const [hospitals, setHospitals] = useState([])
  const [currentHospital, setCurrentHospital] = useState(null)
  const [hospitaladministrators, sethospitaladministrators] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all hospitals
  const fetchHospitals = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/systemAdmin/get-hospitals`, {
        method: 'GET',
        credentials: 'include'
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.msg || 'Failed to fetch hospitals')
      }

      const data = await response.json()
      setHospitals(data)
      return data
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch single hospital by ID with admins
  const fetchHospitalById = async (id) => {
    // Handle "add" route case
    if (id === "add") {
      setCurrentHospital(null);
      return { hospital: null, admins: [] };
    }
  
    setIsLoading(true);
    try {
      // Fix URL formatting (removed double slash)
      const [hospitalRes, adminsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/systemAdmin/get-hospitalDetail/${id}`, {
          method: 'GET',
          credentials: 'include'
        }),
        fetch(`${API_BASE_URL}/systemAdmin/hospitals/${id}/admins`, {
          method: 'GET',
          credentials: 'include'
        })
      ]);
  
      // Handle errors separately for better debugging
      if (!hospitalRes.ok) {
        const errorData = await hospitalRes.json();
        throw new Error(errorData.msg || 'Failed to fetch hospital details');
      }
  
      if (!adminsRes.ok) {
        const errorData = await adminsRes.json();
        throw new Error(errorData.msg || 'Failed to fetch hospital admins');
      }
  
      const hospitalData = await hospitalRes.json();
      const adminsData = await adminsRes.json();
  
      const hospitalWithAdmins = {
        ...hospitalData.hospital,
        admins: adminsData
      };
  
      setCurrentHospital(hospitalWithAdmins);
      return hospitalWithAdmins;
  
    } catch (error) {
      console.error('Error fetching hospital data:', error);
      setError(error.message);
      toast.error(error.message || 'Failed to load hospital data');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register new hospital
  const registerHospital = async (hospitalData) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/systemAdmin/register-hospital`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hospitalData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.msg || 'Failed to register hospital')
      }

      const data = await response.json()
      console.log("🚀 ~ registerHospital ~ data:", data)
      setHospitals(prev => [...prev, data.hospital])
      setCurrentHospital(data.hospital._id)
      toast.success('Hospital registered successfully')
      return data.hospital
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Update hospital
  const updateHospital = async (id, updateData) => {
    console.log("🚀 ~ updateHospital ~ id:", id)
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/systemAdmin/update-hospital/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.msg || 'Failed to update hospital')
      }

      const data = await response.json()
      setHospitals(prev => prev.map(h => h._id === id ? data : h))
      if (currentHospital?._id === id) {
        setCurrentHospital(data)
      }
      toast.success('Hospital updated successfully')
      return data
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Delete hospital
  const deleteHospital = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/systemAdmin/delete-hospital/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.msg || 'Failed to delete hospital')
      }

      setHospitals(prev => prev.filter(h => h._id !== id))
      if (currentHospital?._id === id) {
        setCurrentHospital(null)
      }
      toast.success('Hospital deleted successfully')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  
  // Register hospital admin
  const registerhospitaladministrator = async (adminData) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/systemAdmin/register-hospitaladministrator`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...adminData,
          hospitalID: currentHospital,
          role: 'hospitaladministratoristrator'
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.msg || 'Failed to register admin')
      }

      const data = await response.json()
      toast.success('Admin registered successfully')
      return data
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }
     
  // Update hospital admin
  const updatehospitaladministrator = async (id, updateData) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/systemAdmin/update-hospitaladministrator/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.msg || 'Failed to update admin')
      }

      const data = await response.json()
      if (currentHospital) {
        setCurrentHospital(prev => ({
          ...prev,
          admins: prev.admins.map(a => a._id === id ? data : a)
        }))
      }
      toast.success('Admin updated successfully')
      return data
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Delete hospital admin
  const deletehospitaladministrator = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/systemAdmin/delete-hospitaladministrator/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.msg || 'Failed to delete admin')
      }

      if (currentHospital) {
        setCurrentHospital(prev => ({
          ...prev,
          admins: prev.admins.filter(a => a._id !== id)
        }))
      }
      toast.success('Admin deleted successfully')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Toggle hospital status
  const toggleHospitalStatus = async (id, currentStatus) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
      await updateHospital(id, { status: newStatus })
    } catch (error) {
      throw error
    }
  }

  // Reset current hospital
  const resetCurrentHospital = () => {
    setCurrentHospital(null)
  }

  // Initial data fetch
  useEffect(() => {
    fetchHospitals()
  }, [])

  return (
    <HospitalContext.Provider value={{
      hospitals,
      currentHospital,
      hospitaladministrators,
      fetchHospitals,
      fetchHospitalById,
      registerHospital,
      updateHospital,
      deleteHospital,
      registerhospitaladministrator,
      updatehospitaladministrator,
      deletehospitaladministrator,
      toggleHospitalStatus,
      resetCurrentHospital,
      isLoading,
      error
    }}>
      {children}
    </HospitalContext.Provider>
  )
}

export const useHospital = () => {
  const context = useContext(HospitalContext)
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider')
  }
  return context
}