import { useState, useEffect, useRef } from "react";
import { Clock, Play, AlertTriangle, Coffee, Camera, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import EvidenceUpload from "./EvidenceUpload";

export default function Timer({ onFinish, onStart, activePet, onReward }) {
  // Fases: setup -> focus (30m) -> break (5m) -> finished
  const [phase, setPhase] = useState("setup");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPausedForCheckIn, setIsPausedForCheckIn] = useState(false);
  
  const FOCUS_MINUTES = 30; // 30 minutos obligatorios
  const BREAK_MINUTES = 5;  // 5 minutos de descompresión
  const fileInputRef = useRef(null);

  useEffect(() => {
    let interval;
    if ((phase === "focus" || phase === "break") && !isPausedForCheckIn) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          // Lógica de Check-in sorpresa a la mitad del focus (Minuto 15)
          if (phase === "focus" && prev === Math.floor((FOCUS_MINUTES * 60) / 2)) {
            setIsPausedForCheckIn(true);
            toast('¡Check-in Sorpresa! Tómale foto a tu avance.', { icon: '📸' });
          }

          if (prev <= 1) {
            clearInterval(interval);
            if (phase === "focus") {
              setPhase("break");
              setTimeLeft(BREAK_MINUTES * 60);
              toast.success('¡Bloque completado! Toma 5 minutos de descanso.', { icon: '☕' });
            } else if (phase === "break") {
              setPhase("finished");
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, isPausedForCheckIn]);

  const handleStart = () => {
    setTimeLeft(FOCUS_MINUTES * 60);
    setPhase("focus");
    onStart(); 
  };

  const handleGiveUp = () => {
    if (window.confirm("¡ALERTA! Si te rindes perderás tu Racha Diaria. ¿Seguro?")) {
      onFinish(); 
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-sapphire-950 relative">
      
      {/* PANTALLA DE CHECK-IN SORPRESA */}
      {isPausedForCheckIn && (
        <div className="absolute inset-0 z-50 bg-sapphire-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300">
           <div className="w-24 h-24 bg-electric-500/20 rounded-full flex items-center justify-center mb-6 border border-electric-500/50">
             <Camera size={40} className="text-electric-500 animate-bounce" />
           </div>
           <h3 className="text-3xl font-black text-white mb-2 text-center uppercase tracking-widest">¡Check-in Sorpresa!</h3>
           <p className="text-slate-400 text-center text-sm mb-8 px-4">Sube una foto de tu avance para reanudar el cronómetro y ganar tu racha.</p>
           
           <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={() => setIsPausedForCheckIn(false)} />
           
           <button onClick={() => fileInputRef.current.click()} className="w-full bg-gradient-to-r from-electric-600 to-electric-500 py-4 rounded-xl font-black text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,90,0,0.4)] hover:scale-105 transition-transform">
             <UploadCloud size={20} /> Tomar Foto Rápida
           </button>
        </div>
      )}

      {/* CONFIGURACIÓN INICIAL (Eliminamos el slider para forzar 30/5) */}
      {phase === "setup" && (
        <div className="w-full flex flex-col items-center space-y-10 animate-in zoom-in duration-300">
          <div className="text-center">
            <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Método Anti-Procrastinación</h2>
            <p className="text-slate-400 text-sm px-4">Ciclo estricto: 30 min de estudio profundo + 5 min de descompresión.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center p-4 bg-sapphire-900 border border-white/10 rounded-2xl">
                <span className="text-4xl font-black text-electric-500">30</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Min Focus</span>
            </div>
            <div className="text-slate-500 font-bold text-xl">+</div>
            <div className="flex flex-col items-center p-4 bg-sapphire-900 border border-white/10 rounded-2xl">
                <span className="text-4xl font-black text-emerald-500">05</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Min Break</span>
            </div>
          </div>

          <button onClick={handleStart} className="w-full bg-electric-600 py-4 rounded-2xl font-black flex items-center justify-center gap-2 text-white shadow-[0_0_20px_rgba(255,90,0,0.4)] hover:bg-electric-500 transition-colors uppercase tracking-widest">
            <Play fill="currentColor" size={20} /> Iniciar Ciclo
          </button>
        </div>
      )}

      {/* CRONÓMETRO CORRIENDO (FOCUS O BREAK) */}
      {(phase === "focus" || phase === "break") && (
        <div className="w-full h-full flex flex-col items-center py-4 animate-in zoom-in duration-500">
          
          <div className={`px-6 py-2.5 rounded-full flex items-center gap-2 mb-8 border ${phase === "focus" ? "bg-red-500/10 border-red-500/20" : "bg-emerald-500/10 border-emerald-500/20"}`}>
            {phase === "focus" ? <AlertTriangle size={16} className="text-red-400" /> : <Coffee size={16} className="text-emerald-400" />}
            <span className={`text-xs font-black tracking-widest uppercase ${phase === "focus" ? "text-red-300" : "text-emerald-300"}`}>
                {phase === "focus" ? "No te salgas de la App" : "Descompresión Activa"}
            </span>
          </div>

          <div className="relative w-72 h-72 flex items-center justify-center mb-8">
            <div className={`absolute inset-0 border-[3px] border-dashed rounded-full animate-[spin_15s_linear_infinite] ${phase === "focus" ? "border-electric-500/30" : "border-emerald-500/30"}`}></div>
            <div className={`absolute inset-2 border-4 rounded-full ${phase === "focus" ? "border-electric-600/20" : "border-emerald-600/20"}`}></div>
            <div className="text-center z-10">
              <Clock size={32} className={`mx-auto mb-4 opacity-60 ${phase === "focus" ? "text-electric-400" : "text-emerald-400"}`} />
              <h2 className="text-7xl font-black tabular-nums text-white tracking-tight drop-shadow-lg">{formatTime(timeLeft)}</h2>
            </div>
          </div>

          {phase === "focus" && (
            <button onClick={handleGiveUp} className="text-slate-500 hover:text-red-400 font-bold text-sm underline transition-colors mb-auto">
                Rendirse (Perder Racha)
            </button>
          )}

          <div className="flex flex-col items-center text-center mt-auto">
            <div className={`text-7xl mb-2 animate-[avatarFloat_3s_ease-in-out_infinite] relative drop-shadow-[0_0_25px_rgba(255,90,0,0.6)]`}>
              {activePet?.emoji || '🦊'}
            </div>
            <p className="text-xs text-electric-500 font-bold tracking-widest uppercase mb-2">Mensaje Motivacional:</p>
            <p className="text-sm text-slate-300 font-medium max-w-xs leading-relaxed px-4">
              "Estás invirtiendo en tu futuro. ¡Cada minuto te acerca a tus sueños!"
            </p>
          </div>
        </div>
      )}

      {/* MANDAMOS LOS MINUTOS AL RESUMEN FINAL */}
      {phase === "finished" && (
        <EvidenceUpload onFinish={onFinish} onReward={onReward} sessionMinutes={FOCUS_MINUTES} />
      )}
    </div>
  );
}