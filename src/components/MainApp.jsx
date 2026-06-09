import { User, Play, List, Store, Backpack, Trophy, Sun, Moon, Calendar, Flame } from "lucide-react";
import { useState } from "react";
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
  const [activeCarousel, setActiveCarousel] = useState(0);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const [coins, setCoins] = useState(50); // Saldo inicial para la demo
  
  // NUESTRO CATÁLOGO GLOBAL DE MASCOTAS
  const [petCatalog, setPetCatalog] = useState([
    { id: "ignipup", name: "Ignipup", element: "Fuego", price: 0, unlocked: true, image: "/avatars/PYROS.png", color: "from-orange-500 to-red-600" },
    { id: "shellshock", name: "Shellshock", element: "Agua", price: 20, unlocked: false, image: "/avatars/ONDINA.png", color: "from-blue-500 to-cyan-600" },
    { id: "glowleaf", name: "Glowleaf", element: "Planta", price: 20, unlocked: false, image: "/avatars/SYLPHA.png", color: "from-emerald-500 to-green-600" },
    { id: "thunder", name: "Voltflare", element: "Eléctrico", price: 60, unlocked: false, image: "/avatars/THUNDERBOLT.png", color: "from-yellow-400 to-amber-600" }
  ]);


  // LÓGICA DE SEGURIDAD: Si no hay mascota, forzamos a que elija una
  if (!activePet) {
    return <CharacterSelect setActivePet={setActivePet} onNext={() => setActiveTab("focus")} />;
  }

  
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
    <div className={`relative h-screen w-full md:max-w-3xl lg:max-w-5xl mx-auto overflow-hidden transition-colors duration-500 ${theme === "dark" ? "bg-[#0B172A] text-white" : "bg-slate-50 text-[#0B172A]"}`}>
      
      {/* INYECCIÓN DIRECTA DE CSS (A prueba de fallos) */}
      <style>
        {`
          @keyframes aurora-movimiento {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .fondo-magico {
            background: linear-gradient(-45deg, #0B172A, #103460, #052c42, #0B172A);
            background-size: 400% 400%;
            animation: aurora-movimiento 8s ease infinite;
          }
        `}
      </style>

      {/* CAPA DE FONDO ANIMADO USANDO LA CLASE MÁGICA */}
      {theme === "dark" && (
        <div className="absolute inset-0 z-0 fondo-magico opacity-80 pointer-events-none"></div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
{/* PESTAÑA: HOME RESPONSIVA (Estética Clásica Dorada) */}
      {activeTab === "home" && (
        <div className="relative z-10 h-full flex flex-col py-6 md:py-10 px-4 md:px-8 overflow-y-auto pb-28">
          
          {/* CABECERA */}
          <div className="w-full flex flex-wrap justify-between items-center mb-6 mt-4 gap-4">
             <div className="text-left">
               <span className={`text-[10px] md:text-xs block uppercase font-bold tracking-widest ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Héroe Estudiante</span>
               <span className="font-black text-xl md:text-3xl">{hero?.name || "Usuario"}</span>
             </div>
             
             <div className="flex items-center gap-2 md:gap-4">
               <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 text-orange-500 px-3 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-black shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                 <Flame size={16} className="animate-pulse" /> 12 DÍAS
               </div>

               <button onClick={toggleTheme} className={`w-10 md:w-12 h-10 md:h-12 rounded-full border flex items-center justify-center transition-colors ${theme === "dark" ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10" : "bg-slate-200 border-slate-300 text-slate-600 hover:bg-slate-300"}`}>
                 {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
               </button>
             </div>
          </div>

          {/* GRID RESPONSIVO: 1 columna en móvil, 2 en PC */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* LADO IZQUIERDO: Tarjeta de Liga Dorada y Mascota */}
            <div className="flex flex-col gap-6 w-full">
              
              {/* TARJETA DE PROGRESO (Regreso al estilo Oro/Amarillo) */}
              <div className="w-full bg-slate-900 border border-yellow-500/30 rounded-3xl p-5 md:p-6 shadow-[0_0_15px_rgba(234,179,8,0.15)] transition-transform hover:scale-[1.02]">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 md:w-16 h-12 md:h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 p-[2px] shadow-lg shadow-yellow-500/20">
                            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                                <span className="text-2xl md:text-3xl drop-shadow-md">🏆</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-[10px] md:text-xs text-yellow-500 font-bold uppercase tracking-widest">Liga Actual</span>
                            <h3 className="text-lg md:text-2xl font-black text-yellow-400 tracking-wide">ORO II</h3>
                        </div>
                    </div>
                </div>
                <div className="w-full h-2.5 md:h-3.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div className="h-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 w-[60%] rounded-full relative"></div>
                </div>
              </div>

              {/* AVATAR DE LA MASCOTA */}
              <div className="py-2 flex flex-col items-center">
                <div className={`w-48 md:w-56 h-48 md:h-56 bg-gradient-to-tr ${activePet?.color || 'from-orange-500 to-orange-400'} rounded-full flex items-center justify-center relative mb-4 shadow-lg`}>
                    <img src={activePet?.image || '/avatars/PYROS.png'} alt={activePet?.name || 'Mascota'} className="w-32 md:w-40 h-32 md:h-40 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] animate-[avatarFloat_3s_ease-in-out_infinite]" />
                </div>
                <span className="bg-slate-800 border border-slate-700 text-white font-bold px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm">
                  Nivel {activePet?.level || 1}
                </span>
              </div>
            </div>

            {/* LADO DERECHO: Acciones */}
            <div className="flex flex-col w-full">
               <h3 className="hidden md:block font-black text-slate-500 tracking-widest uppercase text-xs mb-4">Panel de Control</h3>
               
               {/* --- VISTA MÓVIL: CARRUSEL (md:hidden) --- */}
               <div className="md:hidden w-full">
                 <div className="overflow-hidden rounded-2xl relative">
                   <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeCarousel * 100}%)` }}>
                     
                     {/* Tarjeta 1 Clásica */}
                     <div className="w-full shrink-0 px-1">
                       <div onClick={() => setShowSchedule(true)} className="w-full h-24 bg-[#311b92] rounded-2xl p-4 cursor-pointer flex items-center justify-between shadow-lg">
                         <div className="flex items-center gap-3">
                           <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center"><Calendar size={24} /></div>
                           <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Próxima Clase</p>
                             <h4 className="font-bold text-sm text-white truncate max-w-[150px]">Sistemas de Base de Datos</h4>
                           </div>
                         </div>
                         <div className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Ver</div>
                       </div>
                     </div>

                     {/* Tarjeta 2 Clásica */}
                     <div className="w-full shrink-0 px-1">
                       <div onClick={() => setActiveTab("store")} className="w-full h-24 bg-[#004d40] rounded-2xl p-4 cursor-pointer flex items-center justify-between shadow-lg">
                         <div className="flex items-center gap-3">
                           <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center"><Store size={24} /></div>
                           <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Gacha Store</p>
                             <h4 className="font-bold text-sm text-white">Ir a la Incubadora</h4>
                           </div>
                         </div>
                         <div className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Entrar</div>
                       </div>
                     </div>

                     {/* Tarjeta 3 Clásica */}
                     <div className="w-full shrink-0 px-1">
                       <div onClick={() => setActiveTab("characterSelect")} className="w-full h-24 bg-[#0d47a1] rounded-2xl p-4 cursor-pointer flex items-center justify-between shadow-lg">
                         <div className="flex items-center gap-3">
                           <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center"><Backpack size={24} /></div>
                           <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Inventario</p>
                             <h4 className="font-bold text-sm text-white">Cambiar Mascota</h4>
                           </div>
                         </div>
                         <div className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Elegir</div>
                       </div>
                     </div>

                   </div>
                 </div>
                 
                 <div className="flex justify-center gap-2 mt-4">
                   <button onClick={() => setActiveCarousel(0)} className={`h-1.5 rounded-full transition-all duration-500 ${activeCarousel === 0 ? "w-6 bg-[#311b92]" : "w-2 bg-slate-700"}`} />
                   <button onClick={() => setActiveCarousel(1)} className={`h-1.5 rounded-full transition-all duration-500 ${activeCarousel === 1 ? "w-6 bg-[#004d40]" : "w-2 bg-slate-700"}`} />
                   <button onClick={() => setActiveCarousel(2)} className={`h-1.5 rounded-full transition-all duration-500 ${activeCarousel === 2 ? "w-6 bg-[#0d47a1]" : "w-2 bg-slate-700"}`} />
                 </div>
               </div>

               {/* --- VISTA PC: LISTA VERTICAL CLÁSICA (hidden md:flex) --- */}
               <div className="hidden md:flex flex-col gap-4 w-full">
                  
                  <div onClick={() => setShowSchedule(true)} className="w-full bg-[#311b92] rounded-2xl p-5 cursor-pointer flex items-center justify-between shadow-lg hover:scale-[1.02] transition-transform">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/10 text-white flex items-center justify-center"><Calendar size={28} /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Próxima Clase</p>
                        <h4 className="font-bold text-base text-white">Sistemas de Base de Datos</h4>
                      </div>
                    </div>
                    <div className="bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-lg">Ver Detalles</div>
                  </div>

                  <div onClick={() => setActiveTab("store")} className="w-full bg-[#004d40] rounded-2xl p-5 cursor-pointer flex items-center justify-between shadow-lg hover:scale-[1.02] transition-transform">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/10 text-white flex items-center justify-center"><Store size={28} /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Gacha Store</p>
                        <h4 className="font-bold text-base text-white">Ir a la Incubadora</h4>
                      </div>
                    </div>
                    <div className="bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-lg">Entrar</div>
                  </div>

                  <div onClick={() => setActiveTab("characterSelect")} className="w-full bg-[#0d47a1] rounded-2xl p-5 cursor-pointer flex items-center justify-between shadow-lg hover:scale-[1.02] transition-transform">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/10 text-white flex items-center justify-center"><Backpack size={28} /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Inventario</p>
                        <h4 className="font-bold text-base text-white">Cambiar Mascota</h4>
                      </div>
                    </div>
                    <div className="bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-lg">Elegir</div>
                  </div>

               </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDERIZADO DE VISTAS */}
      {activeTab === "characterSelect" && <CharacterSelect setActivePet={setActivePet} onNext={() => setActiveTab("home")} />}
      {activeTab === "focus" && <Timer activePet={activePet} onStart={() => setIsFocusing(true)} onFinish={() => { setActiveTab("home"); setIsFocusing(false); }} onReward={handleReward} />}
      {activeTab === "store" && <GachaStore coins={coins} setCoins={setCoins} petCatalog={petCatalog} setPetCatalog={setPetCatalog} />}
      {activeTab === "missions" && <Missions />}
      {activeTab === "inventory" && <Inventory activePet={activePet} setActivePet={setActivePet} />}
      {activeTab === "leaderboard" && <Leaderboard />}
      {activeTab === "multiplayer" && <Multiplayer />}

      {/* PANTALLA DE HORARIO */}
      {showSchedule && <Schedule onBack={() => setShowSchedule(false)} />}

      {/* MENÚ INFERIOR */}
      {!isFocusing && (
        <nav className={`absolute bottom-0 w-full md:max-w-3xl lg:max-w-5xl mx-auto left-0 right-0 backdrop-blur-xl border-t p-3 md:p-4 pb-6 flex justify-around items-end z-50 ${theme === "dark" ? "bg-[#0B172A]/95 border-blue-500/20" : "bg-white/95 border-slate-200"}`}>
          <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center gap-1 transition-all w-16 ${activeTab === "home" ? "text-indigo-500 scale-110" : "text-slate-400 hover:text-slate-500"}`}>
            <User size={22} /><span className="text-[9px] font-bold uppercase tracking-wider">Perfil</span>
          </button>
          <button onClick={() => setActiveTab("inventory")} className={`flex flex-col items-center gap-1 transition-all w-16 ${activeTab === "inventory" ? "text-indigo-500 scale-110" : "text-slate-400 hover:text-slate-500"}`}>
            <Backpack size={22} /><span className="text-[9px] font-bold uppercase tracking-wider">Mascotas</span>
          </button>
          {/* BOTÓN CTA (NARANJA ELÉCTRICO) */}
          <button onClick={() => setActiveTab("focus")} className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl mb-2 shadow-[0_8px_30px_rgba(249,115,22,0.4)] border border-orange-400/50 transform hover:-translate-y-1 hover:scale-105 transition-all flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Play fill="white" className="text-white ml-1 relative z-10" size={26} />
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