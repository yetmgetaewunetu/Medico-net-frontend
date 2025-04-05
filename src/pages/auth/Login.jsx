import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  role: z.string().min(1, "Please select a role"),
});

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, clearError } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
  });

  const roles = [
    { value: "doctor", label: "Doctor" },
    { value: "labtechnician", label: "Lab Technician" },
    { value: "pharmacist", label: "Pharmacist" },
    { value: "triage", label: "Triage Nurse" },
    { value: "receptionist", label: "Receptionist" },
    { value: "admin", label: "Admin" },
    { value: "hospitaladministrator", label: "Hospital-Admin" },
  ];

  const onSubmit = async (data) => {
    clearError();
    setIsSubmitting(true);

    try {
      const user = await login(data.email, data.password, data.role);
      toast.success(`Welcome back, ${user.firstName || user.email}!`, {
        description: `You are logged in as ${user.role}`,
      });
    } catch (err) {
      const msg = err.message || "Login failed";

      if (msg.includes("User not found")) {
        toast.error("Account not found", {
          description: "Please check your email or register.",
        });
      } else if (msg.includes("Invalid password")) {
        toast.error("Incorrect password", {
          description: "Please try again.",
        });
      } else if (msg.includes("Access denied")) {
        toast.error("Role mismatch", { description: msg });
      } else if (msg.includes("NetworkError") || msg.includes("Failed to fetch")) {
        toast.error("Connection error", {
          description: "Cannot connect to server. Check your network.",
        });
      } else {
        toast.error("Login failed", { description: msg });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EAF7F8] to-[#D2EBED] px-4">
      <Toaster position="top-center" richColors />

      <div className="flex w-full max-w-6xl rounded-xl shadow-2xl overflow-hidden bg-white">
        {/* Image Section */}
        <div className="hidden md:flex flex-1 relative">
          <img
            src="/hospital.jpg"
            alt="Healthcare professionals"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-blue-800/30 p-8 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold">Ethiopian Healthcare Platform</h2>
              <p className="text-sm opacity-90 mt-2">Unified Medical Record System</p>
            </div>
            <div>
              <p className="text-xl font-semibold">Secure Access Portal</p>
              <p className="text-sm mt-2 opacity-90 max-w-[300px]">
                Authorized medical personnel only
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 flex justify-center items-center p-8 md:p-12">
          <Card className="w-full max-w-md border-none shadow-none bg-transparent">
            <CardHeader className="space-y-4 text-center">
              <CardTitle className="text-3xl font-bold text-gray-800">Fayda Mediconet</CardTitle>
              <CardDescription className="text-gray-600">
                Digital Healthcare Access Platform
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role *</FormLabel>
                        <FormControl>
                          <select
                            className="h-12 w-full border border-gray-300 rounded-lg px-4"
                            disabled={isSubmitting}
                            {...field}
                          >
                            <option value="">Select your role</option>
                            {roles.map((role) => (
                              <option key={role.value} value={role.value}>
                                {role.label}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter your password"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12"
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
              </Form>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-3 text-center mt-6 text-sm text-gray-500">
              <p>24/7 Technical Support</p>
              <div className="flex flex-col gap-1">
                <a href="mailto:support@faydamediconet.et" className="text-primary font-medium">
                  support@faydamediconet.et
                </a>
                <a href="tel:+251911234567" className="text-primary font-medium">
                  +251 911 234 567
                </a>
              </div>
              <p className="text-xs mt-2">All access attempts are monitored and recorded</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
