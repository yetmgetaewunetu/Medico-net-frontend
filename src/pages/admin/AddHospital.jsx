"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useHospital } from "@/context/HospitalContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const AddHospital = () => {
  const navigate = useNavigate()
  const { registerHospital, isLoading } = useHospital()
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contactNumber: "",
    licenseImage: "",
    licenseNumber: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await registerHospital(formData)
      // On success, navigate to admin creation page
      navigate("/admin/add-admin")
    } catch (error) {
      // Error is already handled in the context
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button 
        variant="outline" 
        onClick={() => navigate("/admin/hospital-management")} 
        className="mb-6"
      >
        Back to Hospital Management
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Register New Hospital</CardTitle>
          <CardDescription>Provide hospital details to proceed</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Hospital Name*</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location*</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number*</Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number*</Label>
                <Input
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseImage">License Image URL*</Label>
              <Input
                id="licenseImage"
                name="licenseImage"
                type="url"
                value={formData.licenseImage}
                onChange={handleChange}
                placeholder="https://example.com/license.jpg"
                required
              />
            </div>
          </CardContent>

          <div className="flex justify-end gap-2 p-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/admin/hospital-management")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Next: Add Admin"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default AddHospital