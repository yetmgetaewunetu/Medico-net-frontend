"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Search, Download, Eye } from "lucide-react"

const LabResults = () => {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample lab results data
  const labResults = [
    {
      id: 1,
      patientId: "P001223",
      patientName: "Dianne Russell",
      testType: "Blood Test",
      requestDate: "2024-12-28",
      resultDate: "2024-12-30",
      status: "Completed",
    },
    {
      id: 2,
      patientId: "P001224",
      patientName: "Bessie Cooper",
      testType: "Urinalysis",
      requestDate: "2024-12-29",
      resultDate: null,
      status: "Pending",
    },
    {
      id: 3,
      patientId: "P001225",
      patientName: "Marvin McKinney",
      testType: "CT Scan",
      requestDate: "2024-12-27",
      resultDate: "2024-12-30",
      status: "Completed",
    },
    {
      id: 4,
      patientId: "P001226",
      patientName: "Esther Howard",
      testType: "X-Ray",
      requestDate: "2024-12-30",
      resultDate: null,
      status: "In Progress",
    },
    {
      id: 5,
      patientId: "P001227",
      patientName: "Jacob Jones",
      testType: "Blood Glucose",
      requestDate: "2024-12-29",
      resultDate: "2024-12-31",
      status: "Completed",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredLabResults = labResults.filter(
    (result) =>
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.patientId.includes(searchTerm) ||
      result.testType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Laboratory Results</h1>
        <p className="text-muted-foreground">View and manage patient lab test results</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Lab Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by patient name, ID, or test type..."
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
                <TableHead>Test Type</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Result Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLabResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>{result.patientId}</TableCell>
                  <TableCell>{result.patientName}</TableCell>
                  <TableCell>{result.testType}</TableCell>
                  <TableCell>{result.requestDate}</TableCell>
                  <TableCell>{result.resultDate || "-"}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(result.status)} font-normal`}>{result.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {result.status === "Completed" ? (
                        <>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" disabled={result.status !== "In Progress"}>
                          Check Status
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

export default LabResults

