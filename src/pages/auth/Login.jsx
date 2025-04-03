import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card";
import { Toaster, toast } from "sonner";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { login, error, clearError } = useAuth();

  const roles = [
    { value: "doctor", label: "Doctor" },
    { value: "labtechnician", label: "Lab Technician" },
    { value: "pharmacist", label: "Pharmacist" },
    { value: "triage", label: "Triage Nurse" },
    { value: "receptionist", label: "Receptionist" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    // Validate form
    if (!formData.email || !formData.password || !formData.role) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const userData = await login(formData.email, formData.password, formData.role);
      
      // Show welcome message if login succeeds
      toast.success(`Welcome back, ${userData.firstName || userData.email}!`, {
        description: `You are logged in as ${userData.role}`
      });
    } catch (err) {
      // Handle specific error cases
      if (err.message.includes("User not found")) {
        toast.error("Account not found", {
          description: "Please check your email or register for an account",
          action: {
            label: "Register",
            onClick: () => {/* Navigate to registration page */}
          }
        });
      } else if (err.message.includes("Invalid password")) {
        toast.error("Incorrect password", {
          description: "Please check your password and try again",
          action: {
            label: "Reset password",
            onClick: () => {/* Navigate to password reset */}
          }
        });
      } else if (err.message.includes("Access denied")) {
        toast.error("Role mismatch", {
          description: err.message
        });
      } else if (err.message.includes("NetworkError") || err.message.includes("Failed to fetch")) {
        toast.error("Connection error", {
          description: "Cannot connect to server. Please check your network and try again."
        });
      } else {
        toast.error("Login failed", {
          description: err.message || "Please try again later"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EAF7F8] to-[#D2EBED] px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" richColors expand={false} />
      
      <div className="flex w-full max-w-6xl rounded-xl shadow-2xl overflow-hidden bg-white transform transition-all duration-300">
        {/* Image Section */}
        <div className="hidden md:flex flex-1 relative">
          <img 
            src="/hospital.jpg" 
            alt="Healthcare professionals working"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-blue-800/30">
            <div className="p-8 text-white">
              <div className="mb-12">
                <h2 className="text-2xl font-bold">Ethiopian Healthcare Platform</h2>
                <p className="text-sm opacity-90 mt-2">
                  Unified Medical Record System
                </p>
              </div>
              <div className="mt-auto absolute bottom-8 left-8">
                <p className="text-xl font-semibold">Secure Access Portal</p>
                <p className="text-sm mt-2 opacity-90 max-w-[300px]">
                  Authorized medical personnel only
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 flex justify-center items-center p-8 md:p-12">
          <Card className="w-full max-w-md border-none shadow-none bg-transparent">
            <CardHeader className="space-y-4 text-center">
              <div className="mb-6">
                <CardTitle className="text-3xl font-bold text-gray-800 tracking-tight">
                  Fayda Mediconet
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Digital Healthcare Access Platform
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="role" className="text-gray-700 font-medium">
                    Role *
                  </Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="h-12 w-full focus:ring-2 ring-primary/50 border border-gray-300 rounded-lg px-4 bg-white appearance-none"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select your role</option>
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 focus:ring-2 ring-primary/50 border-gray-300 rounded-lg"
                    required
                    disabled={isSubmitting}
                    autoComplete="username"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password *
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 focus:ring-2 ring-primary/50 border-gray-300 rounded-lg"
                    required
                    disabled={isSubmitting}
                    autoComplete="current-password"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary-dark rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-3 text-center mt-6">
              <div className="text-sm text-gray-500 space-y-1">
                <p>24/7 Technical Support</p>
                <div className="flex flex-col gap-1">
                  <a 
                    href="mailto:support@faydamediconet.et" 
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    support@faydamediconet.et
                  </a>
                  <a 
                    href="tel:+251911234567" 
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    +251 911 234 567
                  </a>
                </div>
                <p className="mt-2 text-xs">
                  All access attempts are monitored and recorded
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;