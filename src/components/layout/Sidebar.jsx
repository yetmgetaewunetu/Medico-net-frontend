

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { getRoutePrefix } from "../../utils/roleUtils"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  ClipboardList,
  Database,
  Package,
  Activity,
  List,
  UserPlus,
  CreditCard,
} from "lucide-react"
import { cn } from "../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const Sidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const routePrefix = getRoutePrefix(user?.role)

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="w-60 h-screen flex flex-col sidebar-gradient text-white">
      {/* App Title */}
      <div className="p-4 border-b border-white/20">
        <h1 className="text-xl font-bold">Fayda Mediconet</h1>
      </div>

      {/* User Profile */}
      <div className="p-4 flex items-center gap-3 border-b border-white/20">
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/40" alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{user?.name || "Abel"}</p>
          <p className="text-sm text-white/80">
            {user?.role === "lab_technician"
              ? "Lab Technician"
              : user?.role === "pharmacist"
                ? "Pharmacist"
                : user?.role === "triage"
                  ? "Triage Nurse"
                  : user?.role === "receptionist"
                    ? "Receptionist"
                    : user?.role || "Role"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {/* Receptionist specific links */}
          {user?.role === "receptionist" && (
            <>
              {/* Dashboard */}
              <li>
                <Link to={routePrefix} className={cn("sidebar-item", isActive(routePrefix) && "active")}>
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>

              {/* Patient Registration */}
              <li>
                <Link
                  to={`${routePrefix}/patient-registration`}
                  className={cn(
                    "sidebar-item",
                    location.pathname.includes(`${routePrefix}/patient-registration`) && "active",
                  )}
                >
                  <UserPlus size={20} />
                  <span>Patient Registration</span>
                </Link>
              </li>

              {/* Patient Records */}
              <li>
                <Link
                  to={`${routePrefix}/patient-records`}
                  className={cn(
                    "sidebar-item",
                    location.pathname.includes(`${routePrefix}/patient-records`) && "active",
                  )}
                >
                  <FileText size={20} />
                  <span>Patient Records</span>
                </Link>
              </li>

              {/* Transaction */}
              <li>
                <Link
                  to={`${routePrefix}/transaction`}
                  className={cn("sidebar-item", location.pathname.includes(`${routePrefix}/transaction`) && "active")}
                >
                  <CreditCard size={20} />
                  <span>Transaction</span>
                </Link>
              </li>
            </>
          )}

          {/* Pharmacist specific links */}
          {user?.role === "pharmacist" && (
            <>
              {/* Dashboard */}
              <li>
                <Link to={routePrefix} className={cn("sidebar-item", isActive(routePrefix) && "active")}>
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>

              {/* Prescriptions */}
              <li>
                <Link
                  to={`${routePrefix}/prescriptions`}
                  className={cn("sidebar-item", location.pathname.includes(`${routePrefix}/prescriptions`) && "active")}
                >
                  <ClipboardList size={20} />
                  <span>Prescriptions</span>
                </Link>
              </li>

              {/* Medication Inventory */}
              <li>
                <Link
                  to={`${routePrefix}/inventory`}
                  className={cn("sidebar-item", location.pathname.includes(`${routePrefix}/inventory`) && "active")}
                >
                  <Package size={20} />
                  <span>Inventory</span>
                </Link>
              </li>
            </>
          )}

          {/* Triage specific links */}
          {user?.role === "triage" && (
            <>
              {/* Dashboard */}
              <li>
                <Link to={routePrefix} className={cn("sidebar-item", isActive(routePrefix) && "active")}>
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>

              {/* Patient Queue */}
              <li>
                <Link
                  to={`${routePrefix}/patient-queue`}
                  className={cn("sidebar-item", location.pathname.includes(`${routePrefix}/patient-queue`) && "active")}
                >
                  <List size={20} />
                  <span>Patient Queue</span>
                </Link>
              </li>

              {/* Vital Records - Fix the path to not require patientId */}
              <li>
                <Link
                  to={`${routePrefix}/vital-records`}
                  className={cn("sidebar-item", location.pathname.includes(`${routePrefix}/vital-records`) && "active")}
                >
                  <Activity size={20} />
                  <span>Vital Records</span>
                </Link>
              </li>
            </>
          )}

          {/* Lab Technician specific links */}
          {user?.role === "lab_technician" && (
            <>
              {/* Dashboard */}
              <li>
                <Link to={routePrefix} className={cn("sidebar-item", isActive(routePrefix) && "active")}>
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>

              {/* Test Requests */}
              <li>
                <Link
                  to={`${routePrefix}/test-requests`}
                  className={cn("sidebar-item", location.pathname.includes(`${routePrefix}/test-requests`) && "active")}
                >
                  <ClipboardList size={20} />
                  <span>Test Requests</span>
                </Link>
              </li>

              {/* Patient Records */}
              <li>
                <Link
                  to={`${routePrefix}/patient-records`}
                  className={cn(
                    "sidebar-item",
                    location.pathname.includes(`${routePrefix}/patient-records`) && "active",
                  )}
                >
                  <Database size={20} />
                  <span>Patient Records</span>
                </Link>
              </li>
            </>
          )}

          {/* Doctor specific links */}
          {user?.role === "doctor" && (
            <>
              {/* Dashboard */}
              <li>
                <Link to={routePrefix} className={cn("sidebar-item", isActive(routePrefix) && "active")}>
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>

              {/* Patient */}
              <li>
                <Link
                  to={`${routePrefix}/patient-record`}
                  className={cn(
                    "sidebar-item",
                    location.pathname.includes(`${routePrefix}/patient-record`) && "active",
                  )}
                >
                  <Users size={20} />
                  <span>Patient</span>
                </Link>
              </li>

              {/* Lab Results */}
              <li>
                <Link
                  to={`${routePrefix}/lab-results`}
                  className={cn("sidebar-item", location.pathname.includes(`${routePrefix}/lab-results`) && "active")}
                >
                  <FileText size={20} />
                  <span>Lab Results</span>
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    4
                  </span>
                </Link>
              </li>

              {/* Settings */}
              <li>
                <Link
                  to={`${routePrefix}/settings`}
                  className={cn("sidebar-item", location.pathname.includes(`${routePrefix}/settings`) && "active")}
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </Link>
              </li>
            </>
          )}

          {/* Admin specific links */}
          {user?.role === "admin" && (
            <>
              {/* Dashboard */}
              <li>
                <Link to={routePrefix} className={cn("sidebar-item", isActive(routePrefix) && "active")}>
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>

              {/* Staff Management */}
              <li>
                <Link
                  to={`${routePrefix}/staff-management`}
                  className={cn(
                    "sidebar-item",
                    location.pathname.includes(`${routePrefix}/staff-management`) && "active",
                  )}
                >
                  <Users size={20} />
                  <span>Staff Management</span>
                </Link>
              </li>

              {/* Patient Record */}
              <li>
                <Link
                  to={`${routePrefix}/patient-record`}
                  className={cn(
                    "sidebar-item",
                    location.pathname.includes(`${routePrefix}/patient-record`) && "active",
                  )}
                >
                  <FileText size={20} />
                  <span>Patient Record</span>
                </Link>
              </li>

              {/* Settings */}
              <li>
                <Link
                  to={`${routePrefix}/settings`}
                  className={cn("sidebar-item", location.pathname.includes(`${routePrefix}/settings`) && "active")}
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar

