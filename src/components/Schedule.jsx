import { useState } from "react";
import { Bell, Plus, MapPin, ChevronLeft, BellRing } from "lucide-react";import toast from "react-hot-toast";

const TODAY_CLASSES = [
  { id: 1, subject: "Sistemas de Base de Datos", time: "14:00 - 16:00", room: "Campus Huancayo - Lab A", type: "Laboratorio" },
  { id: 2, subject: "Laboratorio de Liderazgo e Innovación", time: "16:30 - 18:00", room: "Pabellón G - Aula 201", type: "Práctica" },
];

export default function Schedule({ onBack }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const enableNotifications = () => {
    // Aquí usamos la API nativa del navegador para pedir permisos
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotificationsEnabled(true);
          toast.success("¡Notificaciones Push activadas!", {
            icon: '🔔',
            style: { borderRadius: '12px', background: '#1e293b', color: '#fff', border: '1px solid #10b981' },
          });
          // Simulamos una notificación de prueba
          new Notification("Focus Friends", {
            body: "Tu clase de Base de Datos empieza en 10 minutos. ¡Prepárate!",
            icon: "/vite.svg" // Puedes cambiarlo por el logo de tu app
          });
        } else {
          toast.error("Permiso denegado por el navegador.");
        }
      });
    } else {
      toast.error("Tu navegador no soporta notificaciones.");
    }
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto pb-28 animate-in slide-in-from-right duration-300 bg-slate-950 absolute inset-0 z-40">
      
      {/* CABECERA */}
      <div className="mt-4 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-300 hover:bg-white/10 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-black text-white tracking-widest">Mi Horario</h2>
          <p className="text-indigo-400 text-xs font-bold uppercase">Hoy, Lunes</p>
        </div>
        <div className="w-10"></div> {/* Espaciador */}
      </div>

      {/* WIDGET DE NOTIFICACIONES */}
      <div className={`rounded-3xl p-5 border flex items-center justify-between transition-colors ${notificationsEnabled ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-500/30'}`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${notificationsEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
            {notificationsEnabled ? <BellRing size={24} className="animate-pulse" /> : <Bell size={24} />}
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Alertas de Clase</h3>
            <p className="text-[10px] text-slate-400">Te avisaremos 10 min antes</p>
          </div>
        </div>
        <button 
          onClick={enableNotifications}
          disabled={notificationsEnabled}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${notificationsEnabled ? 'bg-emerald-500/20 text-emerald-400 cursor-default' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'}`}
        >
          {notificationsEnabled ? 'Activas' : 'Activar'}
        </button>
      </div>

      {/* LISTA DE CLASES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-300 uppercase tracking-widest text-xs">Clases de Hoy</h3>
          <button className="text-indigo-400 flex items-center gap-1 text-xs font-bold hover:text-indigo-300">
            <Plus size={14} /> Añadir
          </button>
        </div>

        {TODAY_CLASSES.map((cls) => (
          <div key={cls.id} className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 flex gap-4 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500 rounded-l-2xl"></div>
            
            <div className="flex flex-col items-center justify-center min-w-[60px] border-r border-white/10 pr-4">
              <span className="text-sm font-black text-white">{cls.time.split(' - ')[0]}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Inicio</span>
            </div>

            <div className="flex-1 py-1">
              <span className="text-[9px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-sm mb-1 inline-block">
                {cls.type}
              </span>
              <h4 className="font-bold text-white text-sm leading-tight mb-1">{cls.subject}</h4>
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <MapPin size={10} /> {cls.room}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}