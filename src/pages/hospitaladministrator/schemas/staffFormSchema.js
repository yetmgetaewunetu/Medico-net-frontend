// schemas/staffFormSchema.js
import { z } from 'zod';

const baseSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.date().optional(),
  gender: z.enum(["Male", "Female", "Other"]),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contactNumber: z.string().min(10, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
  hospitalID: z.string().min(1, "Hospital ID is required"),
});

const doctorSchema = baseSchema.extend({
  specialization: z.string().min(1, "Specialization is required"),
});

const pharmacistSchema = baseSchema.extend({
  licenseNumber: z.string().min(1, "License number is required"),
});

const labTechnicianSchema = baseSchema.extend({
  labType: z.string().min(1, "Lab type is required"),
});

const receptionistSchema = baseSchema.extend({
  shift: z.string().min(1, "Shift is required"),
});

const triageSchema = baseSchema.extend({
  medicalTraining: z.string().min(1, "Medical training is required"),
});

const hospitalAdminSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.date().optional(),
  gender: z.enum(["Male", "Female", "Other"]),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const staffFormSchema = {
  Doctor: doctorSchema,
  Pharmacist: pharmacistSchema,
  LabTechnician: labTechnicianSchema,
  Receptionist: receptionistSchema,
  Triage: triageSchema,
  HospitalAdministrator: hospitalAdminSchema,
};