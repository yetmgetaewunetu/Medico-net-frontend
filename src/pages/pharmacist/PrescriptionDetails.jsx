"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { ArrowLeft, User, Calendar, FileText } from "lucide-react"

const PrescriptionDetails = () => {
  const { prescriptionId } = useParams()
  const navigate = useNavigate()

  // Sample prescription data
  const [prescription, setPrescription] = useState({
    id: prescriptionId,
    patientId: "8378392938",
    patientName: "John Fname",
    patientAge: 45,
    patientGender: "Male",
    requestingDoctor: "Dr. John John",
    prescribedDate: "2024-01-06",
    status: "Pending",
    medications: [
      {
        id: 1,
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "3 times daily",
        duration: "7 days",
        quantity: 21,
        instructions: "Take after meals",
      },
      {
        id: 2,
        name: "Amoxicillin",
        dosage: "250mg",
        frequency: "2 times daily",
        duration: "10 days",
        quantity: 20,
        instructions: "Take with water",
      },
    ],
  })

  const handleGoBack = () => {
    navigate("/pharmacist/prescriptions")
  }

  const handleDispense = () => {
    // In a real app, this would update the prescription status
    setPrescription({
      ...prescription,
      status: "Dispensed",
    })

    // Show success message
    alert("Prescription has been dispensed successfully!")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Button variant="outline" size="sm" onClick={handleGoBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Prescriptions
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-4">Prescription Details</h1>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{prescription.patientName}</h2>
                  <p className="text-sm text-gray-500">
                    ID: {prescription.patientId} | {prescription.patientGender}, {prescription.patientAge} years
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{prescription.prescribedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Prescribed by: {prescription.requestingDoctor}</span>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Instructions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescription.medications.map((medication) => (
                  <TableRow key={medication.id}>
                    <TableCell>{medication.name}</TableCell>
                    <TableCell>{medication.dosage}</TableCell>
                    <TableCell>{medication.frequency}</TableCell>
                    <TableCell>{medication.duration}</TableCell>
                    <TableCell>{medication.quantity}</TableCell>
                    <TableCell>{medication.instructions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Prescription Status</h2>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Current Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    prescription.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {prescription.status}
                </span>
              </div>

              {prescription.status === "Pending" && (
                <Button className="w-full mt-4" onClick={handleDispense}>
                  Dispense Medication
                </Button>
              )}

              {prescription.status === "Dispensed" && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">This prescription has been dispensed successfully.</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Patient History</h3>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(`/pharmacist/patient-history/${prescription.patientId}`)}
              >
                View Medication History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PrescriptionDetails

