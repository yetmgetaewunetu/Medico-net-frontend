"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ROLES } from "../utils/roleUtils"
import Dashboard from "../pages/pharmacist/Dashboard"
import Prescriptions from "../pages/pharmacist/Prescriptions"
import PrescriptionDetails from "../pages/pharmacist/PrescriptionDetails"
import PatientHistory from "../pages/pharmacist/PatientHistory"

const PharmacistRoutes = () => {
  const { user } = useAuth()

  // Check if user is pharmacist
  if (!user || user.role !== ROLES.PHARMACIST) {
    return <Navigate to="/unauthorized" replace />
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/prescriptions" element={<Prescriptions />} />
      <Route path="/prescriptions/:prescriptionId" element={<PrescriptionDetails />} />
      <Route path="/patient-history/:patientId" element={<PatientHistory />} />
      <Route path="*" element={<Navigate to="/pharmacist" replace />} />
    </Routes>
  )
}

export default PharmacistRoutes

