import { useState } from "react";
import { StaffForm } from "./staff-form";
import { StaffTable } from "./staff-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [currentRole, setCurrentRole] = useState("Doctor");

  const handleEdit = (staff) => {
    setCurrentStaff(staff);
    setCurrentRole(staff.role);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      // Determine the API endpoint based on whether we're creating or updating
      const url = currentStaff?._id 
        ? `/api/staff/${currentStaff._id}`
        : "/api/staff";
      const method = currentStaff?._id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to save staff");

      const savedStaff = await response.json();

      if (currentStaff?._id) {
        // Update existing staff in state
        setStaff(staff.map(s => s._id === savedStaff._id ? savedStaff : s));
      } else {
        // Add new staff to state
        setStaff([...staff, savedStaff]);
      }

      setIsDialogOpen(false);
      setCurrentStaff(null);
    } catch (error) {
      console.error("Error saving staff:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <div className="flex space-x-2">
          <Select
            value={currentRole}
            onValueChange={(value) => setCurrentRole(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Doctor">Doctor</SelectItem>
              <SelectItem value="Receptionist">Receptionist</SelectItem>
              <SelectItem value="Pharmacist">Pharmacist</SelectItem>
              <SelectItem value="LabTechnician">Lab Technician</SelectItem>
              <SelectItem value="Triage">Triage</SelectItem>
              <SelectItem value="HospitalAdministrator">Hospital Admin</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => {
            setCurrentStaff(null);
            setIsDialogOpen(true);
          }}>
            Add Staff
          </Button>
        </div>
      </div>

      <StaffTable data={staff} onEdit={handleEdit} />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentStaff ? "Edit Staff" : "Add New Staff"}
            </DialogTitle>
          </DialogHeader>
          <StaffForm
            defaultValues={currentStaff || undefined}
            onSubmit={handleSubmit}
            role={currentRole}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}