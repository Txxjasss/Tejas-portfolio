import React, { useEffect, useRef, useState } from 'react';

export default function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isOverInput, setIsOverInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 1. Detect touch devices and avoid mounting
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    setIsTouch(mediaQuery.matches);

    const listener = (e) => setIsTouch(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // 2. Main positioning and smooth animation loop
  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let frameId;
    const updatePositions = () => {
      // Immediate translation for the inner dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Smooth trailing (lerp) for the outer ring
      const lerpFactor = 0.12;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      frameId = requestAnimationFrame(updatePositions);
    };

    frameId = requestAnimationFrame(updatePositions);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(frameId);
    };
  }, [isTouch, isVisible]);

  // 3. Hover state delegation (using event delegation on document) and clicks
  useEffect(() => {
    if (isTouch) return;

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Detect text inputs/textareas/selects/editables
      const isInputEl = target.closest('input, textarea, select, [contenteditable="true"]');
      setIsOverInput(!!isInputEl);

      // Detect interactive clickable elements
      const interactive = target.closest('a, button, [role="button"], .cursor-pointer, [data-cursor-hover]');
      setIsHovered(!!interactive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTouch]);

  // If mobile/tablet, render nothing
  if (isTouch) return null;

  const showCursor = isVisible && !isOverInput;

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          background-color: #ffffff;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          will-change: transform;
          opacity: 0;
          transition: opacity 0.3s ease, width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
        }

        .cursor-dot.visible {
          opacity: 1;
        }

        .cursor-dot.hovered {
          width: 5px;
          height: 5px;
          background-color: rgba(59, 130, 246, 0.95); /* Electric Blue */
        }

        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 36px;
          height: 36px;
          border: 1.5px solid rgba(59, 130, 246, 0.65); /* Electric Blue */
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
          opacity: 0;
          box-shadow: 0 0 14px rgba(59, 130, 246, 0.3), inset 0 0 8px rgba(59, 130, 246, 0.15);
          transition: opacity 0.3s ease, width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .cursor-ring.visible {
          opacity: 1;
        }

        .cursor-ring.hovered {
          width: 52px;
          height: 52px;
          border-color: rgba(59, 130, 246, 0.85); /* Electric Blue */
          background-color: rgba(59, 130, 246, 0.05);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.45), inset 0 0 12px rgba(59, 130, 246, 0.15);
        }

        .cursor-ring.clicked {
          width: 28px;
          height: 28px;
          border-color: rgba(59, 130, 246, 1);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
        }
      `}</style>
      <div
        ref={dotRef}
        className={`cursor-dot ${showCursor ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${showCursor ? 'visible' : ''} ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
      />
    </>
  );
}

