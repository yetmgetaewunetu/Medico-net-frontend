"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { ArrowLeft, User, Calendar, Heart, Thermometer, Activity } from "lucide-react"

const PatientHistory = () => {
  const { patientId } = useParams()
  const navigate = useNavigate()

  // Sample patient data
  const [patient, setPatient] = useState({
    id: patientId,
    name: "John Doe",
    age: 45,
    gender: "Male",
    patientId: "8378392938",
  })

  // Sample vital records history
  const [vitalRecords, setVitalRecords] = useState([
    {
      id: 1,
      date: "2024-01-06",
      bloodPressure: "120/80",
      heartRate: "72",
      temperature: "37.0",
      respiratoryRate: "16",
      oxygenSaturation: "98",
      weight: "70",
      height: "175",
      bmi: "22.9",
      recordedBy: "Nurse Smith",
    },
    {
      id: 2,
      date: "2023-12-15",
      bloodPressure: "118/78",
      heartRate: "70",
      temperature: "36.8",
      respiratoryRate: "15",
      oxygenSaturation: "99",
      weight: "71",
      height: "175",
      bmi: "23.2",
      recordedBy: "Nurse Johnson",
    },
    {
      id: 3,
      date: "2023-11-22",
      bloodPressure: "122/82",
      heartRate: "74",
      temperature: "37.1",
      respiratoryRate: "16",
      oxygenSaturation: "97",
      weight: "69",
      height: "175",
      bmi: "22.5",
      recordedBy: "Nurse Smith",
    },
  ])

  const handleGoBack = () => {
    navigate("/triage/patient-queue")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Button variant="outline" size="sm" onClick={handleGoBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{patient.name}</h1>
              <p className="text-sm text-gray-500">
                ID: {patient.patientId} | {patient.gender}, {patient.age} years
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Vital Records History</h2>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  BP / HR
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  Temp
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Activity className="h-4 w-4 text-blue-500" />
                  Resp / O₂
                </div>
              </TableHead>
              <TableHead>Weight / BMI</TableHead>
              <TableHead>Recorded By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vitalRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {record.date}
                </TableCell>
                <TableCell>
                  {record.bloodPressure} / {record.heartRate} bpm
                </TableCell>
                <TableCell>{record.temperature} °C</TableCell>
                <TableCell>
                  {record.respiratoryRate} / {record.oxygenSaturation}%
                </TableCell>
                <TableCell>
                  {record.weight} kg / {record.bmi}
                </TableCell>
                <TableCell>{record.recordedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PatientHistory

