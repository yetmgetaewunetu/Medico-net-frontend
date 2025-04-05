"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useHospital } from "@/context/HospitalContext"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowLeft, MoreVertical, UserPlus, Edit, Trash2, X } from "lucide-react"
import { toast } from "sonner"
import HospitalForm from "./components/HospitalForm"
import AdminForm from "./components/AdminForm"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const HospitalDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    currentHospital,
    fetchHospitalById,
    updateHospital,
    deleteHospital,
    registerhospitaladministrator,
    updatehospitaladministrator,
    deletehospitaladministrator,
    isLoading
  } = useHospital()
  
  const [activeTab, setActiveTab] = useState("details")
  const [showAddAdminForm, setShowAddAdminForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showDeleteAdminDialog, setShowDeleteAdminDialog] = useState(false)
  const [adminToDelete, setAdminToDelete] = useState(null)
  const [adminToEdit, setAdminToEdit] = useState(null)

  useEffect(() => {
    if (id) {
      fetchHospitalById(id)
    }
  }, [id])

  const handleUpdateHospital = async (formData) => {
    try {
      await updateHospital(id, formData)
      setShowEditForm(false)
      toast.success("Hospital updated successfully")
    } catch (error) {
      toast.error(error.message || "Failed to update hospital")
    }
  }

  const handleDeleteHospital = async () => {
    try {
      await deleteHospital(id)
      toast.success("Hospital deleted successfully")
      navigate("/admin/hospital-management")
    } catch (error) {
      toast.error(error.message || "Failed to delete hospital")
    } finally {
      setShowDeleteDialog(false)
    }
  }

  const handleAddAdmin = async (adminData) => {
    try {
      await registerhospitaladministrator(id, adminData)
      setShowAddAdminForm(false)
      await fetchHospitalById(id)
      toast.success("Admin added successfully")
    } catch (error) {
      toast.error(error.message || "Failed to add admin")
    }
  }

  const handleUpdateAdmin = async (adminData) => {
    try {
      await updatehospitaladministrator(adminToEdit._id, adminData)
      setAdminToEdit(null)
      await fetchHospitalById(id)
      toast.success("Admin updated successfully")
    } catch (error) {
      toast.error(error.message || "Failed to update admin")
    }
  }

  const handleDeleteAdmin = async () => {
    try {
      await deletehospitaladministrator(adminToDelete._id)
      setShowDeleteAdminDialog(false)
      await fetchHospitalById(id)
      toast.success("Admin deleted successfully")
    } catch (error) {
      toast.error(error.message || "Failed to delete admin")
    } finally {
      setAdminToDelete(null)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  if (isLoading && !currentHospital) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  if (!currentHospital) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground mb-4">Hospital not found</p>
        <Button onClick={() => navigate("/admin/hospital-management")}>
          Back to Hospitals
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => navigate("/admin/hospital-management")} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hospitals
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowEditForm(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">{currentHospital.name}</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="details">Hospital Details</TabsTrigger>
          <TabsTrigger value="admins">Administrators</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Information</CardTitle>
              <CardDescription>Details about {currentHospital.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Hospital Name</p>
                      <p>{currentHospital.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p>{currentHospital.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">License Number</p>
                      <p>{currentHospital.licenseNumber}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Contact Number</p>
                      <p>{currentHospital.contactNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hospital Administrators</CardTitle>
                <CardDescription>
                  Manage administrators for {currentHospital.name}
                </CardDescription>
              </div>
              {!showAddAdminForm && !adminToEdit && (
                <Button onClick={() => setShowAddAdminForm(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Administrator
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {showAddAdminForm ? (
                <AdminForm
                  hospitalId={id}
                  onSubmit={handleAddAdmin}
                  onCancel={() => setShowAddAdminForm(false)}
                />
              ) : adminToEdit ? (
                <AdminForm
                  initialData={adminToEdit}
                  onSubmit={handleUpdateAdmin}
                  onCancel={() => setAdminToEdit(null)}
                  isEditing
                />
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentHospital.admins?.length > 0 ? (
                        currentHospital.admins.map((admin) => (
                          <TableRow key={admin._id}>
                            <TableCell>{admin.firstName} {admin.lastName}</TableCell>
                            <TableCell>{admin.email}</TableCell>
                            <TableCell>
                              <Badge variant={admin.status === "active" ? "success" : "destructive"}>
                                {admin.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDate(admin.lastLogin)}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => setAdminToEdit(admin)}>
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => {
                                      setAdminToDelete(admin)
                                      setShowDeleteAdminDialog(true)
                                    }}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            No administrators found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Hospital Dialog */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Edit {currentHospital.name}</CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowEditForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <HospitalForm
                initialData={{
                  name: currentHospital.name || '',
                  location: currentHospital.location || '',
                  contactNumber: currentHospital.contactNumber || '',
                  licenseNumber: currentHospital.licenseNumber || ''
                }}
                onSubmit={handleUpdateHospital}
                onCancel={() => setShowEditForm(false)}
                isEditing={true}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Hospital Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {currentHospital.name} and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteHospital}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete Hospital
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Admin Confirmation */}
      <AlertDialog open={showDeleteAdminDialog} onOpenChange={setShowDeleteAdminDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Administrator?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {adminToDelete?.firstName} {adminToDelete?.lastName} as an administrator?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAdmin}
              className="bg-destructive hover:bg-destructive/90"
            >
              Remove Admin
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default HospitalDetail