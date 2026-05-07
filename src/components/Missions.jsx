import { CheckCircle2, Gift, Coins, Flame, Target } from "lucide-react";

export default function Missions() {
  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto pb-24 animate-in fade-in duration-300">
      <div className="mt-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-[0_0_30px_rgba(99,102,241,0.3)] transform rotate-3">
          <Target size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-black text-white">Misiones Diarias</h2>
        <p className="text-indigo-300 text-sm font-medium">Completa tareas para ganar Diamantes</p>
      </div>

      {/* Misión 1: Completada */}
      <div className="bg-white/5 border border-green-500/30 rounded-2xl p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 border border-green-500/30">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Estudia 2 horas hoy</h3>
              <p className="text-[10px] text-green-400 font-bold uppercase tracking-wider mt-1">2 / 2 HORAS</p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-lg shadow-green-500/25 hover:scale-105 transition-transform">
            Reclamar
          </button>
        </div>
      </div>

      {/* Misión 2: En progreso */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/30">
              <Flame size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Mantén tu racha 3 días</h3>
              <div className="flex gap-1 mt-1.5">
                <div className="w-8 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                <div className="w-8 h-1.5 bg-white/10 rounded-full"></div>
                <div className="w-8 h-1.5 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-md border border-yellow-500/30">
              <Coins size={12} /> <span className="font-bold text-xs">50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Misión 3: Cofre semanal */}
      <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-purple-500/30 rounded-2xl p-5 text-center relative overflow-hidden mt-4">
        <Gift size={40} className="mx-auto text-purple-400 mb-2 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
        <h3 className="font-bold text-white mb-1">Cofre de Fin de Semana</h3>
        <p className="text-xs text-purple-300 mb-4">Completa 10 misiones para abrirlo</p>
        <div className="w-full bg-slate-900 rounded-full h-2 border border-white/5">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full w-[40%] relative">
             <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-bold mt-2">4 DE 10 MISIONES</p>
      </div>
    </div>
  );
}