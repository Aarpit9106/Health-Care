import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Pill, Plus, Clock, AlertCircle, CheckCircle2, Calendar } from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  taken: boolean;
  nextDose: string;
}

export default function Medication() {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      time: "8:00 AM, 8:00 PM",
      taken: true,
      nextDose: "8:00 PM"
    },
    {
      id: "2", 
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      time: "9:00 AM",
      taken: false,
      nextDose: "9:00 AM"
    },
    {
      id: "3",
      name: "Vitamin D3",
      dosage: "2000 IU",
      frequency: "Once daily",
      time: "8:00 AM",
      taken: true,
      nextDose: "Tomorrow 8:00 AM"
    }
  ]);

  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddMedication = () => {
    if (newMed.name && newMed.dosage && newMed.frequency && newMed.time) {
      const medication: Medication = {
        id: Date.now().toString(),
        name: newMed.name,
        dosage: newMed.dosage,
        frequency: newMed.frequency,
        time: newMed.time,
        taken: false,
        nextDose: newMed.time
      };
      setMedications([...medications, medication]);
      setNewMed({ name: "", dosage: "", frequency: "", time: "" });
      setIsDialogOpen(false);
    }
  };

  const toggleMedicationTaken = (id: string) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const upcomingMeds = medications.filter(med => !med.taken);
  const takenToday = medications.filter(med => med.taken).length;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Medication Management</h1>
              <p className="text-gray-600 mt-2">Track your medications and stay on schedule</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-medical-teal hover:bg-medical-teal/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Medication
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Medication</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Medication Name</Label>
                    <Input
                      id="name"
                      value={newMed.name}
                      onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                      placeholder="e.g., Metformin"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      value={newMed.dosage}
                      onChange={(e) => setNewMed({...newMed, dosage: e.target.value})}
                      placeholder="e.g., 500mg"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select onValueChange={(value) => setNewMed({...newMed, frequency: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Once daily">Once daily</SelectItem>
                        <SelectItem value="Twice daily">Twice daily</SelectItem>
                        <SelectItem value="Three times daily">Three times daily</SelectItem>
                        <SelectItem value="As needed">As needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time(s)</Label>
                    <Input
                      id="time"
                      value={newMed.time}
                      onChange={(e) => setNewMed({...newMed, time: e.target.value})}
                      placeholder="e.g., 8:00 AM, 8:00 PM"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMedication} className="bg-medical-teal hover:bg-medical-teal/90">
                    Add Medication
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Pill className="w-8 h-8 text-medical-teal" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Medications</p>
                    <p className="text-2xl font-bold text-gray-900">{medications.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Taken Today</p>
                    <p className="text-2xl font-bold text-gray-900">{takenToday}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertCircle className="w-8 h-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold text-gray-900">{upcomingMeds.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Medications */}
          {upcomingMeds.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-medical-teal" />
                  Upcoming Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMeds.map((med) => (
                    <div key={med.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Pill className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{med.name}</h3>
                          <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                          <p className="text-sm text-orange-600">Next dose: {med.nextDose}</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => toggleMedicationTaken(med.id)}
                        className="bg-medical-teal hover:bg-medical-teal/90"
                      >
                        Mark as Taken
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Medications */}
          <Card>
            <CardHeader>
              <CardTitle>All Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications.map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        med.taken ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Pill className={`w-6 h-6 ${med.taken ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{med.name}</h3>
                        <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                        <p className="text-sm text-gray-500">Times: {med.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={med.taken ? "default" : "secondary"} className={
                        med.taken ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }>
                        {med.taken ? "Taken" : "Pending"}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleMedicationTaken(med.id)}
                      >
                        {med.taken ? "Mark Pending" : "Mark Taken"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
