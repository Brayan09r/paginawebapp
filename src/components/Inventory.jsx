import { useState } from "react";
import { Lock, Zap, Shield, Flame, Wind, Droplets, Book } from "lucide-react";

// Base de datos de mascotas ampliada y clasificada por Tiers
const MY_PETS = [
  // TIER 1: BÁSICOS (Iniciales)
  { id: 'glowleaf', name: 'GlowLeaf', tier: 'Básico', title: 'The Quirky Companion', element: 'planta', level: 5, xp: 200, maxXp: 500, unlocked: true, image: '🦎', color: 'from-green-500 to-emerald-600' },
  { id: 'ignipup', name: 'Ignipup', tier: 'Básico', title: 'The Spunky Leader', element: 'fuego', level: 12, xp: 850, maxXp: 1000, unlocked: true, image: '🦊', color: 'from-orange-600 to-red-600' },
  { id: 'shellshock', name: 'Shellshock', tier: 'Básico', title: 'The Sturdy Tank', element: 'agua', level: 8, xp: 600, maxXp: 800, unlocked: true, image: '🐢', color: 'from-cyan-500 to-blue-600' },
  
  // TIER 2: ÉPICOS (Evoluciones o Gacha)
  { id: 'archivus', name: 'Archivus', tier: 'Épico', title: 'El Guardián del Saber', element: 'planta', level: 1, xp: 0, maxXp: 1500, unlocked: false, image: '🦉', color: 'from-amber-600 to-amber-800' },
  { id: 'pyros', name: 'Pyros', tier: 'Épico', title: 'El Guardián de la Disciplina', element: 'fuego', level: 1, xp: 0, maxXp: 1500, unlocked: false, image: '🔥', color: 'from-red-600 to-rose-800' },
  { id: 'sylpha', name: 'Sylpha', tier: 'Épico', title: 'La Guía del Enfoque Profundo', element: 'planta', level: 1, xp: 0, maxXp: 1500, unlocked: false, image: '🧚‍♀️', color: 'from-fuchsia-500 to-pink-600' },
  { id: 'ondina', name: 'Ondina', tier: 'Épico', title: 'La Musa del Flujo Creativo', element: 'agua', level: 1, xp: 0, maxXp: 1500, unlocked: false, image: '🌊', color: 'from-blue-400 to-indigo-600' },

  // TIER 3: LEGENDARIOS (Gacha Raro)
  { id: 'nyxwing', name: 'Nyxwing', tier: 'Legendario', title: 'The Sleek Legendary', element: 'oscuridad', level: 1, xp: 0, maxXp: 3000, unlocked: false, image: '🦅', color: 'from-slate-800 to-indigo-950' },
  { id: 'thunderbolt', name: 'Thunderbolt', tier: 'Legendario', title: 'The Arcian Beacon', element: 'rayo', level: 1, xp: 0, maxXp: 3000, unlocked: false, image: '⚡', color: 'from-purple-600 to-fuchsia-600' },
  { id: 'groveheart', name: 'Groveheart', tier: 'Legendario', title: 'The Sylvan Protector', element: 'planta', level: 1, xp: 0, maxXp: 3000, unlocked: false, image: '🐉', color: 'from-green-700 to-emerald-900' },
  { id: 'geoforce', name: 'Geoforce', tier: 'Legendario', title: 'The Resilient Guardian', element: 'tierra', level: 1, xp: 0, maxXp: 3000, unlocked: false, image: '🪨', color: 'from-amber-700 to-stone-700' },
  { id: 'datawings', name: 'Datawings', tier: 'Legendario', title: 'The Stellar Initiate', element: 'luz', level: 1, xp: 0, maxXp: 3000, unlocked: false, image: '🦄', color: 'from-blue-200 to-cyan-400' },
];

export default function Inventory() {
  const [selectedPet, setSelectedPet] = useState(MY_PETS[0]);

  const getElementIcon = (element) => {
    switch(element) {
      case 'fuego': return <Flame size={14} className="text-orange-400" />;
      case 'rayo': return <Zap size={14} className="text-purple-400" />;
      case 'agua': return <Droplets size={14} className="text-cyan-400" />;
      case 'planta': return <Wind size={14} className="text-green-400" />;
      case 'tierra': return <Shield size={14} className="text-amber-600" />;
      case 'luz': return <Zap size={14} className="text-yellow-200" />;
      default: return <Book size={14} className="text-slate-400" />;
    }
  };

  // Agrupamos las mascotas por Tier
  const groupedPets = MY_PETS.reduce((acc, pet) => {
    if (!acc[pet.tier]) acc[pet.tier] = [];
    acc[pet.tier].push(pet);
    return acc;
  }, {});

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto pb-28 animate-in fade-in duration-300">
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 uppercase tracking-widest">Salón de Colección</h2>
        <p className="text-slate-400 text-sm font-medium">Gestiona y mejora a tus compañeros</p>
      </div>

      {/* PANEL DE DETALLES */}
      <div className={`w-full relative rounded-3xl p-6 overflow-hidden border border-white/10 shadow-lg transition-all duration-500 bg-slate-900/50`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${selectedPet.color} opacity-20`}></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex w-full justify-between items-start mb-4">
              <div className="flex items-center gap-2 bg-slate-950/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                {getElementIcon(selectedPet.element)}
                <span className="text-xs font-bold text-white uppercase tracking-wider">{selectedPet.element}</span>
              </div>
              <div className={`px-3 py-1 rounded-full border text-xs font-black uppercase tracking-wider ${
                  selectedPet.tier === 'Legendario' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400' :
                  selectedPet.tier === 'Épico' ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' :
                  'bg-slate-500/20 border-slate-500/50 text-slate-300'
              }`}>
                  {selectedPet.tier}
              </div>
          </div>

          <div className={`text-8xl mb-4 ${selectedPet.unlocked ? 'animate-[avatarFloat_3.2s_ease-in-out_infinite] drop-shadow-2xl' : 'brightness-0 opacity-40'}`}>
            {selectedPet.image}
          </div>

          <h3 className="text-2xl font-black text-white tracking-wide">{selectedPet.name}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6 text-center w-full truncate">"{selectedPet.title}"</p>

          {selectedPet.unlocked ? (
            <div className="w-full bg-slate-950/50 rounded-2xl p-4 border border-white/5 backdrop-blur-sm">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-black text-white">Nivel {selectedPet.level}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{selectedPet.xp} / {selectedPet.maxXp} XP</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                <div 
                  className={`h-full bg-gradient-to-r ${selectedPet.color} relative`}
                  style={{ width: `${(selectedPet.xp / selectedPet.maxXp) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/80 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-2">
              <Lock size={16} className="text-slate-400" />
              <span className="text-sm font-bold text-slate-400">Aún no desbloqueado</span>
            </div>
          )}
        </div>
      </div>

      {/* CUADRÍCULA POR GRUPOS (TIERS) */}
      <div className="space-y-6">
          {Object.entries(groupedPets).map(([tierName, pets]) => (
              <div key={tierName} className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 border-b border-white/5 pb-2">
                      Rango: {tierName}
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {pets.map((pet) => (
                      <button
                        key={pet.id}
                        onClick={() => setSelectedPet(pet)}
                        className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center transition-all ${
                          selectedPet.id === pet.id 
                            ? `bg-gradient-to-tr ${pet.color} scale-105 border-2 border-white shadow-lg` 
                            : 'bg-slate-800/50 border border-white/5 hover:bg-slate-800'
                        }`}
                      >
                        <span className={`text-2xl ${!pet.unlocked ? 'brightness-0 opacity-30' : 'drop-shadow-md'}`}>
                          {pet.image}
                        </span>
                        {!pet.unlocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 rounded-2xl">
                            <Lock size={12} className="text-white/50" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}