import { AppStateProvider } from "@/state/AppStateContext";
import { World } from "@/components/world/World";
import { Navigation } from "@/components/navigation/Navigation";
import { Camera } from "@/components/camera/Camera";
import { UI } from "@/components/ui/UI";

export default function Home() {
  return (
    <AppStateProvider>
      <main className="relative h-screen w-screen overflow-hidden">
        <World />
        <Camera />
        <Navigation />
        <UI />
      </main>
    </AppStateProvider>
  );
}
