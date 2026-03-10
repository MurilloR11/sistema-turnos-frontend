# 🎨 Sistema de Diseño - Sistema de Turnos Médicos

## 🌟 Personalidad de Marca: "Precisión Cálida"

**Filosofía:** Un sistema médico puede ser profesional sin ser frío. Combina precisión tecnológica con calidez humana, evitando los clichés hospitalarios azul/verde.

**Valores visuales:**
- ⚡ **Confiable pero Accesible** - No intimidante
- 🌿 **Orgánico con Estructura** - Formas suaves dentro de grillas precisas
- 🎯 **Enfocado pero Amigable** - Claridad sin austeridad
- ⏱️ **Tiempo Real con Calma** - Urgencia sin ansiedad

---

## 🎨 Paleta de Colores

### Colores Primarios

```css
/* Terra Cotta - Color principal (cálido, confiable, distintivo) */
--primary-500: #E07A5F;
--primary-600: #C86A50;
--primary-700: #B05A41;
--primary-400: #E89580;
--primary-300: #F0B0A1;
--primary-100: #FAE3DD;

/* Deep Teal - Acento (profesional, calmante) */
--accent-500: #2A9D8F;
--accent-600: #238679;
--accent-700: #1C6F63;
--accent-400: #3DB4A6;
--accent-300: #6DCABF;
--accent-100: #D4F1ED;

/* Warm Sand - Neutral base (orgánico, cálido) */
--neutral-900: #2C2416;
--neutral-800: #453A28;
--neutral-700: #5E523E;
--neutral-600: #7A6E57;
--neutral-500: #998D77;
--neutral-400: #B8AE9A;
--neutral-300: #D5CCBB;
--neutral-200: #E8E2D5;
--neutral-100: #F5F2EB;
--neutral-50: #FDFCFA;
```

### Colores Funcionales

```css
/* Estados de Turno */
--status-confirmed: #81B29A;    /* Verde salvia - confirmado */
--status-pending: #F2CC8F;      /* Amarillo miel - pendiente */
--status-cancelled: #D1495B;    /* Rojo terracota - cancelado */
--status-completed: #6C91BF;    /* Azul acero - completado */

/* Estados de Sistema */
--online: #4ECB71;              /* Verde brillante - conectado */
--offline: #E76F51;             /* Coral - desconectado */
--realtime: #EF476F;            /* Rosa magenta - tiempo real */

/* Fondos */
--bg-primary: #FDFCFA;
--bg-secondary: #F5F2EB;
--bg-elevated: #FFFFFF;
--bg-overlay: rgba(44, 36, 22, 0.6);
```

**Rationale de Color:**
- **Terra Cotta** reemplaza los típicos azules médicos, ofreciendo calidez sin perder profesionalismo
- **Deep Teal** provee contraste fresco y conexión con salud, pero en un tono más sofisticado
- **Warm Sand neutrals** crean una base orgánica, evitando el frío gris corporativo
- **WCAG AA+ Compliant:** Todos los contrastes texto/fondo ≥4.5:1

---

## ✍️ Tipografía

### Familia de Fuentes

```css
/* Headings - Geométrica moderna, precisa */
--font-heading: 'DM Sans', 'Inter', system-ui, sans-serif;

/* Body - Humanista, legible, cálida */
--font-body: 'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif;

/* Mono - Datos, códigos de turno */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

### Escala Tipográfica (Major Third - 1.25)

```css
--text-xs: 0.75rem;      /* 12px - timestamps, badges */
--text-sm: 0.875rem;     /* 14px - labels, secundario */
--text-base: 1rem;       /* 16px - body principal */
--text-lg: 1.125rem;     /* 18px - destacados */
--text-xl: 1.25rem;      /* 20px - subtítulos */
--text-2xl: 1.563rem;    /* 25px - h3 */
--text-3xl: 1.953rem;    /* 31px - h2 */
--text-4xl: 2.441rem;    /* 39px - h1 */
--text-5xl: 3.052rem;    /* 49px - hero */

/* Pesos */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

**Rationale:**
- **DM Sans** para headings: moderna, precisa, excelente en títulos
- **Inter** para body: óptima legibilidad en pantallas, humanista pero profesional
- **JetBrains Mono** para IDs/códigos: distingue datos técnicos claramente

---

## 📐 Espaciado y Layout

### Sistema de Espaciado (8pt Grid)

```css
--space-0: 0;
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px - base */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
```

### Border Radius (Asimétricos para romper monotonía)

```css
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-2xl: 32px;
--radius-full: 9999px;

/* Variaciones orgánicas */
--radius-organic-1: 12px 20px 12px 20px;
--radius-organic-2: 16px 8px 16px 8px;
--radius-morphic: 40% 60% 60% 40% / 50% 50% 50% 50%;
```

### Sombras (Sistema de elevación con calidez)

```css
--shadow-xs: 0 1px 2px rgba(44, 36, 22, 0.05);
--shadow-sm: 0 2px 4px rgba(44, 36, 22, 0.06), 
             0 1px 2px rgba(44, 36, 22, 0.03);
--shadow-md: 0 4px 8px rgba(44, 36, 22, 0.08), 
             0 2px 4px rgba(44, 36, 22, 0.05);
--shadow-lg: 0 8px 16px rgba(44, 36, 22, 0.1), 
             0 4px 8px rgba(44, 36, 22, 0.06);
--shadow-xl: 0 16px 32px rgba(44, 36, 22, 0.12),
             0 8px 16px rgba(44, 36, 22, 0.08);
--shadow-2xl: 0 24px 48px rgba(44, 36, 22, 0.15),
              0 12px 24px rgba(44, 36, 22, 0.1);

/* Sombras de color para estados activos */
--shadow-primary: 0 4px 12px rgba(224, 122, 95, 0.25);
--shadow-accent: 0 4px 12px rgba(42, 157, 143, 0.25);
```

---

## 🧩 Componentes

### Botones

#### Primario
```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  border: none;
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.2) 100%);
  opacity: 0;
  transition: opacity 0.3s;
}

.btn-primary:hover::before {
  opacity: 1;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-primary);
}

.btn-primary:active {
  transform: translateY(0);
}
```

#### Secundario
```css
.btn-secondary {
  background: var(--neutral-100);
  color: var(--neutral-800);
  border: 1.5px solid var(--neutral-300);
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  transition: all 0.25s ease;
}

.btn-secondary:hover {
  background: var(--neutral-200);
  border-color: var(--neutral-400);
  transform: translateY(-1px);
}
```

#### Ghost
```css
.btn-ghost {
  background: transparent;
  color: var(--primary-600);
  border: none;
  padding: 12px 20px;
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: background 0.2s ease;
}

.btn-ghost:hover {
  background: var(--primary-100);
}
```

### Cards

#### Card Base
```css
.card {
  background: var(--bg-elevated);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid var(--neutral-200);
}

.card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-300);
}
```

#### Turno Card (Asimétrico)
```css
.turno-card {
  background: var(--bg-elevated);
  border-radius: 20px 8px 20px 8px; /* Asimétrico distintivo */
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  border-left: 4px solid var(--primary-500);
  position: relative;
  overflow: hidden;
}

.turno-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, var(--primary-100) 0%, transparent 70%);
  opacity: 0.5;
  animation: float 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-10px, 10px); }
}
```

### Forms

#### Input
```css
.input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-primary);
  border: 2px solid var(--neutral-300);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--neutral-900);
  transition: all 0.25s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-100);
  background: white;
}

.input::placeholder {
  color: var(--neutral-500);
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-confirmed {
  background: #E8F5E9;
  color: #2E7D32;
  border: 1px solid #81C784;
}

.badge-pending {
  background: #FFF8E1;
  color: #F57C00;
  border: 1px solid #FFD54F;
}

.badge-cancelled {
  background: #FFEBEE;
  color: #C62828;
  border: 1px solid #E57373;
}

.badge-realtime {
  background: var(--realtime);
  color: white;
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 8px rgba(239, 71, 111, 0.4); }
  50% { box-shadow: 0 0 16px rgba(239, 71, 111, 0.8); }
}
```

---

## 🎬 Animaciones y Micro-interacciones

### Principios de Movimiento

1. **Propósito:** Cada animación comunica estado o guía atención
2. **Duración:** 200-400ms para interacciones, 600-1000ms para transiciones de página
3. **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` para natural-eza
4. **Reduce Motion:** Respetar `prefers-reduced-motion`

### Timing Functions

```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bounce suave */
--ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Animaciones Clave

#### Fade In Stagger (Para listas de turnos)
```css
@keyframes fadeInStagger {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.turno-card {
  animation: fadeInStagger 0.5s var(--ease-out);
  animation-fill-mode: both;
}

.turno-card:nth-child(1) { animation-delay: 0ms; }
.turno-card:nth-child(2) { animation-delay: 80ms; }
.turno-card:nth-child(3) { animation-delay: 160ms; }
/* ... continúa hasta nth-child(10) */
```

#### Morph Transition (Para cambios de estado)
```css
@keyframes morphBorder {
  0% {
    border-radius: 20px 8px 20px 8px;
  }
  50% {
    border-radius: 8px 20px 8px 20px;
  }
  100% {
    border-radius: 20px 8px 20px 8px;
  }
}

.turno-card.updating {
  animation: morphBorder 1s var(--ease-spring);
}
```

#### Ripple Effect (Para botones)
```css
.btn-primary::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-primary:active::after {
  width: 300px;
  height: 300px;
  opacity: 0;
}
```

#### Real-time Indicator
```css
@keyframes realTimePulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.real-time-badge {
  animation: realTimePulse 2s ease-in-out infinite;
}
```

#### Chat Message Enter
```css
@keyframes messageSlide {
  from {
    opacity: 0;
    transform: translateX(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.message {
  animation: messageSlide 0.3s var(--ease-out);
}
```

### Hover States

```css
/* Card Lift */
.interactive-card {
  transition: transform 0.3s var(--ease-spring),
              box-shadow 0.3s var(--ease-out);
}

.interactive-card:hover {
  transform: translateY(-6px) rotate(0.5deg);
  box-shadow: var(--shadow-xl);
}

/* Button Scale */
.btn:active {
  transform: scale(0.97);
  transition-duration: 0.1s;
}
```

---

## 🎯 Iconografía

### Sistema de Iconos

**Estilo:** Outlined con 1.5px stroke, esquinas redondeadas
**Tamaños:** 16px, 20px, 24px, 32px
**Familia:** Phosphor Icons o Lucide (consistente, moderno, no sobrecargado)

#### Mapeo de contexto
- 👤 Paciente → `User` icon
- 👨‍⚕️ Doctor → `Stethoscope` icon
- 📅 Fecha → `Calendar` icon
- 🕐 Hora → `Clock` icon
- 💬 Chat → `MessageCircle` icon
- 🟢 Online → `Circle` filled
- 📋 Turnos → `ClipboardList` icon

**Rationale:** Reemplazar emojis con íconos SVG consistentes para look profesional

---

## 📱 Responsive Design

### Breakpoints

```css
--breakpoint-sm: 640px;   /* Mobile large */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Desktop large */
--breakpoint-2xl: 1536px; /* Wide screens */
```

### Mobile-First Approach

**Principios:**
- Touch targets ≥44px
- Espaciado generoso en móvil
- Navegación thumb-friendly
- Grids stack verticalmente sub-768px

```css
/* Mobile first */
.turnos-grid {
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

/* Tablet */
@media (min-width: 768px) {
  .turnos-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .turnos-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: var(--space-8);
  }
}
```

---

## ♿ Accesibilidad

### Checklist

- ✅ **Contraste:** WCAG AA+ (≥4.5:1 para texto, ≥3:1 para UI)
- ✅ **Focus:** Indicadores visibles con `outline` o `box-shadow`
- ✅ **Navegación por teclado:** Tab order lógico
- ✅ **Aria labels:** En acciones no obvias
- ✅ **Reduce motion:** `@media (prefers-reduced-motion)`
- ✅ **Semántica:** HTML apropiado (button, nav, main, etc.)

### Implementación

```css
/* Focus states */
*:focus-visible {
  outline: 3px solid var(--primary-500);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🎨 Patrones de Layout

### Asymmetric Grid (Romper monotonía)

```css
.featured-layout {
  display: grid;
  grid-template-columns: 1.618fr 1fr; /* Golden ratio */
  gap: var(--space-8);
}

.staggered-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: auto;
  gap: var(--space-6);
}

.staggered-grid > *:nth-child(3n+1) {
  grid-row: span 1;
}

.staggered-grid > *:nth-child(3n+2) {
  grid-row: span 2;
}
```

### Layered Design

```css
.layered-panel {
  position: relative;
  z-index: 1;
}

.layered-panel::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 8px;
  right: -8px;
  bottom: -8px;
  background: var(--primary-100);
  border-radius: inherit;
  z-index: -1;
  opacity: 0.5;
}
```

---

## 🚀 Performance

- **Lazy load:** Imágenes y componentes pesados
- **CSS variables:** Temas dinámicos sin re-render
- **Will-change:** Solo en animaciones activas
- **Transform/opacity:** Preferir para animaciones (GPU-accelerated)
- **Debounce:** Búsquedas y filtros
- **Virtual scrolling:** Listas largas de turnos

---

## 📚 Ejemplo de Uso

```tsx
// Botón primario con ripple
<button className="btn-primary" aria-label="Confirmar turno">
  Confirmar Turno
</button>

// Card de turno
<div className="turno-card" data-status="confirmed">
  <div className="turno-header">
    <span className="badge badge-confirmed">Confirmado</span>
    <span className="turno-id">#1234</span>
  </div>
  {/* contenido */}
</div>

// Input con estado de focus
<input 
  className="input" 
  type="text" 
  placeholder="Buscar paciente..."
  aria-label="Buscar paciente"
/>
```

---

## 🎯 Implementación Priorizada

### Fase 1: Fundamentos (Crítico)
1. Variables CSS globales
2. Reset y tipografía base
3. Sistema de colores

### Fase 2: Componentes Core (Alta)
1. Botones (todos los estados)
2. Cards y badges
3. Forms de inputs

### Fase 3: Componentes Específicos (Media)
1. Turno cards rediseñadas
2. Chat UI
3. Navegación y tabs

### Fase 4: Polish (Baja)
1. Animaciones avanzadas
2. Easter eggs de interacción
3. Dark mode (opcional)

---

**Última actualización:** Marzo 2026
**Mantenedor:** Equipo de Diseño
**Versión:** 1.0.0
