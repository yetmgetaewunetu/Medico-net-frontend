"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Search, FileText, RefreshCw } from "lucide-react"

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample prescriptions data
  const prescriptions = [
    {
      id: 1,
      patientId: "P001223",
      patientName: "Dianne Russell",
      medication: "Paracetamol",
      dosage: "500mg",
      frequency: "3 times daily",
      duration: "7 days",
      prescribedDate: "2024-12-30",
      status: "Active",
    },
    {
      id: 2,
      patientId: "P001224",
      patientName: "Bessie Cooper",
      medication: "Amoxicillin",
      dosage: "250mg",
      frequency: "2 times daily",
      duration: "10 days",
      prescribedDate: "2024-12-28",
      status: "Active",
    },
    {
      id: 3,
      patientId: "P001225",
      patientName: "Marvin McKinney",
      medication: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed",
      duration: "5 days",
      prescribedDate: "2024-12-25",
      status: "Completed",
    },
    {
      id: 4,
      patientId: "P001226",
      patientName: "Esther Howard",
      medication: "Loratadine",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "30 days",
      prescribedDate: "2024-12-20",
      status: "Active",
    },
    {
      id: 5,
      patientId: "P001227",
      patientName: "Jacob Jones",
      medication: "Metformin",
      dosage: "500mg",
      frequency: "2 times daily",
      duration: "Ongoing",
      prescribedDate: "2024-12-15",
      status: "Active",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.patientId.includes(searchTerm) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Prescriptions</h1>
        <p className="text-muted-foreground">Manage patient prescriptions</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Prescription History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by patient name, ID, or medication..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Prescribed Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell>{prescription.patientId}</TableCell>
                  <TableCell>{prescription.patientName}</TableCell>
                  <TableCell>{prescription.medication}</TableCell>
                  <TableCell>{prescription.dosage}</TableCell>
                  <TableCell>{prescription.frequency}</TableCell>
                  <TableCell>{prescription.duration}</TableCell>
                  <TableCell>{prescription.prescribedDate}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(prescription.status)} font-normal`}>
                      {prescription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {prescription.status === "Active" && (
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Renew
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Prescriptions

