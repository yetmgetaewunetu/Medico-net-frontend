"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Search, Filter } from "lucide-react"

const TestRequests = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  // Sample test requests data
  const testRequests = [
    {
      id: 1,
      patientId: "8378392938",
      patientName: "John Fname",
      testType: "Blood Test",
      requestingDoctor: "Dr. John John",
      status: "Pending",
    },
    {
      id: 2,
      patientId: "8378392938",
      patientName: "John Fname",
      testType: "Blood Test",
      requestingDoctor: "Dr. John John",
      status: "Completed",
    },
    {
      id: 3,
      patientId: "8378392938",
      patientName: "John Fname",
      testType: "Blood Test",
      requestingDoctor: "Dr. John John",
      status: "pending",
    },
    {
      id: 4,
      patientId: "8378392938",
      patientName: "John Fname",
      testType: "Blood Test",
      requestingDoctor: "Dr. John John",
      status: "Accepted",
    },
    {
      id: 5,
      patientId: "8378392938",
      patientName: "John Fname",
      testType: "Blood Test",
      requestingDoctor: "Dr. John John",
      status: "pending",
    },
    {
      id: 6,
      patientId: "8378392938",
      patientName: "John Fname",
      testType: "Blood Test",
      requestingDoctor: "Dr. John John",
      status: "pennding",
    },
    {
      id: 7,
      patientId: "8378392938",
      patientName: "John Fname",
      testType: "Blood Test",
      requestingDoctor: "Dr. John John",
      status: "pending",
    },
    {
      id: 8,
      patientId: "8378392938",
      patientName: "John Fname",
      testType: "Blood Test",
      requestingDoctor: "Dr. John John",
      status: "pending",
    },
  ]

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase()
    if (statusLower === "pending" || statusLower === "pennding") {
      return "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs"
    } else if (statusLower === "completed") {
      return "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
    } else if (statusLower === "accepted") {
      return "bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs"
    }
    return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs"
  }

  const filteredRequests = testRequests.filter(
    (request) =>
      request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.patientId.includes(searchTerm) ||
      request.testType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRowClick = (requestId) => {
    navigate(`/lab-technician/test-requests/form/${requestId}`)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Test Requests</h1>

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

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Test Type</TableHead>
              <TableHead>Requesting Doctor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow
                key={request.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(request.id)}
              >
                <TableCell>{request.patientId}</TableCell>
                <TableCell>{request.patientName}</TableCell>
                <TableCell>{request.testType}</TableCell>
                <TableCell>{request.requestingDoctor}</TableCell>
                <TableCell>
                  <span className={getStatusColor(request.status)}>{request.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TestRequests

