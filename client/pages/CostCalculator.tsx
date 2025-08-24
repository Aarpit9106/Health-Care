import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Heart,
  Activity,
  Stethoscope,
  Pill,
  Building,
  Shield,
  Info,
  Search,
} from "lucide-react";

interface CostEstimate {
  item: string;
  basePrice: number;
  insuranceCoverage: number;
  outOfPocket: number;
  category: string;
}

interface InsurancePlan {
  name: string;
  deductible: number;
  copay: number;
  coinsurance: number;
  outOfPocketMax: number;
}

export default function CostCalculator() {
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [selectedInsurance, setSelectedInsurance] = useState("basic");
  const [location, setLocation] = useState("urban");
  const [estimates, setEstimates] = useState<CostEstimate[]>([]);

  const procedures = [
    { name: "Annual Physical Exam", basePrice: 300, category: "Preventive" },
    {
      name: "Blood Test (Complete Panel)",
      basePrice: 250,
      category: "Laboratory",
    },
    { name: "Chest X-Ray", basePrice: 200, category: "Imaging" },
    { name: "MRI Scan", basePrice: 2500, category: "Imaging" },
    { name: "CT Scan", basePrice: 1500, category: "Imaging" },
    { name: "Colonoscopy", basePrice: 1200, category: "Procedure" },
    { name: "Echocardiogram", basePrice: 800, category: "Cardiovascular" },
    {
      name: "Dermatology Consultation",
      basePrice: 350,
      category: "Specialist",
    },
    { name: "Emergency Room Visit", basePrice: 1500, category: "Emergency" },
    { name: "Urgent Care Visit", basePrice: 200, category: "Urgent Care" },
  ];

  const medications = [
    { name: "Metformin (30 days)", basePrice: 25, category: "Diabetes" },
    { name: "Lisinopril (30 days)", basePrice: 30, category: "Blood Pressure" },
    { name: "Atorvastatin (30 days)", basePrice: 35, category: "Cholesterol" },
    { name: "Omeprazole (30 days)", basePrice: 40, category: "Acid Reflux" },
    { name: "Albuterol Inhaler", basePrice: 75, category: "Respiratory" },
    { name: "Insulin (Monthly)", basePrice: 300, category: "Diabetes" },
  ];

  const insurancePlans: Record<string, InsurancePlan> = {
    basic: {
      name: "Basic Plan",
      deductible: 3000,
      copay: 30,
      coinsurance: 20,
      outOfPocketMax: 8000,
    },
    standard: {
      name: "Standard Plan",
      deductible: 1500,
      copay: 25,
      coinsurance: 15,
      outOfPocketMax: 6000,
    },
    premium: {
      name: "Premium Plan",
      deductible: 500,
      copay: 15,
      coinsurance: 10,
      outOfPocketMax: 4000,
    },
  };

  const locationMultipliers = {
    rural: 0.8,
    suburban: 1.0,
    urban: 1.2,
    metropolitan: 1.5,
  };

  const calculateCost = (item: any, type: "procedure" | "medication") => {
    const plan = insurancePlans[selectedInsurance];
    const locationMultiplier =
      locationMultipliers[location as keyof typeof locationMultipliers];
    const adjustedPrice = item.basePrice * locationMultiplier;

    let insuranceCoverage = 0;
    let outOfPocket = adjustedPrice;

    if (type === "procedure") {
      // For procedures, apply deductible and coinsurance
      if (item.category === "Preventive") {
        // Preventive care is usually covered 100%
        insuranceCoverage = adjustedPrice;
        outOfPocket = 0;
      } else {
        // Apply coinsurance after deductible
        const afterDeductible = Math.max(0, adjustedPrice - plan.deductible);
        insuranceCoverage = afterDeductible * (1 - plan.coinsurance / 100);
        outOfPocket = adjustedPrice - insuranceCoverage;
      }
    } else {
      // For medications, typically copay
      outOfPocket = Math.min(plan.copay, adjustedPrice);
      insuranceCoverage = adjustedPrice - outOfPocket;
    }

    return {
      item: item.name,
      basePrice: adjustedPrice,
      insuranceCoverage,
      outOfPocket,
      category: item.category,
    };
  };

  const addEstimate = (item: any, type: "procedure" | "medication") => {
    const estimate = calculateCost(item, type);
    setEstimates([estimate, ...estimates]);
  };

  const totalOutOfPocket = estimates.reduce(
    (sum, est) => sum + est.outOfPocket,
    0,
  );
  const totalInsuranceCoverage = estimates.reduce(
    (sum, est) => sum + est.insuranceCoverage,
    0,
  );

  const currentPlan = insurancePlans[selectedInsurance];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Healthcare Cost Calculator
            </h1>
            <p className="text-gray-600 mt-2">
              Estimate costs for procedures, treatments, and medications
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Settings */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-medical-teal" />
                    Insurance Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="insurance">Select Plan</Label>
                    <Select
                      value={selectedInsurance}
                      onValueChange={setSelectedInsurance}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(insurancePlans).map(([key, plan]) => (
                          <SelectItem key={key} value={key}>
                            {plan.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Deductible:</span>
                      <span className="font-medium">
                        ${currentPlan.deductible}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Copay:</span>
                      <span className="font-medium">${currentPlan.copay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coinsurance:</span>
                      <span className="font-medium">
                        {currentPlan.coinsurance}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Out-of-pocket max:</span>
                      <span className="font-medium">
                        ${currentPlan.outOfPocketMax}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2 text-medical-teal" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="location">Healthcare Market</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rural">Rural (-20%)</SelectItem>
                        <SelectItem value="suburban">
                          Suburban (baseline)
                        </SelectItem>
                        <SelectItem value="urban">Urban (+20%)</SelectItem>
                        <SelectItem value="metropolitan">
                          Metropolitan (+50%)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-medical-teal" />
                    Cost Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Estimated Cost:</span>
                    <span className="font-bold">
                      ${(totalOutOfPocket + totalInsuranceCoverage).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance Coverage:</span>
                    <span className="font-medium text-green-600">
                      ${totalInsuranceCoverage.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Your Out-of-Pocket:</span>
                    <span className="font-bold text-red-600">
                      ${totalOutOfPocket.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calculator Interface */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="procedures">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="procedures">
                    Procedures & Tests
                  </TabsTrigger>
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                </TabsList>

                <TabsContent value="procedures" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Medical Procedures & Tests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {procedures.map((procedure, index) => (
                          <div
                            key={index}
                            className="p-4 border rounded-lg hover:border-medical-teal transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">
                                {procedure.name}
                              </h4>
                              <Badge variant="outline">
                                {procedure.category}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                Base: ${procedure.basePrice}
                              </span>
                              <Button
                                size="sm"
                                onClick={() =>
                                  addEstimate(procedure, "procedure")
                                }
                                className="bg-medical-teal hover:bg-medical-teal/90"
                              >
                                <Calculator className="w-4 h-4 mr-1" />
                                Calculate
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="medications" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Prescription Medications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {medications.map((medication, index) => (
                          <div
                            key={index}
                            className="p-4 border rounded-lg hover:border-medical-teal transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">
                                {medication.name}
                              </h4>
                              <Badge variant="outline">
                                {medication.category}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                Base: ${medication.basePrice}
                              </span>
                              <Button
                                size="sm"
                                onClick={() =>
                                  addEstimate(medication, "medication")
                                }
                                className="bg-medical-teal hover:bg-medical-teal/90"
                              >
                                <Calculator className="w-4 h-4 mr-1" />
                                Calculate
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Cost Estimates */}
              {estimates.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Cost Estimates</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEstimates([])}
                      >
                        Clear All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {estimates.map((estimate, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              {estimate.item}
                            </h4>
                            <Badge variant="outline">{estimate.category}</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Total Cost</p>
                              <p className="font-medium">
                                ${estimate.basePrice.toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">Insurance Pays</p>
                              <p className="font-medium text-green-600">
                                ${estimate.insuranceCoverage.toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">You Pay</p>
                              <p className="font-bold text-red-600">
                                ${estimate.outOfPocket.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Disclaimer */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="text-yellow-800">
                      <p className="font-medium">Cost Estimate Disclaimer</p>
                      <p className="text-sm mt-1">
                        These are estimated costs based on national averages and
                        your selected insurance plan. Actual costs may vary
                        significantly based on provider, location, and specific
                        medical circumstances. Always verify costs with your
                        healthcare provider and insurance company.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
