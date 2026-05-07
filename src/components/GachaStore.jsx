import { Sparkles, Clock, Coins } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";

// RECIBIMOS LAS MONEDAS REALES DESDE LA APP
export default function GachaStore({ coins, setCoins }) {
  const [isHatching, setIsHatching] = useState(false);

  const buyEgg = () => {
    if (coins >= 500) {
      setCoins((prev) => prev - 500); // DESCONTAMOS 500 MONEDAS
      setIsHatching(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ['#eab308'] });
    } else {
      alert("No tienes suficientes puntos. ¡Ve a hacer un Focus!");
    }
  };

  return (
    // AGREGAMOS "slide-in-from-right" A LA ANIMACIÓN
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto pb-28 animate-in slide-in-from-right fade-in duration-300">
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 uppercase tracking-widest">Incubadora</h2>
        <p className="text-slate-400 text-sm font-medium">Obtén compañeros legendarios</p>
      </div>

      <div className="bg-slate-900/80 border border-white/10 rounded-full px-6 py-2 mx-auto flex items-center gap-2 shadow-lg">
        <Coins size={16} className="text-yellow-400" />
        <span className="font-bold text-white">{coins} Puntos</span>
      </div>

      {!isHatching ? (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-emerald-500/30 rounded-3xl p-8 text-center shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden">
          <Sparkles className="absolute top-4 right-4 text-emerald-400 opacity-50 animate-pulse" size={24} />
          <div className="text-8xl mb-6 animate-[avatarFloat_3s_ease-in-out_infinite] drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]">
            🥚
          </div>
          <h3 className="text-xl font-black text-white mb-2">Huevo Misterioso</h3>
          <p className="text-sm text-slate-400 mb-6">Contiene una mascota de rareza aleatoria. Requiere 2 horas de Focus para eclosionar.</p>
          <button 
            onClick={buyEgg} 
            className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${coins >= 500 ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
          >
            <Coins size={18} /> Comprar por 500 Pts
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/50 rounded-3xl p-8 text-center shadow-[0_0_40px_rgba(99,102,241,0.2)]">
          <div className="text-8xl mb-6 animate-pulse drop-shadow-[0_0_30px_rgba(99,102,241,0.8)]">
            🐣
          </div>
          <h3 className="text-xl font-black text-indigo-300 mb-2">Incubando...</h3>
          <div className="flex justify-center items-center gap-2 text-slate-300 mb-4 font-bold">
            <Clock size={16} className="text-indigo-400" /> 02:00:00 restantes
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-white/10">
            <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 w-[15%] relative">
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-4">Mantente en Focus para avanzar</p>
        </div>
      )}
    </div>
  );
}