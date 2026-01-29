// TeamPage.jsx - Página de equipo simplificada

function TeamPage() {
  const players = {
    goalkeepers: [
      {
        id: 1,
        name: "Marko Nikolic",
        number: "#1",
        position: "GK",
        country: "Serbia",
        image: "/images/players/marko-nikolic.jpg",
        stats: { saves: 156, games: 18 }
      },
      {
        id: 2,
        name: "David Chen",
        number: "#13",
        position: "GK",
        country: "China",
        image: "/images/players/david-chen.jpg",
        stats: { saves: 89, games: 12 }
      }
    ],
    defenders: [
      {
        id: 3,
        name: "James Wright",
        number: "#4",
        position: "DEF",
        country: "USA",
        image: "/images/players/james-wright.jpg",
        stats: { steals: 22, blocks: 15 }
      },
      {
        id: 4,
        name: "Luca Romano",
        number: "#7",
        position: "DEF",
        country: "Italy",
        image: "/images/players/luca-romano.jpg",
        stats: { steals: 31, games: 19 }
      }
    ],
    attackers: [
      {
        id: 5,
        name: "Aris Papadakis",
        number: "#10",
        position: "ATT",
        country: "Greece",
        image: "/images/players/aris-papadakis.jpg",
        stats: { goals: 42, assists: 12 }
      },
      {
        id: 6,
        name: "Santi Garcia",
        number: "#5",
        position: "ATT",
        country: "Spain",
        image: "/images/players/santi-garcia.jpg",
        stats: { goals: 28, games: 20 }
      }
    ],
    boyas: [
      {
        id: 7,
        name: "Juan P. Moreno",
        number: "#7",
        position: "BOYA",
        country: "Colombia",
        image: "/images/players/juan-moreno.jpg",
        stats: { goals: 42, assists: 12 }
      }
    ]
  };

  const PlayerCard = ({ player }) => {
    const isGoalkeeper = player.position === "GK";
    const isDefender = player.position === "DEF";

    return (
      <div className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Player Image */}
        <div className="aspect-3/4 bg-linear-to-b from-cyan-50 to-slate-100 flex items-center justify-center relative overflow-hidden">
          {player.image ? (
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          {/* Fallback placeholder */}
          <div className="w-20 h-20 bg-cyan-700 rounded-full flex items-center justify-center" style={{ display: player.image ? 'none' : 'flex' }}>
            <span className="text-white text-2xl font-bold">{player.number}</span>
          </div>
        </div>

        {/* Player Info */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end bg-linear-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-black px-2 py-1 rounded ${isGoalkeeper ? 'bg-cyan-700 text-white' :
              isDefender ? 'bg-slate-900 text-white border-2 border-amber-300' :
                'bg-cyan-700 text-white'
              }`}>
              {player.position}
            </span>
            <span className="text-amber-300 text-3xl font-black opacity-70">{player.number}</span>
          </div>
          <h3 className="text-white text-xl font-bold">{player.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-4 h-4 bg-gray-300 rounded-full border border-white/20"></div>
            <p className="text-gray-300 text-sm uppercase tracking-wider">{player.country}</p>
          </div>
        </div>

        {/* Stats Overlay x
        <div className="stats-overlay absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-6 text-center opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <p className="text-cyan-200 uppercase text-xs font-bold tracking-widest mb-4">Season Stats</p>
          <div className="grid grid-cols-2 gap-6 mb-8">
            {Object.entries(player.stats).map(([key, value]) => (
              <div key={key}>
                <p className="text-white text-3xl font-black">{value}</p>
                <p className="text-gray-400 text-[10px] uppercase font-bold">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
        */}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">


      {/* Header */}
      <div className="bg-linear-to-br from-slate-950 via-blue-950 to-cyan-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Conozca el Equipo</h1>
          <p className="text-xl text-cyan-100 max-w-3xl">
            El equipo powerhouse detrás de la búsqueda de dominación de CPA Medellín.
            Atletismo, estrategia y pura tenacidad.
          </p>
        </div>

      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Goalkeepers Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-wider">Porteros</h2>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {players.goalkeepers.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>

        {/* Defenders Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-wider">Defensores</h2>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {players.defenders.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>

        {/* Attackers Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-wider">Atacantes</h2>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {players.attackers.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>

        {/* Boyas Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-wider">Boyas</h2>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {players.boyas.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default TeamPage;
