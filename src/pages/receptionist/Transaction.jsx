import { useState } from "react"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Search, CreditCard, DollarSign, Receipt } from "lucide-react"

const Transaction = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [patientId, setPatientId] = useState("")
  const [amount, setAmount] = useState("")

  // Sample transactions data
  const transactions = [
    {
      id: 1,
      patientId: "8378392938",
      patientName: "John Doe",
      service: "Consultation",
      amount: 500,
      date: "2024-01-06",
      status: "Paid",
    },
    {
      id: 2,
      patientId: "8378392939",
      patientName: "Sarah Johnson",
      service: "Laboratory Test",
      amount: 1200,
      date: "2024-01-06",
      status: "Pending",
    },
    {
      id: 3,
      patientId: "8378392940",
      patientName: "Michael Brown",
      service: "X-Ray",
      amount: 2000,
      date: "2024-01-05",
      status: "Paid",
    },
    {
      id: 4,
      patientId: "8378392941",
      patientName: "Emily Davis",
      service: "Medication",
      amount: 800,
      date: "2024-01-05",
      status: "Paid",
    },
    {
      id: 5,
      patientId: "8378392942",
      patientName: "James Wilson",
      service: "Surgery",
      amount: 15000,
      date: "2024-01-04",
      status: "Pending",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs"
      default:
        return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs"
    }
  }

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.patientId.includes(searchTerm) ||
      transaction.service.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePayment = (e) => {
    e.preventDefault()
    // In a real app, this would process the payment
    alert(`Payment of ${amount} processed for patient ID: ${patientId}`)
    setPatientId("")
    setAmount("")
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Transactions</h1>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.patientId}</TableCell>
                    <TableCell>{transaction.patientName}</TableCell>
                    <TableCell>{transaction.service}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <span className={getStatusColor(transaction.status)}>{transaction.status}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Process Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="patientId" className="text-sm font-medium">
                    Patient ID
                  </label>
                  <Input
                    id="patientId"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="text-black"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Amount
                  </label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <Input
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 text-black"
                      type="number"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Receipt className="mr-2 h-4 w-4" />
                  Process Payment
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Today's Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total Transactions</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total Amount</span>
                  <span>$8,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Pending Payments</span>
                  <span>3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Transaction

