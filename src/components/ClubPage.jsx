import { Link } from "react-router-dom";

function ClubPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-linear-to-br from-slate-950 via-blue-950 to-cyan-900 text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
                    <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="w-24 h-24 rounded-3xl bg-white/10 border border-white/15 overflow-hidden flex items-center justify-center">
                                <img
                                    src="/images/club-logo.png"
                                    alt="CPA Medellín"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-[0.3em] uppercase text-cyan-200/90">
                                    Club de Waterpolo
                                </p>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-2">CPA Medellín</h1>
                                <p className="text-sm font-semibold text-amber-200/90 mt-2">
                                    Desde 1987 • Tradición, disciplina y comunidad
                                </p>
                            </div>
                        </div>

                        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                            <Link
                                to="/"
                                className="px-6 py-3 rounded-xl bg-cyan-700 text-white font-bold hover:bg-cyan-800 active:bg-cyan-900 transition-colors shadow-lg text-center"
                            >
                                Ver Partidos
                            </Link>
                            <Link
                                to="/admin"
                                className="px-6 py-3 rounded-xl bg-white/5 text-white font-bold border border-amber-200/60 hover:bg-white/10 transition-colors text-center"
                            >
                                Panel de Control
                            </Link>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-white/70">Ciudad</p>
                            <p className="text-xl font-black text-white mt-2">Medellín, Colombia</p>
                            <p className="text-sm text-cyan-100/90 mt-1">Entrenamiento y competencia local</p>
                        </div>
                        <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-white/70">Fundación</p>
                            <p className="text-xl font-black text-white mt-2">1987</p>
                            <p className="text-sm text-cyan-100/90 mt-1">Más de tres décadas de historia</p>
                        </div>
                        <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-white/70">Contacto</p>
                            <p className="text-xl font-black text-white mt-2">Prácticas abiertas</p>
                            <p className="text-sm text-cyan-100/90 mt-1">Escríbenos para unirte al club</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <div className="rounded-2xl bg-white border border-slate-200 shadow-lg p-8">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Historia</h2>
                            <div className="mt-4 space-y-4 text-slate-700 leading-relaxed">
                                <p>
                                    CPA Medellín nace en 1987 con el objetivo de formar deportistas integrales y
                                    posicionar el waterpolo como disciplina competitiva en la ciudad.
                                </p>
                                <p>
                                    A lo largo de los años el club ha impulsado procesos formativos, participación en
                                    ligas departamentales y torneos amistosos, consolidando una cultura de disciplina,
                                    respeto y trabajo en equipo.
                                </p>
                                <p>
                                    Hoy seguimos creciendo con una visión clara: fortalecer nuestras categorías,
                                    elevar el nivel competitivo y mantener una comunidad que viva el waterpolo con
                                    orgullo.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white border border-slate-200 shadow-lg p-8">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Horarios</h2>
                            <p className="text-sm text-slate-600 mt-2">
                                Estos horarios son una guía. Puedes ajustarlos a tus entrenamientos reales.
                            </p>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Lunes a Viernes</p>
                                    <p className="text-lg font-black text-slate-900 mt-2">6:00 PM – 8:00 PM</p>
                                    <p className="text-sm text-slate-600 mt-1">Entrenamiento técnico y físico</p>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Sábados</p>
                                    <p className="text-lg font-black text-slate-900 mt-2">8:00 AM – 11:00 AM</p>
                                    <p className="text-sm text-slate-600 mt-1">Partidos internos y táctica</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="rounded-2xl bg-white border border-slate-200 shadow-lg p-8">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">Ubicación</h2>
                            <p className="text-sm text-slate-600 mt-2">
                                Puedes reemplazar estos datos por la sede exacta del club.
                            </p>

                            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Sede</p>
                                <p className="text-base font-black text-slate-900 mt-2">Medellín</p>
                                <p className="text-sm text-slate-600 mt-1">
                                    Complejo acuático / piscina (agregar dirección exacta)
                                </p>
                            </div>

                            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Indicaciones</p>
                                <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                                    Llegar con 15 minutos de anticipación. Traer gorro, traje de baño y buena actitud.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-cyan-700 to-cyan-900 text-white shadow-lg p-8">
                            <h3 className="text-lg font-black tracking-tight">¿Quieres unirte?</h3>
                            <p className="text-sm text-white/90 mt-2">
                                Escríbenos para información de categorías, pruebas y procesos formativos.
                            </p>
                            <div className="mt-5">
                                <Link
                                    to="/teams"
                                    className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-white text-slate-900 font-black hover:bg-amber-50 transition-colors"
                                >
                                    Ver el Equipo
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClubPage;
