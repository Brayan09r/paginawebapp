import { useState } from "react";
import Onboarding from "./components/Onboarding";
import CharacterSelect from "./components/CharacterSelect";
import MainApp from "./components/MainApp";

const VIEWS = { ONBOARDING: 0, PET_SELECT: 1, APP: 2 };

export default function App() {
  const [view, setView] = useState(VIEWS.ONBOARDING);
  // Añadimos edad, ciclo y horario al estado inicial
  const [hero, setHero] = useState({ 
    name: "", 
    carrera: "", 
    universidad: "", 
    edad: "", 
    ciclo: "", 
    horario: null 
  });
  
  const [activePet, setActivePet] = useState(null); 

  return (
    <main className="min-h-screen bg-[#0f172a] text-white font-sans overflow-x-hidden">
      {view === VIEWS.ONBOARDING && (
        <Onboarding setView={() => setView(VIEWS.PET_SELECT)} setHero={setHero} hero={hero} />
      )}
      
      {view === VIEWS.PET_SELECT && (
        <CharacterSelect onConfirm={() => setView(VIEWS.APP)} setActivePet={setActivePet} />
      )}

      {view === VIEWS.APP && (
        <MainApp hero={hero} activePet={activePet} setActivePet={setActivePet} />
      )}
    </main>
  );
}