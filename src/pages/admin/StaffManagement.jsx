import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

const StaffManagement = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Staff Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Staff Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Staff management content would go here</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default StaffManagement

