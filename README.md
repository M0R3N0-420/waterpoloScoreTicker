# 🏊 Waterpolo Score Ticker - CPA Medellín

Un sistema completo para el seguimiento de partidos de waterpolo en tiempo real del Club de Waterpolo CPA Medellín, con actualizaciones instantáneas, panel de control, visualización de estadísticas e información del club.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración de Base de Datos](#configuración-de-base-de-datos)
- [Páginas Disponibles](#páginas-disponibles)
- [Guía para Principiantes](#guía-para-principiantes)
- [Guía Técnica](#guía-técnica)
- [Componentes](#componentes)
- [Personalización de Estilos](#personalización-de-estilos)
- [Troubleshooting](#troubleshooting)

## 🚀 Características Principales

- **Panel de Control en Tiem Real**
  - Actualizaciones instantáneas de marcadores
  - Control de cuartos y tiempos
  - Cambio de estados de partido
  - Interfaz intuitiva para administradores

- **Visualización de Partidos**
  - Cards interactivas con información detallada
  - Tres estados: EN VIVO (con animación), FINALIZADO, PROGRAMADO
  - Marcadores por cuarto con historial
  - Ordenamiento inteligente (en vivo > programados > finalizados)

- **Página del Club**
  - Información institucional del CPA Medellín
  - Historia del club
  - Horarios de entrenamiento
  - Ubicación y datos de contacto
  - Llamados a la acción claros

- **Interfaz de Usuario**
  - Diseño responsivo y accesible
  - Navegación intuitiva
  - Paleta de colores corporativa (azul oscuro, cian y dorado)
  - Indicadores visuales de estado
  - Carga optimizada con spinners
  - Transiciones suaves

- **Tecnologías Avanzadas**
  - Base de datos en tiempo real con Supabase
  - Actualizaciones en vivo con WebSockets
  - Arquitectura modular y escalable
  - Código limpio y documentado
  - Estilos con TailwindCSS

## 🛠 Stack Tecnológico

### Frontend
- **React 19.2.0** - Biblioteca principal de UI
- **Vite 7.2.4** - Empaquetador y servidor de desarrollo
- **TailwindCSS 4.1.18** - Framework de estilos
- **React Router 7.13.0** - Navegación entre páginas

### Backend
- **Supabase** - Base de datos PostgreSQL en tiempo real
  - Autenticación
  - Base de datos relacional
  - Suscripciones en tiempo real

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostgreSQL** - Sistema de base de datos
- **Git** - Control de versiones

## 🌐 Páginas Disponibles

- **Inicio** (`/`)
  - Hero con imagen destacada
  - Lista de partidos en tiempo real
  - Visualización de marcadores y estados

- **Equipo** (`/teams`)
  - Información del equipo
  - Lista de jugadores
  - Estadísticas del equipo

- **Club** (`/club`)
  - Información del Club de Waterpolo de Antioquia
  - Historia del club
  - Ubicación y datos de contacto
  - Información institucional

- **Panel de Control** (`/admin`)
  - Gestión de partidos
  - Actualización de marcadores en tiempo real
  - Control de estados de partido

## 📁 Estructura del Proyecto

```
waterpoloScoreTicker/
├── public/                     # Archivos estáticos
│   └── images/                 # Imágenes y assets
│
├── src/
│   ├── components/             # Componentes de React
│   │   ├── GameControlPanel.jsx # Panel de control de partidos
│   │   ├── GamesContainer.jsx  # Contenedor de partidos
│   │   ├── Hero.jsx           # Componente hero principal
│   │   ├── Layout.jsx         # Diseño principal
│   │   ├── LoadingSpinner.jsx # Componente de carga
│   │   ├── MatchCenter.jsx    # Vista central de partidos
│   │   ├── NavBar.jsx         # Barra de navegación
│   │   ├── TeamPage.jsx       # Página del equipo
│   │   ├── WaterpoloGameCard.jsx # Tarjeta de partido
│   │   └── ClubPage.jsx        # Página informativa del club
│   │
│   ├── config/
│   │   └── supabase.js        # Configuración de Supabase
│   │
│   ├── services/
│   │   ├── gamesService.js    # Servicio de gestión de partidos
│   │   └── realtimeService.js # Servicio de actualizaciones en tiempo real
│   │
│   ├── App.jsx                # Componente raíz
│   └── main.jsx               # Punto de entrada
│
├── .gitignore
├── package.json
└── README.md

## ⚙️ Instalación
### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta en Supabase

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/waterpoloScoreTicker.git
   cd waterpoloScoreTicker
   ```

2. **Instalar dependencias***
   ```bash
   npm install
   ```

3. **Configurar variables de entorno***
   Crear archivo `.env` en la raíz:
   ```env
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima
   ```

4. **Iniciar servidor de desarrollo***
5. **Iniciar desarrollo**
   ```bash
   npm run dev
   ```

## 🗄️ Configuración de Base de Datos

### Crear Tabla en Supabase

```sql
CREATE TABLE games (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  competition TEXT NOT NULL,
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  home_score BIGINT,
  away_score BIGINT,
  period BIGINT,
  status TEXT NOT NULL CHECK (status IN ('EN VIVO', 'FINALIZADO', 'PROGRAMADO')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Campos Explicados

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `date` | TEXT | Fecha del partido (ej: "25 Ene") |
| `time` | TEXT | Hora del partido (ej: "7:00 PM") |
| `competition` | TEXT | Nombre de la competencia |
| `home_team` | TEXT | Equipo local |
| `away_team` | TEXT | Equipo visitante |
| `home_score` | BIGINT | Score del equipo local (nullable) |
| `away_score` | BIGINT | Score del equipo visitante (nullable) |
| `period` | BIGINT | Período actual (nullable) |
| `status` | TEXT | Estado del partido |

## 📚 Guía para Principiantes

### ¿Cómo funciona este proyecto?

Este proyecto muestra partidos de waterpolo en tarjetas (cards). Cada tarjeta tiene:

1. **Estado y fecha**: Arriba a la izquierda el estado (EN VIVO, FINALIZADO o hora), arriba a la derecha la fecha
2. **Equipos y scores**: El equipo local primero con su score, luego el visitante
3. **Competencia y período**: Abajo, el nombre de la competencia y el período actual si está en vivo

### ¿Qué significan los colores y animaciones?

- **Punto rojo animado**: Partido EN VIVO
- **"FINALIZADO"**: Partido terminado con "FT" (Full Time)
- **Hora programada**: Partido por comenzar

### ¿Cómo navegar entre partidos?

- Pasa el mouse sobre el área de las tarjetas
- Aparecerán flechas en los extremos
- Haz clic en las flechas para navegar horizontalmente
- También puedes usar el scroll del mouse/trackpad
- **Las cards comienzan desde la izquierda** con alineación natural

### ¿Cómo agregar nuevos partidos?

1. Ve a tu panel de Supabase
2. Entra a Table Editor → tabla `games`
3. Haz clic en "Insert row"
4. Llena los datos del nuevo partido
5. La aplicación se actualizará automáticamente

## 🔧 Guía Técnica

### Flujo de Datos

1. **App.jsx** carga datos usando `fetchGames()` de `gamesService.js`
2. **gamesService.js** se conecta a Supabase usando el cliente configurado
3. **Supabase** retorna datos de la tabla `games`
4. **App.jsx** pasa los datos a **GamesContainer** como children
5. **GamesContainer** maneja navegación y renderiza **WaterpoloGameCard**
6. **LoadingSpinner** se muestra durante la carga de datos

### Estados React

```javascript
// App.jsx
const [games, setGames] = useState([])        // Array de partidos
const [loading, setLoading] = useState(true) // Estado de carga

// GamesContainer.jsx
const [showArrows, setShowArrows] = useState(false) // Visibilidad de flechas
```

### Lógica de Componentes

#### WaterpoloGameCard.jsx

```javascript
const isLive = status === "EN VIVO"
const isFinished = status === "FINALIZADO"

// Renderizado condicional según estado
{isLive ? "EN VIVO" : isFinished ? "FINALIZADO" : time}
{(isLive || isFinished) ? score : '\u00A0'} // Espacio reservado
```

#### Servicios Supabase

```javascript
// Obtener todos los partidos
const { data, error } = await supabase
  .from('games')
  .select('*')
  .order('created_at', { ascending: false })
```

### Sistema de Estilos

- **TailwindCSS**: Framework de CSS utility-first
- **Clases personalizadas**: `.scrollbar-hide` para ocultar scrollbars
- **Diseño responsivo**: `min-w-max` + `overflow-x-auto`

## 🎨 Personalización de Estilos

El proyecto utiliza una paleta de colores corporativa basada en la identidad visual del CPA Medellín:

- **Azul Marino**: `slate-800` a `slate-600` (fondos y texto principal)
- **Azul Claro**: `cyan-500` a `cyan-300` (elementos interactivos, enlaces)
- **Dorado**: `amber-500` a `amber-300` (botones de acción, acentos)
- **Blanco/Negro**: Para contraste y legibilidad

### Componentes Principales

- **Hero**: Portada principal con imagen destacada
- **NavBar**: Barra de navegación con menú responsivo
- **WaterpoloGameCard**: Visualización de partidos con estados
- **MatchCenter**: Contenedor principal de partidos
- **TeamPage**: Información del equipo y jugadores
- **AdminPanel**: Panel de control para gestión de partidos
- **ClubPage**: Página informativa del club

### Cómo modificar estilos

1. **Colores**: Buscar y reemplazar las clases de color en los componentes
   - Ejemplo: `bg-slate-800`, `text-cyan-500`, `hover:bg-amber-500`
2. **Tipografía**: Configurar en `tailwind.config.js`
3. **Layout**: Ajustar en `Layout.jsx`
4. **Temas**: Personalizar en `index.css`

### Componentes Clave

- **WaterpoloGameCard**: Muestra la información de cada partido
- **MatchCenter**: Contenedor principal que gestiona la lógica de partidos
- **AdminPanel**: Interfaz para administrar partidos en tiempo real
- **ClubPage**: Muestra información institucional del club

### Cambiar Colores

En `WaterpoloGameCard.jsx`:
```javascript
// Cambiar color del indicador EN VIVO
className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"

// Cambiar color de fondo
className="w-48 h-24 bg-blue-50 border border-blue-200"
```

### Modificar Tamaño de Cards

```javascript
// En WaterpoloGameCard.jsx
className="w-56 h-28" // Más grande
className="w-40 h-20" // Más pequeño
```

### Cambiar Alineación de Cards

En `GamesContainer.jsx`:
```javascript
// Alineación a la izquierda (actual)
<div className="flex gap-4 items-center min-w-max justify-start py-4">

// Alineación centrada
<div className="flex gap-4 items-center min-w-max justify-center py-4">

// Alineación a la derecha
<div className="flex gap-4 items-center min-w-max justify-end py-4">
```

### Configurar Variables de Entorno

Para diferentes entornos:

```bash
# .env.local (desarrollo)
VITE_SUPABASE_URL=https://dev-project.supabase.co
VITE_SUPABASE_ANON_KEY=dev-key

# .env.production (producción)
VITE_SUPABASE_URL=https://prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=prod-key
```

### Agregar Nuevos Estados

1. Agregar a la validación SQL en Supabase
2. Agregar lógica en `WaterpoloGameCard.jsx`
3. Actualizar servicios si es necesario

## 🐛 Troubleshooting

### Problemas Comunes

**1. No cargan los datos**
- Verificar conexión a Supabase
- Revisar credenciales en `.env.local`
- Revisar tabla `games` exista
- **Verificar que .env.local no esté en Git**

**2. Cards no muestran scores**
- Verificar nombres de campos: `home_team` vs `homeTeam`
- Revisar datos no sean NULL para partidos EN VIVO

**3. Scroll no funciona**
- Verificar CSS `.scrollbar-hide` esté en `index.css`
- Revisar `overflow-x-auto` en contenedor

**4. Flechas no aparecen**
- Verificar estado `showArrows`
- Revisar eventos `onMouseEnter/Leave`

**5. Variables de entorno no funcionan**
- Verificar que el archivo se llame exactamente `.env.local`
- Reiniciar el servidor después de cambiar variables
- Verificar formato: `VITE_` prefix para Vite

**6. Alineación de cards incorrecta**
- Revisar clase `justify-start` en `GamesContainer.jsx`
- Verificar que no haya CSS conflictivo

### Herramientas de Debug

```javascript
// En App.jsx, agregar logs
useEffect(() => {
  console.log('Games loaded:', games)
}, [games])

// En gamesService.js
console.log('Supabase error:', error)
```

### Verificación de Conexión

1. **Network Tab**: Buscar peticiones a Supabase
2. **Console**: Revisar errores de JavaScript
3. **Supabase Dashboard**: Verificar logs y conexión

## 🚀 Despliegue

### Variables de Entorno para Producción

```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-key-produccion
```

### Build para Producción

```bash
npm run build
npm run preview
```

## 📝 Licencia

MIT License - Puedes usar este proyecto para fines comerciales y personales.

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch
3. Hacer commit de cambios
4. Push al branch
5. Crear Pull Request

---

**¿Necesitas ayuda?** Revisa la sección de Troubleshooting o abre un issue en el repositorio.
