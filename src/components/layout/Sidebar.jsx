import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { getRoutePrefix } from "../../utils/roleUtils"
import { LayoutDashboard, Users, FileText, Settings } from "lucide-react"
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
            {user?.role === "doctor" ? "Doctor(Gynecologist)" : user?.role || "Role"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
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

          {/* Hospital Admin specific links */}
          {user?.role === "hospital_admin" && (
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

