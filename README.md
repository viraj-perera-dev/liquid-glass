# Glass Card Component

A beautiful React component that creates a liquid glass transparency effect inspired by Apple's WWDC 2025 design language. Features dynamic SVG-based liquid animations with glassmorphism aesthetics.

## Installation

```bash
npm install @developer-hub/liquid-glass
```

## Usage

### Basic Usage

```jsx
import GlassCard from '@developer-hub/liquid-glass'

function App() {
  return (
    <GlassCard>
      <div className="p-6">
        <h2>Lorem ipsum dolor</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </GlassCard>
  )
}
```

### Button Example

```jsx
<GlassCard
  displacementScale={100}
  blurAmount={0.01}
  cornerRadius={10}
  padding="8px 16px"
  onClick={() => console.log('clicked!')}
>
  <span className="text-white font-medium">Click Me</span>
</GlassCard>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The content to render inside the glass container |
| `displacementScale` | `number` | `100` | Controls the intensity of the displacement effect |
| `blurAmount` | `number` | `0.01` | Controls the blur level |
| `cornerRadius` | `number` | `999` | Border radius in pixels |
| `className` | `string` | `""` | Additional CSS classes |
| `padding` | `string` | - | CSS padding value |
| `style` | `React.CSSProperties` | - | Additional inline styles |
| `shadowMode` | `boolean` | `false` | Whether the glass is over a light background |
| `onClick` | `() => void` | - | Click handler |

## Features

- 🎨 **Apple WWDC 2025 Inspired**: Modern glassmorphism design
- 🌊 **Dynamic Liquid Animation**: SVG-based organic blob animations
- 🖱️ **Interactive**: Responds to mouse movement when animated
- 📱 **Responsive**: Optimized for all screen sizes
- 🌙 **Dark Mode**: Automatic dark mode support
- ♿ **Accessible**: Respects user's motion preferences
- 🎯 **TypeScript Ready**: Full TypeScript support (coming soon)
- ⚡ **Lightweight**: Minimal bundle size impact

## Styling

The component comes with built-in CSS that handles:
- Glassmorphism effects with backdrop filters
- Smooth animations and transitions
- Responsive behavior
- Dark mode adaptation
- High contrast mode support
- Reduced motion accessibility

You can customize the appearance by:
1. Passing custom props
2. Using the `className` prop for additional styles
3. Overriding CSS custom properties

## Browser Support

- Chrome/Edge 76+
- Firefox 72+
- Safari 13+

Note: Backdrop filter support is required for the glass effect. Graceful degradation is provided for older browsers.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT ©developer-hub](https://github.com/viraj-perera-dev/liquid-glass.git/blob/main/LICENSE)