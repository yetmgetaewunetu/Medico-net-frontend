
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ROLES } from "../utils/roleUtils"
import Dashboard from "../pages/receptionist/Dashboard"
import PatientRegistration from "../pages/receptionist/PatientRegistration"
import PatientRecords from "../pages/receptionist/PatientRecords"
import PatientDetail from "../pages/receptionist/PatientDetail"
import Transaction from "../pages/receptionist/Transaction"

const ReceptionistRoutes = () => {
  const { user } = useAuth()

  // Check if user is receptionist
  if (!user || user.role !== ROLES.RECEPTIONIST) {
    return <Navigate to="/unauthorized" replace />
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/patient-registration" element={<PatientRegistration />} />
      <Route path="/patient-records" element={<PatientRecords />} />
      <Route path="/patient-records/:patientId" element={<PatientDetail />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="*" element={<Navigate to="/receptionist" replace />} />
    </Routes>
  )
}

export default ReceptionistRoutes

