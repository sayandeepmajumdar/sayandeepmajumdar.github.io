import React, { useState } from 'react';
import { StatePath, Destination } from '../types';

interface StatePinProps {
  state: StatePath;
  destinations: Destination[];
  onClick: (state: StatePath) => void;
  onSelectDestination?: (destination: Destination) => void;
  scale?: number;
}

export const StatePin: React.FC<StatePinProps> = ({
  state,
  destinations,
  onClick,
  onSelectDestination,
  scale = 1,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Counteract map zoom so pin stays crisp and readable
  const inverseScale = 1 / Math.max(scale * 0.75, 0.85);
  const { x, y } = state.center;

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (destinations.length > 0 && onSelectDestination) {
      onSelectDestination(destinations[0]);
    } else {
      onClick(state);
    }
  };

  // Calculate dynamic pill width to perfectly frame the state name
  const pillWidth = Math.max(96, state.name.length * 6.8 + 28);
  const pillX = -pillWidth / 2;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${inverseScale})`}
      className="cursor-pointer select-none"
      onClick={handleAction}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ground Shadow */}
      <ellipse
        cx="0"
        cy="2"
        rx="7"
        ry="3"
        fill="rgba(0, 0, 0, 0.55)"
      />

      {/* Pulsing Beacon Waves */}
      <circle
        r="14"
        fill="#f59e0b"
        fillOpacity="0.3"
        className="animate-ping origin-center"
      />
      <circle
        r="22"
        fill="#ea580c"
        fillOpacity="0.15"
        className="animate-pulse origin-center"
      />

      {/* Classic Teardrop Location Pin Path (Tip at 0,0, bulb center at 0,-16) */}
      <path
        d="M 0,0 C -3,-4 -8,-10 -8,-16 A 8,8 0 1,1 8,-16 C 8,-10 3,-4 0,0 Z"
        fill="url(#statePinGradient)"
        stroke="#ffffff"
        strokeWidth="1.6"
        filter="drop-shadow(0 3px 6px rgba(0,0,0,0.6))"
        className="transition-transform duration-200 hover:scale-110 origin-bottom"
      />

      {/* Inner Pin Head Emblem */}
      <circle
        cx="0"
        cy="-16"
        r="3.5"
        fill="#ffffff"
      />
      <circle
        cx="0"
        cy="-16"
        r="1.8"
        fill="#ea580c"
      />

      {/* Compact On-Map Callout Pill (Anchored neatly above the pin) */}
      <g
        transform="translate(0, -25)"
        className="transition-all duration-200 hover:scale-105 origin-bottom"
      >
        {/* Tiny pointer triangle down to pin head */}
        <polygon
          points="-3,0 3,0 0,3"
          fill="#0b0f19"
          stroke="#f59e0b"
          strokeWidth="0.8"
        />

        {/* Dynamic Compact Pill Box (Height: 20px) */}
        <rect
          x={pillX}
          y="-20"
          width={pillWidth}
          height="20"
          rx="10"
          fill="#0b0f19"
          stroke="#f59e0b"
          strokeWidth="1.2"
          filter="drop-shadow(0 4px 10px rgba(0,0,0,0.75))"
        />

        {/* State Name */}
        <text
          x="0"
          y="-7"
          fill="#ffffff"
          fontSize="9"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="Outfit, Inter, sans-serif"
          letterSpacing="0.2"
        >
          📍 {state.name}
        </text>
      </g>
    </g>
  );
};
