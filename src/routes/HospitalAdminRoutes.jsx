"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ROLES } from "../utils/roleUtils" 
// import Dashboard from "../pages/hospital-admin/Dashboard"
import StaffManagement from "../pages/hospital-admin/StaffManagement"
import PatientRecord from "../pages/hospital-admin/PatientRecord"

const hospitaladministratorRoutes = () => {
  const { user } = useAuth()

  // Check if user is hospital admin
  if (!user || user.role !== ROLES.HOSPITAL_ADMIN) {
    return <Navigate to="/unauthorized" replace />
  }

  return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />} />  */}
      <Route path="/" element={<StaffManagement />} />
      <Route path="/patient-record" element={<PatientRecord />} />
      <Route path="*" element={<Navigate to="/hospital-admin" replace />} />
    </Routes>
  )
}

export default hospitaladministratorRoutes

