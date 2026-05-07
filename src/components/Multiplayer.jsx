import { AlertCircle, Plus } from "lucide-react";

const ROOM_MEMBERS = [
  { name: "Tú", status: "En Focus", isMe: true, avatar: "🦊" },
  { name: "Junior", status: "En Focus", isMe: false, avatar: "🦅" },
  { name: "Jewilson", status: "En Focus", isMe: false, avatar: "🤖" },
  { name: "Jhosue", status: "¡Distraído!", isMe: false, avatar: "🐼", alert: true },
];

export default function Multiplayer() {
  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto pb-28 animate-in fade-in duration-300">
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-black text-white uppercase tracking-widest">Sala de Estudio</h2>
        <p className="text-indigo-300 text-sm font-medium">Sincroniza tu focus con tu equipo</p>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3 backdrop-blur-md">
        <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="text-red-300 font-bold text-sm">¡Alerta de Racha!</h4>
          <p className="text-xs text-red-200/70 mt-1">Jhosue ha salido de la aplicación. Si no regresa en 2 minutos, la sala perderá el multiplicador de XP.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {ROOM_MEMBERS.map((member, i) => (
          <div key={i} className={`rounded-2xl p-4 border flex flex-col items-center text-center transition-all ${member.alert ? 'bg-red-950/50 border-red-500/50 animate-pulse' : 'bg-slate-900/50 border-white/10'}`}>
            <div className="text-4xl mb-2">{member.avatar}</div>
            <h4 className="font-bold text-white text-sm">{member.name}</h4>
            <span className={`text-[10px] font-black uppercase tracking-wider mt-1 px-2 py-0.5 rounded-full ${member.alert ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
              {member.status}
            </span>
          </div>
        ))}
        
        <button className="rounded-2xl p-4 border border-dashed border-indigo-500/50 bg-indigo-500/5 hover:bg-indigo-500/10 flex flex-col items-center justify-center text-center transition-all min-h-[120px]">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
            <Plus size={20} />
          </div>
          <span className="font-bold text-indigo-300 text-xs">Invitar Amigo</span>
        </button>
      </div>
    </div>
  );
}