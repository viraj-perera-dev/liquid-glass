import type { FC, ReactNode } from 'react';
import React from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  blur?: string | number;
  borderColor?: string;
  borderWidth?: string | number;
  style?: React.CSSProperties;
}

export const GlassCard: FC<GlassCardProps> = ({
  children,
  className = '',
  width = '100%',
  height = '100%',
  borderRadius = 16,
  blur = 16,
  borderColor = 'rgba(255, 255, 255, 0.2)',
  borderWidth = 1,
  style: propStyle = {},
  ...props
}) => {
  const svgWidth = typeof width === 'number' ? `${width}px` : width;
  const svgHeight = typeof height === 'number' ? `${height}px` : height;
  const rx = typeof borderRadius === 'number' ? borderRadius : parseFloat(borderRadius.toString());
  const bw = typeof borderWidth === 'number' ? borderWidth : parseFloat(borderWidth.toString());

  return (
    <svg
      className={className}
      width={svgWidth}
      height={svgHeight}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        ...propStyle,
        filter: `blur(${blur})`,
      }}
      {...props}
    >
      <defs>
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
        </linearGradient>
        <mask id="glassMask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" rx={rx} ry={rx} />
        </mask>
      </defs>

      <rect
        x={bw / 2}
        y={bw / 2}
        width={`100%`}
        height={`100%`}
        rx={rx}
        ry={rx}
        fill="url(#glassGradient)"
        stroke={borderColor}
        strokeWidth={bw}
        mask="url(#glassMask)"
      />

        <foreignObject
        x={bw}
        y={bw}
        width={`calc(100% - ${2 * bw}px)`}
        height={`calc(100% - ${2 * bw}px)`}
        >
        {
            React.createElement(
            'div',
            {
                xmlns: 'http://www.w3.org/1999/xhtml',
                style: { width: '100%', height: '100%' }
            },
            children
            )
        }
        </foreignObject>

    </svg>
  );
};
