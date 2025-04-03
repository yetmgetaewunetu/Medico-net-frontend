import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { Search } from 'lucide-react'
import { Badge } from "../../components/ui/badge"

const PatientRecord = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  // Sample patient data
  const patients = [
    { 
      id: "001123", 
      name: "Mary Joseph", 
      status: "Pending", 
      lastAppointment: "20/10/2022" 
    },
    { 
      id: "001123", 
      name: "Amala Jones", 
      status: "Ready", 
      lastAppointment: "11/10/2022" 
    },
    { 
      id: "001123", 
      name: "Damilola Oyin", 
      status: "Dismissed", 
      lastAppointment: "9/10/2022" 
    },
    { 
      id: "001123", 
      name: "Selim Jubril", 
      status: "Awaiting Lab Result", 
      lastAppointment: "12/10/2022" 
    },
    { 
      id: "001123", 
      name: "Paul Christian", 
      status: "Dismissed", 
      lastAppointment: "22/10/2022" 
    },
    { 
      id: "001123", 
      name: "Rosabel Briggs", 
      status: "Pending", 
      lastAppointment: "23/10/2022" 
    },
    { 
      id: "001123", 
      name: "Tina Adekeye", 
      status: "Pending", 
      lastAppointment: "19/10/2022" 
    },
    { 
      id: "001123", 
      name: "Mark Bossman", 
      status: "Pending", 
      lastAppointment: "17/10/2022" 
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-green-100 text-green-800"
      case "Ready":
        return "bg-blue-100 text-blue-800"
      case "Dismissed":
        return "bg-red-100 text-red-800"
      case "Awaiting Lab Result":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.includes(searchTerm) ||
    patient.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePatientClick = (patientId) => {
    navigate(`/doctor/patient-record/view/${patientId}`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Patient Records</h1>

      <Card>
        <CardContent className="pt-6">
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search for patients..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
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
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handlePatientClick(patient.id)}
                >
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(patient.status)} font-normal`}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.lastAppointment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default PatientRecord
