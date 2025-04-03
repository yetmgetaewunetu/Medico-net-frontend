// Role constants
export const ROLES = {
  ADMIN: "admin",
  HOSPITAL_ADMIN: "hospital_admin",
  DOCTOR: "doctor",
  NURSE: "nurse",
  RECEPTIONIST: "receptionist",
}

// Check if user has required role
export const hasRole = (user, requiredRole) => {
  if (!user) return false
  return user.role === requiredRole
}

// Check if user has any of the required roles
export const hasAnyRole = (user, requiredRoles) => {
  if (!user) return false
  return requiredRoles.includes(user.role)
}

// Get route prefix based on user role
export const getRoutePrefix = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return "/admin"
    case ROLES.HOSPITAL_ADMIN:
      return "/hospital-admin"
    case ROLES.DOCTOR:
      return "/doctor"
    case ROLES.NURSE:
      return "/nurse"
    case ROLES.RECEPTIONIST:
      return "/receptionist"
    default:
      return "/login"
  }
}

