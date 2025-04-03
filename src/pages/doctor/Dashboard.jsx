"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { Search } from "lucide-react"

const Dashboard = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  // Sample patient data
  const patients = [
    { id: "0001223", name: "Dianne Russell", gender: "Male" },
    { id: "0001223", name: "Bessie Cooper", gender: "Female" },
    { id: "0001223", name: "Marvin McKinney", gender: "Male" },
    { id: "0001223", name: "Esther Howard", gender: "Male" },
    { id: "0001223", name: "Marvin McKinney", gender: "Male" },
  ]

  const handlePatientClick = (patientId) => {
    navigate(`/doctor/patient-record/view/${patientId}`)
  }

  const filteredPatients = patients.filter(
    (patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.id.includes(searchTerm),
  )

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Welcome Dr Abel</h1>
        <p className="text-muted-foreground">A quick data overview of the inventory.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="mb-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Assigned Patients</h2>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold">96</span>
              <div className="h-16 w-28">
                <svg viewBox="0 0 100 30" className="w-full h-full">
                  <path
                    d="M0,30 L5,28 L10,25 L15,26 L20,23 L25,25 L30,20 L35,22 L40,18 L45,15 L50,18 L55,15 L60,12 L65,15 L70,10 L75,8 L80,12 L85,8 L90,5 L95,8 L100,5"
                    fill="none"
                    stroke="#D1E9FA"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,30 L5,28 L10,25 L15,26 L20,23 L25,25 L30,20 L35,22 L40,18 L45,15 L50,18 L55,15 L60,12 L65,15 L70,10 L75,8 L80,12 L85,8 L90,5 L95,8 L100,5"
                    fill="rgba(209, 233, 250, 0.5)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search patients..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead className="w-[150px]">PATIENT ID</TableHead>
                <TableHead>PATIENT</TableHead>
                <TableHead>GENDER</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient, index) => (
                <TableRow
                  key={index}
                  className={`cursor-pointer hover:bg-gray-50 ${index === 2 ? "bg-blue-50" : ""}`}
                  onClick={() => handlePatientClick(patient.id)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

