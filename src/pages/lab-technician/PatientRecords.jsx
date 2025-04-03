"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Search, Filter } from "lucide-react"

const PatientRecords = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  // Sample patients data
  const patients = [
    { id: 1, name: "Patient name" },
    { id: 2, name: "Patient name" },
    { id: 3, name: "Patient name" },
    { id: 4, name: "Patient name" },
    { id: 5, name: "Patient name" },
    { id: 6, name: "Patient name" },
    { id: 7, name: "Patient name" },
    { id: 8, name: "Patient name" },
    { id: 9, name: "Patient name" },
  ]

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleViewPatient = (patientId) => {
    navigate(`/lab-technician/patient-records/${patientId}`)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Patient Imagery Test History</h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Enter fayda number"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-gray-500"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span>{patient.name}</span>
            </div>
            <Button onClick={() => handleViewPatient(patient.id)} className="bg-primary text-white px-4 py-2 rounded">
              View
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PatientRecords

