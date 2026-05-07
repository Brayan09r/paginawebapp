import { User, Play, List, Store, Backpack, Trophy, Sun, Moon, Calendar, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";
import Timer from "./focus/Timer";
import CharacterSelect from "./CharacterSelect";
import Missions from "./Missions";
import Inventory from "./Inventory";
import Leaderboard from "./Leaderboard";
import GachaStore from "./GachaStore";
import Multiplayer from "./Multiplayer";
import Schedule from "./Schedule";

export default function MainApp({ hero, activePet, setActivePet }) {
  const [activeTab, setActiveTab] = useState("home");
  const [isFocusing, setIsFocusing] = useState(false);
  const [levelUpModal, setLevelUpModal] = useState(null);
  const [theme, setTheme] = useState("dark"); 
  const [showSchedule, setShowSchedule] = useState(false);
  const [coins, setCoins] = useState(500); 
  const [activeCarousel, setActiveCarousel] = useState(0);

  // Motor del carrusel automático
  useEffect(() => {
    if (activeTab === "home") {
      const interval = setInterval(() => {
        setActiveCarousel((prev) => (prev + 1) % 3);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleReward = (gainedXp, gainedPoints) => {
    if (!activePet) return;

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4f46e5', '#10b981', '#eab308'] 
    });

    toast.success(`¡+${gainedXp} de Exp. Mascota!`, {
      icon: '✨',
      style: { borderRadius: '12px', background: '#1e293b', color: '#fff', border: '1px solid #10b981' },
    });
    toast.success(`¡+${gainedPoints} Puntos obtenidos!`, {
      icon: '🪙',
      style: { borderRadius: '12px', background: '#1e293b', color: '#fff', border: '1px solid #eab308' },
    });

    setCoins(prev => prev + gainedPoints);

    let currentXp = activePet.xp || 0;
    let currentLevel = activePet.level || 1;
    let currentMaxXp = activePet.maxXp || 500;
    
    let newXp = currentXp + gainedXp;
    let didLevelUp = false;

    if (newXp >= currentMaxXp) {
        newXp = newXp - currentMaxXp;
        currentLevel += 1;
        currentMaxXp = Math.floor(currentMaxXp * 1.5);
        didLevelUp = true;
    }

    const updatedPet = {
        ...activePet,
        xp: newXp,
        level: currentLevel,
        maxXp: currentMaxXp
    };

    setActivePet(updatedPet);

    if (didLevelUp) {
        setTimeout(() => {
            setLevelUpModal(updatedPet);
            confetti({
                particleCount: 300,
                spread: 100,
                origin: { y: 0.4 },
                zIndex: 200 
            });
        }, 1000);
    }
  };

  return (
    <div className={`relative h-screen w-full max-w-md mx-auto overflow-hidden transition-colors duration-500 ${theme === "dark" ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"}`}>
      
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* PESTAÑA: HOME */}
      {activeTab === "home" && (
        <div className="h-full flex flex-col items-center py-10 px-6 space-y-5 overflow-y-auto pb-24">
          
          {/* CABECERA CON MODO CLARO/OSCURO Y RACHAS */}
          <div className="w-full flex justify-between items-center mb-2 mt-4">
             <div className="text-left">
               <span className={`text-[10px] block uppercase font-bold tracking-widest ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Héroe Estudiante</span>
               <span className="font-black text-xl">{hero?.name || "Usuario"}</span>
             </div>
             
             <div className="flex items-center gap-2">
               {/* NUEVO WIDGET DE RACHA (STREAK) */}
               <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 text-orange-500 px-3 py-1.5 rounded-full text-xs font-black shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                 <Flame size={14} className="animate-pulse" /> 12 DÍAS
               </div>

               {/* BOTÓN DE TEMA */}
               <button onClick={toggleTheme} className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${theme === "dark" ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10" : "bg-slate-200 border-slate-300 text-slate-600 hover:bg-slate-300"}`}>
                 {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
               </button>
             </div>
          </div>

          <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 border border-yellow-500/30 rounded-3xl p-5 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 p-[2px] shadow-lg shadow-yellow-500/20">
                        <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                            <span className="text-2xl drop-shadow-md">🏆</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-[10px] text-yellow-500/80 font-bold uppercase tracking-widest">Liga Actual</span>
                        <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 tracking-wide">ORO II</h3>
                    </div>
                </div>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 w-[60%] rounded-full relative">
                    <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_ease-in-out_infinite]"></div>
                </div>
            </div>
          </div>

          <div className="animate-[avatarFloat_3.2s_ease-in-out_infinite] py-4 flex flex-col items-center">
            <div className={`w-48 h-48 bg-gradient-to-tr ${activePet?.bg || 'from-orange-600 to-orange-300'} rounded-full border-4 border-white/20 flex items-center justify-center relative mb-4`}>
                <span className="text-7xl">{activePet?.emoji || '🦊'}</span>
            </div>
            {activePet?.level && (
              <span className={`border font-bold px-4 py-1 rounded-full text-xs ${theme === "dark" ? "bg-slate-800 border-white/10 text-white" : "bg-slate-200 border-slate-300 text-slate-800"}`}>
                Nivel {activePet.level}
              </span>
            )}
          </div>

          {/* CARRUSEL DINÁMICO DE ACCIONES */}
          <div className="w-full mt-2">
            <div className="overflow-hidden rounded-2xl relative">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeCarousel * 100}%)` }}
              >
                <div className="w-full shrink-0 px-1">
                  <div onClick={() => setShowSchedule(true)} className="w-full h-24 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 border border-indigo-500/30 rounded-2xl p-4 cursor-pointer flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center"><Calendar size={24} /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Próxima Clase</p>
                        <h4 className="font-bold text-sm text-white truncate max-w-[150px]">Sistemas de Base de Datos</h4>
                      </div>
                    </div>
                    <div className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Ver</div>
                  </div>
                </div>

                <div className="w-full shrink-0 px-1">
                  <div onClick={() => setActiveTab("store")} className="w-full h-24 bg-gradient-to-r from-emerald-900/80 to-teal-900/80 border border-emerald-500/30 rounded-2xl p-4 cursor-pointer flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center"><Store size={24} /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Gacha Store</p>
                        <h4 className="font-bold text-sm text-white">Ir a la Incubadora</h4>
                      </div>
                    </div>
                    <div className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Entrar</div>
                  </div>
                </div>

                <div className="w-full shrink-0 px-1">
                  <div onClick={() => setActiveTab("characterSelect")} className="w-full h-24 bg-gradient-to-r from-blue-900/80 to-cyan-900/80 border border-blue-500/30 rounded-2xl p-4 cursor-pointer flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center"><Backpack size={24} /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Inventario</p>
                        <h4 className="font-bold text-sm text-white">Cambiar Mascota</h4>
                      </div>
                    </div>
                    <div className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Elegir</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              <button onClick={() => setActiveCarousel(0)} className={`h-1.5 rounded-full transition-all duration-500 ${activeCarousel === 0 ? "w-6 bg-indigo-500" : "w-2 bg-slate-700 hover:bg-slate-500"}`} />
              <button onClick={() => setActiveCarousel(1)} className={`h-1.5 rounded-full transition-all duration-500 ${activeCarousel === 1 ? "w-6 bg-emerald-500" : "w-2 bg-slate-700 hover:bg-slate-500"}`} />
              <button onClick={() => setActiveCarousel(2)} className={`h-1.5 rounded-full transition-all duration-500 ${activeCarousel === 2 ? "w-6 bg-blue-500" : "w-2 bg-slate-700 hover:bg-slate-500"}`} />
            </div>
          </div>
        </div>
      )}

      {/* RENDERIZADO DE VISTAS */}
      {activeTab === "characterSelect" && <CharacterSelect isStore={true} onConfirm={() => setActiveTab("home")} setActivePet={setActivePet} />}
      {activeTab === "focus" && <Timer activePet={activePet} onStart={() => setIsFocusing(true)} onFinish={() => { setActiveTab("home"); setIsFocusing(false); }} onReward={handleReward} />}
      {activeTab === "store" && <GachaStore coins={coins} setCoins={setCoins} />}
      {activeTab === "missions" && <Missions />}
      {activeTab === "inventory" && <Inventory />}
      {activeTab === "leaderboard" && <Leaderboard />}
      {activeTab === "multiplayer" && <Multiplayer />}

      {/* PANTALLA DE HORARIO */}
      {showSchedule && <Schedule onBack={() => setShowSchedule(false)} />}

      {/* MENÚ INFERIOR */}
      {!isFocusing && (
        <nav className={`absolute bottom-0 w-full backdrop-blur-xl border-t p-3 pb-6 flex justify-around items-end z-50 ${theme === "dark" ? "bg-slate-900/95 border-indigo-500/20" : "bg-white/95 border-slate-200"}`}>
          <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center gap-1 transition-all w-16 ${activeTab === "home" ? "text-indigo-500 scale-110" : "text-slate-400 hover:text-slate-500"}`}>
            <User size={22} /><span className="text-[9px] font-bold uppercase tracking-wider">Perfil</span>
          </button>
          <button onClick={() => setActiveTab("inventory")} className={`flex flex-col items-center gap-1 transition-all w-16 ${activeTab === "inventory" ? "text-indigo-500 scale-110" : "text-slate-400 hover:text-slate-500"}`}>
            <Backpack size={22} /><span className="text-[9px] font-bold uppercase tracking-wider">Mascotas</span>
          </button>
          <button onClick={() => setActiveTab("focus")} className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-4 rounded-2xl mb-2 shadow-[0_8px_30px_rgba(79,70,229,0.5)] border border-indigo-400/50 transform hover:-translate-y-1 transition-all flex-shrink-0">
            <Play fill="white" className="text-white ml-1" size={26} />
          </button>
          <button onClick={() => setActiveTab("leaderboard")} className={`flex flex-col items-center gap-1 transition-all w-16 ${activeTab === "leaderboard" ? "text-indigo-500 scale-110" : "text-slate-400 hover:text-slate-500"}`}>
            <Trophy size={22} /><span className="text-[9px] font-bold uppercase tracking-wider">Ranking</span>
          </button>
          <button onClick={() => setActiveTab("missions")} className={`flex flex-col items-center gap-1 transition-all w-16 ${activeTab === "missions" ? "text-indigo-500 scale-110" : "text-slate-400 hover:text-slate-500"}`}>
            <List size={22} /><span className="text-[9px] font-bold uppercase tracking-wider">Misiones</span>
          </button>
        </nav>
      )}

      {/* MODAL DE SUBIDA DE NIVEL */}
      {levelUpModal && (
        <div className="absolute inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-500/50 rounded-3xl p-8 text-center w-full max-w-sm relative overflow-hidden shadow-[0_0_60px_rgba(234,179,8,0.3)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl"></div>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 mb-2 uppercase tracking-widest animate-bounce mt-4">¡Nivel Aumentado!</h2>
                <div className="text-8xl my-8 animate-[avatarFloat_3s_ease-in-out_infinite] drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] relative z-10">{levelUpModal.emoji}</div>
                <h3 className="text-2xl font-bold text-white mb-1">{levelUpModal.name}</h3>
                <p className="text-yellow-400 font-black tracking-widest mb-6">ALCANZÓ EL NIVEL {levelUpModal.level}</p>
                <button onClick={() => setLevelUpModal(null)} className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900 font-black py-4 rounded-xl hover:scale-105 transition-transform relative z-10">¡Increíble!</button>
            </div>
        </div>
      )}
    </div>
  );
}