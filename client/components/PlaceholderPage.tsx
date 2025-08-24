import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
        <div className="flex items-center justify-center min-h-screen px-8">
          <div className="text-center text-white space-y-6 max-w-md">
            <Construction className="w-16 h-16 mx-auto text-medical-teal" />
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-gray-300">
              {description || `The ${title} page is under construction. Continue prompting to help build out this page's content.`}
            </p>
            <Button 
              className="bg-medical-teal hover:bg-medical-teal/90 text-white"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
