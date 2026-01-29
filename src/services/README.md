# 📚 Documentación Completa - Waterpolo Score Ticker CPA Medellín

## 🏆 Índice General

1. [Visión General del Proyecto](#visión-general)
2. [Arquitectura de la Aplicación](#arquitectura)
3. [Estructura del Proyecto](#estructura)
4. [Componentes Detallados](#componentes)
5. [Servicios y API](#servicios)
6. [Base de Datos](#base-de-datos)
7. [Estados y Flujo de Datos](#estados)
8. [Configuración y Despliegue](#configuración)
9. [Guía de Desarrollo](#desarrollo)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Visión General

**Waterpolo Score Ticker** es una aplicación web moderna para el seguimiento en tiempo real de partidos de waterpolo del Club de Waterpolo CPA Medellín. La aplicación proporciona:

- ✅ **Actualizaciones en tiempo real** de marcadores y estados de partidos
- ✅ **Panel de administración** para gestionar partidos
- ✅ **Interfaz responsiva** con diseño moderno
- ✅ **Información institucional** del club
- ✅ **Navegación intuitiva** entre secciones

### Tecnologías Principales

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19.2.0 | Biblioteca principal de UI |
| Vite | 7.2.4 | Empaquetador y servidor |
| TailwindCSS | 4.1.18 | Framework de estilos |
| React Router | 7.13.0 | Navegación SPA |
| Supabase | 2.91.1 | Base de datos y real-time |
| date-fns | 4.1.0 | Manejo de fechas |

---

## 🏗️ Arquitectura de la Aplicación

### Flujo de Datos

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Componentes   │───▶│    Servicios    │───▶│   Supabase DB   │
│                 │◀───│                 │◀───│                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   UI React     │    │   API Layer     │    │   PostgreSQL    │
│   Components   │    │   Real-time     │    │   WebSockets    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Arquitectura de Componentes

```
App.jsx
├── NavBar.jsx (Navegación global)
└── Layout.jsx
    ├── GamesContainer.jsx
    │   ├── NavigationArrows.jsx
    │   └── WaterpoloGameCard.jsx (xN)
    └── Routes
        ├── / (HomePage)
        │   ├── Hero.jsx
        │   └── MatchCenter.jsx
        ├── /teams (TeamPage.jsx)
        ├── /club (ClubPage.jsx)
        └── /admin (AdminPanel.jsx)
            └── GameControlPanel.jsx
```

---

## 📁 Estructura del Proyecto

```
waterpoloScoreTicker/
├── 📄 Archivos de Configuración
│   ├── package.json              # Dependencias y scripts
│   ├── vite.config.js           # Configuración de Vite
│   ├── eslint.config.js         # Reglas de linting
│   ├── .gitignore               # Archivos ignorados
│   └── .env.local               # Variables de entorno (local)
│
├── 🌐 Archivos Web
│   ├── index.html               # Plantilla HTML principal
│   └── README.md                # Documentación para usuarios
│
├── 📦 Recursos Estáticos
│   └── public/
│       └── images/
│           ├── club-logo.png    # Logo del club
│           └── players/         # Fotos de jugadores
│               ├── README.md
│               └── juan-moreno.jpg
│
└── 📂 Código Fuente
    └── src/
        ├── 🎨 Estilos
        │   ├── index.css        # Estilos globales
        │   └── App.css          # Estilos de la app
        │
        ├── 🧩 Componentes React
        │   ├── AdminPanel.jsx       # Panel de administración
        │   ├── ClubPage.jsx         # Página del club
        │   ├── GameControlPanel.jsx # Control de partidos
        │   ├── GamesContainer.jsx   # Contenedor de juegos
        │   ├── Hero.jsx             # Hero principal
        │   ├── Layout.jsx           # Layout principal
        │   ├── LoadingSpinner.jsx   # Spinner de carga
        │   ├── MatchCenter.jsx      # Centro de partidos
        │   ├── NavBar.jsx           # Barra de navegación
        │   ├── NavigationArrows.jsx # Flechas de navegación
        │   ├── TeamPage.jsx         # Página del equipo
        │   └── WaterpoloGameCard.jsx # Tarjeta de partido
        │
        ├── 🔧 Configuración
        │   └── supabase.js          # Cliente Supabase
        │
        ├── 📡 Servicios
        │   ├── gamesService.js      # CRUD de partidos
        │   ├── realtimeService.js   # Actualizaciones en tiempo real
        │   └── README.md            # Documentación de servicios
        │
        ├── 📊 Datos
        │   └── mockGames.js         # Datos de prueba
        │
        ├── 🚀 Punto de Entrada
        │   ├── main.jsx             # Inicio de la aplicación
        │   └── App.jsx              # Componente raíz
        │
        └── 📂 Contextos (vacío)
            └── (Para futuras implementaciones)
```

---

## 🧩 Componentes Detallados

### 1. App.jsx (Componente Raíz)

**Propósito**: Componente principal que define las rutas y estructura global.

**Características**:
- Configuración de React Router
- Definición de rutas principales
- Integración de NavBar y Layout

```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/teams" element={<TeamPage />} />
  <Route path="/club" element={<ClubPage />} />
  <Route path="/admin" element={<AdminPanel />} />
</Routes>
```

### 2. NavBar.jsx (Navegación)

**Propósito**: Barra de navegación principal con logo y menú responsivo.

**Características**:
- Logo del club con branding
- Menú responsivo (hamburguesa para móviles)
- Navegación entre páginas
- Diseño sticky con fondo slate-950

**Items de Navegación**:
- Partidos (/)
- Equipos (/teams)
- Panel de Control (/admin)
- Club (/club)
- Acerca (#about)

### 3. Hero.jsx (Portada Principal)

**Propósito**: Componente hero con imagen destacada y llamados a la acción.

**Características**:
- Gradiente de fondo (slate-950 → blue-950 → cyan-900)
- Patrón de grid SVG overlay
- Logo del club con información
- Botones de CTA
- Diseño responsivo

**Elementos**:
- Logo del club
- Título y subtítulo
- Botones de navegación
- Tarjetas de información

### 4. WaterpoloGameCard.jsx (Tarjeta de Partido)

**Propósito**: Visualización individual de partidos con estados en tiempo real.

**Características**:
- Dimensiones fijas (w-48 h-24)
- Tres estados: EN VIVO, FINALIZADO, PROGRAMADO
- Animación de ping para partidos EN VIVO
- Marcadores por equipo
- Información de competencia y período

**Props**:
```jsx
{
  date,           // "25 Ene"
  time,           // "7:00 PM"
  competition,    // "Liga Colombiana"
  homeTeam,       // "CPA Medellin"
  awayTeam,       // "Belen"
  homeScore,      // 13
  awayScore,      // 10
  period,         // 3
  status          // "EN VIVO"
}
```

**Estados Visuales**:
- **EN VIVO**: Indicador animado amber, marcadores visibles
- **FINALIZADO**: Sin animación, marcadores visibles, "FT"
- **PROGRAMADO**: Hora visible, sin marcadores

### 5. MatchCenter.jsx (Centro de Partidos)

**Propósito**: Contenedor principal que muestra partidos actuales y próximos.

**Características**:
- Carga el último partido (en vivo o finalizado)
- Muestra próximos partidos ordenados
- Integración con GameControlPanel
- Actualizaciones en tiempo real

**Funciones Clave**:
- `parseGameDate()`: Convierte fechas a formato ordenable
- `parseTimeToMinutes()`: Convierte horas a minutos
- `sortGamesByDateAndTime()`: Ordenamiento inteligente

### 6. AdminPanel.jsx (Panel de Administración)

**Propósito**: Interfaz para gestionar todos los partidos del sistema.

**Características**:
- Lista de todos los partidos
- Selección de partido para editar
- Integración con GameControlPanel
- Actualizaciones en tiempo real

**Estado**:
- `games`: Array de todos los partidos
- `selectedGame`: Partido actualmente seleccionado
- `loading`: Estado de carga

### 7. GameControlPanel.jsx (Control de Partidos)

**Propósito**: Panel detallado para editar un partido específico.

**Características**:
- Control de marcadores generales
- Control de puntuaciones por cuarto
- Gestión de estados de partido
- Control de período actual
- Actualizaciones optimistas

**Funciones**:
- `updateGame()`: Actualiza datos generales
- `updateScore()`: Actualiza marcador
- `updateQuarter()`: Actualiza puntuaciones por cuarto
- `updateGameStatus()`: Cambia estado del partido

### 8. ClubPage.jsx (Página del Club)

**Propósito**: Página informativa sobre el Club de Waterpolo de Antioquia.

**Características**:
- Hero con logo y branding
- Secciones de información
- Historia del club
- Ubicación y contacto
- Llamados a la acción

**Secciones**:
- Header con logo y botones
- Información institucional
- Historia y trayectoria
- Ubicación y contacto
- CTA para unirse

### 9. TeamPage.jsx (Página del Equipo)

**Propósito**: Muestra información del equipo y jugadores.

**Características**:
- Lista de jugadores por posición
- Estadísticas individuales
- Fotos de jugadores
- Diseño responsivo

**Categorías**:
- Porteros (Goalkeepers)
- Defensas (Defenders)
- Atacantes (Attackers)

### 10. Layout.jsx (Layout Principal)

**Propósito**: Contenedor principal que gestiona el estado global de partidos.

**Características**:
- Carga inicial de partidos
- Suscripción a actualizaciones en tiempo real
- Renderizado de GamesContainer
- Manejo de estados de carga

**Funciones**:
- `fetchGames()`: Obtiene todos los partidos
- `subscribeToAllGames()`: Escucha cambios
- `sortGames()`: Ordena partidos por estado

### 11. GamesContainer.jsx (Contenedor de Juegos)

**Propósito**: Contenedor scrollable con navegación para las tarjetas de partidos.

**Características**:
- Scroll horizontal con flechas
- Navegación suave
- Ocultación de scrollbar
- Hover effects

**Componentes**:
- `NavigationArrows.jsx`: Flechas de navegación
- Scroll horizontal personalizado

### 12. NavigationArrows.jsx (Flechas de Navegación)

**Propósito**: Componente de flechas para navegar entre tarjetas.

**Características**:
- Animación de entrada/salida
- Hover effects
- Scroll suave
- Diseño circular con sombra

### 13. LoadingSpinner.jsx (Spinner de Carga)

**Propósito**: Componente de carga simple y elegante.

**Características**:
- Spinner animado cyan-700
- Texto de estado
- Diseño centrado
- Fondo slate-50

---

## 📡 Servicios y API

### 1. gamesService.js

**Propósito**: Servicio principal para operaciones CRUD de partidos.

**Funciones Principales**:

#### `fetchGames()`
```javascript
// Obtiene todos los partidos ordenados por creación
const games = await fetchGames();
```

#### `fetchLatestGame()`
```javascript
// Obtiene el último partido en vivo o finalizado
const latest = await fetchLatestGame();
```

#### `fetchUpcomingGames()`
```javascript
// Obtiene próximos partidos programados
const upcoming = await fetchUpcomingGames();
```

#### `createGame(gameData)`
```javascript
// Crea un nuevo partido
const newGame = await createGame({
  date: "25 Ene",
  time: "7:00 PM",
  competition: "Liga Colombiana",
  home_team: "CPA Medellin",
  away_team: "Belen",
  // ... otros campos
});
```

#### `updateGame(gameId, updates)`
```javascript
// Actualiza un partido existente
const updated = await updateGame(gameId, {
  home_score: 14,
  away_score: 12,
  status: "FINALIZADO"
});
```

### 2. realtimeService.js

**Propósito**: Gestión de actualizaciones en tiempo real via WebSockets.

**Funciones Principales**:

#### `subscribeToGameUpdates(gameId, onUpdate)`
```javascript
// Suscribe a actualizaciones de un partido específico
const channel = subscribeToGameUpdates(gameId, (updatedGame) => {
  console.log('Partido actualizado:', updatedGame);
});
```

#### `subscribeToAllGames(onUpdate)`
```javascript
// Suscribe a todos los cambios en la tabla
const channel = subscribeToAllGames((payload) => {
  if (payload.eventType === 'UPDATE') {
    // Manejar actualización
  } else if (payload.eventType === 'INSERT') {
    // Manejar inserción
  }
});
```

#### `unsubscribeFromChannel(channel)`
```javascript
// Cancela suscripción
unsubscribeFromChannel(channel);
```

#### `updateScore(gameId, homeScore, awayScore)`
```javascript
// Actualiza solo el marcador
await updateScore(gameId, 10, 8);
```

#### `updateQuarter(...)`
```javascript
// Actualiza puntuaciones por cuarto
await updateQuarter(gameId, period, q1Home, q1Away, q2Home, q2Away, q3Home, q3Away, q4Home, q4Away);
```

#### `updateGameStatus(gameId, status)`
```javascript
// Cambia estado del partido
await updateGameStatus(gameId, 'EN VIVO');
```

---

## 🗄️ Base de Datos

### Esquema de la Tabla `games`

```sql
CREATE TABLE games (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  date TEXT NOT NULL,                    -- "25 Ene"
  time TEXT NOT NULL,                    -- "7:00 PM"
  competition TEXT NOT NULL,              -- "Liga Colombiana"
  home_team TEXT NOT NULL,                -- "CPA Medellin"
  away_team TEXT NOT NULL,                -- "Belen"
  home_score BIGINT,                      -- 13
  away_score BIGINT,                      -- 10
  period BIGINT,                          -- 3 (1-4)
  status TEXT NOT NULL,                   -- 'EN VIVO' | 'FINALIZADO' | 'PROGRAMADO'
  
  -- Campos de cuartos
  q1_home_score INTEGER,                  -- 3
  q1_away_score INTEGER,                  -- 2
  q2_home_score INTEGER,                  -- 4
  q2_away_score INTEGER,                  -- 1
  q3_home_score INTEGER,                  -- 2
  q3_away_score INTEGER,                  -- 3
  q4_home_score INTEGER,                  -- 3
  q4_away_score INTEGER,                  -- 4
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Estados de Partido

| Estado | Descripción | Visualización |
|--------|-------------|---------------|
| `PROGRAMADO` | Partido no iniciado | Muestra hora, sin marcador |
| `EN VIVO` | Partido en curso | Animación ping, marcador visible |
| `FINALIZADO` | Partido terminado | Sin animación, marcador final, "FT" |

### Políticas de Acceso (RLS)

```sql
-- Todos pueden leer
CREATE POLICY "Public read access" ON games
  FOR SELECT USING (true);

-- Solo administradores pueden insertar
CREATE POLICY "Admin insert" ON games
  FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Solo administradores pueden actualizar
CREATE POLICY "Admin update" ON games
  FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

-- Solo administradores pueden eliminar
CREATE POLICY "Admin delete" ON games
  FOR DELETE USING (auth.jwt() ->> 'role' = 'admin');
```

---

## 🔄 Estados y Flujo de Datos

### 1. Flujo de Carga Inicial

```
App.jsx
  ↓
Layout.jsx (useEffect)
  ↓
fetchGames() → gamesService.js
  ↓
Supabase API
  ↓
setGames() → Layout state
  ↓
GamesContainer → WaterpoloGameCard (xN)
```

### 2. Flujo de Actualizaciones en Tiempo Real

```
AdminPanel (user action)
  ↓
GameControlPanel (updateGame)
  ↓
realtimeService.js
  ↓
Supabase (WebSocket)
  ↓
All subscribed components
  ↓
UI updates automatically
```

### 3. Estados de Loading

```javascript
// Estado inicial
const [loading, setLoading] = useState(true);

// Durante carga
{loading ? (
  <LoadingSpinner />
) : (
  // Component content
)}

// Estados de error
const [error, setError] = useState(null);
if (error) {
  return <div>Error: {error.message}</div>;
}
```

### 4. Manejo de Errores

```javascript
try {
  const games = await fetchGames();
  setGames(games);
} catch (error) {
  console.error('Error fetching games:', error);
  setError(error);
} finally {
  setLoading(false);
}
```

---

## ⚙️ Configuración y Despliegue

### 1. Variables de Entorno

Crear `.env.local`:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Scripts de Package.json

```json
{
  "scripts": {
    "dev": "vite",                    // Servidor de desarrollo
    "build": "vite build",            // Build para producción
    "preview": "vite preview",         // Preview del build
    "lint": "eslint ."                // Linting de código
  }
}
```

### 3. Configuración de Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 4. Configuración de ESLint

```javascript
// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      globals: globals.browser,
    },
    plugins: { reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]
```

### 5. Despliegue en Producción

#### Build:
```bash
npm run build
```

#### Preview:
```bash
npm run preview
```

#### Despliegue a Vercel/Netlify:
1. Conectar repositorio
2. Configurar variables de entorno
3. Build command: `npm run build`
4. Output directory: `dist`

---

## 👨‍💻 Guía de Desarrollo

### 1. Configuración del Entorno Local

```bash
# Clonar repositorio
git clone https://github.com/M0R3N0-420/waterpoloScoreTicker.git
cd waterpoloScoreTicker

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Iniciar servidor de desarrollo
npm run dev
```

### 2. Flujo de Trabajo

#### Crear Nuevo Componente:
1. Crear archivo en `src/components/`
2. Exportar como default
3. Importar en `App.jsx` o componente padre
4. Agregar ruta si es necesario

#### Ejemplo - Nuevo Componente:
```javascript
// src/components/NewComponent.jsx
function NewComponent() {
  return (
    <div className="p-4 bg-slate-100 rounded-lg">
      <h2 className="text-xl font-bold text-slate-900">
        Nuevo Componente
      </h2>
    </div>
  );
}

export default NewComponent;
```

### 3. Buenas Prácticas

#### Componentes:
- Usar PascalCase para nombres
- Exportar como default
- Props destructuring
- Manejo de estados con hooks

#### Estilos:
- Clases Tailwind consistentes
- Paleta de colores definida
- Diseño responsivo
- Accesibilidad (ARIA labels)

#### Código:
- Componentes pequeños y reutilizables
- Manejo de errores con try-catch
- Loading states
- Comentarios descriptivos

### 4. Testing (Futuro)

```javascript
// Ejemplo de test futuro
import { render, screen } from '@testing-library/react';
import WaterpoloGameCard from './WaterpoloGameCard';

test('renders game card with live status', () => {
  const game = {
    date: "25 Ene",
    time: "7:00 PM",
    competition: "Liga Colombiana",
    homeTeam: "CPA Medellin",
    awayTeam: "Belen",
    homeScore: 13,
    awayScore: 10,
    period: 3,
    status: "EN VIVO"
  };

  render(<WaterpoloGameCard {...game} />);
  expect(screen.getByText('EN VIVO')).toBeInTheDocument();
});
```

### 5. Debugging

#### Console Logs:
```javascript
// En componentes
useEffect(() => {
  console.log('Component mounted');
  console.log('Games state:', games);
}, [games]);

// En servicios
console.log('API call:', { gameId, updates });
```

#### React DevTools:
- Inspeccionar componentes
- Ver props y estado
- Profiler de rendimiento

#### Network Tab:
- Ver llamadas a Supabase
- Inspeccionar WebSockets
- Tiempos de respuesta

---

## 🐛 Troubleshooting

### 1. Problemas Comunes

#### No cargan los datos:
```bash
✅ Verificar:
- Variables de entorno en .env.local
- Conexión a Supabase
- Tabla 'games' existe
- Permisos RLS configurados
```

#### Componentes no se actualizan:
```bash
✅ Verificar:
- Suscripción a real-time activa
- Estado actualizado correctamente
- Keys en map() únicas
- useEffect dependencies correctas
```

#### Estilos no aplican:
```bash
✅ Verificar:
- TailwindCSS importado
- Clases correctas
- CSS cache limpio
- Build de producción
```

#### Errores de routing:
```bash
✅ Verificar:
- BrowserRouter envuelve App
- Rutas definidas correctamente
- Links usan 'to' prop
- No rutas duplicadas
```

### 2. Herramientas de Debug

#### Browser Console:
```javascript
// Ver suscripciones activas
console.log('Active channels:', supabase.getChannels());

// Ver estado de componentes
console.log('Current game:', selectedGame);
```

#### Supabase Dashboard:
- Ver logs de base de datos
- Monitorear conexiones
- Verificar políticas RLS

#### Network Tab:
- Filtros: WS (WebSockets)
- Ver payload de actualizaciones
- Tiempos de respuesta

### 3. Soluciones Rápidas

#### Resetear estado:
```javascript
// Limpiar estado local
setGames([]);
setSelectedGame(null);
```

#### Forzar recarga:
```javascript
// Recargar datos
const refreshData = async () => {
  setLoading(true);
  const games = await fetchGames();
  setGames(games);
  setLoading(false);
};
```

#### Limpiar suscripciones:
```javascript
useEffect(() => {
  const channel = subscribeToAllGames(callback);
  
  return () => {
    unsubscribeFromChannel(channel);
  };
}, []);
```

---

## 📈 Métricas y Monitoreo

### 1. Performance

#### Métricas Clave:
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)

#### Optimizaciones:
- Lazy loading de imágenes
- Code splitting por ruta
- Memo de componentes pesados
- Virtual scrolling para listas largas

### 2. Analytics (Futuro)

```javascript
// Ejemplo de tracking
import { analytics } from './services/analytics';

const trackGameUpdate = (gameId, action) => {
  analytics.track('game_updated', {
    game_id: gameId,
    action: action,
    timestamp: new Date().toISOString()
  });
};
```

### 3. Error Tracking

```javascript
// Error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Enviar a servicio de tracking
  }
}
```

---

## 🚀 Roadmap Futuro

### 1. Características Planeadas

#### Autenticación:
- Login de usuarios
- Roles (admin, editor, viewer)
- Permisos por función

#### Estadísticas Avanzadas:
- Historial de partidos
- Estadísticas de jugadores
- Gráficos y visualizaciones

#### Notificaciones:
- Push notifications
- Email alerts
- SMS para goles importantes

#### Mobile App:
- React Native version
- Offline mode
- Sincronización automática

### 2. Mejoras Técnicas

#### Performance:
- Implementar caching
- Optimizar bundle size
- Server-side rendering

#### Escalabilidad:
- Microservicios
- CDN para assets
- Load balancing

#### Testing:
- Unit tests (Jest)
- Integration tests
- E2E tests (Playwright)

---

## 📝 Conclusión

Esta documentación proporciona una visión completa del proyecto **Waterpolo Score Ticker**, cubriendo desde la arquitectura general hasta detalles de implementación de cada componente.

El proyecto está diseñado con:
- ✅ **Arquitectura escalable** y mantenible
- ✅ **Componentes reutilizables** y bien documentados
- ✅ **Actualizaciones en tiempo real** eficientes
- ✅ **Diseño responsivo** y moderno
- ✅ **Código limpio** siguiendo mejores prácticas

Para contribuir o reportar issues, por favor visitar el repositorio en GitHub.

---

**Última actualización**: Enero 2026  
**Versión**: 1.0.0  
**Autor**: Equipo de Desarrollo CPA Medellín
