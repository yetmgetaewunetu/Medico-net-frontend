"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate, useParams } from "react-router-dom"
import { useHospital } from "@/context/HospitalContext"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { format } from "date-fns"

const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().refine(val => !isNaN(new Date(val).getTime()), "Invalid date"),
  gender: z.enum(["Male", "Female", "Other"]),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits")
})

const Addhospitaladministrator = () => {
  const navigate = useNavigate()
  const { id: hospitalID } = useParams()
  const { currentHospital, registerhospitaladministrator, isLoading } = useHospital()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "Male",
      phoneNumber: ""
    }
  })

  const onSubmit = async (values) => {
    try {
      const formattedData = {
        ...values,
        dateOfBirth: new Date(values.dateOfBirth).toISOString(),
        hospitalID // Add hospitalID from URL params
      }
      
      await registerhospitaladministrator(formattedData)
      toast.success("Hospital admin created successfully!")
      console.log(currentHospital)
      navigate(`/admin/hospital-management/${currentHospital}`)
    } catch (error) {
      toast.error(error.message || "Failed to create admin account")
    }
  }

  if (!currentHospital) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold mb-2">Hospital not found</h2>
          <p className="text-muted-foreground mb-6">
            Please select a valid hospital
          </p>
          <Button onClick={() => navigate("/admin/hospital-management")}>
            Back to Hospitals
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button 
        variant="outline" 
        onClick={() => navigate(`/admin/hospital-management/${hospitalID}`)} 
        className="mb-6"
      >
        Back to Hospital Details
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add Hospital Administrator</CardTitle>
          <CardDescription>
            Create admin account for {currentHospital.name}
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
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
                      <FormLabel>Password*</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth*</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field}
                          max={format(new Date(), 'yyyy-MM-dd')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number*</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <div className="flex justify-end gap-2 p-6 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(`/admin/hospital-management/${hospitalID}`)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Admin"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default Addhospitaladministrator