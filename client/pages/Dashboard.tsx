import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  AreaChart,
  Area
} from "recharts";
import { 
  Activity, 
  Heart, 
  Pill, 
  Brain, 
  BookOpen, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Users,
  Clock
} from "lucide-react";

export default function Dashboard() {
  // Mock data that would come from other pages
  const healthMetrics = {
    medicationAdherence: 85,
    avgMoodScore: 4.2,
    journalEntries: 12,
    symptomsThisWeek: 3,
    upcomingAppointments: 2,
    exerciseDays: 5
  };

  const moodTrendData = [
    { day: "Mon", mood: 4, energy: 3, stress: 2 },
    { day: "Tue", mood: 3, energy: 4, stress: 3 },
    { day: "Wed", mood: 5, energy: 5, stress: 1 },
    { day: "Thu", mood: 4, energy: 4, stress: 2 },
    { day: "Fri", mood: 4, energy: 3, stress: 3 },
    { day: "Sat", mood: 5, energy: 5, stress: 1 },
    { day: "Sun", mood: 4, energy: 4, stress: 2 }
  ];

  const medicationData = [
    { day: "Mon", taken: 2, total: 2 },
    { day: "Tue", taken: 2, total: 2 },
    { day: "Wed", taken: 1, total: 2 },
    { day: "Thu", taken: 2, total: 2 },
    { day: "Fri", taken: 2, total: 2 },
    { day: "Sat", taken: 2, total: 2 },
    { day: "Sun", taken: 2, total: 2 }
  ];

  const symptomFrequency = [
    { symptom: "Headache", count: 3 },
    { symptom: "Fatigue", count: 2 },
    { symptom: "Stomach Pain", count: 1 },
    { symptom: "Dizziness", count: 1 }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "medication",
      title: "Metformin taken",
      time: "2 hours ago",
      icon: Pill,
      color: "text-green-600"
    },
    {
      id: 2,
      type: "mood",
      title: "Mood logged: Good",
      time: "4 hours ago",
      icon: Brain,
      color: "text-blue-600"
    },
    {
      id: 3,
      type: "journal",
      title: "New journal entry added",
      time: "1 day ago",
      icon: BookOpen,
      color: "text-purple-600"
    },
    {
      id: 4,
      type: "symptom",
      title: "Mild headache logged",
      time: "2 days ago",
      icon: AlertCircle,
      color: "text-orange-600"
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: "Take evening medication",
      time: "8:00 PM",
      type: "medication",
      urgent: false
    },
    {
      id: 2,
      task: "Dr. Smith appointment",
      time: "Tomorrow 10:00 AM",
      type: "appointment",
      urgent: true
    },
    {
      id: 3,
      task: "Weekly mood check-in",
      time: "In 2 days",
      type: "mood",
      urgent: false
    }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
            <p className="text-gray-600 mt-2">Overview of your health metrics and progress</p>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Medication Adherence</p>
                    <p className="text-2xl font-bold text-gray-900">{healthMetrics.medicationAdherence}%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Pill className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <Progress value={healthMetrics.medicationAdherence} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Mood</p>
                    <p className="text-2xl font-bold text-gray-900">{healthMetrics.avgMoodScore}/5</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+0.3 from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Journal Entries</p>
                    <p className="text-2xl font-bold text-gray-900">{healthMetrics.journalEntries}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <span className="text-sm text-gray-600">This month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Weekly Symptoms</p>
                    <p className="text-2xl font-bold text-gray-900">{healthMetrics.symptomsThisWeek}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">-2 from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Mood & Energy Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[1, 5]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="mood" stroke="#06d6a0" strokeWidth={3} name="Mood" />
                    <Line type="monotone" dataKey="energy" stroke="#22c55e" strokeWidth={2} name="Energy" />
                    <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name="Stress" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medication Adherence</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={medicationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="taken" fill="#06d6a0" name="Taken" />
                    <Bar dataKey="total" fill="#e5e7eb" name="Prescribed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Activity and Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => {
                      const IconComponent = activity.icon;
                      return (
                        <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center`}>
                            <IconComponent className={`w-4 h-4 ${activity.color}`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{task.task}</p>
                        <p className="text-xs text-gray-500">{task.time}</p>
                      </div>
                      {task.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-medical-teal hover:bg-medical-teal/90">
                  View All Tasks
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Symptom Summary and Health Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Symptoms (This Month)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {symptomFrequency.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{item.symptom}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-medical-teal h-2 rounded-full" 
                            style={{ width: `${(item.count / 3) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Great Progress!</p>
                      <p className="text-sm text-green-700">Your medication adherence has improved by 15% this month.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Mood Improvement</p>
                      <p className="text-sm text-blue-700">Your average mood score is trending upward this week.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-orange-800">Reminder</p>
                      <p className="text-sm text-orange-700">Don't forget your upcoming appointment with Dr. Smith tomorrow.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
