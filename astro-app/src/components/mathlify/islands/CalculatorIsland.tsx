import React, { useEffect, useRef, useState } from 'react';

interface Props {
  scriptName: string;
  calcName?: string;
}

// Static dynamic import map so Vite bundles all 34 calculators
const calculatorLoaders: Record<string, () => Promise<any>> = {
  'age.js': () => import('../../../scripts/calculators/age.js'),
  'amortization.js': () => import('../../../scripts/calculators/amortization.js'),
  'area.js': () => import('../../../scripts/calculators/area.js'),
  'bigNumber.js': () => import('../../../scripts/calculators/bigNumber.js'),
  'binary.js': () => import('../../../scripts/calculators/binary.js'),
  'bmi.js': () => import('../../../scripts/calculators/bmi.js'),
  'calorie.js': () => import('../../../scripts/calculators/calorie.js'),
  'circle.js': () => import('../../../scripts/calculators/circle.js'),
  'distance.js': () => import('../../../scripts/calculators/distance.js'),
  'exponent.js': () => import('../../../scripts/calculators/exponent.js'),
  'factor.js': () => import('../../../scripts/calculators/factor.js'),
  'gcf.js': () => import('../../../scripts/calculators/gcf.js'),
  'halfLife.js': () => import('../../../scripts/calculators/halfLife.js'),
  'hex.js': () => import('../../../scripts/calculators/hex.js'),
  'lcm.js': () => import('../../../scripts/calculators/lcm.js'),
  'log.js': () => import('../../../scripts/calculators/log.js'),
  'matrix.js': () => import('../../../scripts/calculators/matrix.js'),
  'mortgage.js': () => import('../../../scripts/calculators/mortgage.js'),
  'percentage.js': () => import('../../../scripts/calculators/percentage.js'),
  'percentError.js': () => import('../../../scripts/calculators/percentError.js'),
  'pythagorean.js': () => import('../../../scripts/calculators/pythagorean.js'),
  'quadratic.js': () => import('../../../scripts/calculators/quadratic.js'),
  'random.js': () => import('../../../scripts/calculators/random.js'),
  'ratio.js': () => import('../../../scripts/calculators/ratio.js'),
  'rightTriangle.js': () => import('../../../scripts/calculators/rightTriangle.js'),
  'root.js': () => import('../../../scripts/calculators/root.js'),
  'round.js': () => import('../../../scripts/calculators/round.js'),
  'scientific.js': () => import('../../../scripts/calculators/scientific.js'),
  'scientificNotation.js': () => import('../../../scripts/calculators/scientificNotation.js'),
  'slope.js': () => import('../../../scripts/calculators/slope.js'),
  'surfaceArea.js': () => import('../../../scripts/calculators/surfaceArea.js'),
  'time.js': () => import('../../../scripts/calculators/time.js'),
  'triangle.js': () => import('../../../scripts/calculators/triangle.js'),
  'volume.js': () => import('../../../scripts/calculators/volume.js'),
};

export default function CalculatorIsland({ scriptName, calcName }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loader = calculatorLoaders[scriptName];

    if (!loader || !mountRef.current) {
      console.warn(`[CalculatorIsland] No loader found for script: ${scriptName}`);
      return;
    }

    loader().then(mod => {
      if (!isMounted || !mountRef.current) return;
      // Render the calculator UI
      if (typeof mod.render === 'function') {
        mod.render(mountRef.current);
      }
      // Bind event listeners
      if (typeof mod.bindEvents === 'function') {
        mod.bindEvents(mountRef.current);
      }

      // Check if a result element exists and observe changes for copy button
      const observer = new MutationObserver(() => {
        const resultVal = mountRef.current?.querySelector('.result-box__value, [id$="-result"], [id$="-output"]');
        if (resultVal && resultVal.textContent && resultVal.textContent !== '—' && resultVal.textContent !== 'Please fill all fields') {
          setHasResult(true);
        }
      });

      observer.observe(mountRef.current, { childList: true, subtree: true, characterData: true });

      return () => {
        observer.disconnect();
      };
    }).catch(err => {
      console.error(`[CalculatorIsland] Failed to load ${scriptName}:`, err);
    });

    return () => {
      isMounted = false;
    };
  }, [scriptName]);

  const copyResult = () => {
    if (!mountRef.current) return;
    const resultVal = mountRef.current.querySelector('.result-box__value, [id$="-result"], [id$="-output"]');
    if (resultVal && resultVal.textContent) {
      navigator.clipboard.writeText(resultVal.textContent.trim()).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="calc-island-wrapper" style={{ position: 'relative' }}>
      {hasResult && (
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
          <button
            type="button"
            className="btn btn--sm btn--ghost"
            onClick={copyResult}
            title="Copy calculated result to clipboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              padding: '4px 10px',
              borderRadius: '6px'
            }}
          >
            {copied ? '✓ Copied!' : '📋 Copy Result'}
          </button>
        </div>
      )}
      <div ref={mountRef} id="calc-mount" />
    </div>
  );
}
