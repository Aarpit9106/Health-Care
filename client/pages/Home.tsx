import { Sidebar } from "@/components/Sidebar";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Hero />
      </main>
    </div>
  );
}
