"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ROLES } from "../utils/roleUtils"
import Dashboard from "../pages/admin/Dashboard"
import HospitalManagement from "../pages/admin/HospitalManagement"
import HospitalDetail from "../pages/admin/HospitalDetail"
import AdminManagement from "@/pages/admin/AdminManagement"
import Addhospitaladministrator from "@/pages/admin/AddAdmin"
import AddHospital from "@/pages/admin/AddHospital"
// import SystemSettings from "../pages/admin/SystemSettings"

const SystemAdminRoutes = () => {
  const { user } = useAuth()
   
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      {/* Hospital Management Routes */}
      <Route path="/hospital-management" element={<HospitalManagement />} />
      <Route path="/hospital-management/:id" element={<HospitalDetail />} />
    
      <Route path="/admin-management" element={<AdminManagement />} />
      <Route path="/add-admin" element={<Addhospitaladministrator />} />
      <Route path="/add-hospital" element={<AddHospital />} />




   
      {/* Settings */}
      {/* <Route path="/settings" element={<SystemSettings />} /> */}

      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}

export default SystemAdminRoutes


// import { Routes, Route, Navigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import { ROLES } from "../utils/roleUtils"
// import Dashboard from "../pages/admin/Dashboard"
// import HospitalManagement from "../pages/admin/HospitalManagement"
// import AddHospital from "../pages/admin/AddHospital"
// // import EditHospital from "../pages/admin/EditHospital"
// import AdminManagement from "../pages/admin/AdminManagement"
// import AddAdmin from "../pages/admin/AddAdmin"
// // import EditAdmin from "../pages/admin/EditAdmin"
// // import SystemSettings from "../pages/admin/SystemSettings"

// const SystemAdminRoutes = () => {
// //   const { user } = useAuth()
//     const user = {
//     role : "systemAdmin",
//     name : "adfsdfs"
//   }
//   // Check if user is system admin
// //   if (!user || user.role !== ROLES.SYSTEM_ADMIN) {
// //     return <Navigate to="/unauthorized" replace />
// //   }

//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard />} />

//       {/* Hospital Management Routes */}
//       <Route path="/hospital-management" element={<HospitalManagement />} />
//       <Route path="/hospital-management/add" element={<AddHospital />} />
//       {/* <Route path="/hospital-management/edit/:id" element={<EditHospital />} /> */}

//       {/* Admin Management Routes */}
//       <Route path="/admin-management" element={<AdminManagement />} />
//       <Route path="/admin-management/add" element={<AddAdmin />} />
//       {/* <Route path="/admin-management/edit/:id" element={<EditAdmin />} /> */}

//       {/* Settings */}
//       {/* <Route path="/settings" element={<SystemSettings />} /> */}

//       <Route path="*" element={<Navigate to="/admin" replace />} />
//     </Routes>
//   )
// }

// export default SystemAdminRoutes
