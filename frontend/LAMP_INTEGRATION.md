# Genie Lamp 3D Background Integration

## What Was Done

Successfully integrated the animated genie lamp as a full-screen 3D background for your React + Vite website.

### Changes Made:

1. **Installed Dependencies:**
   - `three` - Core 3D rendering library
   - `@react-three/fiber` - React renderer for Three.js
   - `@react-three/drei` - Useful helpers for React Three Fiber

2. **Extracted Assets:**
   - Lamp 3D model (FBX format) → `public/models/lamp/lamp.fbx`
   - Textures (4 maps):
     - Albedo/Transparency
     - Normal map
     - Metallic/Smoothness
     - Lighting map

3. **Created Component:**
   - `src/components/3d/LampBackground.jsx` - Full-screen 3D canvas with:
     - Genie lamp model with proper textures
     - Cinematic lighting (ambient, directional, point, and spotlight)
     - Gentle rotation animation
     - Dark purple gradient background
     - Atmospheric fog
     - Non-intrusive (z-index: -1, pointer-events: none)

4. **Integrated into App:**
   - Updated `src/main.jsx` to render `<LampBackground />` behind all content

## How to Run

```bash
cd "c:/Users/Lenovo/Downloads/FinalSix-master (1)/FinalSix-master/frontend"
npm run dev
```

Then open the URL Vite provides (usually `http://localhost:5173`)

## Customization Options

Edit `src/components/3d/LampBackground.jsx` to adjust:

### Animation Speed
```javascript
groupRef.current.rotation.y += delta * 0.15; // Change 0.15 to speed up/slow down
```

### Lamp Position & Scale
```javascript
fbx.scale.set(0.01, 0.01, 0.01); // Make larger: increase values (e.g., 0.02)
fbx.position.set(0, -1, 0); // Move up/down: change Y value
```

### Camera View
```javascript
camera={{ position: [0, 1, 5], fov: 45 }} // Move closer: decrease Z value
```

### Background Gradient
```javascript
background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
// Change these hex colors to your preference
```

### Lighting Intensity
```javascript
<ambientLight intensity={0.4} /> // Global brightness (0-1)
<directionalLight intensity={1.5} /> // Main light strength
<pointLight intensity={1} color="#ffd700" /> // Golden glow strength
<spotLight intensity={2} color="#ffa500" /> // Orange spotlight
```

## Performance Tips

If the animation is slow on lower-end devices:

1. **Reduce shadows:**
```javascript
shadows={false} // in Canvas component
castShadow={false} // in lights
```

2. **Lower texture quality:**
   - Use smaller texture images in `public/models/lamp/`

3. **Simplify lighting:**
   - Remove `<spotLight>` or `<pointLight>`

4. **Add performance mode:**
```javascript
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';

// Inside <Canvas>:
<AdaptiveDpr pixelated />
<AdaptiveEvents />
```

## Troubleshooting

**Lamp doesn't appear:**
- Check browser console for texture loading errors
- Ensure all files exist in `public/models/lamp/`
- Try hard refresh (Ctrl+Shift+R)

**Page content not visible:**
- Ensure your main content has a background or the lamp is positioned/scaled appropriately
- Check that parent containers don't have `z-index` conflicts

**Performance issues:**
- See "Performance Tips" above
- Consider showing lamp only on desktop: add media query check

## File Structure

```
frontend/
├── public/
│   └── models/
│       └── lamp/
│           ├── lamp.fbx
│           ├── lamp_Lampada_AlbedoTransparency.png
│           ├── lamp_Lampada_MetallicSmoothness.png
│           ├── lamp_Lampada_Normal.png
│           └── LampLightingMap.png
├── src/
│   ├── components/
│   │   └── 3d/
│   │       └── LampBackground.jsx  ← New component
│   └── main.jsx  ← Modified
└── package.json  ← Updated dependencies
```

## Next Steps (Optional)

1. **Add interactivity:** Make lamp respond to mouse movement
2. **Particle effects:** Add magical sparkles around the lamp
3. **Smoke animation:** Add genie smoke shader
4. **Mobile optimization:** Hide on small screens for better performance

Enjoy your magical genie lamp background! 🪔✨
