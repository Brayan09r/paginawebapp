import { useState } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

// LOS 3 INICIALES (STARTERS)
const STARTER_PETS = [
  { id: "ignipup", name: "Ignipup", title: "The Spunky Leader", image: "/avatars/IGNIPUP.png", color: "from-orange-500 to-red-500", element: "Fuego 🔥" },
  { id: "shellshock", name: "Shellshock", title: "The Sturdy Tank", image: "/avatars/SHELLSHOCK.png", color: "from-cyan-400 to-blue-500", element: "Agua 💧" },
  { id: "glowleaf", name: "GlowLeaf", title: "The Quirky Companion", image: "/avatars/GLOWLEAF.png", color: "from-lime-400 to-green-500", element: "Planta 🌿" }
];

export default function CharacterSelect({ setActivePet, onNext }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleConfirm = () => {
    if (!selectedId) return;
    
    const chosenPet = STARTER_PETS.find(p => p.id === selectedId);
    
    // Le asignamos la mascota al usuario
    setActivePet({
      ...chosenPet,
      level: 1,
      xp: 0,
      maxXp: 500
    });
    
    // Avanzamos a la siguiente pantalla sin alertas
    if (onNext) {
        onNext();
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6 animate-in fade-in duration-500 bg-slate-950 pb-28">
      
      {/* CONTENEDOR CENTRALIZADO: Evita que se estire en pantallas grandes */}
      <div className="w-full max-w-md flex flex-col space-y-6">

        <div className="text-center">
          <h2 className="text-3xl font-black text-white uppercase tracking-widest drop-shadow-md">
            Elige tu Aliado
          </h2>
          <p className="text-slate-400 text-sm font-medium mt-2 px-4">
            Este compañero evolucionará contigo mientras destruyes la procrastinación.
          </p>
        </div>

        {/* LISTA DE LOS 3 INICIALES */}
        <div className="flex flex-col gap-4 mt-4">
          {STARTER_PETS.map((pet) => {
            const isSelected = selectedId === pet.id;

            return (
              <div 
                key={pet.id} 
                onClick={() => setSelectedId(pet.id)}
                className={`relative bg-slate-900 rounded-2xl overflow-hidden border-4 cursor-pointer transition-all duration-300 flex items-center p-3 gap-4 ${
                  isSelected 
                    ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-[1.02] bg-slate-800' 
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                {/* MINIATURA DE LA IMAGEN */}
                <div className={`w-24 h-24 rounded-xl bg-gradient-to-br ${pet.color} flex-shrink-0 flex items-center justify-center p-2 relative shadow-inner`}>
                  <img 
                      src={pet.image} 
                      alt={pet.name} 
                      className={`w-full h-full object-contain drop-shadow-lg transition-transform duration-500 ${isSelected ? 'scale-110 animate-[avatarFloat_3s_ease-in-out_infinite]' : 'scale-95'}`}
                  />
                  {isSelected && (
                     <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1 shadow-lg">
                       <CheckCircle2 size={16} className="text-white" />
                     </div>
                  )}
                </div>

                {/* INFORMACIÓN DEL STARTER */}
                <div className="flex flex-col flex-1 justify-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{pet.element}</span>
                  <h3 className="text-xl font-black text-white uppercase leading-none mb-1">{pet.name}</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{pet.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTÓN CON COLOR SEGURO (BLUE-600) */}
        <div className={`transition-all duration-500 ${selectedId ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <button 
            onClick={handleConfirm}
            className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105 transition-transform uppercase tracking-widest mt-4"
          >
            Comenzar Aventura <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}