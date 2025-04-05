"use client"

import { useHospital } from "@/context/HospitalContext"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ArrowRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { RefreshCw } from "lucide-react"

const HospitalCards = () => {
  const { hospitals, isLoading, error, fetchHospitals } = useHospital()
  console.log("🚀 ~ HospitalCards ~ hospitals:", hospitals)
  const navigate = useNavigate()

  const handleRefresh = async () => {
    try {
      await fetchHospitals()
      toast.success("Hospitals refreshed successfully")
    } catch (error) {
      toast.error("Failed to refresh hospitals")
    }
  }

  const handleViewDetails = (hospitalId) => {
    navigate(`/admin/hospital-management/${hospitalId}`)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-end gap-2">
          <Button variant="outline" disabled>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </Button>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Add Hospital 
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // if (error) {
  //   return (
  //     <div className="space-y-6">
  //       <div className="flex justify-end gap-2">
  //         <Button variant="outline" onClick={handleRefresh}>
  //           Refresh
  //         </Button>
  //         <Button onClick={() => navigate("/admin/hospital-management/add-hospital")}>
  //           <Plus className="mr-2 h-4 w-4" />
  //           Add Hospital rrrrrrrrrrrr
  //         </Button>
  //       </div>
  //       <div className="text-center py-8">
  //         <p className="text-destructive mb-4">Error loading hospitals: {error}</p>
  //         <Button variant="outline" onClick={handleRefresh}>
  //           Try Again
  //         </Button>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleRefresh}>
          Refresh
        </Button>
        <Button onClick={() => navigate("/admin/add-hospital")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Hospital mmmm
        </Button>
      </div>

      {hospitals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No hospitals found</p>
          <Button onClick={() => navigate("/admin/hospital-management/add-hospital")}>
            Add Your First Hospital
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <Card 
              key={hospital._id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleViewDetails(hospital._id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{hospital.name}</span>
                  <Badge variant={hospital.status === "active" ? "success" : "destructive"}>
                    {hospital.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </CardTitle>
                <CardDescription className="truncate">{hospital.location}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm truncate">
                  <span className="font-medium">Contact:</span> {hospital.contactNumber || "N/A"}
                </p>
                <p className="text-sm truncate">
                  <span className="font-medium">License:</span> {hospital.licenseNumber}
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full group"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleViewDetails(hospital._id)
                  }}
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default HospitalCards