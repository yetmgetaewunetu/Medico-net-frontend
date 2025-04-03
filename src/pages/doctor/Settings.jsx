"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Switch } from "../../components/ui/switch"
import { Label } from "../../components/ui/label"

const Settings = () => {
  const [profileData, setProfileData] = useState({
    name: "Abel",
    email: "abel@mediconet.com",
    phone: "+251 912 345 678",
    specialization: "Gynecologist",
    bio: "Experienced gynecologist with over 10 years of practice.",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    app: true,
    newPatient: true,
    labResults: true,
    appointments: true,
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSaveProfile = () => {
    // In a real app, this would save the profile data
    alert("Profile saved successfully!")
  }

  const handleSaveNotifications = () => {
    // In a real app, this would save the notification settings
    alert("Notification settings saved successfully!")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={profileData.name} onChange={handleProfileChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={profileData.phone} onChange={handleProfileChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      name="specialization"
                      value={profileData.specialization}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    name="bio"
                    className="w-full p-2 border rounded-md min-h-[100px]"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Channels</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <Switch
                        id="email-notifications"
                        checked={notifications.email}
                        onCheckedChange={() => handleNotificationChange("email")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <Switch
                        id="sms-notifications"
                        checked={notifications.sms}
                        onCheckedChange={() => handleNotificationChange("sms")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-notifications">In-App Notifications</Label>
                      <Switch
                        id="app-notifications"
                        checked={notifications.app}
                        onCheckedChange={() => handleNotificationChange("app")}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="new-patient">New Patient Assignments</Label>
                      <Switch
                        id="new-patient"
                        checked={notifications.newPatient}
                        onCheckedChange={() => handleNotificationChange("newPatient")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="lab-results">Lab Results</Label>
                      <Switch
                        id="lab-results"
                        checked={notifications.labResults}
                        onCheckedChange={() => handleNotificationChange("labResults")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="appointments">Appointment Reminders</Label>
                      <Switch
                        id="appointments"
                        checked={notifications.appointments}
                        onCheckedChange={() => handleNotificationChange("appointments")}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button>Change Password</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Settings

