# 🏊‍♂️ Waterpolo Score Ticker - CPA Medellín

Sistema web completo para la gestión y visualización de partidos, equipos y jugadores del club de waterpolo CPA Medellín. Desarrollado con React, Vite y Supabase para ofrecer una experiencia moderna y en tiempo real.

## 📋 **Tabla de Contenidos**

- [🏗️ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
- [🚀 Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔧 Configuración Inicial](#-configuración-inicial)
- [📱 Componentes Principales](#-componentes-principales)
- [🗄️ Servicios y Base de Datos](#️-servicios-y-base-de-datos)
- [⚡ Funcionalidades en Tiempo Real](#-funcionalidades-en-tiempo-real)
- [🎯 Guía de Uso](#-guía-de-uso)

---

## 🏗️ **Arquitectura del Proyecto**

### **Arquitectura General**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Supabase      │    │   Storage       │
│   (React)       │◄──►│   (Database)    │◄──►│   (Images)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Routing       │    │   Realtime      │    │   Auth          │
│   (React Router)│    │   (WebSocket)   │    │   (JWT)         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Flujo de Datos**
1. **Usuario interactúa** con los componentes React
2. **Servicios** realizan peticiones a Supabase
3. **Supabase** procesa y devuelve datos
4. **Realtime Service** escucha cambios en tiempo real
5. **Componentes** se actualizan automáticamente

---

## 🚀 **Tecnologías Utilizadas**

### **Frontend**
- **React 19.2.0**: Framework principal para la UI
- **Vite 7.2.4**: Build tool y desarrollo rápido
- **React Router 7.13.0**: Navegación entre páginas
- **TailwindCSS 4.1.18**: Framework de estilos

### **Backend & Database**
- **Supabase 2.91.1**: Base de datos PostgreSQL y servicios
- **Realtime Subscriptions**: Actualizaciones en vivo
- **Storage**: Almacenamiento de imágenes

### **Utilidades**
- **date-fns 4.1.0**: Manejo de fechas
- **sonner 2.0.7**: Notificaciones toast
- **ESLint**: Linting y calidad de código

---

## 📁 **Estructura del Proyecto**

```
waterpoloScoreTicker/
├── 📄 package.json                 # Dependencias y scripts
├── 📄 vite.config.js              # Configuración de Vite
├── 📄 .env.local                  # Variables de entorno
├── 📁 public/
│   └── 📁 images/                 # Imágenes estáticas
├── 📁 src/
│   ├── 📄 main.jsx                # Punto de entrada
│   ├── 📄 App.jsx                 # Componente principal y rutas
│   ├── 📁 components/             # Componentes UI
│   ├── 📁 services/               # Lógica de negocio
│   ├── 📁 config/                 # Configuración
│   └── 📁 data/                   # Datos mock
```

---

## 🔧 **Configuración Inicial**

### **1. Variables de Entorno**
Crear archivo `.env.local`:
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### **2. Base de Datos Supabase**
```sql
-- Tabla de partidos
CREATE TABLE games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team1 TEXT NOT NULL,
  team2 TEXT NOT NULL,
  score1 INTEGER DEFAULT 0,
  score2 INTEGER DEFAULT 0,
  status TEXT DEFAULT 'PROGRAMADO',
  date TEXT,
  time TEXT,
  period INTEGER DEFAULT 1,
  period_duration INTEGER DEFAULT 8,
  clock_running BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de jugadores
CREATE TABLE players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  number INTEGER NOT NULL,
  position TEXT NOT NULL,
  country TEXT NOT NULL,
  image TEXT,
  stats JSONB DEFAULT '{}',
  category TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 📱 **Componentes Principales**

### **🏠 App.jsx - Componente Principal**
**Propósito**: Orquestador principal de la aplicación

**Funciones principales**:
- Configuración de rutas con React Router
- Estructura general del layout
- Reset de scroll al cambiar de página

```javascript
// Rutas definidas:
/           → HomePage (Hero + MatchCenter)
/teams      → TeamPage (Equipos y jugadores)
/club       → ClubPage (Información del club)
/admin      → AdminPanel (Control de partidos)
```

---

### **🎯 Hero.jsx - Sección Principal**
**Propósito**: Componente visual de bienvenida

**Características**:
- Gradiente moderno con patrón de grid
- Logo del club con efecto glassmorphism
- Llamados a la acción (CTA)
- Diseño responsivo
- Animaciones sutiles

**Funciones**:
- Presentación del club
- Navegación a páginas clave
- Impacto visual inicial

---

### **🧭 NavBar.jsx - Navegación Principal**
**Propósito**: Sistema de navegación de la aplicación

**Características**:
- Menú desktop y móvil (responsive)
- Logo del club
- Enlaces a todas las secciones
- Estado de menú móvil con useState

**Funciones principales**:
```javascript
const navItems = [
  { name: 'Partidos', href: '/' },
  { name: 'Equipos', href: '/teams' },
  { name: 'Panel de Control', href: '/admin' },
  { name: 'Club', href: '/club' }
];
```

---

### **🏟️ MatchCenter.jsx - Centro de Partidos**
**Propósito**: Visualización de partidos en vivo y próximos

**Funciones clave**:
- **parseGameDate()**: Convierte fechas '12 Mar' a formato ordenable
- **parseTimeToMinutes()**: Convierte horas '3:30 PM' a minutos
- **sortGamesByDateAndTime()**: Ordenamiento inteligente de partidos

**Características**:
- Partidos en tiempo real
- Próximos encuentros
- Últimos resultados
- Actualizaciones automáticas vía WebSocket

---

### **⚙️ AdminPanel.jsx - Panel de Control**
**Propósito**: Interfaz de administración para gestión de partidos

**Funciones principales**:
- Carga todos los partidos disponibles
- Selección de partido para control
- Suscripción a actualizaciones en tiempo real
- Reset de scroll al cargar

**Flujo de trabajo**:
1. Carga lista de partidos desde Supabase
2. Permite seleccionar un partido
3. Muestra GameControlPanel para el partido seleccionado
4. Escucha cambios en tiempo real

---

### **🎮 GameControlPanel.jsx - Control Individual de Partidos**
**Propósito**: Control completo de un partido específico

**Funciones principales**:
```javascript
// Control del reloj
startClock()     // Inicia cronómetro
stopClock()      // Detiene cronómetro
resetClock()     // Reinicia cronómetro

// Control de puntuación
incrementScore(team)  // +1 al equipo
decrementScore(team)  // -1 al equipo

// Control del juego
nextPeriod()     // Siguiente período
toggleGameStatus() // Cambia estado (EN VIVO/FINALIZADO)
```

**Características**:
- Cronómetro con formato MM:SS
- Control de períodos
- Marcador en tiempo real
- Sincronización automática

---

### **👥 TeamPage.jsx - Página de Equipos**
**Propósito**: Visualización de jugadores por categorías

**Funciones principales**:
- **loadTeamData()**: Carga jugadores y estadísticas
- Filtrado por categorías (Semillero, Juvenil, Masculino, Femenino)
- Organización por posiciones (Porteros, Defensas, Atacantes, Centrales)

**Características**:
- Cards de jugadores con fotos
- Estadísticas individuales
- Selector de categorías
- Diseño responsivo

---

### **🏛️ ClubPage.jsx - Página del Club**
**Propósito**: Información institucional del club

**Secciones**:
- Hero con llamados a la acción
- Historia del club
- Filosofía y valores
- Horarios de entrenamiento
- Ubicación y contacto

**Características**:
- Diseño consistente con el Hero principal
- Información organizada en grid
- Enlaces a redes sociales
- Mapa de ubicación

---

### **👤 PlayerManagement.jsx - Gestión de Jugadores**
**Propósito**: CRUD completo para gestión de jugadores

**Funciones principales**:
```javascript
createPlayer()    // Crear nuevo jugador
updatePlayer()    // Editar jugador existente
deletePlayer()    // Eliminar (soft delete)
uploadPlayerImage() // Subir foto a Storage
```

**Características**:
- Formulario completo con validación
- Subida de imágenes
- Filtro por categorías
- Estadísticas individuales

---

## 🗄️ **Servicios y Base de Datos**

### **📊 gamesService.js - Gestión de Partidos**
**Propósito**: Todas las operaciones CRUD para partidos

**Funciones principales**:
```javascript
fetchGames()              // Obtener todos los partidos
fetchLatestGame()         // Último partido jugado
fetchUpcomingGames()      // Próximos partidos
updateGame()              // Actualizar partido
createGame()              // Crear nuevo partido
deleteGame()              // Eliminar partido
```

**Funciones de utilidad**:
- **parseGameDate()**: Conversión de fechas
- **parseTimeToMinutes()**: Conversión de horas
- **sortGamesByDateAndTime()**: Ordenamiento

---

### **👥 playersService.js - Gestión de Jugadores**
**Propósito**: Operaciones CRUD para jugadores

**Funciones principales**:
```javascript
fetchPlayers(category)        // Obtener jugadores por categoría
fetchPlayersByPosition()      // Filtrar por posición
createPlayer(playerData)      // Crear jugador
updatePlayer(id, playerData)  // Actualizar jugador
deletePlayer(id)             // Eliminar jugador
uploadPlayerImage(file, id)   // Subir foto
getTeamStats(category)        // Estadísticas del equipo
```

**Categorías soportadas**:
- `semillero`: Categoría infantil
- `juvenil`: Categoría juvenil
- `masculino`: Equipo senior masculino
- `femenino`: Equipo senior femenino

---

### **⚡ realtimeService.js - Actualizaciones en Tiempo Real**
**Propósito**: Suscripciones a cambios en tiempo real

**Funciones principales**:
```javascript
subscribeToAllGames(callback)      // Escuchar todos los partidos
subscribeToGame(gameId, callback)  // Escuchar partido específico
subscribeToPlayers(callback)       // Escuchar cambios de jugadores
```

**Eventos soportados**:
- `INSERT`: Nuevo registro
- `UPDATE`: Modificación existente
- `DELETE`: Eliminación de registro

---

### **🔧 supabase.js - Configuración de Base de Datos**
**Propósito**: Cliente de Supabase

**Función**:
```javascript
export const supabase = createClient(supabaseUrl, supabaseKey)
```

**Uso**: Importado en todos los servicios para comunicación con la base de datos

---

## ⚡ **Funcionalidades en Tiempo Real**

### **WebSocket Integration**
El sistema utiliza Supabase Realtime para actualizaciones instantáneas:

```javascript
// Ejemplo de suscripción
const channel = supabase
  .channel('games_changes')
  .on('postgres_changes', 
    { event: 'UPDATE', schema: 'public', table: 'games' },
    (payload) => {
      // Actualizar UI automáticamente
      updateGameData(payload.new);
    }
  )
  .subscribe();
```

### **Flujo de Actualizaciones**
1. **Admin cambia** marcador en GameControlPanel
2. **updateGame()** envía cambios a Supabase
3. **Supabase** emite evento WebSocket
4. **realtimeService** recibe el evento
5. **Componentes** se actualizan automáticamente
6. **Todos los usuarios** ven cambios en tiempo real

---

## 🎯 **Guía de Uso**

### **Para Administradores**

#### **1. Gestión de Partidos**
1. Ir a `/admin`
2. Seleccionar partido de la lista
3. Usar controles para:
   - Iniciar/detener reloj
   - Actualizar marcador
   - Cambiar período
   - Finalizar partido

#### **2. Gestión de Jugadores**
1. Ir a `/admin/players` (ruta a agregar)
2. Agregar nuevo jugador:
   - Completar formulario
   - Subir foto
   - Asignar categoría y posición
3. Editar jugadores existentes
4. Actualizar estadísticas

### **Para Usuarios**

#### **1. Ver Partidos**
- Página principal: partidos en vivo y próximos
- Actualizaciones automáticas sin refresh
- Marcadores en tiempo real

#### **2. Consultar Equipos**
- `/teams`: ver todos los jugadores
- Filtrar por categoría
- Ver estadísticas individuales

#### **3. Información del Club**
- `/club`: historia y contacto
- Horarios de entrenamiento
- Ubicación del club

---

## 🚀 **Comandos de Desarrollo**

```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar producción
npm run preview

# Linting del código
npm run lint
```

---

## 📝 **Notas Importantes**

### **Consideraciones Técnicas**
- **Scroll Reset**: Cada página tiene `useEffect` para `window.scrollTo(0, 0)`
- **Responsive Design**: Todos los componentes son mobile-first
- **Performance**: Lazy loading y optimización de imágenes
- **Error Handling**: Try-catch en todas las operaciones asíncronas

### **Mejoras Futuras**
- Autenticación de usuarios
- Sistema de notificaciones push
- Estadísticas avanzadas
- Integración con redes sociales
- Modo oscuro/claro

---

## 🤝 **Contribución**

1. Fork del proyecto
2. Feature branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Pull Request

---

## 📄 **Licencia**

Proyecto desarrollado para CPA Medellín © 2024

---

**🏊‍♂️ ¡Hecho con ❤️ para el waterpolo colombiano! 🇨🇴**
