"use client"

import { useHospital } from "@/context/HospitalContext"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, MoreVertical, Search, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { useEffect } from "react"
import { useState } from "react"

const HospitalTable = () => {
  const navigate = useNavigate()
  const {
    hospitals,
    isLoading,
    error,
    fetchHospitals
  } = useHospital()
  const [searchTerm, setSearchTerm] = useState("")

  // Filter hospitals based on search term
  const filteredHospitals = hospitals.filter(hospital => {
    const searchString = searchTerm.toLowerCase()
    return (
      hospital.name?.toLowerCase().includes(searchString) ||
      hospital.location?.toLowerCase().includes(searchString) ||
      hospital.contactNumber?.toLowerCase().includes(searchString) ||
      hospital.licenseNumber?.toLowerCase().includes(searchString)
    )
  })

  const handleRefresh = async () => {
    try {
      await fetchHospitals()
      toast.success("Hospitals refreshed successfully")
    } catch (error) {
      toast.error("Failed to refresh hospitals")
    }
  }

  useEffect(() => {
    fetchHospitals()
  }, [])

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-destructive mb-4">Error loading hospitals: {error}</p>
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Hospital Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button onClick={() => navigate("/admin/hospital-management/add-hospital")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Hospital
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, location, contact or license..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          disabled={isLoading}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[25%]">Hospital Name</TableHead>
              <TableHead className="w-[20%]">Location</TableHead>
              <TableHead className="w-[20%]">Contact Number</TableHead>
              <TableHead className="w-[20%]">License Number</TableHead>
              <TableHead className="text-right w-[15%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && hospitals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Loading hospitals...
                </TableCell>
              </TableRow>
            ) : filteredHospitals.length > 0 ? (
              filteredHospitals.map((hospital) => (
                <TableRow key={hospital._id}>
                  <TableCell className="font-medium">{hospital.name}</TableCell>
                  <TableCell>{hospital.location}</TableCell>
                  <TableCell>{hospital.contactNumber || "N/A"}</TableCell>
                  <TableCell>{hospital.licenseNumber}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => navigate(`/admin/hospital-management/${hospital._id}`)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate(`/admin/hospital-management/${hospital._id}/admins`)}
                        >
                          Manage Administrators
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  {searchTerm ? "No matching hospitals found" : "No hospitals available"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default HospitalTable