

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { Search, UserPlus, Stethoscope } from "lucide-react"

const Dashboard = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  // Sample patient data
  const patients = [
    {
      id: "8378392938",
      name: "John John",
      doctor: "Dr. John John",
      status: "In progress",
    },
    {
      id: "8378392938",
      name: "John John",
      doctor: "Dr. John John",
      status: "In Queue",
    },
    {
      id: "8378392938",
      name: "John John",
      doctor: "Dr. John John",
      status: "In progress",
    },
    {
      id: "8378392938",
      name: "John John",
      doctor: "Dr. John John",
      status: "In Consultation",
    },
    {
      id: "8378392938",
      name: "John John",
      doctor: "Dr. John John",
      status: "In progress",
    },
    {
      id: "8378392938",
      name: "John John",
      doctor: "Dr. John John",
      status: "In Queue",
    },
    {
      id: "8378392938",
      name: "John John",
      doctor: "Dr. John John",
      status: "In progress",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "In progress":
        return "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs"
      case "In Queue":
        return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs"
      case "In Consultation":
        return "bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs"
      default:
        return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs"
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="relative w-full mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search for anything here..."
          className="pl-10 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-6">A quick data overview of the inventory.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* New Patients Card */}
        <div className="bg-blue-50 p-6 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-blue-600">
              <UserPlus size={32} />
            </div>
            <h3 className="text-xl font-medium text-blue-800">New Patients</h3>
          </div>
          <span className="text-3xl font-bold text-blue-800">24</span>
        </div>

        {/* Available Doctors Card */}
        <div className="bg-blue-50 p-6 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-blue-600">
              <Stethoscope size={32} />
            </div>
            <h3 className="text-xl font-medium text-blue-800">Available Doctors</h3>
          </div>
          <span className="text-3xl font-bold text-blue-800">45</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Patient List</h2>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/receptionist/patient-records/${patient.id}`)}
              >
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.doctor}</TableCell>
                <TableCell>
                  <span className={getStatusColor(patient.status)}>{patient.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Dashboard

