import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { getRoutePrefix } from "../../utils/roleUtils"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Toaster, toast } from "sonner"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (email && password) {
        let role = "doctor"
        // if (email.includes("doctor")) role = "doctor"
        // else if (email.includes("hospital")) role = "hospital_admin"

        const userData = {
          id: "1",
          name: email.split("@")[0],
          email,
          role,
        }

        login(userData)
        toast.success(`Welcome back, ${userData.name}!`)

        const routePrefix = getRoutePrefix(role)
        console.log("🚀 ~ handleSubmit ~ routePrefix:", routePrefix)
        navigate(routePrefix)
      } else {
        toast.error("Please enter both email and password")
      }
    } catch (err) {
      toast.error("Failed to login. Please check your credentials.")
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Fayda Mediconet</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account? Contact your administrator
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
