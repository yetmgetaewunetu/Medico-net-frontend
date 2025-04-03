

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ROLES } from "../utils/roleUtils"
import Dashboard from "../pages/doctor/Dashboard"
import PatientRecord from "../pages/doctor/PatientRecord"
import ViewRecords from "../pages/doctor/ViewRecords"
import Appointments from "../pages/doctor/Appointments"
import LabResults from "../pages/doctor/LabResults"
import Prescriptions from "../pages/doctor/Prescriptions"

const DoctorRoutes = () => {
  // const { user } = useAuth()

  const user = {
    role : "doctor",
    name : "doctor"
  }

  // Check if user is doctor
  // if (!user || user.role !== ROLES.DOCTOR) {
  //   return <Navigate to="/unauthorized" replace />
  // }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/patient-record" element={<PatientRecord />} />
      <Route path="/patient-record/view/:patientId" element={<ViewRecords />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/lab-results" element={<LabResults />} />
      <Route path="/prescriptions" element={<Prescriptions />} />
      <Route path="*" element={<Navigate to="/doctor" replace />} />
    </Routes>
  )
}

export default DoctorRoutes

