// src/components/StaffForm.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffFormSchema } from "./schemas/staffFormSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStaff } from "@/context/StaffContext";
import { useEffect } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const roleSpecificFields = {
  Doctor: [
    { name: "specialization", label: "Specialization", type: "text" }
  ],
  Pharmacist: [
    { name: "licenseNumber", label: "License Number", type: "text" }
  ],
  LabTechnician: [
    { name: "labType", label: "Lab Type", type: "text" }
  ],
  Receptionist: [
    { name: "shift", label: "Shift", type: "text" }
  ],
  Triage: [
    { name: "medicalTraining", label: "Medical Training", type: "text" }
  ],
  HospitalAdministrator: []
};

export function StaffForm({ defaultValues, onSubmit, role, onSuccess }) {
  const { addStaff, updateStaff, loading } = useStaff();
  const isEdit = !!defaultValues?._id;

  // Function to get hospitalId from token
  const getHospitalIdFromToken = () => {
    try {
      const token = cookies.get('jwt');
      if (!token) {
        console.error('JWT token not found in cookies');
        return null;
      }

      // Manual JWT decode (no external dependency)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
      
      if (!decoded?.hospitalId) {
        console.error('hospitalId not found in token payload');
        return null;
      }

      return decoded.hospitalId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const form = useForm({
    resolver: zodResolver(staffFormSchema[role]),
    defaultValues: {
      role,
      ...defaultValues,
      dateOfBirth: defaultValues?.dateOfBirth 
        ? new Date(defaultValues.dateOfBirth).toISOString().split('T')[0]
        : '',
      hospitalID: role !== "HospitalAdministrator" 
        ? getHospitalIdFromToken() || defaultValues?.hospitalID 
        : undefined
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        ...defaultValues,
        dateOfBirth: defaultValues.dateOfBirth 
          ? new Date(defaultValues.dateOfBirth).toISOString().split('T')[0]
          : '',
        hospitalID: role !== "HospitalAdministrator" 
          ? getHospitalIdFromToken() || defaultValues.hospitalID 
          : undefined
      });
    }
  }, [defaultValues, form, role]);

  const handleSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        hospitalID: role !== "HospitalAdministrator" 
          ? getHospitalIdFromToken() 
          : undefined
      };

      let success;
      if (isEdit) {
        success = await updateStaff(role, defaultValues._id, formattedData);
      } else {
        success = await addStaff(role, formattedData);
      }

      if (success && onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Column 1 - Basic Info */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Column 2 - Personal Info */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input 
                      type="date"
                      {...field}
                      value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                      max={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null;
                        field.onChange(date);
                      }}
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
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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

            {!isEdit && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Password" 
                        {...field} 
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Column 3 - Role Specific Info */}
          <div className="space-y-6">
            {role !== "HospitalAdministrator" && (
              <>
                {/* Hidden hospitalID field */}
                <div style={{ display: 'none' }}>
                  <FormField
                    control={form.control}
                    name="hospitalID"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            {...field} 
                            value={getHospitalIdFromToken() || field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Role-specific fields */}
            {roleSpecificFields[role]?.map(({ name, label, type = 'text' }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input type={type} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : isEdit ? "Update Staff" : "Add Staff"}
          </Button>
        </div>
      </form>
    </Form>
  );
}