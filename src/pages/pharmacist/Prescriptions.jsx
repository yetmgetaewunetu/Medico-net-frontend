"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Search, Filter } from "lucide-react"

const Prescriptions = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  // Sample prescriptions data
  const prescriptions = [
    {
      id: 1,
      patientId: "8378392938",
      patientName: "John Fname",
      medication: "Paracetamol",
      dosage: "500mg",
      requestingDoctor: "Dr. John John",
      status: "Pending",
    },
    {
      id: 2,
      patientId: "8378392938",
      patientName: "Sarah Johnson",
      medication: "Amoxicillin",
      dosage: "250mg",
      requestingDoctor: "Dr. Mary Williams",
      status: "Dispensed",
    },
    {
      id: 3,
      patientId: "8378392938",
      patientName: "Michael Brown",
      medication: "Ibuprofen",
      dosage: "400mg",
      requestingDoctor: "Dr. Robert Brown",
      status: "Pending",
    },
    {
      id: 4,
      patientId: "8378392938",
      patientName: "Emily Davis",
      medication: "Loratadine",
      dosage: "10mg",
      requestingDoctor: "Dr. Sarah Williams",
      status: "Pending",
    },
    {
      id: 5,
      patientId: "8378392938",
      patientName: "James Wilson",
      medication: "Metformin",
      dosage: "500mg",
      requestingDoctor: "Dr. John John",
      status: "Dispensed",
    },
    {
      id: 6,
      patientId: "8378392938",
      patientName: "Jessica Taylor",
      medication: "Atorvastatin",
      dosage: "20mg",
      requestingDoctor: "Dr. Mary Williams",
      status: "Pending",
    },
    {
      id: 7,
      patientId: "8378392938",
      patientName: "David Martinez",
      medication: "Lisinopril",
      dosage: "10mg",
      requestingDoctor: "Dr. Robert Brown",
      status: "Pending",
    },
    {
      id: 8,
      patientId: "8378392938",
      patientName: "Jennifer Anderson",
      medication: "Levothyroxine",
      dosage: "50mcg",
      requestingDoctor: "Dr. Sarah Williams",
      status: "Pending",
    },
  ]

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase()
    if (statusLower === "pending") {
      return "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs"
    } else if (statusLower === "dispensed") {
      return "bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs"
    }
    return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs"
  }

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.patientId.includes(searchTerm) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRowClick = (prescriptionId) => {
    navigate(`/pharmacist/prescriptions/${prescriptionId}`)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Prescriptions</h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search by patient name, ID, or medication..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Medication</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Requesting Doctor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrescriptions.map((prescription) => (
              <TableRow
                key={prescription.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(prescription.id)}
              >
                <TableCell>{prescription.patientId}</TableCell>
                <TableCell>{prescription.patientName}</TableCell>
                <TableCell>{prescription.medication}</TableCell>
                <TableCell>{prescription.dosage}</TableCell>
                <TableCell>{prescription.requestingDoctor}</TableCell>
                <TableCell>
                  <span className={getStatusColor(prescription.status)}>{prescription.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Prescriptions

