import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ROLES } from "../utils/roleUtils"
import Dashboard from "../pages/hospitaladministrator/Dashboard"
import AddNewStaff from "../pages/hospitaladministrator/AddNewStaff"
import EditViewStaff from "../pages/hospitaladministrator/EditViewStaff"
import PatientRecord from "../pages/hospitaladministrator/PatientRecord"
import ViewRecords from "../pages/hospitaladministrator/ViewRecords"
import RecordAuditLogs from "../pages/hospitaladministrator/RecordAuditLogs"
import { StaffManagement } from "@/pages/hospitaladministrator/staff-management"

const AdminRoutes = () => {
   const { user } = useAuth()

 
  // Check if user is admin
  // if (!user || user.role !== ROLES.ADMIN) {
  //   return <Navigate to="/unauthorized" replace />
  // }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/staff-management" element={<StaffManagement />} />
      <Route path="/staff-management/add" element={<AddNewStaff />} />
      <Route path="/staff-management/edit" element={<EditViewStaff />} />
      <Route path="/patient-record" element={<PatientRecord />} />
      <Route path="/patient-record/view" element={<ViewRecords />} />
      <Route path="/patient-record/audit-logs" element={<RecordAuditLogs />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}

export default AdminRoutes

