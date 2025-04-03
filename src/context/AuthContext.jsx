import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const roles = ["doctor", "labtechnician", "pharmacist", "triage", "receptionist"]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // Simulate login with a fixed role for testing
  const login = () => {
    // const randomRole = roles[Math.floor(Math.random() * roles.length)]
    const userData = { name: "Test User", role: "triage" }
    setUser(userData)
    console.log("User logged in:", userData) // Debugging
    // localStorage.setItem("user", JSON.stringify(userData)) // Uncomment if localStorage is used
    return userData
  }

  const logout = () => {
    setUser(null)
    // localStorage.removeItem("user") // Uncomment if localStorage is used
    console.log("User logged out") // Debugging
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
