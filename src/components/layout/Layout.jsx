import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { useEffect } from "react"

const Layout = () => {
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login")
    }
  }, [loading, isAuthenticated, navigate])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return null // Prevent rendering until redirect completes
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
