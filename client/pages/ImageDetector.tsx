import { useState, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  Upload, 
  Scan, 
  FileImage, 
  Download, 
  Share,
  AlertCircle,
  CheckCircle,
  Eye,
  Brain,
  Zap,
  Clock,
  Shield
} from "lucide-react";

interface AnalysisResult {
  id: string;
  fileName: string;
  analysisType: string;
  uploadDate: string;
  status: "analyzing" | "completed" | "error";
  confidence: number;
  findings: {
    condition: string;
    probability: number;
    severity: "low" | "medium" | "high";
    description: string;
  }[];
  recommendations: string[];
}

export default function ImageDetector() {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([
    {
      id: "1",
      fileName: "chest_xray_01.jpg",
      analysisType: "Chest X-Ray",
      uploadDate: "2024-01-15",
      status: "completed",
      confidence: 94,
      findings: [
        {
          condition: "Normal lung fields",
          probability: 94,
          severity: "low",
          description: "No signs of pneumonia, pleural effusion, or pneumothorax detected."
        },
        {
          condition: "Mild cardiac enlargement",
          probability: 23,
          severity: "low",
          description: "Slight increase in cardiac silhouette, possibly within normal limits."
        }
      ],
      recommendations: [
        "Maintain regular follow-up with cardiologist",
        "Consider echocardiogram if symptoms develop",
        "Continue current medications as prescribed"
      ]
    },
    {
      id: "2",
      fileName: "skin_lesion_02.jpg",
      analysisType: "Skin Analysis",
      uploadDate: "2024-01-14",
      status: "completed",
      confidence: 87,
      findings: [
        {
          condition: "Benign nevus",
          probability: 87,
          severity: "low",
          description: "Appears to be a common mole with regular borders and uniform coloration."
        },
        {
          condition: "Seborrheic keratosis",
          probability: 13,
          severity: "low",
          description: "Alternative diagnosis showing benign skin growth characteristics."
        }
      ],
      recommendations: [
        "Monitor for any changes in size, color, or shape",
        "Schedule annual skin check with dermatologist",
        "Use sun protection to prevent new lesions"
      ]
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setUploadedImages([...uploadedImages, ...files]);
      
      // Simulate analysis process
      setIsAnalyzing(true);
      setTimeout(() => {
        const newResult: AnalysisResult = {
          id: Date.now().toString(),
          fileName: files[0].name,
          analysisType: "General Analysis",
          uploadDate: new Date().toISOString().split('T')[0],
          status: "completed",
          confidence: Math.floor(Math.random() * 20) + 80,
          findings: [
            {
              condition: "Normal findings",
              probability: Math.floor(Math.random() * 20) + 80,
              severity: "low",
              description: "AI analysis suggests normal appearance with no immediate concerns detected."
            }
          ],
          recommendations: [
            "Consult with healthcare provider for professional interpretation",
            "Keep image for medical records",
            "Follow up if symptoms persist or worsen"
          ]
        };
        setAnalysisResults([newResult, ...analysisResults]);
        setIsAnalyzing(false);
      }, 3000);
    }
  };

  const analysisTypes = [
    { name: "Chest X-Ray", icon: Eye, count: 12 },
    { name: "Skin Analysis", icon: Scan, count: 8 },
    { name: "Fundus Photography", icon: Eye, count: 5 },
    { name: "CT Scan", icon: Brain, count: 3 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">AI Medical Image Detector</h1>
            <p className="text-gray-600 mt-2">Upload medical images for AI-powered analysis and insights</p>
          </div>

          {/* Disclaimer */}
          <Alert className="mb-8 border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Important:</strong> This AI analysis is for educational purposes only and should not replace professional medical diagnosis. 
              Always consult with qualified healthcare professionals for medical decisions.
            </AlertDescription>
          </Alert>

          {/* Upload Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2 text-medical-teal" />
                Upload Medical Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                  multiple
                />
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-medical-teal/10 rounded-full flex items-center justify-center mx-auto">
                    <Camera className="w-8 h-8 text-medical-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Upload Your Medical Image</h3>
                    <p className="text-gray-600">Supports X-rays, CT scans, MRI, skin photos, and more</p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-medical-teal hover:bg-medical-teal/90"
                      disabled={isAnalyzing}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                    <Button variant="outline" disabled={isAnalyzing}>
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Maximum file size: 10MB • Formats: JPG, PNG, DICOM
                  </p>
                </div>
              </div>

              {isAnalyzing && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-medical-teal"></div>
                    <div>
                      <p className="font-medium text-blue-900">Analyzing image...</p>
                      <p className="text-sm text-blue-700">AI is processing your medical image. This may take a few moments.</p>
                    </div>
                  </div>
                  <Progress value={65} className="mt-3" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Scan className="w-8 h-8 text-medical-teal" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Analyses</p>
                    <p className="text-2xl font-bold text-gray-900">{analysisResults.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Zap className="w-8 h-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(analysisResults.reduce((sum, result) => sum + result.confidence, 0) / analysisResults.length)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Shield className="w-8 h-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Normal Results</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analysisResults.filter(r => r.findings.some(f => f.condition.includes("Normal"))).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <Tabs defaultValue="recent" className="space-y-6">
            <TabsList>
              <TabsTrigger value="recent">Recent Analyses</TabsTrigger>
              <TabsTrigger value="types">By Type</TabsTrigger>
            </TabsList>

            <TabsContent value="recent">
              <div className="space-y-6">
                {analysisResults.map((result) => (
                  <Card key={result.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileImage className="w-6 h-6 text-medical-teal" />
                          <div>
                            <CardTitle className="text-lg">{result.fileName}</CardTitle>
                            <p className="text-sm text-gray-600">{result.analysisType} • {result.uploadDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {result.confidence}% confidence
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">AI Findings</h4>
                          <div className="space-y-2">
                            {result.findings.map((finding, index) => (
                              <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h5 className="font-medium text-gray-900">{finding.condition}</h5>
                                    <Badge className={getSeverityColor(finding.severity)}>
                                      {finding.severity}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600">{finding.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-gray-900">{finding.probability}%</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
                          <ul className="space-y-2">
                            {result.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="types">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysisTypes.map((type, index) => {
                  const IconComponent = type.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-medical-teal/10 rounded-full flex items-center justify-center">
                              <IconComponent className="w-6 h-6 text-medical-teal" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{type.name}</h3>
                              <p className="text-sm text-gray-600">{type.count} analyses completed</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View All
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
