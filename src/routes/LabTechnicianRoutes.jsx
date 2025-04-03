"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ROLES } from "../utils/roleUtils"
import Dashboard from "../pages/lab-technician/Dashboard"
import TestRequests from "../pages/lab-technician/TestRequests"
import TestResultForm from "../pages/lab-technician/TestResultForm"
import PatientRecords from "../pages/lab-technician/PatientRecords"
import PatientTestHistory from "../pages/lab-technician/PatientTestHistory"

const LabTechnicianRoutes = () => {
  const { user } = useAuth()

  // Check if user is lab technician
  if (!user || user.role !== ROLES.LAB_TECHNICIAN) {
    return <Navigate to="/unauthorized" replace />
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/test-requests" element={<TestRequests />} />
      <Route path="/test-requests/form/:requestId" element={<TestResultForm />} />
      <Route path="/patient-records" element={<PatientRecords />} />
      <Route path="/patient-records/:patientId" element={<PatientTestHistory />} />
      <Route path="*" element={<Navigate to="/lab-technician" replace />} />
    </Routes>
  )
}

export default LabTechnicianRoutes

