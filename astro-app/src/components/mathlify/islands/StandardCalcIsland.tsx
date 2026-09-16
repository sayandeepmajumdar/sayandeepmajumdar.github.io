import React, { useState, useEffect, useCallback } from 'react';

const BUTTONS = [
  { label: 'C',   cls: 'calc-btn--clear', action: 'clear'   },
  { label: '±',   cls: 'calc-btn--op',    action: 'negate'  },
  { label: '%',   cls: 'calc-btn--op',    action: 'percent' },
  { label: '÷',   cls: 'calc-btn--op',    action: 'op', val: '/' },

  { label: '7',   cls: '', action: 'digit', val: '7' },
  { label: '8',   cls: '', action: 'digit', val: '8' },
  { label: '9',   cls: '', action: 'digit', val: '9' },
  { label: '×',   cls: 'calc-btn--op',    action: 'op', val: '*' },

  { label: '4',   cls: '', action: 'digit', val: '4' },
  { label: '5',   cls: '', action: 'digit', val: '5' },
  { label: '6',   cls: '', action: 'digit', val: '6' },
  { label: '−',   cls: 'calc-btn--op',    action: 'op', val: '-' },

  { label: '1',   cls: '', action: 'digit', val: '1' },
  { label: '2',   cls: '', action: 'digit', val: '2' },
  { label: '3',   cls: '', action: 'digit', val: '3' },
  { label: '+',   cls: 'calc-btn--op',    action: 'op', val: '+' },

  { label: '0',   cls: 'calc-btn--wide', action: 'digit', val: '0' },
  { label: '.',   cls: '', action: 'dot' },
  { label: '=',   cls: 'calc-btn--eq',   action: 'equals' },
];

export default function StandardCalcIsland() {
  const [display, setDisplay] = useState('0');
  const [expr, setExpr] = useState('');
  const [operator, setOperator] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);
  const [shouldReset, setShouldReset] = useState(false);

  const calculate = useCallback((expression: string) => {
    try {
      if (!/^[\d+\-*/().\s]+$/.test(expression)) return 'Error';
      // Safe evaluation of sanitized math string
      const result = Function('"use strict"; return (' + expression + ')')();
      if (!isFinite(result)) return 'Error';
      return String(+result.toPrecision(12));
    } catch {
      return 'Error';
    }
  }, []);

  const handleAction = useCallback((action: string, val?: string) => {
    if (action === 'digit' && val !== undefined) {
      if (shouldReset) {
        setDisplay(val === '0' ? '0' : val);
        setShouldReset(false);
      } else {
        setDisplay(prevDisp => (prevDisp === '0' && val !== '.' ? val : prevDisp + val));
      }
    } else if (action === 'dot') {
      if (shouldReset) {
        setDisplay('0.');
        setShouldReset(false);
      } else if (!display.includes('.')) {
        setDisplay(prevDisp => prevDisp + '.');
      }
    } else if (action === 'op' && val !== undefined) {
      if (operator && !shouldReset && prev !== null) {
        const fullExpr = `${prev}${operator}${display}`;
        const res = calculate(fullExpr);
        setDisplay(res);
        setPrev(res);
      } else {
        setPrev(display);
      }
      setOperator(val);
      const symbol = val === '*' ? '×' : val === '/' ? '÷' : val;
      setExpr(`${prev !== null && operator && !shouldReset ? calculate(`${prev}${operator}${display}`) : display} ${symbol}`);
      setShouldReset(true);
    } else if (action === 'equals') {
      if (!operator || prev === null) return;
      const fullExpr = `${prev}${operator}${display}`;
      const symbol = operator === '*' ? '×' : operator === '/' ? '÷' : operator;
      setExpr(`${prev} ${symbol} ${display} =`);
      const res = calculate(fullExpr);
      setDisplay(res);
      setOperator(null);
      setPrev(null);
      setShouldReset(true);
    } else if (action === 'clear') {
      setDisplay('0');
      setExpr('');
      setOperator(null);
      setPrev(null);
      setShouldReset(false);
    } else if (action === 'negate') {
      if (display !== '0' && display !== 'Error') {
        setDisplay(prevDisp => String(-Number(prevDisp)));
      }
    } else if (action === 'percent') {
      if (display !== 'Error') {
        setDisplay(prevDisp => String(Number(prevDisp) / 100));
      }
    }
  }, [display, expr, operator, prev, shouldReset, calculate]);

  // Keyboard navigation
  useEffect(() => {
    const keyMap: Record<string, { action: string; val?: string }> = {
      '0': { action: 'digit', val: '0' },
      '1': { action: 'digit', val: '1' },
      '2': { action: 'digit', val: '2' },
      '3': { action: 'digit', val: '3' },
      '4': { action: 'digit', val: '4' },
      '5': { action: 'digit', val: '5' },
      '6': { action: 'digit', val: '6' },
      '7': { action: 'digit', val: '7' },
      '8': { action: 'digit', val: '8' },
      '9': { action: 'digit', val: '9' },
      '+': { action: 'op', val: '+' },
      '-': { action: 'op', val: '-' },
      '*': { action: 'op', val: '*' },
      '/': { action: 'op', val: '/' },
      'Enter': { action: 'equals' },
      '=': { action: 'equals' },
      'Escape': { action: 'clear' },
      '.': { action: 'dot' },
      '%': { action: 'percent' }
    };

    function onKeydown(e: KeyboardEvent) {
      const active = document.activeElement;
      if (active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA') return;

      const mapped = keyMap[e.key];
      if (mapped) {
        e.preventDefault();
        handleAction(mapped.action, mapped.val);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        if (display.length > 1 && !shouldReset) {
          setDisplay(prev => prev.slice(0, -1));
        } else {
          setDisplay('0');
        }
      }
    }

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [handleAction, display, shouldReset]);

  return (
    <div className="std-calc" id="std-calc">
      <div className="std-calc__display">
        <div className="std-calc__expr" id="std-expr">{expr}</div>
        <div
          className="std-calc__value"
          id="std-display"
          style={{
            fontSize: display.length > 10 ? '1.4rem' : display.length > 7 ? '1.7rem' : ''
          }}
        >
          {display}
        </div>
      </div>
      <div className="std-calc__grid" id="std-grid" role="group" aria-label="Calculator buttons">
        {BUTTONS.map((b, idx) => (
          <button
            key={idx}
            type="button"
            className={`calc-btn ${b.cls}`}
            onClick={() => handleAction(b.action, b.val)}
            aria-label={b.label}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
