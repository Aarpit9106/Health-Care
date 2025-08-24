import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { PlaceholderPage } from "./components/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medication" element={<PlaceholderPage title="Medication" />} />
          <Route path="/mood-monitor" element={<PlaceholderPage title="Mood Monitor" />} />
          <Route path="/journal" element={<PlaceholderPage title="Journal" />} />
          <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
          <Route path="/image-detector" element={<PlaceholderPage title="Image Detector" />} />
          <Route path="/cost-calculator" element={<PlaceholderPage title="Cost Calculator" />} />
          <Route path="/about" element={<PlaceholderPage title="About" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
