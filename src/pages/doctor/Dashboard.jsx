"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { Search } from "lucide-react"

const PatientRecord = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  // Sample patient data
  const patients = [
    {
      id: "001123",
      name: "Mary Joseph",
      status: "Pending",
      lastAppointment: "20/10/2022",
    },
    {
      id: "001123",
      name: "Amala Jones",
      status: "Ready",
      lastAppointment: "11/10/2022",
    },
    {
      id: "001123",
      name: "Damilola Oyin",
      status: "Dismissed",
      lastAppointment: "9/10/2022",
    },
    {
      id: "001123",
      name: "Selim Jubril",
      status: "Awaiting Lab Result",
      lastAppointment: "12/10/2022",
    },
    {
      id: "001123",
      name: "Paul Christian",
      status: "Dismissed",
      lastAppointment: "22/10/2022",
    },
    {
      id: "001123",
      name: "Rosabel Briggs",
      status: "Pending",
      lastAppointment: "23/10/2022",
    },
    {
      id: "001123",
      name: "Tina Adekeye",
      status: "Pending",
      lastAppointment: "19/10/2022",
    },
    {
      id: "001123",
      name: "Mark Bossman",
      status: "Pending",
      lastAppointment: "17/10/2022",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs"
      case "Ready":
        return "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
      case "Dismissed":
        return "bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs"
      case "Awaiting Lab Result":
        return "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs"
      default:
        return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs"
    }
  }

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.includes(searchTerm) ||
      patient.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePatientClick = (patientId) => {
    navigate(`/doctor/patient-record/view/${patientId}`)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="relative w-full mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search for anything here..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Appointment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient, index) => (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handlePatientClick(patient.id)}
              >
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>
                  <span className={getStatusColor(patient.status)}>{patient.status}</span>
                </TableCell>
                <TableCell>{patient.lastAppointment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PatientRecord

