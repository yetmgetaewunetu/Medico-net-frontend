"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Search, Calendar, Clock } from "lucide-react"

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      patientId: "P001223",
      patientName: "Dianne Russell",
      date: "2024-12-31",
      time: "09:00 AM",
      status: "Scheduled",
      reason: "Follow-up",
    },
    {
      id: 2,
      patientId: "P001224",
      patientName: "Bessie Cooper",
      date: "2024-12-31",
      time: "10:30 AM",
      status: "Checked In",
      reason: "Consultation",
    },
    {
      id: 3,
      patientId: "P001225",
      patientName: "Marvin McKinney",
      date: "2024-12-31",
      time: "11:45 AM",
      status: "Completed",
      reason: "Prescription Renewal",
    },
    {
      id: 4,
      patientId: "P001226",
      patientName: "Esther Howard",
      date: "2024-12-31",
      time: "02:15 PM",
      status: "Scheduled",
      reason: "New Patient",
    },
    {
      id: 5,
      patientId: "P001227",
      patientName: "Jacob Jones",
      date: "2024-12-31",
      time: "03:30 PM",
      status: "Cancelled",
      reason: "Consultation",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Checked In":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-purple-100 text-purple-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.includes(searchTerm) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <p className="text-muted-foreground">Manage your patient appointments</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Today's Schedule</h2>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Previous Day
          </Button>
          <Button variant="outline" size="sm">
            Today
          </Button>
          <Button variant="outline" size="sm">
            Next Day
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search appointments..."
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
                <TableHead>Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patientId}</TableCell>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {appointment.time}
                  </TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(appointment.status)} font-normal`}>{appointment.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {appointment.status === "Scheduled" && (
                        <Button variant="outline" size="sm">
                          Check In
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

export default Appointments

