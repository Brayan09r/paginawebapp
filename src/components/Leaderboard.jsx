import { Trophy, Medal, Flame, ChevronUp } from "lucide-react";

// Simulamos los datos de una base de datos (luego esto vendrá de Supabase)
const LEADERBOARD_DATA = [
  { rank: 1, name: "Alex Code", xp: 15420, isMe: false, avatar: "🐉", color: "from-red-500 to-orange-500" },
  { rank: 2, name: "Sofia Dev", xp: 14200, isMe: false, avatar: "🐱", color: "from-blue-400 to-cyan-400" },
  { rank: 3, name: "Carlos IT", xp: 13850, isMe: false, avatar: "🤖", color: "from-purple-500 to-fuchsia-500" },
  { rank: 4, name: "Beto Tech", xp: 12100, isMe: false, avatar: "🐼", color: "from-slate-700 to-slate-600" },
  { rank: 5, name: "Tú", xp: 11950, isMe: true, avatar: "🦊", color: "from-indigo-500 to-purple-600" },
  { rank: 6, name: "Maria SQL", xp: 10500, isMe: false, avatar: "🦎", color: "from-slate-700 to-slate-600" },
];

export default function Leaderboard() {
  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto pb-28 animate-in fade-in duration-300">
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 uppercase tracking-widest">Liga Oro II</h2>
        <p className="text-indigo-300 text-sm font-medium">Temporada 4 • Termina en 2 días</p>
      </div>

      {/* PODIO DE LOS 3 MEJORES */}
      <div className="flex justify-center items-end gap-2 pt-8 pb-4">
        {/* Segundo Lugar */}
        <div className="flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700 delay-100">
          <div className="w-14 h-14 bg-gradient-to-tr from-slate-300 to-slate-100 rounded-full border-4 border-slate-400 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(148,163,184,0.5)] z-10 mb-[-10px]">
            {LEADERBOARD_DATA[1].avatar}
          </div>
          <div className="bg-gradient-to-t from-slate-800 to-slate-600 w-20 h-24 rounded-t-lg flex flex-col items-center justify-start pt-4 border-t border-x border-slate-400/30">
            <Medal size={20} className="text-slate-300 drop-shadow-md mb-1" />
            <span className="text-[10px] font-bold text-white truncate w-full text-center px-1">{LEADERBOARD_DATA[1].name}</span>
            <span className="text-[10px] text-slate-300">{LEADERBOARD_DATA[1].xp}</span>
          </div>
        </div>

        {/* Primer Lugar */}
        <div className="flex flex-col items-center animate-in slide-in-from-bottom-12 duration-700">
          <div className="text-yellow-400 mb-1 animate-bounce">
            <Trophy size={28} fill="currentColor" className="drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
          </div>
          <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-yellow-200 rounded-full border-4 border-yellow-500 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(250,204,21,0.6)] z-10 mb-[-10px]">
            {LEADERBOARD_DATA[0].avatar}
          </div>
          <div className="bg-gradient-to-t from-yellow-900/80 to-yellow-600/80 w-24 h-32 rounded-t-lg flex flex-col items-center justify-start pt-4 border-t border-x border-yellow-500/50">
            <span className="text-xs font-black text-white truncate w-full text-center px-1 mt-1">{LEADERBOARD_DATA[0].name}</span>
            <span className="text-[10px] font-bold text-yellow-300">{LEADERBOARD_DATA[0].xp} XP</span>
          </div>
        </div>

        {/* Tercer Lugar */}
        <div className="flex flex-col items-center animate-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="w-14 h-14 bg-gradient-to-tr from-amber-700 to-amber-500 rounded-full border-4 border-amber-800 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(180,83,9,0.5)] z-10 mb-[-10px]">
            {LEADERBOARD_DATA[2].avatar}
          </div>
          <div className="bg-gradient-to-t from-amber-950 to-amber-900/80 w-20 h-20 rounded-t-lg flex flex-col items-center justify-start pt-4 border-t border-x border-amber-700/30">
            <Medal size={20} className="text-amber-600 drop-shadow-md mb-1" />
            <span className="text-[10px] font-bold text-white truncate w-full text-center px-1">{LEADERBOARD_DATA[2].name}</span>
            <span className="text-[10px] text-amber-500">{LEADERBOARD_DATA[2].xp}</span>
          </div>
        </div>
      </div>

      {/* LISTA DEL RANKING */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-2 backdrop-blur-md space-y-2">
        {LEADERBOARD_DATA.slice(3).map((user) => (
          <div 
            key={user.rank} 
            className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
              user.isMe ? "bg-gradient-to-r from-indigo-600/40 to-purple-600/40 border border-indigo-500/50 shadow-lg shadow-indigo-500/20" : "bg-slate-900/50"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`font-black text-lg w-4 text-center ${user.isMe ? "text-indigo-300" : "text-slate-500"}`}>
                {user.rank}
              </span>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${user.color} flex items-center justify-center text-xl shadow-inner`}>
                {user.avatar}
              </div>
              <div>
                <h4 className={`font-bold text-sm ${user.isMe ? "text-white" : "text-slate-300"}`}>
                  {user.name} {user.isMe && "(Tú)"}
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Flame size={10} className="text-orange-400" /> Racha activa
                </div>
              </div>
            </div>
            <div className="text-right flex items-center gap-3">
              <span className={`font-bold ${user.isMe ? "text-indigo-300" : "text-white"}`}>{user.xp} <span className="text-[10px] text-slate-500">XP</span></span>
              {user.isMe && <ChevronUp size={16} className="text-green-400 animate-pulse" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}