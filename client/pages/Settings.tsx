import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Mail,
  Lock,
  Monitor
} from "lucide-react";

export default function Settings() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-06-15",
    address: "123 Main St, Anytown, USA 12345",
    emergencyContact: "Jane Doe - (555) 987-6543"
  });

  const [notifications, setNotifications] = useState({
    medicationReminders: true,
    appointmentAlerts: true,
    healthInsights: true,
    emailUpdates: false,
    smsAlerts: true,
    weeklyReports: true
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analyticsOptIn: true,
    marketingEmails: false,
    thirdPartyIntegration: false
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    temperatureUnit: "fahrenheit"
  });

  const { theme, actualTheme, setTheme, toggleTheme } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const connectedDevices = [
    { name: "iPhone 13 Pro", type: "Mobile", lastActive: "2 minutes ago", status: "active" },
    { name: "MacBook Pro", type: "Desktop", lastActive: "1 hour ago", status: "active" },
    { name: "iPad Air", type: "Tablet", lastActive: "3 days ago", status: "inactive" }
  ];

  const recentActivity = [
    { action: "Logged medication intake", timestamp: "2 hours ago" },
    { action: "Updated mood entry", timestamp: "1 day ago" },
    { action: "Viewed dashboard", timestamp: "1 day ago" },
    { action: "Downloaded health report", timestamp: "3 days ago" },
    { action: "Changed password", timestamp: "1 week ago" }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account preferences and privacy settings</p>
          </div>

          {saveSuccess && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Settings saved successfully!
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-medical-teal" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        value={profile.emergencyContact}
                        onChange={(e) => setProfile({...profile, emergencyContact: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleSave} className="w-full bg-medical-teal hover:bg-medical-teal/90">
                      Save Profile Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-medical-teal" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Medication Reminders</Label>
                        <p className="text-sm text-gray-600">Get notified when it's time to take your medications</p>
                      </div>
                      <Switch
                        checked={notifications.medicationReminders}
                        onCheckedChange={(checked) => setNotifications({...notifications, medicationReminders: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Appointment Alerts</Label>
                        <p className="text-sm text-gray-600">Receive reminders about upcoming appointments</p>
                      </div>
                      <Switch
                        checked={notifications.appointmentAlerts}
                        onCheckedChange={(checked) => setNotifications({...notifications, appointmentAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Health Insights</Label>
                        <p className="text-sm text-gray-600">Receive personalized health insights and recommendations</p>
                      </div>
                      <Switch
                        checked={notifications.healthInsights}
                        onCheckedChange={(checked) => setNotifications({...notifications, healthInsights: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Email Updates</Label>
                        <p className="text-sm text-gray-600">Receive health tips and platform updates via email</p>
                      </div>
                      <Switch
                        checked={notifications.emailUpdates}
                        onCheckedChange={(checked) => setNotifications({...notifications, emailUpdates: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">SMS Alerts</Label>
                        <p className="text-sm text-gray-600">Get important health alerts via text message</p>
                      </div>
                      <Switch
                        checked={notifications.smsAlerts}
                        onCheckedChange={(checked) => setNotifications({...notifications, smsAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Weekly Reports</Label>
                        <p className="text-sm text-gray-600">Receive weekly health summary reports</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyReports}
                        onCheckedChange={(checked) => setNotifications({...notifications, weeklyReports: checked})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSave} className="bg-medical-teal hover:bg-medical-teal/90">
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-medical-teal" />
                      Privacy & Data Sharing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Anonymous Data Sharing</Label>
                        <p className="text-sm text-gray-600">Help improve healthcare research with anonymized data</p>
                      </div>
                      <Switch
                        checked={privacy.dataSharing}
                        onCheckedChange={(checked) => setPrivacy({...privacy, dataSharing: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Analytics</Label>
                        <p className="text-sm text-gray-600">Allow usage analytics to improve the platform</p>
                      </div>
                      <Switch
                        checked={privacy.analyticsOptIn}
                        onCheckedChange={(checked) => setPrivacy({...privacy, analyticsOptIn: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Marketing Communications</Label>
                        <p className="text-sm text-gray-600">Receive marketing emails about new features</p>
                      </div>
                      <Switch
                        checked={privacy.marketingEmails}
                        onCheckedChange={(checked) => setPrivacy({...privacy, marketingEmails: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Third-party Integrations</Label>
                        <p className="text-sm text-gray-600">Allow data sharing with connected health apps</p>
                      </div>
                      <Switch
                        checked={privacy.thirdPartyIntegration}
                        onCheckedChange={(checked) => setPrivacy({...privacy, thirdPartyIntegration: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Export Your Data</h4>
                        <p className="text-sm text-gray-600">Download all your health data in a portable format</p>
                      </div>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg border-red-200 bg-red-50">
                      <div>
                        <h4 className="font-medium text-red-900">Delete Account</h4>
                        <p className="text-sm text-red-700">Permanently delete your account and all associated data</p>
                      </div>
                      <Button variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <SettingsIcon className="w-5 h-5 mr-2 text-medical-teal" />
                    App Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">Theme Appearance</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            theme === 'light'
                              ? 'border-medical-teal bg-medical-teal/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setTheme('light')}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <Sun className="w-6 h-6 text-yellow-500" />
                            <span className="text-sm font-medium">Light</span>
                            <div className="w-full h-6 bg-white border rounded flex items-center justify-center">
                              <div className="w-3 h-3 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            theme === 'dark'
                              ? 'border-medical-teal bg-medical-teal/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setTheme('dark')}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <Moon className="w-6 h-6 text-blue-600" />
                            <span className="text-sm font-medium">Dark</span>
                            <div className="w-full h-6 bg-gray-800 border rounded flex items-center justify-center">
                              <div className="w-3 h-3 bg-gray-600 rounded"></div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            theme === 'system'
                              ? 'border-medical-teal bg-medical-teal/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setTheme('system')}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <Monitor className="w-6 h-6 text-gray-600" />
                            <span className="text-sm font-medium">System</span>
                            <div className="w-full h-6 border rounded flex">
                              <div className="w-1/2 bg-white"></div>
                              <div className="w-1/2 bg-gray-800"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-3">
                        Current theme: <span className="font-medium capitalize">{actualTheme}</span>
                        {theme === 'system' && ' (following system preference)'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select value={preferences.language} onValueChange={(value) => setPreferences({...preferences, language: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={preferences.timezone} onValueChange={(value) => setPreferences({...preferences, timezone: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences({...preferences, dateFormat: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="temperatureUnit">Temperature Unit</Label>
                      <Select value={preferences.temperatureUnit} onValueChange={(value) => setPreferences({...preferences, temperatureUnit: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                          <SelectItem value="celsius">Celsius (°C)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleSave} className="bg-medical-teal hover:bg-medical-teal/90">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="w-5 h-5 mr-2 text-medical-teal" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                    <Button className="bg-medical-teal hover:bg-medical-teal/90">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Connected Devices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {connectedDevices.map((device, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Smartphone className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium">{device.name}</p>
                              <p className="text-sm text-gray-600">{device.type} • {device.lastActive}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={device.status === "active" ? "default" : "secondary"}>
                              {device.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Revoke
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex justify-between items-center p-2">
                          <span className="text-sm">{activity.action}</span>
                          <span className="text-xs text-gray-500">{activity.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
