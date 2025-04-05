"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HospitalCards from "./components/HospitalCard"
import HospitalTable from "./components/HospitalTable" // Your existing table component

const HospitalManagement = () => {
  const [viewMode, setViewMode] = useState("cards")

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hospital Management</h1>
      </div>

      <Tabs value={viewMode} onValueChange={setViewMode}>
        <TabsList className="mb-6">
          <TabsTrigger value="cards">Card View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        <TabsContent value="cards">
          <HospitalCards />
        </TabsContent>

        <TabsContent value="table">
          <HospitalTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default HospitalManagement