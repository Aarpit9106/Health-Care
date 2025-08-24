import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Plus,
  Search,
  Calendar,
  FileText,
  Activity,
  Stethoscope,
  AlertCircle,
  TrendingUp,
  Filter,
} from "lucide-react";

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  type: "general" | "symptom" | "appointment" | "medication" | "exercise";
  severity?: number;
  tags: string[];
}

const ENTRY_TYPES = {
  general: {
    label: "General",
    icon: FileText,
    color: "bg-blue-100 text-blue-800",
  },
  symptom: {
    label: "Symptom",
    icon: AlertCircle,
    color: "bg-red-100 text-red-800",
  },
  appointment: {
    label: "Appointment",
    icon: Stethoscope,
    color: "bg-green-100 text-green-800",
  },
  medication: {
    label: "Medication",
    icon: Activity,
    color: "bg-purple-100 text-purple-800",
  },
  exercise: {
    label: "Exercise",
    icon: TrendingUp,
    color: "bg-orange-100 text-orange-800",
  },
};

export default function Journal() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: "2024-01-15",
      title: "Morning headache",
      content:
        "Woke up with a mild headache around the temples. Lasted about 2 hours. Took some water and it subsided. Possible dehydration from yesterday.",
      type: "symptom",
      severity: 2,
      tags: ["headache", "morning", "dehydration"],
    },
    {
      id: "2",
      date: "2024-01-14",
      title: "Dr. Smith Checkup",
      content:
        "Annual physical with Dr. Smith. Blood pressure: 120/80. Weight: 165 lbs. All vitals normal. Discussed sleep patterns and stress management. Next appointment in 6 months.",
      type: "appointment",
      tags: ["checkup", "dr-smith", "blood-pressure", "weight"],
    },
    {
      id: "3",
      date: "2024-01-13",
      title: "Started new workout routine",
      content:
        "Began new morning exercise routine. 30 minutes of cardio + 20 minutes strength training. Felt great afterwards, lots of energy throughout the day.",
      type: "exercise",
      tags: ["workout", "cardio", "strength-training", "energy"],
    },
    {
      id: "4",
      date: "2024-01-12",
      title: "Stomach discomfort after lunch",
      content:
        "Experienced mild stomach discomfort about an hour after eating spicy Thai food. Discomfort lasted around 3 hours. Note: avoid very spicy foods.",
      type: "symptom",
      severity: 2,
      tags: ["stomach", "spicy-food", "digestion"],
    },
    {
      id: "5",
      date: "2024-01-11",
      title: "Meditation and sleep quality",
      content:
        "Practiced 20 minutes of meditation before bed. Slept very well, woke up refreshed. Should continue this routine for better sleep quality.",
      type: "general",
      tags: ["meditation", "sleep", "wellness", "routine"],
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    type: "general" as keyof typeof ENTRY_TYPES,
    severity: 1,
    tags: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const handleAddEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
        title: newEntry.title,
        content: newEntry.content,
        type: newEntry.type,
        severity: newEntry.type === "symptom" ? newEntry.severity : undefined,
        tags: newEntry.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      };
      setJournalEntries([entry, ...journalEntries]);
      setNewEntry({
        title: "",
        content: "",
        type: "general",
        severity: 1,
        tags: "",
      });
      setIsDialogOpen(false);
    }
  };

  const filteredEntries = journalEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesType = filterType === "all" || entry.type === filterType;
    return matchesSearch && matchesType;
  });

  const getEntryTypeInfo = (type: keyof typeof ENTRY_TYPES) =>
    ENTRY_TYPES[type];

  const totalEntries = journalEntries.length;
  const symptomEntries = journalEntries.filter(
    (entry) => entry.type === "symptom",
  ).length;
  const appointmentEntries = journalEntries.filter(
    (entry) => entry.type === "appointment",
  ).length;
  const recentEntries = journalEntries.filter((entry) => {
    const entryDate = new Date(entry.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  }).length;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Health Journal
              </h1>
              <p className="text-gray-600 mt-2">
                Track your health journey and symptoms
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-medical-teal hover:bg-medical-teal/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add Journal Entry</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newEntry.title}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, title: e.target.value })
                      }
                      placeholder="Entry title..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Entry Type</Label>
                    <Select
                      onValueChange={(value) =>
                        setNewEntry({
                          ...newEntry,
                          type: value as keyof typeof ENTRY_TYPES,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select entry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(ENTRY_TYPES).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {newEntry.type === "symptom" && (
                    <div className="grid gap-2">
                      <Label htmlFor="severity">Severity (1-5)</Label>
                      <Select
                        onValueChange={(value) =>
                          setNewEntry({
                            ...newEntry,
                            severity: parseInt(value),
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 - Very Mild</SelectItem>
                          <SelectItem value="2">2 - Mild</SelectItem>
                          <SelectItem value="3">3 - Moderate</SelectItem>
                          <SelectItem value="4">4 - Severe</SelectItem>
                          <SelectItem value="5">5 - Very Severe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newEntry.content}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, content: e.target.value })
                      }
                      placeholder="Describe your experience, symptoms, or notes..."
                      rows={4}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={newEntry.tags}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, tags: e.target.value })
                      }
                      placeholder="headache, morning, medication..."
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddEntry}
                    className="bg-medical-teal hover:bg-medical-teal/90"
                  >
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
                  <BookOpen className="w-8 h-8 text-medical-teal" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Entries
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalEntries}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Symptoms Logged
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {symptomEntries}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Stethoscope className="w-8 h-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Appointments
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {appointmentEntries}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      This Week
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {recentEntries}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="Search entries, symptoms, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {Object.entries(ENTRY_TYPES).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Journal Entries */}
          <div className="space-y-6">
            {filteredEntries.map((entry) => {
              const typeInfo = getEntryTypeInfo(entry.type);
              const IconComponent = typeInfo.icon;

              return (
                <Card key={entry.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${typeInfo.color.replace("text-", "bg-").replace("-800", "-200")}`}
                        >
                          <IconComponent
                            className={`w-6 h-6 ${typeInfo.color.includes("blue") ? "text-blue-600" : typeInfo.color.includes("red") ? "text-red-600" : typeInfo.color.includes("green") ? "text-green-600" : typeInfo.color.includes("purple") ? "text-purple-600" : "text-orange-600"}`}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {entry.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={typeInfo.color}>
                              {typeInfo.label}
                            </Badge>
                            {entry.severity && (
                              <Badge variant="outline">
                                Severity: {entry.severity}/5
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">
                          {entry.date}
                        </p>
                        <p className="text-gray-700 mb-4">{entry.content}</p>
                        {entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {entry.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredEntries.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No entries found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or add a new journal entry
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
