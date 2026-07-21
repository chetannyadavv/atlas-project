import { AppStateProvider } from "@/state/AppStateContext";
import { World } from "@/components/world/World";
import { Navigation } from "@/components/navigation/Navigation";
import { UI } from "@/components/ui/UI";

export default function Home() {
  return (
    <AppStateProvider>
      <main className="relative h-screen w-screen overflow-hidden">
        <World />
        <div className="pointer-events-none absolute inset-0 z-10">
          <Navigation />
          <UI />
        </div>
      </main>
    </AppStateProvider>
  );
}
