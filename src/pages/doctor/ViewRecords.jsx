"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Heart, ArrowLeft, Search, Download } from "lucide-react"

const ViewRecords = () => {
  const { patientId } = useParams()
  const navigate = useNavigate()

  // Patient data
  const patient = {
    id: "0012312",
    name: "Marvin McKinney",
    gender: "Male",
    age: 32,
    lastVisited: "20/10/2022",
    allergies: ["Lactose Intolerant", "peanuts"],
    vitals: {
      bloodGlucose: "120 mg/dt",
      weight: "55 Kg",
      heartRate: "70 bpm",
      height: "160 cm",
      bodyTemperature: "98.1 F",
      bloodPressure: "120/80 mm hg",
    },
  }

  // State for active tabs
  const [activeTab, setActiveTab] = useState("consultation")
  const [activeHistoryTab, setActiveHistoryTab] = useState("doctors-note")

  // States for form data
  const [consultationNote, setConsultationNote] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const [labSearchText, setLabSearchText] = useState("")
  const [labTests, setLabTests] = useState([
    { id: 1, name: "Some examination 1" },
    { id: 2, name: "Some examination 1" },
  ])
  const [medicationSearchText, setMedicationSearchText] = useState("")
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "medicine 1",
      frequency: "Daily",
      amount: "0 gm",
      volume: "0 ml",
      duration: "7 days",
      instruction: "Before meals",
    },
  ])

  // Medical history data
  const doctorNotes = [
    {
      id: 1,
      note: "Aproin at metus et dolor tincidunt feugiat eu id quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean sollicitudin non nunc vel pharetra.Aproin at metus et dolor tincidunt feugiat eu id quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean sollicitudin non nunc vel pharetra.Aproin at metus et dolor tincidunt feugiat eu id quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean sollicitudin non nunc vel pharetra.",
      addedOn: "November 18, 2019 at 5:34 PM",
      addedBy: "Dr. Softnio",
    },
    {
      id: 2,
      note: "Aproin at metus et dolor tincidunt feugiat eu id quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean sollicitudin non nunc vel pharetra.Aproin at metus et dolor tincidunt feugiat eu id quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean sollicitudin non nunc vel pharetra.Aproin at metus et dolor tincidunt feugiat eu id quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean sollicitudin non nunc vel pharetra.",
      addedOn: "November 18, 2019 at 5:34 PM",
      addedBy: "Dr. Softnio",
    },
  ]

  const labReports = [
    { id: 1, date: "22/05/2022", type: "Blood Type", description: "abebe beso bela abebe beso bela" },
    { id: 2, date: "22/05/2022", type: "Blood Type", description: "abebe beso bela abebe beso bela" },
    { id: 3, date: "22/05/2022", type: "Blood Type", description: "abebe beso bela abebe beso bela" },
    { id: 4, date: "22/05/2022", type: "Blood Type", description: "abebe beso bela abebe beso bela" },
    { id: 5, date: "22/05/2022", type: "Blood Type", description: "abebe beso bela abebe beso bela" },
    { id: 6, date: "22/05/2022", type: "Blood Type", description: "abebe beso bela abebe beso bela" },
  ]

  const prescriptions = [
    { id: 1, medicine: "Paracetamol", dosage: "1-0-1", instruction: "Before meal 15 days", prescribedBy: "Dr. Mieraf" },
    { id: 2, medicine: "Paracetamol", dosage: "1-0-1", instruction: "Before meal 15 days", prescribedBy: "Dr. Mahder" },
    { id: 3, medicine: "Paracetamol", dosage: "1-0-1", instruction: "Before meal 15 days", prescribedBy: "Dr. Meron" },
    { id: 4, medicine: "Paracetamol", dosage: "1-0-1", instruction: "Before meal 15 days", prescribedBy: "Dr. Mahder" },
    { id: 5, medicine: "Paracetamol", dosage: "1-0-1", instruction: "Before meal 15 days", prescribedBy: "Dr. Mahder" },
    { id: 6, medicine: "Paracetamol", dosage: "1-0-1", instruction: "Before meal 15 days", prescribedBy: "Dr. Mahder" },
  ]

  const imageryReports = [
    { id: 1, date: "22/05/2022", type: "CT Scan", file: "CTscan.pdf" },
    { id: 2, date: "22/05/2022", type: "CT Scan", file: "CTscan.pdf" },
    { id: 3, date: "22/05/2022", type: "CT Scan", file: "CTscan.pdf" },
    { id: 4, date: "22/05/2022", type: "CT Scan", file: "CTscan.pdf" },
    { id: 5, date: "22/05/2022", type: "CT Scan", file: "CTscan.pdf" },
    { id: 6, date: "22/05/2022", type: "CT Scan", file: "CTscan.pdf" },
  ]

  const handleGoBack = () => {
    navigate("/doctor/patient-record")
  }

  const handleAddLabTest = () => {
    if (labSearchText.trim()) {
      setLabTests([...labTests, { id: Date.now(), name: labSearchText }])
      setLabSearchText("")
    }
  }

  const handleAddMedication = () => {
    if (medicationSearchText.trim()) {
      setMedications([
        ...medications,
        {
          id: Date.now(),
          name: medicationSearchText,
          frequency: "Daily",
          amount: "0 gm",
          volume: "0 ml",
          duration: "7 days",
          instruction: "",
        },
      ])
      setMedicationSearchText("")
    }
  }

  const handleSendLabRequest = () => {
    // In a real app, this would send lab requests to the laboratory
    alert("Lab requests sent successfully!")
    setLabTests([])
  }

  const handleSendPrescription = () => {
    // In a real app, this would send prescriptions to the pharmacy
    alert("Prescriptions sent successfully!")
    setMedications([])
  }

  const handleSaveConsultation = () => {
    // In a real app, this would save the consultation note and diagnosis
    alert("Consultation saved successfully!")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="relative w-full mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input placeholder="Search for anything here..." className="pl-10" />
      </div>

      <Button variant="outline" size="sm" onClick={handleGoBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{patient.name}</h1>
            <p className="text-muted-foreground">
              {patient.id} | {patient.gender} · Age {patient.age} <br />
              Last visited: {patient.lastVisited}
            </p>

            <div className="mt-2">
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
          </div>

          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-semibold">Vitals</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-lg font-semibold">{patient.vitals.bloodGlucose}</p>
            <p className="text-xs text-muted-foreground">Blood glucose level</p>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold">{patient.vitals.weight}</p>
            <p className="text-xs text-muted-foreground">Weight</p>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold">{patient.vitals.heartRate}</p>
            <p className="text-xs text-muted-foreground">Heart rate</p>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold">{patient.vitals.height}</p>
            <p className="text-xs text-muted-foreground">Height</p>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold">{patient.vitals.bodyTemperature}</p>
            <p className="text-xs text-muted-foreground">Body temperature</p>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold">{patient.vitals.bloodPressure}</p>
            <p className="text-xs text-muted-foreground">Blood pressure</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            <button
              className={`px-6 py-3 border-b-2 ${activeTab === "consultation" ? "border-primary text-primary" : "border-transparent"}`}
              onClick={() => setActiveTab("consultation")}
            >
              Consultation
            </button>
            <button
              className={`px-6 py-3 border-b-2 ${activeTab === "laboratory" ? "border-primary text-primary" : "border-transparent"}`}
              onClick={() => setActiveTab("laboratory")}
            >
              Laboratory
            </button>
            <button
              className={`px-6 py-3 border-b-2 ${activeTab === "medication" ? "border-primary text-primary" : "border-transparent"}`}
              onClick={() => setActiveTab("medication")}
            >
              Medication
            </button>
            <button
              className={`px-6 py-3 border-b-2 ${activeTab === "medical-history" ? "border-primary text-primary" : "border-transparent"}`}
              onClick={() => setActiveTab("medical-history")}
            >
              Medical History
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Consultation Tab */}
          {activeTab === "consultation" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Notes
                </label>
                <Textarea
                  id="notes"
                  placeholder="Enter consultation notes..."
                  value={consultationNote}
                  onChange={(e) => setConsultationNote(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="diagnosis" className="text-sm font-medium">
                  Diagnosis
                </label>
                <Textarea
                  id="diagnosis"
                  placeholder="Enter diagnosis..."
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveConsultation}>Save</Button>
              </div>
            </div>
          )}

          {/* Laboratory Tab */}
          {activeTab === "laboratory" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search for Examinations..."
                  className="flex-1"
                  value={labSearchText}
                  onChange={(e) => setLabSearchText(e.target.value)}
                />
                <Button className="bg-primary text-white px-4 py-2 rounded" onClick={handleAddLabTest}>
                  Add
                </Button>
              </div>

              <div className="space-y-2">
                {labTests.map((test, index) => (
                  <div key={test.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{index + 1}</span>
                      <span>{test.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {labTests.length > 0 && (
                <div className="flex justify-center">
                  <Button className="bg-primary text-white px-8 py-2 rounded" onClick={handleSendLabRequest}>
                    Send
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Medication Tab */}
          {activeTab === "medication" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search for Medicine..."
                  className="flex-1"
                  value={medicationSearchText}
                  onChange={(e) => setMedicationSearchText(e.target.value)}
                />
                <Button className="bg-primary text-white px-4 py-2 rounded" onClick={handleAddMedication}>
                  Add
                </Button>
              </div>

              {medications.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">#</th>
                        <th className="text-left py-2 px-2">Medicine</th>
                        <th className="text-left py-2 px-2">Frequency</th>
                        <th className="text-left py-2 px-2">Amount</th>
                        <th className="text-left py-2 px-2">Volume</th>
                        <th className="text-left py-2 px-2">Duration</th>
                        <th className="text-left py-2 px-2">Instruction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medications.map((medication, index) => (
                        <tr key={medication.id} className="border-b">
                          <td className="py-2 px-2">{index + 1}</td>
                          <td className="py-2 px-2">{medication.name}</td>
                          <td className="py-2 px-2">
                            <select className="w-full p-2 border rounded">
                              <option>Daily</option>
                              <option>Twice-daily</option>
                              <option>Three-times-daily</option>
                            </select>
                          </td>
                          <td className="py-2 px-2">
                            <select className="w-full p-2 border rounded">
                              <option>0 gm</option>
                              <option>1 gm</option>
                              <option>2 gm</option>
                            </select>
                          </td>
                          <td className="py-2 px-2">
                            <select className="w-full p-2 border rounded">
                              <option>0 ml</option>
                              <option>5 ml</option>
                              <option>10 ml</option>
                            </select>
                          </td>
                          <td className="py-2 px-2">
                            <select className="w-full p-2 border rounded">
                              <option>7 days</option>
                              <option>14 days</option>
                              <option>30 days</option>
                            </select>
                          </td>
                          <td className="py-2 px-2">
                            <select className="w-full p-2 border rounded">
                              <option>Before meals</option>
                              <option>After meals</option>
                              <option>With food</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {medications.length > 0 && (
                <div className="flex justify-center">
                  <Button className="bg-primary text-white px-8 py-2 rounded" onClick={handleSendPrescription}>
                    Send
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Medical History Tab */}
          {activeTab === "medical-history" && (
            <div>
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  <button
                    className={`px-4 py-2 border-b-2 ${activeHistoryTab === "doctors-note" ? "border-primary text-primary" : "border-transparent"}`}
                    onClick={() => setActiveHistoryTab("doctors-note")}
                  >
                    Doctor's note
                  </button>
                  <button
                    className={`px-4 py-2 border-b-2 ${activeHistoryTab === "lab-report" ? "border-primary text-primary" : "border-transparent"}`}
                    onClick={() => setActiveHistoryTab("lab-report")}
                  >
                    Lab Report
                  </button>
                  <button
                    className={`px-4 py-2 border-b-2 ${activeHistoryTab === "prescription" ? "border-primary text-primary" : "border-transparent"}`}
                    onClick={() => setActiveHistoryTab("prescription")}
                  >
                    Prescription
                  </button>
                  <button
                    className={`px-4 py-2 border-b-2 ${activeHistoryTab === "imagery-report" ? "border-primary text-primary" : "border-transparent"}`}
                    onClick={() => setActiveHistoryTab("imagery-report")}
                  >
                    Imagery Report
                  </button>
                </div>
              </div>

              <div className="py-4">
                {activeHistoryTab === "doctors-note" && (
                  <div className="space-y-4">
                    {doctorNotes.map((note) => (
                      <div key={note.id} className="p-4 bg-gray-50 rounded-md space-y-2">
                        <p>{note.note}</p>
                        <p className="text-xs text-gray-500">
                          Added on {note.addedOn} | by {note.addedBy}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeHistoryTab === "lab-report" && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Report Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {labReports.map((report) => (
                        <TableRow key={report.id} className={report.id % 2 === 0 ? "bg-gray-50" : ""}>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>{report.type}</TableCell>
                          <TableCell>{report.description}</TableCell>
                          <TableCell>
                            <button className="p-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="m6 9 6 6 6-6"></path>
                              </svg>
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}

                {activeHistoryTab === "prescription" && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medicine</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Instruction</TableHead>
                        <TableHead>Prescribed by</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prescriptions.map((prescription) => (
                        <TableRow key={prescription.id} className={prescription.id % 2 === 0 ? "bg-gray-50" : ""}>
                          <TableCell>{prescription.medicine}</TableCell>
                          <TableCell>{prescription.dosage}</TableCell>
                          <TableCell>{prescription.instruction}</TableCell>
                          <TableCell>{prescription.prescribedBy}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}

                {activeHistoryTab === "imagery-report" && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Report Type</TableHead>
                        <TableHead>File</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {imageryReports.map((report) => (
                        <TableRow key={report.id} className={report.id % 2 === 0 ? "bg-gray-50" : ""}>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>{report.type}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            {report.file}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewRecords

