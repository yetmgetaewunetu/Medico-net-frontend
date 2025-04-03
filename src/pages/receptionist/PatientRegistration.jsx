

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"
import { Search } from "lucide-react"

const PatientRegistration = () => {
  const navigate = useNavigate()

  // Form state
  const [formData, setFormData] = useState({
    faydaNumber: "",
    patientName: "",
    dateOfBirth: "",
    nationality: "",
    age: "",
    email: "",
    sex: "Male",
    maritalStatus: "Single",
    allergies: "",
    medication: "",
    phoneNumber: "",
    emergencyContact: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRadioChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // In a real app, this would search for an existing patient
    alert("Searching for patient with Fayda Number: " + formData.faydaNumber)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would submit the form data to a server
    console.log("Form submitted:", formData)
    navigate("/receptionist/patient-records")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="relative w-full mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input placeholder="Search for anything here..." className="pl-10 text-black" />
      </div>

      <h1 className="text-2xl font-bold mb-6">Patient Registration</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <label htmlFor="faydaNumber" className="text-red-500">
              *
            </label>
            <span>Fayda Number (National ID)</span>
          </div>
          <div className="flex gap-2 mt-2">
            <Input
              id="faydaNumber"
              name="faydaNumber"
              value={formData.faydaNumber}
              onChange={handleInputChange}
              className="flex-1 text-black"
              required
            />
            <Button type="button" onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white">
              search
            </Button>
          </div>
        </div>

        <h2 className="text-xl font-medium mb-4">Patient Information</h2>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <label htmlFor="patientName" className="text-red-500">
                *
              </label>
              <span>Patient Name</span>
            </div>
            <Input
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              className="mt-2 w-full text-black"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dateOfBirth">Date of birth</label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="mt-2 w-full text-black"
              />
            </div>

            <div>
              <label htmlFor="nationality">Nationality</label>
              <Input
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className="mt-2 w-full text-black"
              />
            </div>

            <div>
              <label htmlFor="age">Age:</label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                className="mt-2 w-full text-black"
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 w-full text-black"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <label className="text-red-500">*</label>
              <span>Fayda Number (National ID)</span>
            </div>
            <Input
              name="nationalId"
              value={formData.faydaNumber}
              onChange={handleInputChange}
              className="mt-2 w-full text-black"
              required
            />
          </div>

          <div>
            <label>Sex:</label>
            <div className="flex items-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="male"
                  name="sex"
                  checked={formData.sex === "Male"}
                  onChange={() => handleRadioChange("sex", "Male")}
                  className="h-4 w-4"
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="female"
                  name="sex"
                  checked={formData.sex === "Female"}
                  onChange={() => handleRadioChange("sex", "Female")}
                  className="h-4 w-4"
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>

          <div>
            <label>Marital Status:</label>
            <div className="flex flex-wrap items-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="married"
                  name="maritalStatus"
                  checked={formData.maritalStatus === "Married"}
                  onChange={() => handleRadioChange("maritalStatus", "Married")}
                  className="h-4 w-4"
                />
                <label htmlFor="married">Married</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="single"
                  name="maritalStatus"
                  checked={formData.maritalStatus === "Single"}
                  onChange={() => handleRadioChange("maritalStatus", "Single")}
                  className="h-4 w-4"
                />
                <label htmlFor="single">Single</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="divorced"
                  name="maritalStatus"
                  checked={formData.maritalStatus === "Divorced"}
                  onChange={() => handleRadioChange("maritalStatus", "Divorced")}
                  className="h-4 w-4"
                />
                <label htmlFor="divorced">Divorced</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="widowed"
                  name="maritalStatus"
                  checked={formData.maritalStatus === "Widowed"}
                  onChange={() => handleRadioChange("maritalStatus", "Widowed")}
                  className="h-4 w-4"
                />
                <label htmlFor="widowed">Widowed</label>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="allergies">Allergies:</label>
            <Textarea
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              className="mt-2 w-full text-black"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="medication">Medication:</label>
            <Textarea
              id="medication"
              name="medication"
              value={formData.medication}
              onChange={handleInputChange}
              className="mt-2 w-full text-black"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="mt-2 w-full text-black"
              />
            </div>

            <div>
              <label htmlFor="emergencyContact">Emergency Contact</label>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="mt-2 w-full text-black"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            Next
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PatientRegistration

