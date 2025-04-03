"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ROLES } from "../utils/roleUtils"
import Dashboard from "../pages/triage/Dashboard"
// import PatientQueue from "../pages/triage/PatientQueue"
import VitalRecordsForm from "../pages/triage/VitalRecordsForm"
import PatientHistory from "../pages/triage/PatientHistory"

const TriageRoutes = () => {
  const { user } = useAuth()

  // Check if user is triage
  if (!user || user.role !== ROLES.TRIAGE) {
    return <Navigate to="/unauthorized" replace />
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="/patient-queue" element={<PatientQueue />} /> */}
      {/* Add a route without patientId parameter */}
      <Route path="/vital-records" element={<VitalRecordsForm />} />
      <Route path="/vital-records/:patientId" element={<VitalRecordsForm />} />
      <Route path="/patient-history/:patientId" element={<PatientHistory />} />
      <Route path="*" element={<Navigate to="/triage" replace />} />
    </Routes>
  )
}

export default TriageRoutes

