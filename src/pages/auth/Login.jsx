// src/pages/Login.js
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Toaster, toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: ""
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  

  const roles = ["doctor", "labtechnician", "pharmacist", "triage", "receptionist"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password, role } = formData;
      
      if (!email || !password || !role) {
        throw new Error('Please fill all required fields');
      }

      // Call the login function from auth context
      const userData = await login(email, password, role);
      
      toast.success(`Welcome, ${userData.firstName || userData.email}!`);
      
    } catch (err) {
      toast.error(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EAF7F8] to-[#D2EBED] px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="flex w-full max-w-6xl rounded-xl shadow-2xl overflow-hidden bg-white transform transition-all duration-300">
        {/* Image Section */}
        <div className="hidden md:flex flex-1 relative">
          <img 
            src="/hospital.jpg" 
            alt="Healthcare Background"
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
                    Role
                  </Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="h-12 w-full focus:ring-2 ring-primary/50 border border-gray-300 rounded-lg px-4 bg-white appearance-none"
                    required
                  >
                    <option value="">Select your role</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1).replace(/technician/, " Technician")}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 focus:ring-2 ring-primary/50 border-gray-300 rounded-lg [&::-webkit-credentials-auto-fill-button]:hidden"
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 focus:ring-2 ring-primary/50 border-gray-300 rounded-lg [&::-webkit-credentials-auto-fill-button]:hidden"
                    required
                  />
                </div>


                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary-dark rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg 
                        className="animate-spin h-5 w-5 mr-3" 
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="fill-current text-white"
                          d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
                        />
                        <path
                          className="fill-current text-white opacity-75"
                          d="M19 12C19 8.13401 15.866 5 12 5V2C17.5228 2 22 6.47715 22 12H19ZM12 5C8.13401 5 5 8.13401 5 12H2C2 6.47715 6.47715 2 12 2V5Z"
                        />
                      </svg>
                      Authenticating...
                    </span>
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
