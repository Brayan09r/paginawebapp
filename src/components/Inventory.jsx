import { CheckCircle2, ShieldCheck } from "lucide-react";

// LA LISTA CON RUTAS EN MAYÚSCULAS
const ALL_PETS = [
  { id: "ignipup", name: "Ignipup", title: "The Spunky Leader", image: "/avatars/IGNIPUP.png", color: "from-orange-500 to-red-500" },
  { id: "ondina", name: "Ondina", title: "Musa del Flujo Creativo", image: "/avatars/ONDINA.png", color: "from-cyan-400 to-blue-500" },
  { id: "urgosh", name: "Urgosh", title: "Enfoque Inquebrantable", image: "/avatars/URGOSH.png", color: "from-emerald-600 to-green-800" },
  { id: "kyklop", name: "Kyklop", title: "Vidente de Visión", image: "/avatars/KYKLOP.png", color: "from-purple-500 to-indigo-600" },
  { id: "mekgrob", name: "Mekgrob", title: "Desmantelador de Tareas", image: "/avatars/MEKGROB.png", color: "from-amber-500 to-orange-700" },
  { id: "skorn", name: "Skorn", title: "Disciplina de Hierro", image: "/avatars/SKORN.png", color: "from-slate-500 to-slate-700" },
  { id: "sylpha", name: "Sylpha", title: "Guía del Enfoque", image: "/avatars/SYLPHA.png", color: "from-lime-400 to-green-600" },
  { id: "archivus", name: "Archivus", title: "El Guardián del Saber", image: "/avatars/ARCHIVUS.png", color: "from-amber-700 to-yellow-900" },
  { id: "pyros", name: "Pyros", title: "Guardián de Disciplina", image: "/avatars/PYROS.png", color: "from-red-600 to-orange-900" },
  { id: "thunderbolt", name: "Thunderbolt", title: "The Radiant Beacon", image: "/avatars/THUNDERBOLT.png", color: "from-indigo-400 to-purple-600" },
  { id: "groveheart", name: "Groveheart", title: "The Sylvan Protector", image: "/avatars/GROVEHEART.png", color: "from-green-500 to-emerald-700" },
  { id: "datawings", name: "Datawings", title: "The Stellar Initiate", image: "/avatars/DATAWINGS.png", color: "from-blue-300 to-indigo-500" },
  { id: "geoforce", name: "Geoforce", title: "The Resilient Guardian", image: "/avatars/GEOFORCE.png", color: "from-stone-500 to-stone-800" },
  { id: "nyxwing", name: "Nyxwing", title: "The Sleek Legendary", image: "/avatars/NYXWING.png", color: "from-slate-800 to-black" },
  { id: "shellshock", name: "Shellshock", title: "The Sturdy Tank", image: "/avatars/SHELLSHOCK.png", color: "from-teal-400 to-emerald-600" },
  { id: "glowleaf", name: "GlowLeaf", title: "The Quirky Companion", image: "/avatars/GLOWLEAF.png", color: "from-lime-300 to-green-500" }
];

export default function Inventory({ activePet, setActivePet }) {
  const handleEquip = (pet) => {
    setActivePet({
      ...pet,
      level: activePet?.level || 1,
      xp: activePet?.xp || 0,
      maxXp: activePet?.maxXp || 500
    });
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto pb-28 animate-in slide-in-from-right fade-in duration-300 bg-slate-950">
      
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 uppercase tracking-widest">
          Tus Mascotas
        </h2>
        <p className="text-slate-400 text-sm font-medium">Equipa a tu compañero de estudio</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {ALL_PETS.map((pet) => {
          const isEquipped = activePet?.id === pet.id;

          return (
            <div key={pet.id} className={`bg-white rounded-xl overflow-hidden border-4 flex flex-col transition-transform hover:-translate-y-1 ${isEquipped ? 'border-electric-500 shadow-[0_0_15px_rgba(255,90,0,0.5)] scale-[1.02]' : 'border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,40,65,1)]'}`}>
              
              <div className={`h-32 bg-gradient-to-br ${pet.color} flex items-center justify-center relative p-2`}>
                
                {/* IMG SIN OCULTAR: Si falla, veremos el logo de imagen rota */}
                <img 
                    src={pet.image} 
                    alt={pet.name} 
                    className={`w-full h-full object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)] ${isEquipped ? 'animate-[avatarFloat_3s_ease-in-out_infinite]' : ''}`}
                />

                {isEquipped && (
                  <div className="absolute top-2 right-2 bg-slate-800 text-white p-1 rounded-full shadow-md animate-bounce">
                    <ShieldCheck size={16} fill="currentColor" />
                  </div>
                )}
              </div>

              <div className="p-3 text-center bg-slate-50 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-black text-slate-900 uppercase text-sm leading-tight truncate">{pet.name}</h3>
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1 mb-3 truncate">{pet.title}</p>
                </div>
                
                {/* BOTÓN CON COLOR SEGURO (SLATE-800) */}
                <button 
                  onClick={() => handleEquip(pet)}
                  disabled={isEquipped}
                  className={`w-full py-2 rounded-lg font-black text-xs flex items-center justify-center gap-1 transition-colors ${
                    isEquipped 
                      ? 'bg-blue-600 text-white shadow-inner' 
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {isEquipped ? <><CheckCircle2 size={12} /> Equipado</> : 'Equipar'}
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}