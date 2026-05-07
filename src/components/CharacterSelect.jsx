import { useState } from "react";
import { ChevronRight, Lock, Coins, CreditCard } from "lucide-react";

const PET_CATALOG = [
  { id: 'fox', name: 'Zorro Astuto', emoji: '🦊', type: 'free', bg: 'from-orange-600 via-orange-400 to-orange-300', shadow: 'shadow-orange-500/40' },
  { id: 'cat', name: 'Gato Ninja', emoji: '🐱', type: 'free', bg: 'from-blue-600 via-blue-400 to-cyan-300', shadow: 'shadow-blue-500/40' },
  { id: 'panda', name: 'Panda Zen', emoji: '🐼', type: 'free', bg: 'from-emerald-600 via-emerald-400 to-green-300', shadow: 'shadow-emerald-500/40' },
  { id: 'dragon', name: 'Dragón Mítico', emoji: '🐉', type: 'points', price: 5000, bg: 'from-red-600 via-rose-500 to-red-400', shadow: 'shadow-red-500/40' },
  { id: 'robot', name: 'Mecha-Bot', emoji: '🤖', type: 'premium', price: '$4.99', bg: 'from-purple-600 via-fuchsia-500 to-pink-400', shadow: 'shadow-purple-500/40' },
];

export default function CharacterSelect({ onConfirm, setActivePet, isStore = false }) {
  const [selectedId, setSelectedId] = useState('fox');

  const handleConfirm = () => {
    const pet = PET_CATALOG.find(p => p.id === selectedId);
    if (pet.type === 'free') {
      setActivePet(pet);
      onConfirm(); // Regresa al Home o avanza a la App dependiendo de dónde estemos
    }
  };

  const selectedPetInfo = PET_CATALOG.find(p => p.id === selectedId);

  return (
    // Si es tienda, dejamos espacio abajo (pb-24) para que el menú no tape el botón
    <div className={`flex flex-col items-center p-6 bg-slate-950 w-full max-w-md mx-auto ${isStore ? 'h-full pb-24 overflow-y-auto' : 'min-h-screen'}`}>
      <div className="text-center mt-6 mb-6">
        <h1 className="text-2xl font-bold mb-1">{isStore ? 'Tienda de Compañeros' : 'Elige tu Compañero'}</h1>
        <p className="text-slate-400 text-sm">Él te ayudará a mantener el Focus</p>
      </div>

      <div className="w-full max-w-sm mb-8 animate-[avatarFloat_3.2s_ease-in-out_infinite]">
        <div className={`w-40 h-40 mx-auto bg-gradient-to-tr ${selectedPetInfo.bg} rounded-full border-4 border-white/20 shadow-[0_0_40px_rgba(0,0,0,0)] ${selectedPetInfo.shadow} flex items-center justify-center transition-all duration-500`}>
            <span className="text-6xl drop-shadow-lg">{selectedPetInfo.emoji}</span>
        </div>
        <h2 className="text-center mt-5 text-xl font-bold text-white">{selectedPetInfo.name}</h2>
        <div className="flex justify-center mt-2">
            {selectedPetInfo.type === 'free' && <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">DISPONIBLE</span>}
            {selectedPetInfo.type === 'points' && <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold border border-orange-500/30 flex items-center gap-1"><Coins size={12}/> {selectedPetInfo.price} Pts</span>}
            {selectedPetInfo.type === 'premium' && <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-bold border border-purple-500/30 flex items-center gap-1"><CreditCard size={12}/> {selectedPetInfo.price}</span>}
        </div>
      </div>

      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-md mb-8">
        <div className="grid grid-cols-3 gap-3">
          {PET_CATALOG.map((pet) => (
            <button
              key={pet.id}
              onClick={() => setSelectedId(pet.id)}
              className={`relative aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all ${
                selectedId === pet.id 
                  ? `bg-gradient-to-tr ${pet.bg} scale-105 border-2 border-white shadow-lg` 
                  : 'bg-slate-800/50 border border-white/5 hover:bg-slate-800'
              }`}
            >
              <span className={pet.type !== 'free' ? 'opacity-40 grayscale' : ''}>{pet.emoji}</span>
              {pet.type !== 'free' && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 rounded-2xl">
                  <Lock size={16} className="text-white/70" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <button 
        disabled={selectedPetInfo.type !== 'free'}
        onClick={handleConfirm}
        className={`w-full max-w-sm py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
          selectedPetInfo.type === 'free' ? "bg-indigo-600 shadow-lg shadow-indigo-600/50 text-white cursor-pointer" : "bg-slate-800 text-slate-500 cursor-not-allowed"
        }`}
      >
        {selectedPetInfo.type === 'free' ? (isStore ? 'Equipar Compañero' : 'Seleccionar') : 'Bloqueado'} 
        <ChevronRight size={20} />
      </button>
    </div>
  );
}