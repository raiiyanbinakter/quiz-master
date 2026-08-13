import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string | null | undefined;
  className?: string;
}

declare global {
  interface Window {
    renderMathInElement?: (element: HTMLElement, options: any) => void;
  }
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const str = text || '';
    const element = containerRef.current;
    element.textContent = str;
    
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(element, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
          ],
          throwOnError: false,
        });
        return;
      } catch (err) {
        console.error('KaTeX render error:', err);
      }
    }

    // Direct KaTeX rendering fallback
    try {
      const parts = str.split(/(\$\$.*?\$\$|\$.*?\$)/g);
      element.innerHTML = parts
        .map((part) => {
          if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
            const math = part.slice(2, -2);
            return katex.renderToString(math, { displayMode: true, throwOnError: false });
          } else if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
            const math = part.slice(1, -1);
            return katex.renderToString(math, { displayMode: false, throwOnError: false });
          }
          return escapeHtml(part);
        })
        .join('');
    } catch (e) {
      element.textContent = str;
    }
  }, [text]);

  return <span ref={containerRef} className={className} />;
};

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
