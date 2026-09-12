import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface FlightPathProps {
  origin: { x: number; y: number };
  destination: { x: number; y: number };
  onArrival?: () => void;
  duration?: number; // in seconds, default 1.8
}

export const FlightPath: React.FC<FlightPathProps> = ({
  origin,
  destination,
  onArrival,
  duration = 1.8,
}) => {
  const groupRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const shadowRef = useRef<SVGGElement>(null);
  const contrailRef = useRef<SVGGElement>(null);
  const onArrivalRef = useRef(onArrival);
  onArrivalRef.current = onArrival;

  // Safe distance calculation
  const dx = destination.x - origin.x;
  const dy = destination.y - origin.y;
  const distance = Math.hypot(dx, dy) || 1;

  // Normal vector perpendicular to flight line
  const nx = -dy / distance;
  const ny = dx / distance;

  // Arc curvature offset: elegant bow upwards
  const curveMagnitude = Math.min(Math.max(distance * 0.28, 25), 80);
  const arcSign = dx > 0 ? -1 : 1;

  const controlPoint = {
    x: (origin.x + destination.x) / 2 + nx * curveMagnitude * arcSign,
    y: Math.max(15, (origin.y + destination.y) / 2 + ny * curveMagnitude * arcSign - 20),
  };

  const pathString = `M ${origin.x} ${origin.y} Q ${controlPoint.x} ${controlPoint.y} ${destination.x} ${destination.y}`;

  // Hardware-accelerated direct DOM animation via requestAnimationFrame
  // Avoids React re-renders on every frame, giving silky smooth 60/120fps motion
  useEffect(() => {
    let animId: number;
    const startTime = performance.now();
    const durationMs = duration * 1000;
    let arrivalFired = false;

    // Initialize plane position immediately at origin
    if (planeRef.current) {
      planeRef.current.setAttribute('transform', `translate(${origin.x}, ${origin.y}) rotate(0)`);
      planeRef.current.style.opacity = '1';
    }

    const tick = (now: number) => {
      const pathEl = pathRef.current;
      if (!pathEl) {
        animId = requestAnimationFrame(tick);
        return;
      }

      const totalLength = pathEl.getTotalLength();
      if (totalLength <= 0) {
        animId = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - startTime;
      const p = Math.min(elapsed / durationMs, 1);

      // Smooth ease-in-out curve
      const eased =
        p < 0.5
          ? 4 * p * p * p
          : 1 - Math.pow(-2 * p + 2, 3) / 2;

      const currentDist = Math.max(0.1, Math.min(eased * totalLength, totalLength));
      const pt = pathEl.getPointAtLength(currentDist);

      // Sample ahead and behind for stable heading angle
      const sampleAhead = Math.min(currentDist + 2, totalLength);
      const sampleBehind = Math.max(currentDist - 2, 0);
      const ptAhead = pathEl.getPointAtLength(sampleAhead);
      const ptBehind = pathEl.getPointAtLength(sampleBehind);
      const angle =
        (Math.atan2(ptAhead.y - ptBehind.y, ptAhead.x - ptBehind.x) * 180) / Math.PI || 0;

      // 3D Altitude curve
      const altitude = Math.sin(eased * Math.PI) * 10;

      // Direct DOM update for Airplane
      if (planeRef.current) {
        planeRef.current.setAttribute(
          'transform',
          `translate(${pt.x}, ${pt.y - altitude * 0.4}) rotate(${angle})`
        );
      }

      // Direct DOM update for Altitude Shadow
      if (shadowRef.current) {
        shadowRef.current.setAttribute(
          'transform',
          `translate(${pt.x}, ${pt.y + altitude}) rotate(${angle})`
        );
        shadowRef.current.style.opacity = String(0.2 + altitude * 0.03);
      }

      // Show engine contrails mid-flight
      if (contrailRef.current) {
        contrailRef.current.style.opacity = eased > 0.08 && eased < 0.94 ? '0.85' : '0';
      }

      if (p < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        if (!arrivalFired) {
          arrivalFired = true;
          onArrivalRef.current?.();

          // Smoothly fade out flight route & plane after touchdown
          if (groupRef.current) {
            groupRef.current.style.transition = 'opacity 0.6s ease-out';
            groupRef.current.style.opacity = '0';
          }
        }
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [origin.x, origin.y, destination.x, destination.y, duration, pathString]);

  return (
    <g ref={groupRef} className="flight-path-group pointer-events-none">
      <defs>
        <linearGradient id="flightLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#f97316" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="1" />
        </linearGradient>

        <filter id="flightGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hidden reference path used for precise getPointAtLength geometry */}
      <path ref={pathRef} d={pathString} fill="none" stroke="none" opacity="0" />

      {/* Subtle dashed route guide line */}
      <path
        d={pathString}
        fill="none"
        stroke="rgba(249, 115, 22, 0.2)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* Animated glowing laser flight path (Framer Motion pathLength) */}
      <motion.path
        d={pathString}
        fill="none"
        stroke="url(#flightLineGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#flightGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* Ground Altitude Shadow */}
      <g ref={shadowRef} style={{ opacity: 0.2 }}>
        <ellipse cx="0" cy="0" rx="12" ry="4" fill="#000000" filter="blur(2px)" />
      </g>

      {/* High-Fidelity Animated Airplane */}
      <g ref={planeRef} style={{ opacity: 0 }}>
        {/* Pulsing engine glow aura */}
        <circle r="14" fill="rgba(249, 115, 22, 0.25)" className="animate-pulse" />

        {/* Engine Contrails (Jet Smoke Lines) */}
        <g ref={contrailRef} style={{ opacity: 0, transition: 'opacity 0.2s' }}>
          <line
            x1="-14"
            y1="-4"
            x2="-28"
            y2="-4"
            stroke="rgba(254, 240, 138, 0.75)"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          <line
            x1="-14"
            y1="4"
            x2="-28"
            y2="4"
            stroke="rgba(254, 240, 138, 0.75)"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          <circle cx="-14" cy="-4" r="2" fill="#fef08a" />
          <circle cx="-14" cy="4" r="2" fill="#fef08a" />
        </g>

        {/* Main Jet Airliner Body (32px length, 28px wingspan) */}
        <path
          d="M 16,0 
             L 3,-2.5 
             L -2,-14 
             L -5,-14 
             L -2,-2.5 
             L -11,-2.5 
             L -14,-7 
             L -16,-7 
             L -14.5,0 
             L -16,7 
             L -14,7 
             L -11,2.5 
             L -2,2.5 
             L -5,14 
             L -2,14 
             L 3,2.5 
             Z"
          fill="#ffffff"
          stroke="#ea580c"
          strokeWidth="1.2"
          filter="drop-shadow(0 3px 6px rgba(0,0,0,0.7))"
        />

        {/* Cockpit Windshield */}
        <ellipse cx="9" cy="0" rx="2.5" ry="1.2" fill="#0284c7" />

        {/* Port & Starboard Wingtip Navigation Lights */}
        <circle cx="-2" cy="-14" r="1.5" fill="#ef4444" />
        <circle cx="-2" cy="14" r="1.5" fill="#22c55e" />
      </g>
    </g>
  );
};
