import { useState, useRef } from "react";
import { Camera, UploadCloud, Loader2, Star, Zap, Trophy, Flame } from "lucide-react";import confetti from "canvas-confetti";

export default function EvidenceUpload({ onFinish, onReward, sessionMinutes }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, uploading, summary
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleValidate = () => {
    setStatus("uploading");
    setTimeout(() => {
      // Disparamos la pantalla de Resumen Récord
      setStatus("summary");
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.4 }, colors: ['#eab308', '#f97316', '#3b82f6'] });
    }, 2000);
  };

  return (
    <div className="w-full bg-slate-900 border border-white/10 rounded-3xl p-6 text-center space-y-4 backdrop-blur-md animate-in slide-in-from-bottom duration-500 shadow-2xl">
      
      {/* ESPERANDO FOTO FINAL */}
      {status === "idle" && (
        <>
          <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto text-indigo-400">
            <Camera size={32} />
          </div>
          <div>
              <h3 className="font-black text-white text-xl uppercase tracking-widest">¡Misión Cumplida!</h3>
              <p className="text-xs text-slate-400 mt-1">Sube la evidencia final de tu trabajo.</p>
          </div>

          <div onClick={() => fileInputRef.current.click()} className="w-full aspect-video border-2 border-dashed border-indigo-500/50 bg-indigo-500/5 rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group mt-4">
            {imagePreview ? (
              <img src={imagePreview} className="w-full h-full object-cover opacity-80" />
            ) : (
              <><UploadCloud className="text-indigo-400 mb-2" size={32} /><span className="font-bold text-indigo-300">Toca para subir foto</span></>
            )}
          </div>
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />

          <button disabled={!imagePreview} onClick={handleValidate} className={`w-full py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all ${imagePreview ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25" : "bg-slate-800 text-slate-500 cursor-not-allowed"}`}>
              <Zap size={18} /> Validar y Ver Resultados
          </button>
        </>
      )}

      {/* ANALIZANDO CON IA */}
      {status === "uploading" && (
        <div className="py-12 flex flex-col items-center space-y-4">
          <Loader2 size={48} className="text-indigo-500 animate-spin" />
          <h3 className="font-bold text-white text-lg animate-pulse">Analizando evidencia...</h3>
        </div>
      )}

      {/* RESUMEN Y NUEVO RÉCORD (ANALYTICS) */}
      {status === "summary" && (
        <div className="py-6 flex flex-col items-center space-y-6 animate-in zoom-in duration-300">
          <div className="text-yellow-400 animate-bounce">
            <Trophy size={64} fill="currentColor" className="drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
          </div>
          
          <div>
            <h3 className="font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 uppercase tracking-widest drop-shadow-md">¡Nuevo Récord!</h3>
            <p className="text-slate-300 font-medium mt-2">Has superado tu tiempo máximo de estudio.</p>
          </div>
          
          <div className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Tiempo Estudiado</span>
              <span className="font-black text-white text-lg">{sessionMinutes} Minutos</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Puntos de Racha</span>
              <span className="font-black text-orange-400 text-lg flex items-center gap-1"><Flame size={16}/> +2 Puntos</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase">Exp. Mascota</span>
              <span className="font-black text-indigo-400 text-lg">+150 XP</span>
            </div>
          </div>

          <button onClick={() => { if (onReward) onReward(150, 50); onFinish(); }} className="w-full bg-white text-slate-900 py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <Star size={18} fill="currentColor" /> Reclamar Botín
          </button>
        </div>
      )}
    </div>
  );
}