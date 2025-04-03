

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"
import { ArrowLeft, User, Heart, Thermometer, Activity, Ruler, Weight, Clock, Droplet } from "lucide-react"

const VitalRecordsForm = () => {
  const { patientId } = useParams()
  const navigate = useNavigate()

  // Sample patient data
  const [patient, setPatient] = useState({
    id: patientId || "0012312",
    name: "Marvin McKinney",
    age: 32,
    gender: "Male",
    patientId: patientId || "0012312",
    lastVisited: "20/10/2022",
    allergies: ["Lactose Intolerant", "peanuts"],
  })

  // Form state
  const [formData, setFormData] = useState({
    bloodPressure: "120/80 mm hg",
    heartRate: "70 bpm",
    temperature: "98.1 F",
    respiratoryRate: "16",
    oxygenSaturation: "98",
    height: "160 cm",
    weight: "55 Kg",
    bmi: "21.5",
    bloodGlucose: "120 mg/dt",
    notes: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Calculate BMI if height and weight are provided
    if ((name === "height" || name === "weight") && formData.height && formData.weight) {
      try {
        // Extract numeric values from height and weight
        const heightValue = Number.parseFloat(formData.height.replace(/[^\d.]/g, ""))
        const weightValue = Number.parseFloat(formData.weight.replace(/[^\d.]/g, ""))

        // Convert height to meters if it's in cm
        const heightInMeters = formData.height.includes("cm") ? heightValue / 100 : heightValue

        if (heightInMeters > 0 && weightValue > 0) {
          const bmi = (weightValue / (heightInMeters * heightInMeters)).toFixed(1)
          setFormData((prev) => ({
            ...prev,
            bmi,
          }))
        }
      } catch (error) {
        console.error("Error calculating BMI:", error)
      }
    }
  }

  const handleGoBack = () => {
    navigate("/triage/patient-queue")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would submit the form data to a server
    alert("Vital records saved successfully!")
    navigate("/triage/patient-queue")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Button variant="outline" size="sm" onClick={handleGoBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Queue
      </Button>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">{patient.name}</h1>
                  <p className="text-sm text-gray-500">
                    ID: {patient.patientId} | {patient.gender}, {patient.age} years
                  </p>
                  <p className="text-sm text-gray-500">Last visited: {patient.lastVisited}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{new Date().toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-2 mb-4">
              <h3 className="text-sm font-semibold text-primary">Known Allergies</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {patient.allergies.map((allergy, index) => (
                  <span key={index} className="text-xs text-muted-foreground">
                    {allergy}
                    {index < patient.allergies.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4">Vital Signs</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Activity className="h-4 w-4 text-blue-500" />
                  Blood Pressure
                </label>
                <Input
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  placeholder="e.g. 120/80 mm hg"
                  className="text-black"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Heart className="h-4 w-4 text-blue-500" />
                  Heart Rate
                </label>
                <Input
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleInputChange}
                  placeholder="e.g. 70 bpm"
                  className="text-black"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Thermometer className="h-4 w-4 text-blue-500" />
                  Body Temperature
                </label>
                <Input
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  placeholder="e.g. 98.1 F"
                  className="text-black"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Activity className="h-4 w-4 text-blue-500" />
                  Respiratory Rate (breaths/min)
                </label>
                <Input
                  name="respiratoryRate"
                  value={formData.respiratoryRate}
                  onChange={handleInputChange}
                  placeholder="e.g. 16"
                  className="text-black"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Activity className="h-4 w-4 text-blue-500" />
                  Oxygen Saturation (%)
                </label>
                <Input
                  name="oxygenSaturation"
                  value={formData.oxygenSaturation}
                  onChange={handleInputChange}
                  placeholder="e.g. 98"
                  className="text-black"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Ruler className="h-4 w-4 text-blue-500" />
                  Height
                </label>
                <Input
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="e.g. 160 cm"
                  className="text-black"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Weight className="h-4 w-4 text-blue-500" />
                  Weight
                </label>
                <Input
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="e.g. 55 Kg"
                  className="text-black"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Activity className="h-4 w-4 text-blue-500" />
                  BMI
                </label>
                <Input
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleInputChange}
                  placeholder="Calculated automatically"
                  className="text-black"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  Blood Glucose Level
                </label>
                <Input
                  name="bloodGlucose"
                  value={formData.bloodGlucose}
                  onChange={handleInputChange}
                  placeholder="e.g. 120 mg/dt"
                  className="text-black"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">Notes</label>
              <Textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Enter any additional notes or observations"
                rows={4}
                className="text-black"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-primary text-white px-8 py-2 rounded">
            Save Vital Records
          </Button>
        </div>
      </form>
    </div>
  )
}

export default VitalRecordsForm

