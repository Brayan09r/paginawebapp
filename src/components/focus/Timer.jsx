import { useState, useEffect, useRef } from "react";
import { Clock, Play, AlertTriangle, Camera, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import EvidenceUpload from "./EvidenceUpload";

export default function Timer({ onFinish, onStart, activePet, onReward }) {
  const [phase, setPhase] = useState("setup");
  const [minutes, setMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPausedForCheckIn, setIsPausedForCheckIn] = useState(false); // Estado del Check-in
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    let interval;
    if (phase === "running" && !isPausedForCheckIn) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          // LÓGICA DE CHECK-IN: Se activa exactamente a la mitad del tiempo
          const halfTime = Math.floor((minutes * 60) / 1);
          if (prev === halfTime) {
            setIsPausedForCheckIn(true);
            toast('¡Check-in Sorpresa! Tómale foto a tu avance.', { icon: '📸' });
          }

          if (prev <= 1) {
            clearInterval(interval);
            setPhase("finished");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, isPausedForCheckIn, minutes]);

  const handleStart = () => {
    setTimeLeft(minutes * 60);
    setPhase("running");
    onStart(); 
  };

  const handleGiveUp = () => {
    if (window.confirm("¡ALERTA! Si te rindes perderás tu Racha Diaria. ¿Seguro?")) {
      onFinish(); 
    }
  };

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return h > 0 ? `${h}:${m}:${sec}` : `${m}:${sec}`;
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-950 relative">
      
      {/* PANTALLA DE CHECK-IN SORPRESA SUPERPUESTA */}
      {isPausedForCheckIn && (
        <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300">
           <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6 border border-indigo-500/50">
             <Camera size={40} className="text-indigo-400 animate-bounce" />
           </div>
           <h3 className="text-3xl font-black text-white mb-2 text-center uppercase tracking-widest">¡Check-in Sorpresa!</h3>
           <p className="text-slate-400 text-center text-sm mb-8 px-4">Sube una foto de tu avance actual para reanudar el cronómetro y ganar puntos extra de racha.</p>
           
           <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={() => setIsPausedForCheckIn(false)} />
           
           <button onClick={() => fileInputRef.current.click()} className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 py-4 rounded-xl font-black text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:scale-105 transition-transform">
             <UploadCloud size={20} /> Tomar Foto Rápida
           </button>
        </div>
      )}

      {/* CONFIGURACIÓN */}
      {phase === "setup" && (
        <div className="w-full flex flex-col items-center space-y-10 animate-in zoom-in duration-300">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Configura tu Sesión</h2>
            <p className="text-slate-400 text-sm">¿Cuánto tiempo necesitas concentrarte?</p>
          </div>
          <div className="text-6xl font-black tabular-nums text-indigo-400">
            {minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)}h ${minutes % 60 > 0 ? minutes % 60 + 'm' : ''}`}
          </div>
          <div className="w-full max-w-xs space-y-4">
            <input 
              type="range" min="1" max="240" step="1" value={minutes} 
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="w-full accent-indigo-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <button onClick={handleStart} className="w-full bg-indigo-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-colors">
            <Play fill="currentColor" size={20} /> Empezar Focus
          </button>
        </div>
      )}

      {/* CRONÓMETRO CORRIENDO */}
      {phase === "running" && (
        <div className="w-full h-full flex flex-col items-center py-4 animate-in zoom-in duration-500">
          <div className="bg-red-500/10 border border-red-500/20 px-6 py-2.5 rounded-full flex items-center gap-2 mb-8">
            <AlertTriangle size={16} className="text-red-400" />
            <span className="text-red-300 text-xs font-black tracking-widest uppercase">No te salgas de la App</span>
          </div>

          <div className="relative w-72 h-72 flex items-center justify-center mb-8">
            <div className="absolute inset-0 border-[3px] border-dashed border-indigo-500/30 rounded-full animate-[spin_15s_linear_infinite]"></div>
            <div className="absolute inset-2 border-4 border-indigo-600/20 rounded-full"></div>
            <div className="text-center z-10">
              <Clock size={32} className="mx-auto mb-4 text-indigo-400 opacity-60" />
              <h2 className="text-6xl font-black tabular-nums text-white tracking-tight drop-shadow-lg">{formatTime(timeLeft)}</h2>
            </div>
          </div>

          <button onClick={handleGiveUp} className="text-slate-500 hover:text-red-400 font-bold text-sm underline transition-colors mb-auto">
            Rendirse (Perder Racha)
          </button>

          <div className="flex flex-col items-center text-center mt-8">
            <div className="text-7xl mb-2 drop-shadow-[0_0_25px_rgba(99,102,241,0.6)] animate-[avatarFloat_3s_ease-in-out_infinite] relative">
              {activePet?.emoji || '🦊'}
            </div>
            <p className="text-xs text-yellow-500 font-bold tracking-widest uppercase mb-2">Mensaje Motivacional:</p>
            <p className="text-sm text-slate-300 font-medium max-w-xs leading-relaxed px-4">
              "Estás invirtiendo en tu futuro. ¡Cada minuto te acerca a tus sueños!"
            </p>
          </div>
        </div>
      )}

      {/* MANDAMOS LOS MINUTOS AL RESUMEN FINAL */}
      {phase === "finished" && (
        <EvidenceUpload onFinish={onFinish} onReward={onReward} sessionMinutes={minutes} />
      )}
    </div>
  );
}