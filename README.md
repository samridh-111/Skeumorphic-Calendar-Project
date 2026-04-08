# Hanging Calendar - Pendulum Physics Component

A React/Next.js wall calendar component with realistic pendulum swing physics using Framer Motion.

## Features

- **Pendulum Physics**: Entire calendar swings from top-center transform origin like a real hanging calendar
- **Initial Load Animation**: Gentle settling swing when page loads (0° → 6° → -5° → 3° → -2° → 0°)
- **Persistent Idle Sway**: Extremely subtle continuous motion (~1° amplitude, 5.5s loop)
- **Directional Click Response**: 
  - Left side clicks → swing left first
  - Right side clicks → swing right first
- **Force-Based Momentum**: Lower clicks create stronger swings
- **Spring Damping**: Natural deceleration with spring-like easing
- **Responsive Design**: Desktop and mobile views with seamless transitions
- **Skeumorphic Design**: Paper textures, spiral binding, wall hook visual

## Installation

```bash
npm install
# or
yarn install
```

## Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the calendar.

## Component Structure

```
HangingCalendar/
├── Fixed Wall Hook (visual only)
└── motion.div (animated shell)
    ├── Desktop View (>768px)
    │   ├── Spiral Binding
    │   ├── Hero Image
    │   ├── Notes Panel
    │   └── Calendar Grid
    └── Mobile View (<768px)
        ├── Spiral Binding
        ├── Hero Image
        ├── Calendar Header
        ├── Calendar Grid
        └── Notes Section
```

## Physics Parameters

| Parameter | Value | Purpose |
|-----------|-------|---------|
| Transform Origin | `top center` | Pivot point for pendulum |
| Max Rotation | 5-8° | Realistic amplitude |
| Initial Swing Duration | 2.5s | Load animation time |
| Idle Sway Duration | 5.5s loop | Persistent motion |
| Click Force Base | 3° | Minimum swing |
| Click Force Multiplier | 2x vertical position | Bottom = stronger |

## Customization

### Adjust Swing Strength

In `components/HangingCalendar.jsx`:

```javascript
// Line ~46
const baseForce = 3;  // Increase for stronger swings
const verticalMultiplier = (clickY / height) * 2;  // Increase multiplier
```

### Change Idle Sway

```javascript
// Line ~33
rotate: [0, 1, -1, 0],  // Adjust amplitude
transition: {
  duration: 5.5,  // Adjust speed
  ...
}
```

### Modify Initial Load Animation

```javascript
// Line ~16
rotate: [0, 6, -5, 3, -2, 0],  // Customize swing sequence
transition: {
  duration: 2.5,  // Adjust timing
  ...
}
```

## Tech Stack

- **React** 18.2+
- **Next.js** 14+
- **Framer Motion** 10.16+ (spring animations)
- **Tailwind CSS** 3.3+
- **Google Fonts** (Newsreader serif)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- Uses CSS transforms (GPU accelerated)
- Motion controlled via Framer Motion's optimized animation engine
- Responsive images with proper aspect ratios
- No layout shifts during animations

## License

MIT
