# UI Components

This directory contains all the UI components used in the RadiantDev application.

## New Components

### Ethereal Shadow
A beautiful animated background component with displacement effects and noise textures.

**Features:**
- Animated displacement effects
- Customizable noise textures
- Adjustable animation speed and scale
- Flexible sizing options

**Usage:**
```tsx
import { EtherealShadow } from "@/components/ui/etheral-shadow";

<EtherealShadow
  color="rgba(128, 128, 128, 1)"
  animation={{ scale: 100, speed: 90 }}
  noise={{ opacity: 1, scale: 1.2 }}
  sizing="fill"
/>
```

### Interactive Dot Grid (Enhanced)
The existing InteractiveDotGrid component has been enhanced with ethereal animation effects that influence the dot colors dynamically.

## Demo Pages

- `/etheral-shadow-demo` - Demonstrates the Ethereal Shadow component
- `/open-source` - Demonstrates the Open Source Hero component

## Dependencies

All required dependencies were already installed in the project:
- framer-motion (for animations)