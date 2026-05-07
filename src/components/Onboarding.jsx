import { Star, ChevronRight, UploadCloud, CheckCircle2 } from "lucide-react";
import { useRef } from "react";

export default function Onboarding({ setView, setHero, hero }) {
  // Referencia para ocultar el input real de tipo "file" y usar nuestro propio diseño
  const fileInputRef = useRef(null);

  // Validamos que todos los campos de texto estén llenos (el horario lo dejamos opcional por si lo suben después)
  const canStart = hero.name.trim() && hero.carrera.trim() && hero.universidad.trim() && hero.edad.trim() && hero.ciclo.trim();

  // Función para capturar el archivo cuando el usuario lo selecciona
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHero({ ...hero, horario: file.name });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 p-6 bg-gradient-to-br from-slate-900 to-indigo-950">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_30px_rgba(79,70,229,0.5)] animate-pulse">
          <Star size={28} fill="white" className="text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-1">¡Hola estudiante!</h1>
        <p className="text-indigo-300 text-sm">Venzamos la procrastinación juntos</p>
      </div>

      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-xl">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Nombre del Héroe</label>
            <input 
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all text-white text-sm"
              placeholder="¿Cómo te llamamos?"
              value={hero.name}
              onChange={(e) => setHero({...hero, name: e.target.value})}
            />
          </div>

          {/* Fila con Edad y Ciclo compartiendo espacio */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Edad</label>
              <input 
                type="number"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all text-white text-sm"
                placeholder="Ej: 20"
                value={hero.edad}
                onChange={(e) => setHero({...hero, edad: e.target.value})}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Ciclo</label>
              <input 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all text-white text-sm"
                placeholder="Ej: 5to"
                value={hero.ciclo}
                onChange={(e) => setHero({...hero, ciclo: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Carrera</label>
            <input 
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all text-white text-sm"
              placeholder="Ej: Ingeniería de Sistemas"
              value={hero.carrera}
              onChange={(e) => setHero({...hero, carrera: e.target.value})}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Universidad</label>
            <input 
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all text-white text-sm"
              placeholder="Tu alma mater..."
              value={hero.universidad}
              onChange={(e) => setHero({...hero, universidad: e.target.value})}
            />
          </div>

          {/* Zona de Subida del Horario */}
          <div className="pt-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tu Horario de Clases</label>
            <div 
              onClick={() => fileInputRef.current.click()} 
              className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all text-center ${
                hero.horario ? 'border-green-500/50 bg-green-500/10' : 'border-indigo-500/50 bg-indigo-500/5 hover:bg-indigo-500/20'
              }`}
            >
              {hero.horario ? (
                <>
                  <CheckCircle2 className="text-green-400 mb-1" size={24} />
                  <span className="text-sm text-green-300 font-bold truncate w-full px-2">{hero.horario}</span>
                </>
              ) : (
                <>
                  <UploadCloud className="text-indigo-400 mb-1" size={24} />
                  <span className="text-sm text-indigo-300 font-medium">Subir foto o PDF</span>
                  <span className="text-[10px] text-slate-400 mt-1">Para que tu mascota te avise</span>
                </>
              )}
            </div>
            {/* Input real oculto */}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*,.pdf" 
              onChange={handleFileChange} 
            />
          </div>
        </div>

        <button 
          disabled={!canStart}
          onClick={() => setView(1)}
          className={`w-full mt-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
            canStart ? "bg-indigo-600 shadow-lg shadow-indigo-600/50 text-white cursor-pointer" : "bg-slate-700 text-slate-400 opacity-50 cursor-not-allowed"
          }`}
        >
          Comenzar mi aventura <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}