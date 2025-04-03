"use client"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { ArrowLeft, Download } from "lucide-react"

const PatientTestHistory = () => {
  const { patientId } = useParams()
  const navigate = useNavigate()

  // Sample test history data
  const testHistory = [
    { id: 1, date: "22/05/2022", type: "CT Scan", file: "CTscan.pdf" },
    { id: 2, date: "22/05/2022", type: "CT Scan", file: "CTscan.pdf" },
    { id: 3, date: "22/05/2022", type: "CT Scan", file: "CTscan.pdf" },
    { id: 4, date: "22/05/2022", type: "CT Scan", file: "CTscan.pdf" },
    { id: 5, date: "22/05/2022", type: "CT Scan", file: "CTscan.pdf" },
    { id: 6, date: "22/05/2022", type: "CT Scan", file: "CTscan.pdf" },
  ]

  const handleGoBack = () => {
    navigate("/lab-technician/patient-records")
  }

  const handleDownload = (file) => {
    // In a real app, this would download the file
    alert(`Downloading ${file}...`)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Button variant="outline" size="sm" onClick={handleGoBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <h1 className="text-2xl font-bold mb-6">Patient Imagery Test History</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Report Type</TableHead>
              <TableHead>File</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testHistory.map((test) => (
              <TableRow key={test.id} className={test.id % 2 === 0 ? "bg-gray-50" : ""}>
                <TableCell>{test.date}</TableCell>
                <TableCell>{test.type}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Download className="h-4 w-4 cursor-pointer" onClick={() => handleDownload(test.file)} />
                  {test.file}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PatientTestHistory

