import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Brain, 
  Plus, 
  TrendingUp, 
  Calendar, 
  Smile, 
  Meh, 
  Frown,
  Heart,
  Activity
} from "lucide-react";

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  moodLabel: string;
  notes: string;
  energy: number;
  stress: number;
}

const MOOD_LABELS = {
  1: "Very Sad",
  2: "Sad", 
  3: "Okay",
  4: "Good",
  5: "Excellent"
};

const MOOD_COLORS = {
  1: "#ef4444",
  2: "#f97316", 
  3: "#eab308",
  4: "#22c55e",
  5: "#06d6a0"
};

export default function MoodMonitor() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    {
      id: "1",
      date: "2024-01-15",
      mood: 4,
      moodLabel: "Good",
      notes: "Had a productive day at work, feeling optimistic",
      energy: 4,
      stress: 2
    },
    {
      id: "2", 
      date: "2024-01-14",
      mood: 3,
      moodLabel: "Okay",
      notes: "Average day, nothing special",
      energy: 3,
      stress: 3
    },
    {
      id: "3",
      date: "2024-01-13",
      mood: 5,
      moodLabel: "Excellent", 
      notes: "Great day with family, felt very happy",
      energy: 5,
      stress: 1
    },
    {
      id: "4",
      date: "2024-01-12",
      mood: 2,
      moodLabel: "Sad",
      notes: "Stressful day at work, feeling overwhelmed",
      energy: 2,
      stress: 4
    },
    {
      id: "5",
      date: "2024-01-11",
      mood: 4,
      moodLabel: "Good",
      notes: "Nice workout in the morning, feeling energized",
      energy: 4,
      stress: 2
    },
    {
      id: "6",
      date: "2024-01-10",
      mood: 3,
      moodLabel: "Okay",
      notes: "Regular day, nothing noteworthy",
      energy: 3,
      stress: 3
    },
    {
      id: "7",
      date: "2024-01-09",
      mood: 4,
      moodLabel: "Good",
      notes: "Good meeting with friends, social day",
      energy: 4,
      stress: 2
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    mood: 3,
    notes: "",
    energy: 3,
    stress: 3
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddEntry = () => {
    const entry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: newEntry.mood,
      moodLabel: MOOD_LABELS[newEntry.mood as keyof typeof MOOD_LABELS],
      notes: newEntry.notes,
      energy: newEntry.energy,
      stress: newEntry.stress
    };
    setMoodEntries([entry, ...moodEntries]);
    setNewEntry({ mood: 3, notes: "", energy: 3, stress: 3 });
    setIsDialogOpen(false);
  };

  const chartData = moodEntries.slice().reverse().map((entry, index) => ({
    day: `Day ${index + 1}`,
    mood: entry.mood,
    energy: entry.energy,
    stress: entry.stress,
    date: entry.date
  }));

  const moodDistribution = Object.entries(MOOD_LABELS).map(([value, label]) => ({
    name: label,
    value: moodEntries.filter(entry => entry.mood === parseInt(value)).length,
    color: MOOD_COLORS[parseInt(value) as keyof typeof MOOD_COLORS]
  }));

  const averageMood = moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length;
  const averageEnergy = moodEntries.reduce((sum, entry) => sum + entry.energy, 0) / moodEntries.length;
  const averageStress = moodEntries.reduce((sum, entry) => sum + entry.stress, 0) / moodEntries.length;

  const getMoodIcon = (mood: number) => {
    if (mood >= 4) return <Smile className="w-5 h-5 text-green-500" />;
    if (mood === 3) return <Meh className="w-5 h-5 text-yellow-500" />;
    return <Frown className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mood Monitor</h1>
              <p className="text-gray-600 mt-2">Track your mental health and emotional wellbeing</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-medical-teal hover:bg-medical-teal/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Mood
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Log Your Mood</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>How are you feeling?</Label>
                    <Select onValueChange={(value) => setNewEntry({...newEntry, mood: parseInt(value)})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your mood" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(MOOD_LABELS).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Energy Level (1-5)</Label>
                    <Select onValueChange={(value) => setNewEntry({...newEntry, energy: parseInt(value)})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select energy level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Very Low</SelectItem>
                        <SelectItem value="2">2 - Low</SelectItem>
                        <SelectItem value="3">3 - Moderate</SelectItem>
                        <SelectItem value="4">4 - High</SelectItem>
                        <SelectItem value="5">5 - Very High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Stress Level (1-5)</Label>
                    <Select onValueChange={(value) => setNewEntry({...newEntry, stress: parseInt(value)})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stress level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Very Low</SelectItem>
                        <SelectItem value="2">2 - Low</SelectItem>
                        <SelectItem value="3">3 - Moderate</SelectItem>
                        <SelectItem value="4">4 - High</SelectItem>
                        <SelectItem value="5">5 - Very High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      value={newEntry.notes}
                      onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                      placeholder="Any thoughts or notes about your day..."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddEntry} className="bg-medical-teal hover:bg-medical-teal/90">
                    Save Entry
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Brain className="w-8 h-8 text-medical-teal" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Mood</p>
                    <p className="text-2xl font-bold text-gray-900">{averageMood.toFixed(1)}/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Activity className="w-8 h-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Energy</p>
                    <p className="text-2xl font-bold text-gray-900">{averageEnergy.toFixed(1)}/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Heart className="w-8 h-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Stress</p>
                    <p className="text-2xl font-bold text-gray-900">{averageStress.toFixed(1)}/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Entries</p>
                    <p className="text-2xl font-bold text-gray-900">{moodEntries.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Mood Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[1, 5]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="mood" stroke="#06d6a0" strokeWidth={3} />
                    <Line type="monotone" dataKey="energy" stroke="#22c55e" strokeWidth={2} />
                    <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mood Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={moodDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={(entry) => entry.name}
                    >
                      {moodDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Entries */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Mood Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moodEntries.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {getMoodIcon(entry.mood)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{entry.date}</h3>
                        <Badge style={{ backgroundColor: MOOD_COLORS[entry.mood as keyof typeof MOOD_COLORS] }}>
                          {entry.moodLabel}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">Energy: {entry.energy}/5 • Stress: {entry.stress}/5</p>
                        {entry.notes && (
                          <p className="text-sm text-gray-700">{entry.notes}</p>
                        )}
                      </div>
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
