import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

const PatientRecord = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Patient Record</h1>
      <Card>
        <CardHeader>
          <CardTitle>Patient Records Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Patient record management content would go here</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default PatientRecord

