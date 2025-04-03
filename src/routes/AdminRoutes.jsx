import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ROLES } from "../utils/roleUtils"
import Dashboard from "../pages/admin/Dashboard"
import StaffManagement from "../pages/admin/StaffManagement"
import AddNewStaff from "../pages/admin/AddNewStaff"
import EditViewStaff from "../pages/admin/EditViewStaff"
import PatientRecord from "../pages/admin/PatientRecord"
import ViewRecords from "../pages/admin/ViewRecords"
import RecordAuditLogs from "../pages/admin/RecordAuditLogs"

const AdminRoutes = () => {
  const { user } = useAuth()

  // Check if user is admin
  if (!user || user.role !== ROLES.ADMIN) {
    return <Navigate to="/unauthorized" replace />
  }

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

