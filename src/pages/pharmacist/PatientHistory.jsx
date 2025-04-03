"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { ArrowLeft, User, Calendar } from "lucide-react"

const PatientHistory = () => {
  const { patientId } = useParams()
  const navigate = useNavigate()

  // Sample patient data
  const [patient, setPatient] = useState({
    id: patientId,
    name: "John Fname",
    age: 45,
    gender: "Male",
  })

  // Sample medication history
  const [medicationHistory, setMedicationHistory] = useState([
    {
      id: 1,
      date: "2024-01-06",
      medication: "Paracetamol",
      dosage: "500mg",
      frequency: "3 times daily",
      duration: "7 days",
      prescribedBy: "Dr. John John",
    },
    {
      id: 2,
      date: "2023-12-15",
      medication: "Amoxicillin",
      dosage: "250mg",
      frequency: "2 times daily",
      duration: "10 days",
      prescribedBy: "Dr. Mary Williams",
    },
    {
      id: 3,
      date: "2023-11-22",
      medication: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed",
      duration: "5 days",
      prescribedBy: "Dr. John John",
    },
    {
      id: 4,
      date: "2023-10-10",
      medication: "Loratadine",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "30 days",
      prescribedBy: "Dr. Sarah Williams",
    },
  ])

  const handleGoBack = () => {
    navigate("/pharmacist/prescriptions")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Button variant="outline" size="sm" onClick={handleGoBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{patient.name}</h1>
                <p className="text-sm text-gray-500">
                  ID: {patient.id} | {patient.gender}, {patient.age} years
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Medication History</h2>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Medication</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Prescribed By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicationHistory.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {record.date}
                </TableCell>
                <TableCell>{record.medication}</TableCell>
                <TableCell>{record.dosage}</TableCell>
                <TableCell>{record.frequency}</TableCell>
                <TableCell>{record.duration}</TableCell>
                <TableCell>{record.prescribedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PatientHistory

