import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Target, 
  Award, 
  Shield, 
  Globe, 
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github
} from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      bio: "Board-certified physician with 15+ years in digital health innovation.",
      image: "👩‍⚕️"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      bio: "AI/ML expert specializing in healthcare applications and data security.",
      image: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      bio: "UX/UI specialist focused on creating intuitive healthcare experiences.",
      image: "👩‍💼"
    },
    {
      name: "Dr. James Wilson",
      role: "Clinical Director",
      bio: "Practicing physician helping bridge clinical practice and technology.",
      image: "👨‍⚕️"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security protecting your health data with bank-level encryption."
    },
    {
      icon: Award,
      title: "FDA Approved",
      description: "Our AI algorithms meet FDA standards for medical device software."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Led by board-certified physicians and healthcare technology experts."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving healthcare institutions across 20+ countries worldwide."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Healthcare Professionals" },
    { number: "1M+", label: "Patients Served" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Support Available" }
  ];

  const certifications = [
    "HIPAA Compliant",
    "FDA 510(k) Cleared",
    "ISO 27001 Certified",
    "SOC 2 Type II",
    "GDPR Compliant"
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-medical-teal to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About HealthCare Pro</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming healthcare through innovative AI-powered solutions that empower 
              healthcare professionals and improve patient outcomes worldwide.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-6 h-6 mr-2 text-medical-teal" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  To revolutionize healthcare delivery by providing intelligent, secure, and 
                  accessible digital health solutions. We believe that technology should enhance 
                  the human touch in healthcare, not replace it. Our platform empowers healthcare 
                  professionals with the tools they need to deliver exceptional patient care.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-6 h-6 mr-2 text-medical-teal" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  A world where every healthcare decision is supported by intelligent insights, 
                  every patient receives personalized care, and healthcare professionals have the 
                  tools they need to focus on what matters most - healing and caring for patients. 
                  We envision a future where technology bridges gaps in healthcare access and quality.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl font-bold text-medical-teal mb-2">{stat.number}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose HealthCare Pro</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-medical-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-medical-teal" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Team */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">{member.image}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-medical-teal font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">Security & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-4">
                {certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    {cert}
                  </Badge>
                ))}
              </div>
              <p className="text-center text-gray-600 mt-6 max-w-2xl mx-auto">
                We maintain the highest standards of security and compliance to protect your 
                healthcare data. Our platform undergoes regular security audits and meets 
                international healthcare data protection standards.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-medical-teal" />
                  <div>
                    <p className="font-medium">Headquarters</p>
                    <p className="text-gray-600">123 Healthcare Innovation Blvd, San Francisco, CA 94103</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-medical-teal" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-medical-teal" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">contact@healthcarepro.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 mb-4">
                  Stay updated with the latest healthcare technology innovations and company news.
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>
                <div className="mt-6">
                  <Button className="w-full bg-medical-teal hover:bg-medical-teal/90">
                    Request a Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="text-center">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Healthcare Experience?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join thousands of healthcare professionals who trust HealthCare Pro to 
                streamline their operations and improve patient outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-medical-teal hover:bg-medical-teal/90">
                  Get Started Today
                </Button>
                <Button variant="outline">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
