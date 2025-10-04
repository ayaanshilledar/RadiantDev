import * as React from "react"
import { animate, useMotionValue, AnimationPlaybackControls } from 'framer-motion';

function mapRange(
    value: number,
    fromLow: number,
    fromHigh: number,
    toLow: number,
    toHigh: number
): number {
    if (fromLow === fromHigh) {
        return toLow;
    }
    const percentage = (value - fromLow) / (fromHigh - fromLow);
    return toLow + percentage * (toHigh - toLow);
}

const InteractiveDotGrid: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameId = React.useRef<number | null>(null);
  const dotsRef = React.useRef<Array<{
    x: number;
    y: number;
    baseOpacity: number;
    currentOpacity: number;
    opacitySpeed: number;
    baseRadius: number;
    currentRadius: number;
  }>>([]);
  const mousePositionRef = React.useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  // Ethereal shadow animation values
  const hueRotateMotionValue = useMotionValue(180);
  const hueRotateAnimation = React.useRef<AnimationPlaybackControls | null>(null);
  const animationEnabled = true;
  const animationScale = 50;
  const animationSpeed = 70;
  const displacementScale = animationScale ? mapRange(animationScale, 1, 100, 20, 100) : 0;
  const animationDuration = animationSpeed ? mapRange(animationSpeed, 1, 100, 1000, 50) : 1;

  const DOT_SPACING = 25;
  const BASE_OPACITY_MIN = 0.40;
  const BASE_OPACITY_MAX = 0.50;
  const BASE_RADIUS = 1;
  const INTERACTION_RADIUS = 150;
  const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
  const OPACITY_BOOST = 0.6;
  const RADIUS_BOOST = 2.5;

  // Initialize the ethereal animation effect
  React.useEffect(() => {
    if (animationEnabled) {
      if (hueRotateAnimation.current) {
        hueRotateAnimation.current.stop();
      }
      hueRotateMotionValue.set(0);
      hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
        duration: animationDuration / 25,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        ease: "linear",
        delay: 0,
        onUpdate: (value: number) => {
          // This would normally update the SVG filter, but we're using it to influence dot colors
        }
      });

      return () => {
        if (hueRotateAnimation.current) {
          hueRotateAnimation.current.stop();
        }
      };
    }
  }, [animationEnabled, animationDuration, hueRotateMotionValue]);

  const handleMouseMove = React.useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      mousePositionRef.current = { x: null, y: null };
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;
    mousePositionRef.current = { x: canvasX, y: canvasY };
  }, []);

  const createDots = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) return;

    const newDots: typeof dotsRef.current = [];
    const cols = Math.ceil(width / DOT_SPACING);
    const rows = Math.ceil(height / DOT_SPACING);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * DOT_SPACING + DOT_SPACING / 2;
        const y = j * DOT_SPACING + DOT_SPACING / 2;
        const baseOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
        newDots.push({
          x,
          y,
          baseOpacity,
          currentOpacity: baseOpacity,
          opacitySpeed: (Math.random() * 0.005) + 0.002,
          baseRadius: BASE_RADIUS,
          currentRadius: BASE_RADIUS,
        });
      }
    }
    dotsRef.current = newDots;
  }, [DOT_SPACING, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS]);

  const handleResize = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    const width = container ? container.clientWidth : window.innerWidth;
    const height = container ? container.clientHeight : window.innerHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      createDots();
    }
  }, [createDots]);

  const animateDots = React.useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const dots = dotsRef.current;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;
    const hueValue = hueRotateMotionValue.get();

    if (!ctx || !dots || !canvas) {
      animationFrameId.current = requestAnimationFrame(animateDots);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach((dot) => {
      dot.currentOpacity += dot.opacitySpeed;
      if (dot.currentOpacity >= BASE_OPACITY_MAX || dot.currentOpacity <= BASE_OPACITY_MIN) {
        dot.opacitySpeed = -dot.opacitySpeed;
        dot.currentOpacity = Math.max(BASE_OPACITY_MIN, Math.min(dot.currentOpacity, BASE_OPACITY_MAX));
      }

      let interactionFactor = 0;
      dot.currentRadius = dot.baseRadius;

      if (mouseX !== null && mouseY !== null) {
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const distSq = dx * dx + dy * dy;

        if (distSq < INTERACTION_RADIUS_SQ) {
          const distance = Math.sqrt(distSq);
          interactionFactor = Math.max(0, 1 - distance / INTERACTION_RADIUS);
          interactionFactor = interactionFactor * interactionFactor;
        }
      }

      const finalOpacity = Math.min(1, dot.currentOpacity + interactionFactor * OPACITY_BOOST);
      dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST;

      // Use the ethereal animation to influence dot color
      const hue = (hueValue / 360) * 255;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${hue}, ${128 + (hue/2)}, ${255-hue}, ${finalOpacity.toFixed(3)})`;
      ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(animateDots);
  }, [INTERACTION_RADIUS, INTERACTION_RADIUS_SQ, OPACITY_BOOST, RADIUS_BOOST, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS, hueRotateMotionValue]);

  React.useEffect(() => {
    handleResize();
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    animationFrameId.current = requestAnimationFrame(animateDots);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (hueRotateAnimation.current) {
        hueRotateAnimation.current.stop();
      }
    };
  }, [handleResize, handleMouseMove, animateDots]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />;
};

export { InteractiveDotGrid }