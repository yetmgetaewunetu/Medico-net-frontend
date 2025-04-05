import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { getRoutePrefix } from "../utils/roleUtils"
import { Button } from "../components/ui/button"
import { AlertTriangle } from "lucide-react"

const Unauthorized = () => {
   const { user } = useAuth()
  const navigate = useNavigate()
 
  const handleGoBack = () => {
    if (user) {
      const routePrefix = getRoutePrefix(user.role)
      navigate(routePrefix)
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-16 w-16 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact your administrator if you believe this is an
          error.
        </p>
        <Button onClick={handleGoBack}>Go Back</Button>
      </div>
    </div>
  )
}

export default Unauthorized

