import { Store, Lock, CheckCircle2, Coins } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function GachaStore({ coins, setCoins }) {
  // Base de datos local de la tienda
  const [storePets, setStorePets] = useState([
    { id: "ignipup", name: "Ignipup", element: "Fuego", price: 0, unlocked: true, image: "/avatars/PYROS.png", color: "from-orange-500 to-red-600" },
    { id: "shellshock", name: "Shellshock", element: "Agua", price: 20, unlocked: false, image: "/avatars/ONDINA.png", color: "from-blue-500 to-cyan-600" },
    { id: "glowleaf", name: "Glowleaf", element: "Planta", price: 20, unlocked: false, image: "/avatars/SYLPHA.png", color: "from-emerald-500 to-green-600" },
    { id: "thunder", name: "Voltflare", element: "Eléctrico", price: 50, unlocked: false, image: "/avatars/THUNDERBOLT.png", color: "from-yellow-400 to-amber-600" }
  ]);

  const handleBuy = (petId, price, name) => {
    if (coins < price) {
      toast.error(`Te faltan ${price - coins} soles/monedas para comprar a ${name}.`, {
        style: { background: '#1e293b', color: '#fff', border: '1px solid #ef4444' }
      });
      return;
    }

    // 1. Descontar el dinero
    setCoins(prevCoins => prevCoins - price);
    
    // 2. Cambiar el estado de la mascota a desbloqueada
    setStorePets(prevPets => 
      prevPets.map(pet => 
        pet.id === petId ? { ...pet, unlocked: true } : pet
      )
    );

    toast.success(`¡Has comprado a ${name}!`, {
      icon: '🎉',
      style: { background: '#1e293b', color: '#fff', border: '1px solid #10b981' }
    });
  };

  return (
    <div className="h-full flex flex-col items-center py-10 px-6 space-y-6 overflow-y-auto pb-28">
      
      {/* CABECERA DE LA TIENDA */}
      <div className="w-full flex justify-between items-center bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2 rounded-xl text-emerald-400">
            <Store size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Tienda</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Adquiere aliados</p>
          </div>
        </div>
        
        {/* INDICADOR DE SALDO */}
        <div className="flex items-center gap-2 bg-slate-800 border border-yellow-500/30 px-4 py-2 rounded-xl">
          <Coins size={18} className="text-yellow-400" />
          <span className="font-black text-yellow-400 text-lg">{coins}</span>
        </div>
      </div>

      {/* GRILLA DE MASCOTAS */}
      <div className="w-full grid grid-cols-2 gap-4">
        {storePets.map((pet) => (
          <div 
            key={pet.id} 
            className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
              pet.unlocked 
                ? 'bg-slate-800/80 border-slate-600' 
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            {/* ETIQUETA DE ESTADO */}
            <div className="absolute top-2 right-2">
              {pet.unlocked ? (
                <CheckCircle2 size={18} className="text-emerald-500" />
              ) : (
                <Lock size={18} className="text-slate-500" />
              )}
            </div>

            {/* AVATAR (Con filtro gris si está bloqueado) */}
            <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${pet.color} p-1 mb-3 ${!pet.unlocked && 'grayscale opacity-40'}`}>
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                 {/* NOTA: Asegúrate de que las rutas de las imágenes coincidan con tus archivos en /public */}
                 <img src={pet.image} alt={pet.name} className="w-14 h-14 object-contain" />
              </div>
            </div>

            <h3 className={`font-bold text-sm mb-1 ${pet.unlocked ? 'text-white' : 'text-slate-400'}`}>
              {pet.name}
            </h3>

            {/* BOTÓN DE ACCIÓN CONDICIONAL */}
            <div className="w-full mt-auto pt-2">
              {pet.unlocked ? (
                <button disabled className="w-full bg-slate-700 text-slate-400 text-xs font-bold py-2 rounded-lg cursor-not-allowed">
                  ADQUIRIDO
                </button>
              ) : (
                <button 
                  onClick={() => handleBuy(pet.id, pet.price, pet.name)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold py-2 rounded-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1"
                >
                  S/ {pet.price}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}