import { Card, CardContent } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { CheckCircle, Clock, HourglassIcon } from "lucide-react"

const Dashboard = () => {
  // Sample activity log data
  const activityLog = [
    {
      id: 1,
      timestamp: "10:30 AM, Jan 6",
      activity: "New test request for John Doe (Blood Test)",
    },
    {
      id: 2,
      timestamp: "09:45 AM, Jan 6",
      activity: "Test result submitted for Sarah Johnson (X-Ray)",
    },
    {
      id: 3,
      timestamp: "08:15 AM, Jan 6",
      activity: "Test request accepted for Michael Brown (MRI)",
    },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">A quick data overview of the inventory.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Completed Tests Card */}
        <Card className="bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-md">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-blue-800">Completed Tests</h3>
              </div>
              <span className="text-2xl font-bold text-blue-800">24</span>
            </div>
          </CardContent>
        </Card>

        {/* Ongoing Tests Card */}
        <Card className="bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-md">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-blue-800">Ongoing Tests</h3>
              </div>
              <span className="text-2xl font-bold text-blue-800">45</span>
            </div>
          </CardContent>
        </Card>

        {/* Pending Tests Card */}
        <Card className="bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-md">
                  <HourglassIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-blue-800">Pending Tests</h3>
              </div>
              <span className="text-2xl font-bold text-blue-800">24</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Log */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity Log</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">TIME STAMP</TableHead>
                <TableHead>ACTIVITIES</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLog.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {log.activity.includes("Blood Test") && <div className="h-4 w-4 rounded-full bg-red-500"></div>}
                    {log.activity.includes("X-Ray") && <div className="h-4 w-4 rounded-full bg-blue-500"></div>}
                    {log.activity.includes("MRI") && <div className="h-4 w-4 rounded-full bg-green-500"></div>}
                    {log.activity}
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

export default Dashboard

