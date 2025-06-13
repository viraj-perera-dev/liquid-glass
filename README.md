# Liquid Glass Card Component

A stunning React component that brings Apple's WWDC 2025-inspired liquid glass transparency effects to your applications. This component combines dynamic SVG-based liquid animations with sophisticated glassmorphism aesthetics for a truly modern user interface.

## Quick Start

Install the package via npm:

```bash
npm install @developer-hub/liquid-glass
```

Import and use the component in your React application:

```jsx
import GlassCard from '@developer-hub/liquid-glass'

function App() {
  return (
    <GlassCard>
      <div className="p-6">
        <h2>Welcome to Liquid Glass</h2>
        <p>Experience the future of UI design with smooth, organic animations.</p>
      </div>
    </GlassCard>
  )
}
```

## Examples

### Interactive Button with Custom Styling

```jsx
<GlassCard
  displacementScale={100}
  blurAmount={0.01}
  cornerRadius={10}
  padding="8px 16px"
  onClick={() => console.log('Glass button clicked!')}
>
  <span className="text-white font-medium">Get Started</span>
</GlassCard>
```

### Card with Shadow Mode for Light Backgrounds

```jsx
<GlassCard
  shadowMode={true}
  cornerRadius={16}
  className="max-w-md mx-auto"
>
  <div className="p-8">
    <h3 className="text-xl font-bold mb-4">Premium Features</h3>
    <p className="text-gray-600">Enhanced visual effects optimized for light themes.</p>
  </div>
</GlassCard>
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content rendered within the glass container |
| `displacementScale` | `number` | `100` | Intensity of the liquid displacement effect (0-200) |
| `blurAmount` | `number` | `0.01` | Blur intensity for the glass effect (0-1) |
| `cornerRadius` | `number` | `999` | Border radius in pixels |
| `className` | `string` | `""` | Additional CSS classes for custom styling |
| `padding` | `string` | - | CSS padding value (e.g., "16px", "1rem") |
| `style` | `React.CSSProperties` | - | Inline styles object |
| `shadowMode` | `boolean` | `false` | Optimizes appearance for light backgrounds |
| `onClick` | `() => void` | - | Click event handler |

## Key Features

**🎨 Premium Design Language** - Faithfully recreates Apple's WWDC 2025 glassmorphism aesthetic with pixel-perfect attention to detail

**🌊 Organic Liquid Animations** - SVG-powered blob animations that create mesmerizing, fluid visual effects

**🖱️ Mouse-Responsive Interactions** - Dynamic animations that respond naturally to user cursor movement

**📱 Cross-Device Compatibility** - Seamlessly adapts to desktop, tablet, and mobile screen sizes

**🌙 Intelligent Theme Support** - Automatically adjusts to dark and light themes with sophisticated color management

**♿ Accessibility First** - Respects `prefers-reduced-motion` and includes proper ARIA support

**🎯 Developer Experience** - TypeScript definitions and comprehensive documentation (TypeScript support coming soon)

**⚡ Performance Optimized** - Minimal bundle impact with efficient rendering and GPU acceleration

## Customization

The component provides multiple layers of customization:

### Built-in Styling
The component automatically handles:
- Advanced backdrop blur filters with fallbacks
- Smooth CSS transitions and GPU-accelerated animations  
- Responsive breakpoint adaptations
- System theme detection and adaptation
- High contrast mode compatibility
- Reduced motion accessibility compliance

### Custom Styling Options
1. **Props-based customization** - Use the provided props for common adjustments
2. **CSS class extension** - Add custom classes via the `className` prop
3. **CSS custom properties** - Override internal CSS variables for deep customization

### Example CSS Override
```css
.my-custom-glass {
  --glass-opacity: 0.15;
  --glass-blur: 20px;
  --animation-duration: 3s;
}
```

## Technical Requirements

### Browser Compatibility
- **Chrome/Edge**: Version 76 and above
- **Firefox**: Version 72 and above  
- **Safari**: Version 13 and above

**Note**: The component requires `backdrop-filter` support for optimal glass effects. Older browsers receive a graceful fallback with standard transparency effects.

### Performance Considerations
- Uses hardware acceleration when available
- Optimized SVG rendering for smooth 60fps animations
- Minimal reflow impact through transform-based animations
- Efficient event handling with debounced mouse tracking

## Contributing

We welcome contributions from the community! Whether it's bug reports, feature requests, or code contributions, please feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description

Please ensure your code follows our style guidelines and includes appropriate tests.

## License

MIT License © developer-hub

For detailed license information, see the [LICENSE file](https://github.com/viraj-perera-dev/liquid-glass/blob/main/LICENSE) in the repository.

---

**Questions or Issues?** Check out our [GitHub Issues](https://github.com/viraj-perera-dev/liquid-glass/issues).
**Test Forking
