# Servicios de Base de Datos - Supabase

## 📊 Estructura de la Tabla `games`

La tabla `games` ahora incluye los siguientes campos:

### Campos Principales
- `id` - Identificador único (BIGINT, PRIMARY KEY)
- `date` - Fecha del partido (TEXT)
- `time` - Hora del partido (TEXT)
- `competition` - Competencia (TEXT)
- `home_team` - Equipo local (TEXT)
- `away_team` - Equipo visitante (TEXT)
- `home_score` - Score local (BIGINT)
- `away_score` - Score visitante (BIGINT)
- `period` - Período actual (BIGINT)
- `status` - Estado del partido (TEXT: 'EN VIVO', 'FINALIZADO', 'PROGRAMADO')
- `created_at` - Fecha de creación (TIMESTAMP)
- `updated_at` - Fecha de actualización (TIMESTAMP)

### Nuevos Campos de Cuartos
- `q1_home_score` - Score local Q1 (INTEGER)
- `q1_away_score` - Score visitante Q1 (INTEGER)
- `q2_home_score` - Score local Q2 (INTEGER)
- `q2_away_score` - Score visitante Q2 (INTEGER)
- `q3_home_score` - Score local Q3 (INTEGER)
- `q3_away_score` - Score visitante Q3 (INTEGER)
- `q4_home_score` - Score local Q4 (INTEGER)
- `q4_away_score` - Score visitante Q4 (INTEGER)

## 🔧 Funciones del Servicio

### `fetchGames()`
- **Propósito**: Obtener todos los partidos
- **Orden**: `created_at` descendente (más recientes primero)
- **Retorna**: Array de partidos

### `fetchLatestGame()`
- **Propósito**: Obtener el último partido en vivo o finalizado
- **Filtro**: `status IN ('EN VIVO', 'FINALIZADO')`
- **Orden**: `created_at` descendente
- **Límite**: 1 resultado
- **Retorna**: Objeto del partido o null

### `fetchTopScorers()`
- **Propósito**: Obtener top goleadores del club
- **Actual**: Datos mockeados
- **Futuro**: Conectar a tabla de jugadores/estadísticas

### `createGame(gameData)`
- **Propósito**: Crear nuevo partido
- **Parámetros**: `gameData` con todos los campos
- **Retorna**: Partido creado o null

## 🚀 Servicio de Tiempo Real

### `realtimeService.js`

#### `subscribeToGameUpdates(gameId, onUpdate)`
- **Propósito**: Suscribirse a actualizaciones de un partido específico
- **Parámetros**: 
  - `gameId`: ID del partido a monitorear
  - `onUpdate`: Función callback que se ejecuta en cada actualización
- **Retorna**: Canal de suscripción (para desuscribirse)

#### `subscribeToAllGames(onUpdate)`
- **Propósito**: Suscribirse a todos los cambios en la tabla de juegos
- **Parámetros**:
  - `onUpdate`: Función callback que recibe los cambios
- **Retorna**: Canal de suscripción (para desuscribirse)

#### `updateGame(gameId, updates)`
- **Propósito**: Actualizar un partido existente
- **Parámetros**:
  - `gameId`: ID del partido a actualizar
  - `updates`: Objeto con los campos a actualizar
- **Retorna**: Partido actualizado o null

#### `updateScore(gameId, homeScore, awayScore)`
- **Propósito**: Actualizar solo el marcador de un partido
- **Actualiza**: `home_score`, `away_score` y `updated_at`

#### `updateQuarter(gameId, period, q1Home, q1Away, q2Home, q2Away, q3Home, q3Away, q4Home, q4Away)`
- **Propósito**: Actualizar puntuaciones por cuarto
- **Actualiza**: Puntuaciones de cuartos específicos y `updated_at`

#### `updateGameStatus(gameId, status)`
- **Propósito**: Cambiar el estado de un partido
- **Valores válidos**: 'PROGRAMADO', 'EN VIVO', 'FINALIZADO'

## 📝 Ejemplo de Uso

```javascript
// Crear un partido con datos de cuartos
const newGame = {
  date: "26 Ene",
  time: "7:00 PM",
  competition: "Liga Antioquia",
  home_team: "CPA Medellin",
  away_team: "Wolves",
  home_score: 12,
  away_score: 10,
  q1_home_score: 3,
  q1_away_score: 2,
  q2_home_score: 4,
  q2_away_score: 1,
  q3_home_score: 2,
  q3_away_score: 3,
  q4_home_score: 3,
  q4_away_score: 4,
  status: "FINALIZADO"
};

await createGame(newGame);
```

## 🎯 Integración con Componentes

### **Layout**
- Usa `fetchGames()` para cargar los partidos iniciales
- Se suscribe a `subscribeToAllGames()` para actualizaciones en tiempo real
- Actualiza automáticamente el `GamesContainer` cuando hay cambios

### **MatchCenter**
- Usa `fetchLatestGame()` para mostrar el partido actual
- Integra `GameControlPanel` para edición en tiempo real
- Muestra indicadores visuales para partidos EN VIVO

### **GameControlPanel**
- Permite actualizar:
  - Marcador general
  - Puntuaciones por cuarto
  - Estado del partido
  - Período actual
- Proporciona feedback visual de los cambios

### **WaterpoloGameCard**
- Muestra resumen de partidos individuales
- Actualización automática vía suscripciones
- Indicadores visuales de estado

## 🔄 Flujo de Datos

1. **Carga Inicial**
   - Componentes solicitan datos vía `gamesService`
   - Se muestran estados de carga mientras se obtienen los datos

2. **Actualizaciones en Tiempo Real**
   - Componentes se suscriben a cambios vía `realtimeService`
   - Las actualizaciones se reflejan automáticamente en la UI
   - No se requiere recargar la página

3. **Edición de Partidos**
   - Usuario interactúa con `GameControlPanel`
   - Cambios se envían a Supabase
   - Todos los componentes suscritos se actualizan automáticamente

4. **Manejo de Estados**
   - Loading states durante operaciones asíncronas
   - Manejo de errores con mensajes al usuario
   - Actualización optimista de la UI

## 🚀 Próximas Mejoras

1. **Autenticación y Permisos**
   - Roles de usuario (admin, editor, visitante)
   - Control de acceso al panel de control

2. **Estadísticas Avanzadas**
   - Tabla de jugadores con estadísticas
   - Historial de partidos con filtros
   - Gráficos de rendimiento

3. **Optimizaciones**
   - Sistema de caché para reducir llamadas a la API
   - Paginación para listados largos
   - Mejor manejo de estado global (Context/Redux)

4. **Características Adicionales**
   - Notificaciones push para goles y eventos importantes
   - Compartir resultados en redes sociales
   - Exportar datos a Excel/PDF
