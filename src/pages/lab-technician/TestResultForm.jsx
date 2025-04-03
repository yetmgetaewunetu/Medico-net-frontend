"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { FileUp } from "lucide-react"

const TestResultForm = () => {
  const { requestId } = useParams()
  const navigate = useNavigate()

  // Sample patient data
  const [patientData, setPatientData] = useState({
    name: "John John John",
    referenceNumber: "8378392938",
    sex: "Male",
    dateOfBirth: "23, Dec,2020",
    phoneNumber: "+251909847584890",
    institution: "Hospital Name",
    testConductor: "Abebe Kebede",
  })

  // Sample test data
  const [testData, setTestData] = useState([
    { id: 1, name: "CT Scan", result: null, dateCompleted: "" },
    { id: 2, name: "MRI", result: null, dateCompleted: "" },
  ])

  const handleFileUpload = (testId, e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, this would upload the file to a server
      // For now, we'll just update the state
      setTestData((prevData) =>
        prevData.map((test) =>
          test.id === testId ? { ...test, result: file.name, dateCompleted: new Date().toLocaleDateString() } : test,
        ),
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would submit the form data to a server
    alert("Test results submitted successfully!")
    navigate("/lab-technician/test-requests")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Imagery Result Form</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Patient Name</label>
              <Input value={patientData.name} readOnly className="bg-gray-50" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Reference Number</label>
              <Input value={patientData.referenceNumber} readOnly className="bg-gray-50" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date of birth</label>
              <Input value={patientData.dateOfBirth} readOnly className="bg-gray-50" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input value={patientData.phoneNumber} readOnly className="bg-gray-50" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sex:</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="sex" checked={patientData.sex === "Male"} readOnly className="h-4 w-4" />
                  Male
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="sex" checked={patientData.sex === "Female"} readOnly className="h-4 w-4" />
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Institution:</label>
              <Input value={patientData.institution} readOnly className="bg-gray-50" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Test Conductor</label>
              <Input value={patientData.testConductor} readOnly className="bg-gray-50" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Test name</TableHead>
                <TableHead>Test Result</TableHead>
                <TableHead>Date Conducted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testData.map((test, index) => (
                <TableRow key={test.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {test.result ? (
                        <span>{test.result}</span>
                      ) : (
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="file" className="hidden" onChange={(e) => handleFileUpload(test.id, e)} />
                          <div className="p-2 border border-dashed rounded-md hover:bg-gray-50">
                            <FileUp className="h-5 w-5 text-gray-500" />
                          </div>
                        </label>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{test.dateCompleted}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-primary text-white px-8 py-2 rounded">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TestResultForm

