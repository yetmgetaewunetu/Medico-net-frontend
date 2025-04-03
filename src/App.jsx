import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Layout from "./components/layout/Layout"
import Login from "./pages/auth/Login"
import Unauthorized from "./pages/Unauthorized"
import AdminRoutes from "./routes/AdminRoutes"
// import HospitalAdminRoutes from "./routes/HospitalAdminRoutes"
import DoctorRoutes from "./routes/DoctorRoutes"
import { Toaster } from "sonner"
// import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    // <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Layout />}>
              {/* Admin Routes */}
              <Route path="/admin/*" element={<AdminRoutes />} />

              {/* Hospital Admin Routes */}
              {/* <Route path="/hospital-admin/*" element={<HospitalAdminRoutes />} /> */}

              {/* Doctor Routes */}
              <Route path="/doctor/*" element={<DoctorRoutes />} />

              {/* Redirect to login if no match */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    // </ThemeProvider>
  )
}

export default App

