

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Search } from "lucide-react"

const PatientDetail = () => {
  const { patientId } = useParams()
  const navigate = useNavigate()

  // Sample patient data
  const [patient, setPatient] = useState({
    id: patientId,
    name: "John john john",
    hospitalId: "skhsufre7873",
    nationalId: "3524 4378 8436",
    age: "56",
    nationality: "Ethiopian",
    dateOfBirth: "12/773/1347",
    sex: "male",
    phoneNumber: "0988746645",
    emergencyNumber: "0987654323",
    email: "63654 john@gmail.com",
    maritalStatus: "Divorced",
    vitals: {
      bloodPressure: "120/80",
      heartRate: "120/80",
      respiratoryRate: "120/80",
      bodyTemperature: "120/80",
      height: "120/80",
      weight: "120/80",
      bmi: "120/80",
      bloodGlucoseLevels: "120/80",
    },
  })

  const handleGoBack = () => {
    navigate("/receptionist/patient-records")
  }

  const handleNext = () => {
    // In a real app, this would save any changes and proceed
    navigate("/receptionist/patient-records")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="relative w-full mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input placeholder="Search for anything here..." className="pl-10 text-black" />
      </div>

      <h1 className="text-2xl font-bold mb-6">Patient Records</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium mb-4 text-center">Patient Information</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Patient name</div>
              <div className="text-sm">{patient.name}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Hospital ID</div>
              <div className="text-sm">{patient.hospitalId}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">National ID</div>
              <div className="text-sm">{patient.nationalId}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Age</div>
              <div className="text-sm">{patient.age}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Nationality</div>
              <div className="text-sm">{patient.nationality}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Date of birth</div>
              <div className="text-sm">{patient.dateOfBirth}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Sex</div>
              <div className="text-sm">{patient.sex}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Phone Number</div>
              <div className="text-sm">{patient.phoneNumber}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Emergency Number</div>
              <div className="text-sm">{patient.emergencyNumber}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Email</div>
              <div className="text-sm">{patient.email}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Marital status</div>
              <div className="text-sm">{patient.maritalStatus}</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium mb-4 text-center">General Health Information</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Blood pressure</div>
              <div className="text-sm">{patient.vitals.bloodPressure}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Heart rate</div>
              <div className="text-sm">{patient.vitals.heartRate}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Respiratory rate</div>
              <div className="text-sm">{patient.vitals.respiratoryRate}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Body temperature</div>
              <div className="text-sm">{patient.vitals.bodyTemperature}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Height</div>
              <div className="text-sm">{patient.vitals.height}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Weight</div>
              <div className="text-sm">{patient.vitals.weight}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">BMI</div>
              <div className="text-sm">{patient.vitals.bmi}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Blood Glucose levels</div>
              <div className="text-sm">{patient.vitals.bloodGlucoseLevels}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
          Next
        </Button>
      </div>
    </div>
  )
}

export default PatientDetail

