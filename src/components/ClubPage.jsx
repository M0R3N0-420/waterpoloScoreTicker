import { Link } from "react-router-dom";
import { useEffect } from "react";

function ClubPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section - Consistente con el Hero principal */}
            <div className="relative bg-linear-to-br from-slate-900 via-blue-900 to-cyan-800 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern
                                id="grid"
                                width="60"
                                height="60"
                                patternUnits="userSpaceOnUse"
                            >
                                <path
                                    d="M 60 0 L 0 0 0 60"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1"
                                />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative z-10 px-6 md:px-12 py-20 md:py-32">
                    <div className="max-w-7xl mx-auto text-center">
                        {/* Logo and Title */}
                        <div className="flex flex-col items-center gap-6 mb-8">
                            <div className="w-32 h-32 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden flex items-center justify-center shadow-2xl">
                                <img
                                    src="/images/club-logo.png"
                                    alt="CPA Medellín"
                                    className="w-full h-full object-contain p-3"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-bold tracking-[0.3em] uppercase text-cyan-300 mb-2">
                                    Club de Waterpolo
                                </p>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
                                    ÚNETE A
                                    <span className="block text-cyan-400">CPA MEDELLÍN</span>
                                </h1>
                                <p className="text-xl font-semibold text-amber-300/90 mt-4 max-w-3xl mx-auto">
                                    Forma parte del club más prestigioso de waterpolo de Colombia.
                                    Desarrolla tu potencial, compite al más alto nivel y sé parte de una familia ganadora.
                                </p>
                            </div>
                        </div>

                        {/* Call to Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                to="/teams"
                                className="px-8 py-4 rounded-xl bg-cyan-600 text-white font-bold text-lg hover:bg-cyan-700 active:bg-cyan-800 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
                            >
                                Conocer el Equipo
                            </Link>
                            <Link
                                to="/"
                                className="px-8 py-4 rounded-xl bg-white/10 text-white font-bold text-lg border border-white/30 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
                            >
                                Ver Partidos
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Gradient Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-50 to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column - History and Philosophy */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* History Section */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-black text-slate-900">Nuestra Historia</h2>
                            </div>

                            <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
                                <p>
                                    Fundado en 1987, CPA Medellín nació con una visión clara:
                                    <span className="font-bold text-cyan-700"> formar campeones</span> tanto dentro como fuera del agua.
                                </p>
                                <p>
                                    Durante más de tres décadas, hemos construido un legado de excelencia,
                                    disciplina y pasión por el waterpolo. Nuestros atletas no solo dominan
                                    el deporte, sino que también desarrollan valores que los acompañan toda la vida.
                                </p>
                                <p>
                                    Hoy somos referentes nacionales, con un programa formativo que
                                    abarca desde categorías infantiles hasta alto rendimiento,
                                    siempre manteniendo el espíritu de familia que nos caracteriza.
                                </p>
                            </div>
                        </div>

                        {/* Training Philosophy */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-black text-slate-900">Filosofía de Entrenamiento</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-50 rounded-2xl p-6">
                                    <h3 className="font-bold text-slate-900 mb-3 text-lg">Desarrollo Integral</h3>
                                    <p className="text-slate-600">
                                        Entrenamos no solo el cuerpo, sino también la mente y el carácter de nuestros atletas.
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-6">
                                    <h3 className="font-bold text-slate-900 mb-3 text-lg">Alto Rendimiento</h3>
                                    <p className="text-slate-600">
                                        Métodos de entrenamiento modernos con enfoque en competencia de elite.
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-6">
                                    <h3 className="font-bold text-slate-900 mb-3 text-lg">Trabajo en Equipo</h3>
                                    <p className="text-slate-600">
                                        Fomentamos la colaboración, comunicación y apoyo mutuo dentro y fuera del agua.
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-6">
                                    <h3 className="font-bold text-slate-900 mb-3 text-lg">Disciplina y Respeto</h3>
                                    <p className="text-slate-600">
                                        Valores fundamentales que definen nuestra cultura y manera de competir.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Schedule Section */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-black text-slate-900">Horarios de Entrenamiento</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border-2 border-cyan-200 bg-cyan-50 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">
                                            LV
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-lg">Lunes a Viernes</h3>
                                    </div>
                                    <p className="text-2xl font-black text-cyan-700 mb-2">6:00 PM – 8:00 PM</p>
                                    <p className="text-slate-600">Entrenamiento técnico, físico y táctico</p>
                                </div>
                                <div className="border-2 border-amber-200 bg-amber-50 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                                            SÁB
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-lg">Sábados</h3>
                                    </div>
                                    <p className="text-2xl font-black text-amber-700 mb-2">8:00 AM – 11:00 AM</p>
                                    <p className="text-slate-600">Partidos internos, scrimmages y análisis táctico</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - CTA and Contact */}
                    <div className="space-y-8">
                        {/* Join CTA */}
                        <div className="bg-linear-to-br from-cyan-600 to-cyan-800 rounded-3xl shadow-xl p-8 text-white text-center">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black mb-4">¿Quieres ser parte?</h3>
                            <p className="text-cyan-100 mb-6 leading-relaxed">
                                Únete a nuestra familia de campeones.
                                No importa tu nivel, tenemos un lugar para ti.
                            </p>
                            <div className="space-y-3">
                                <Link
                                    to="/teams"
                                    className="block w-full px-6 py-4 rounded-xl bg-white text-cyan-700 font-bold hover:bg-amber-50 transition-all duration-200 transform hover:scale-105"
                                >
                                    Ver Equipos
                                </Link>
                                <button className="block w-full px-6 py-4 rounded-xl bg-white/10 text-white font-bold border border-white/30 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm">
                                    Contactar Directamente
                                </button>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-white rounded-3xl shadow-xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black text-slate-900">Ubicación</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-slate-50 rounded-2xl p-5">
                                    <p className="font-bold text-slate-900 mb-1">Sede Principal</p>
                                    <p className="text-slate-600">Medellín, Antioquia</p>
                                    <p className="text-slate-600 text-sm mt-1">Complejo Acuático Municipal</p>
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5">
                                    <p className="font-bold text-slate-900 mb-1">¿Qué llevar?</p>
                                    <ul className="text-slate-600 text-sm space-y-1">
                                        <li>• Traje de baño</li>
                                        <li>• Gorro de natación</li>
                                        <li>• Gafas protectoras</li>
                                        <li>• Toalla y cambio de ropa</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white rounded-3xl shadow-xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black text-slate-900">Contacto</h3>
                            </div>

                            <div className="space-y-3">
                                <a href="#" className="block text-cyan-600 hover:text-cyan-700 font-medium">
                                    📧 info@cpamedellin.com
                                </a>
                                <a href="#" className="block text-cyan-600 hover:text-cyan-700 font-medium">
                                    📱 +57 300 123 4567
                                </a>
                                <a href="#" className="block text-cyan-600 hover:text-cyan-700 font-medium">
                                    📷 @cpamedellin_waterpolo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClubPage;
