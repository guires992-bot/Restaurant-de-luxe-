import React, { useEffect, useRef, useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Info, 
  Trophy, 
  Sparkles,
  Gamepad2,
  Eye,
  EyeOff,
  Compass
} from 'lucide-react';
import { soundEngine } from './utils/audio';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // React state for HUD
  const [distance, setDistance] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('skydreams_highscore') || '0', 10);
  });
  const [speedVal, setSpeedVal] = useState<number>(0);
  const [isFallen, setIsFallen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [pureMode, setPureMode] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // References for mutable game loop state
  const gameStateRef = useRef({
    x: 0,
    y: 0,
    z: 0,
    vy: 0,
    trackGap: 0,
    mouseDown: 0,
    trackSx: 3,
    trackSw: 3,
    mouseX: 0,
    trackRows: [] as boolean[][],
    mouseJustPressed: false,
    mouseMode: true,
    keyInput: {} as Record<string, boolean>,
    hasFallenPlayed: false,
    wasAirborne: false,
    isDestroyed: false,
  });

  // Check touch / mobile device
  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Sync high score to localStorage
  useEffect(() => {
    if (distance > highScore) {
      setHighScore(distance);
      localStorage.setItem('skydreams_highscore', String(distance));
    }
  }, [distance, highScore]);

  // Audio mute toggle
  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Restart function
  const resetGame = () => {
    const g = gameStateRef.current;
    g.x = 0;
    g.y = 0;
    g.z = 0;
    g.vy = 0;
    g.trackGap = 0;
    g.trackSx = 3;
    g.trackSw = 3;
    g.trackRows = [];
    g.hasFallenPlayed = false;
    g.wasAirborne = false;
    setIsFallen(false);
    setDistance(0);
    soundEngine.playRestart();
  };

  // Main Canvas & Game Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const g = gameStateRef.current;
    g.isDestroyed = false;

    // Constants from original JS1024 submission
    const cameraInFront = 3; // camera distance
    const F = 0.7;           // focal length

    // Setup initial dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      g.mouseX = canvas.width / 2;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Color helper
    const hsl = (h: number, s: number, l: number, a: number = 1) => {
      ctx.fillStyle = `hsl(${h},${s}%,${l}%,${a})`;
    };

    // 3D projection point to screen
    const P = (px: number, py: number, dz: number): [number, number, number] => [
      canvas.width / 2 +
        (px - g.x + Math.pow(dz - cameraInFront, 2) / 50 * Math.cos((g.z + dz) / 49)) *
        canvas.height *
        F /
        dz,
      canvas.height / 2 - (py - 2 + (dz * dz) / 50) * canvas.height * F / dz,
      canvas.height * F / dz,
    ];

    let lastHudUpdate = 0;

    // Game update loop
    const update = () => {
      if (g.isDestroyed) return;

      // 1. Background sky & stars
      for (let i = 500; i--; ) {
        // sky gradient
        hsl(170 + i / 9 + g.z, 70, 70 - i / 9);
        ctx.fillRect(0, (canvas.height * i) / 500, canvas.width, canvas.height / 250);

        // stars
        hsl(0, 0, 99);
        ctx.fillRect(
          (i * i + (g.z * i) / 99) % canvas.width,
          Math.pow(i, 3.3) % canvas.height,
          (i % 4 * canvas.height) / 500,
          (i % 4 * canvas.height) / 500
        );
      }

      // 2. Track, far to near
      const maxRow = (g.z + 40) | 0;
      for (let r = maxRow; r > g.z; r--) {
        // create new track rows if needed
        for (let i = g.trackRows.length; i <= r; ) {
          // randomize new segment
          if ((g.trackGap < -8 ? 1 : 0) & (Math.random() < Math.min(0.2, i / 1e4) ? 1 : 0)) {
            // sometimes a gap
            g.trackGap = 2 + Math.min(4, i / 400);
          }
          if (Math.random() < 0.1) {
            // new span width 2-4
            g.trackSw = 2 + ((Math.random() * 3) | 0);
            g.trackSx = Math.max(0, Math.min(7 - g.trackSw, g.trackSx - 2 + ((Math.random() * 5) | 0)));
          }
          g.trackGap--;

          // create the row
          const p: boolean[] = [];
          g.trackRows[i++] = p;
          for (let j = 7; j--; ) {
            p[j] = Boolean(
              (i < 35 ? 1 : 0) | // start area
              (Math.random() > 0.9 ? 1 : 0) | // pillar
              ((g.trackGap < 0 ? 1 : 0) &
                (g.trackSx <= j && j < g.trackSx + g.trackSw ? 1 : 0) &
                (Math.random() > Math.min(0.2, g.z / 1e4) ? 1 : 0)) // holes
            );
          }
        }

        // draw the track row
        for (let j = 2; j--; ) {
          for (let i = 7; i--; ) {
            if (g.trackRows[r] && g.trackRows[r][i]) {
              // calculate grid points
              const [ax, ay] = P(i - 3.5, 0, r - g.z);
              const [bx, by] = P(i - 2.5, 0, r - g.z);
              const [ex, ey] = P(i - 3.5, 0, r - g.z + 1);
              const [fx, fy] = P(i - 2.5, 0, r - g.z + 1);

              if (j) {
                // back and sides
                hsl(99 + ((r >> 7) * 70), 60, 30 + ((r + i) & 1) * 9);
                ctx.fillRect(ex, ey, fx - ex, ((40 - r + g.z) / 30) * canvas.height);
              } else {
                // front
                hsl(99 + ((r >> 7) * 70), 60, 9 + ((r + i) & 1) * 5);
                ctx.fillRect(ax, ay, bx - ax, ((40 - r + g.z) / 30) * canvas.height);

                // top
                hsl(99 + ((r >> 7) * 70), 60, 60 + ((r + i) & 1) * 30);
                ctx.beginPath();
                ctx.moveTo(ax, ay);
                ctx.lineTo(bx, by);
                ctx.lineTo(fx, fy);
                ctx.lineTo(ex, ey);
                ctx.closePath();
                ctx.fill();
              }
            }
          }
        }
      }

      // 3. Draw player shadow
      const currentRow = (g.z + cameraInFront) | 0;
      const currentCol = Math.round(g.x + 3);
      const isTileBelow = g.trackRows[currentRow] && g.trackRows[currentRow][currentCol];

      if (g.y >= 0 && isTileBelow) {
        hsl(0, 0, 0, 0.5);
        const [px, py, s] = P(g.x, 0, cameraInFront);
        ctx.beginPath();
        ctx.ellipse(px, py, s / 4, s / 9, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Draw 3D player sphere (layered concentric gradient discs)
      for (let i = 99; i--; ) {
        hsl(g.z / 9 - i / 3, 90, 99 - i * 0.7);
        const [px, py, s] = P(g.x + 0.1 - i / 1e3, g.y + 0.35 - i / 1e3, cameraInFront);
        ctx.beginPath();
        ctx.ellipse(px, py, (i * s) / 300, (i * s) / 300, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Update player physics
      if (g.y > -4) {
        // update horizontal movement
        if (g.mouseMode) {
          g.x += g.mouseX / canvas.width / 2 - 0.25;
        } else {
          // keyboard controls
          if (g.keyInput['d'] || g.keyInput['ArrowRight'] || g.keyInput['D']) {
            g.x += 0.1;
          }
          if (g.keyInput['a'] || g.keyInput['ArrowLeft'] || g.keyInput['A']) {
            g.x -= 0.1;
          }
        }

        // gravity
        g.y += (g.vy -= 0.006);
        if (g.y > 0.05) {
          g.wasAirborne = true;
        }

        // ramp up speed
        const currentSpeed = Math.min(0.5, 0.2 + g.z / 5e3);
        g.z += currentSpeed;

        // check landing on track tile
        if (g.y < 0 && g.y > -0.3 && isTileBelow) {
          if (g.wasAirborne) {
            soundEngine.playLand();
            g.wasAirborne = false;
          }
          if (g.mouseDown > 0) {
            soundEngine.playJump();
          }
          g.y = g.vy = g.mouseDown;
          if ('ontouchstart' in window) {
            g.mouseDown = 0; // touch jump
          }
        }
      } else {
        // Player has fallen into the sky abyss!
        if (!g.hasFallenPlayed) {
          g.hasFallenPlayed = true;
          soundEngine.playFall();
          setIsFallen(true);
        }

        if (g.mouseJustPressed) {
          resetGame();
        }
      }

      g.mouseJustPressed = false;

      // Throttle React state updates to ~15fps so 60fps canvas remains butter smooth
      const now = performance.now();
      if (now - lastHudUpdate > 66) {
        lastHudUpdate = now;
        setDistance(Math.floor(g.z));
        setSpeedVal(Math.round(Math.min(0.5, 0.2 + g.z / 5e3) * 600));
      }
    };

    // Smooth animation loop from Frank Force's enhanced code
    let frameTimeLastMS = 0;
    let frameTimeBufferMS = 0;
    let animId: number;

    const updateAnimation = (frameTimeMS = 0) => {
      if (g.isDestroyed) return;
      animId = requestAnimationFrame(updateAnimation);

      const frameTimeDeltaMS = frameTimeMS - frameTimeLastMS;
      frameTimeLastMS = frameTimeMS;
      frameTimeBufferMS += frameTimeDeltaMS;
      frameTimeBufferMS = Math.min(frameTimeBufferMS, 50);

      let deltaSmooth = 0;
      if (frameTimeBufferMS < 0 && frameTimeBufferMS > -9) {
        deltaSmooth = frameTimeBufferMS;
        frameTimeBufferMS = 0;
      }

      for (; frameTimeBufferMS >= 0; frameTimeBufferMS -= 1000 / 60) {
        update();
      }

      frameTimeBufferMS += deltaSmooth;
    };

    // Mouse listeners
    const handleMouseMove = (e: MouseEvent) => {
      g.mouseX = e.clientX;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        g.mouseDown = 0.1;
        g.mouseJustPressed = true;
        g.mouseMode = true;
        soundEngine.startDreamSynth();
      }
    };

    const handleMouseUp = () => {
      g.mouseDown = 0;
    };

    // Keyboard listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      g.mouseMode = false;
      g.keyInput[e.key] = true;
      soundEngine.startDreamSynth();

      if (e.key === 'r' || e.key === 'R') {
        resetGame();
      }
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        g.mouseDown = 0.1;
        g.mouseJustPressed = true;
      }
      if (e.key === 'Escape') {
        setPureMode(prev => !prev);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      g.keyInput[e.key] = false;
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        g.mouseDown = 0;
      }
    };

    // Touch support for mobile / tablet
    const handleTouchStart = (e: TouchEvent) => {
      soundEngine.startDreamSynth();
      g.mouseMode = true;
      g.mouseDown = 0.1;
      g.mouseJustPressed = true;
      if (e.touches[0]) {
        g.mouseX = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = () => {
      g.mouseDown = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        g.mouseX = e.touches[0].clientX;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    animId = requestAnimationFrame(updateAnimation);

    return () => {
      g.isDestroyed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchmove', handleTouchMove);
      soundEngine.stopDreamSynth();
    };
  }, []);

  // Mobile Jump Trigger
  const handleMobileJumpStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.stopPropagation();
    const g = gameStateRef.current;
    g.mouseDown = 0.1;
    g.mouseJustPressed = true;
    soundEngine.startDreamSynth();
  };

  const handleMobileJumpEnd = (e: React.TouchEvent | React.MouseEvent) => {
    e.stopPropagation();
    const g = gameStateRef.current;
    g.mouseDown = 0;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-black">
      {/* 3D Canvas running identical JS1024 engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block cursor-crosshair touch-none"
      />

      {/* Top Bar Navigation / HUD */}
      {!pureMode && (
        <header className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between pointer-events-none z-20">
          {/* Logo & Distance Score */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shadow-lg flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-[10px] tracking-widest uppercase font-mono text-cyan-400 font-bold">
                  SKYDREAMS
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-arcade text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-300 font-black tracking-wider">
                    {distance}
                  </span>
                  <span className="text-xs text-white/60 font-mono">m</span>
                </div>
              </div>

              {/* High Score Badge */}
              <div className="border-l border-white/10 pl-3 flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-amber-400 flex items-center gap-1 font-bold">
                  <Trophy className="w-3 h-3 text-amber-400" /> BEST
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-white/90">
                  {highScore}m
                </span>
              </div>
            </div>

            {/* Speedometer */}
            <div className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 text-white/80 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>{speedVal} km/h</span>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Pure Mode Toggle */}
            <button
              onClick={() => setPureMode(true)}
              title="Toggle Pure View (ESC to exit)"
              aria-label="Pure View"
              className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all shadow-md active:scale-95"
            >
              <EyeOff className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleMute}
              title={isMuted ? "Activer le son" : "Couper le son"}
              aria-label="Toggle Sound"
              className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all shadow-md active:scale-95"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            {/* Restart Button */}
            <button
              onClick={resetGame}
              title="Recommencer la course (Touche R)"
              aria-label="Restart"
              className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all shadow-md active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={handleToggleFullscreen}
              title="Plein écran"
              aria-label="Fullscreen"
              className="hidden sm:flex p-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all shadow-md active:scale-95"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Info Modal Trigger */}
            <button
              onClick={() => setShowInfo(true)}
              title="Informations & Crédits"
              aria-label="Information"
              className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all shadow-md active:scale-95"
            >
              <Info className="w-4 h-4 text-cyan-300" />
            </button>
          </div>
        </header>
      )}

      {/* Button to restore HUD if in Pure Mode */}
      {pureMode && (
        <button
          onClick={() => setPureMode(false)}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/30 text-white/70 hover:text-white transition-all shadow-lg active:scale-95 flex items-center gap-1.5 text-xs px-3"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Afficher HUD</span>
        </button>
      )}

      {/* Subtle Controls Bar at bottom during gameplay */}
      {!pureMode && !isFallen && (
        <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
          <div className="bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-white/60 text-xs flex items-center gap-4 shadow-lg font-mono">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Souris / [A][D] / [←][→] : Diriger</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5 text-pink-400" />
              <span>Clic / Espace / [W] : Sauter</span>
            </span>
            <span className="text-white/20">•</span>
            <span>[R] : Recommencer</span>
          </div>
        </div>
      )}

      {/* Mobile On-Screen Action Controls */}
      {isMobile && !isFallen && !pureMode && (
        <div className="sm:hidden absolute bottom-6 right-6 z-20 flex flex-col items-center gap-3">
          <button
            onTouchStart={handleMobileJumpStart}
            onTouchEnd={handleMobileJumpEnd}
            onMouseDown={handleMobileJumpStart}
            onMouseUp={handleMobileJumpEnd}
            className="w-20 h-20 rounded-full bg-pink-500/80 active:bg-pink-400 backdrop-blur-md border-2 border-white/40 text-white shadow-2xl flex flex-col items-center justify-center font-bold text-xs uppercase tracking-wider active:scale-95 transition-transform"
          >
            <span>SAUT</span>
            <span className="text-[9px] opacity-75">JUMP</span>
          </button>
        </div>
      )}

      {/* Game Over Modal / Fever Abyss Screen */}
      {isFallen && (
        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="max-w-md w-full bg-gradient-to-b from-[#181824] to-[#0d0d16] border border-white/20 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
            {/* Rainbow Neon Accent Glow */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-pink-500/30 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FEVER DREAM OVER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-white">
              Chute dans le Ciel
            </h2>
            <p className="text-white/60 text-sm mb-6">
              Tu as quitté la piste infinie des nuages. Prêt pour un nouveau rêve ?
            </p>

            {/* Score Summary Box */}
            <div className="grid grid-cols-2 gap-3 mb-6 bg-white/5 rounded-2xl p-4 border border-white/10 font-mono">
              <div className="flex flex-col items-center">
                <span className="text-xs text-white/50 mb-1">DISTANCE</span>
                <span className="font-arcade text-xl sm:text-2xl text-amber-300">
                  {distance}m
                </span>
              </div>
              <div className="flex flex-col items-center border-l border-white/10">
                <span className="text-xs text-white/50 mb-1">MEILLEUR SCORE</span>
                <span className="font-arcade text-xl sm:text-2xl text-cyan-300">
                  {highScore}m
                </span>
              </div>
            </div>

            {distance >= highScore && distance > 0 && (
              <div className="mb-6 py-2 px-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
                <Trophy className="w-4 h-4" /> NOUVEAU RECORD PERSONNEL !
              </div>
            )}

            {/* Retry Button */}
            <button
              onClick={resetGame}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold tracking-wider shadow-lg hover:shadow-cyan-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm uppercase"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Rejouer (Clic ou Espace)</span>
            </button>
            <p className="text-[11px] text-white/40 mt-3 font-mono">
              Tu peux aussi simplement cliquer sur l'écran ou appuyer sur Espace pour relancer.
            </p>
          </div>
        </div>
      )}

      {/* Info / About Modal */}
      {showInfo && (
        <div className="absolute inset-0 z-40 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#12121c] border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌈</span>
                <h3 className="text-xl font-bold">SKYDREAMS</h3>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-white/60 hover:text-white text-sm px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              >
                ✕ Fermer
              </button>
            </div>

            <div className="space-y-4 text-sm text-white/80 leading-relaxed font-sans">
              <p>
                <strong>SKYDREAMS 🌈 A 3D 1K FEVER DREAM</strong> est un jeu de course 3D sans fin créé par <strong>Frank Force</strong> (<em>KilledByAPixel</em>) pour la compétition <strong>JS1024 2026</strong>.
              </p>
              <p className="text-xs text-white/70 bg-white/5 p-3 rounded-xl border border-white/10">
                Inspiré des jeux 3D des années 90 comme <em>Sky Roads</em>, <em>Marble Madness</em> et <em>Sonic 3D</em>. Le moteur 3D complet (projection mathématique, génération procédurale de piste, éclairage par gradient, étoiles, ombrage de sphère) tenait à l'origine dans seulement 1 024 octets de pur JavaScript !
              </p>

              <div className="bg-black/40 p-4 rounded-xl border border-white/10 font-mono text-xs space-y-2">
                <div className="text-cyan-400 font-bold">CONTRÔLES DU JEU :</div>
                <div>• <span className="text-white font-semibold">Souris :</span> Bouger horizontalement pour diriger la sphère</div>
                <div>• <span className="text-white font-semibold">Clic gauche / Espace / W / Flèche Haut :</span> Sauter</div>
                <div>• <span className="text-white font-semibold">Touches A / D ou Flèches Gauche / Droite :</span> Diriger</div>
                <div>• <span className="text-white font-semibold">Touche R :</span> Recommencer la course</div>
                <div>• <span className="text-white font-semibold">Écran tactile :</span> Glisser pour diriger, tap pour sauter</div>
              </div>

              <div className="text-xs text-white/50 pt-2 border-t border-white/10 flex justify-between items-center">
                <span>Licence MIT — Frank Force (2026)</span>
                <span>JS1024 2026 Demo</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
