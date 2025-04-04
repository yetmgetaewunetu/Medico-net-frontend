import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Layout from "./components/layout/Layout"
import Login from "./pages/auth/Login"
import Unauthorized from "./pages/Unauthorized"
import AdminRoutes from "./routes/AdminRoutes"
// import hospitaladministratorRoutes from "./routes/hospitaladministratorRoutes"
import DoctorRoutes from "./routes/DoctorRoutes"
import LabTechnicianRoutes from "./routes/LabTechnicianRoutes"
import PharmacistRoutes from "./routes/PharmacistRoutes"
import TriageRoutes from "./routes/TriageRoutes"
import ReceptionistRoutes from "./routes/ReceptionistRoutes"
import SystemAdminRoutes from "./routes/SystemAdminRoutes"
import { Toaster } from "sonner"
import { StaffProvider } from "./context/StaffContext"
// import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    // <ThemeProvider defaultTheme="light">
      <Router>
      <AuthProvider>
      <StaffProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Layout />}>
              {/* Admin Routes */}
              <Route path="/hospitaladministrator/*" element={<AdminRoutes />} />

              {/* Hospital Admin Routes */}
              {/* <Route path="/hospital-admin/*" element={<hospitaladministratorRoutes />} /> */}

              {/* System Admin Routes */}
              <Route path="/admin/*" element={<SystemAdminRoutes />} />

              {/* Doctor Routes */}
              <Route path="/doctor/*" element={<DoctorRoutes />} />

              {/* Lab Technician Routes */}
              <Route path="/lab-technician/*" element={<LabTechnicianRoutes />} />

              {/* Pharmacist Routes */}
              <Route path="/pharmacist/*" element={<PharmacistRoutes />} />

              {/* Triage Routes */}
              <Route path="/triage/*" element={<TriageRoutes />} />

              {/* Receptionist Routes */}
              <Route path="/receptionist/*" element={<ReceptionistRoutes />} />

              {/* Redirect to login if no match */}
{/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
            </Route>
          </Routes>
        <Toaster /></StaffProvider>
      </AuthProvider>
    </Router>
    // </ThemeProvider>
  )
}

export default App

