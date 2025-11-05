"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color?: string;
}

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleId, setParticleId] = useState(0);
  const [showStrike, setShowStrike] = useState(false);
  const [flameParticles, setFlameParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [noFunZone, setNoFunZone] = useState(false);

  // Load preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('noFunZone');
    if (saved === 'true') setNoFunZone(true);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate distance from button (top-right corner: ~window.innerWidth - 40, ~40)
  const distance = Math.sqrt(
    Math.pow(mousePos.x - (typeof window !== 'undefined' ? window.innerWidth - 40 : 1000), 2) +
    Math.pow(mousePos.y - 40, 2)
  );
  const maxDistance = 500; // Max distance to consider
  const brightness = noFunZone ? 0.5 : Math.max(0.3, Math.min(1, 1 - (distance / maxDistance)));

  // Trigger laser strike and flame effect on mount
  useEffect(() => {
    // Wait for laser beam to finish (2s), then show strike
    setTimeout(() => {
      setShowStrike(true);

      // Spawn flame particles
      const flames: Particle[] = [];
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 80 + 40;
        flames.push({
          id: i,
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity,
          symbol: ['🔥', '✨', '💥', '⚡'][Math.floor(Math.random() * 4)],
          color: ['#ff6b00', '#ff9500', '#ffb700', '#ffd700', '#ff4500'][Math.floor(Math.random() * 5)]
        });
      }
      setFlameParticles(flames);

      // Clear flame particles after animation
      setTimeout(() => {
        setFlameParticles([]);
      }, 1500);
    }, 2000);
  }, []);

  const menuItems = [
    {
      icon: '🎵',
      label: 'Music',
      href: 'https://soundcloud.com/rich-knowles-82881417',
      particles: ['♪', '♫', '♬', '♩', '♭', '♮', '♯'],
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']
    },
    {
      icon: '💻',
      label: 'GitHub',
      href: 'https://github.com/richknowles',
      particles: ['{', '}', '<', '>', '//', '()', '[]', '=>', '==', '!=', '&&', '||'],
      colors: ['#00ff41', '#00cc33', '#00aa2b', '#008822']
    },
    {
      icon: '💙',
      label: 'For Anna',
      href: '/anna', // Link to Anna tribute page
      particles: ['💙', '💛', '❤️', '💕', '✨', '🇺🇦'],
      colors: ['#0057B7', '#FFD700', '#ff1744', '#ff4081']
    }
  ];

  const toggleNoFunZone = () => {
    const newValue = !noFunZone;
    setNoFunZone(newValue);
    localStorage.setItem('noFunZone', String(newValue));
  };

  const spawnParticles = (itemParticles: string[], itemColors: string[]) => {
    if (noFunZone) return; // No particles in No Fun Zone!

    const newParticles: Particle[] = [];
    const count = Math.floor(Math.random() * 8) + 12; // 12-20 particles - optimized!

    // Calculate center of screen for explosion target
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 800;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;

    // Button is at top-right
    const buttonX = typeof window !== 'undefined' ? window.innerWidth - 40 : 1000;
    const buttonY = 40;

    for (let i = 0; i < count; i++) {
      // Direction towards center with some randomness
      const angleToCenter = Math.atan2(centerY - buttonY, centerX - buttonX);
      const spread = 1.2; // Spread angle in radians (~70 degrees)
      const angle = angleToCenter + (Math.random() - 0.5) * spread;

      // High velocity with momentum - like outer space!
      const velocity = Math.random() * 200 + 200; // 200-400 px (optimized)
      const symbol = itemParticles[Math.floor(Math.random() * itemParticles.length)];
      const color = itemColors[Math.floor(Math.random() * itemColors.length)];

      newParticles.push({
        id: particleId + i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        symbol,
        color
      });
    }

    setParticles(prev => [...prev, ...newParticles]);
    setParticleId(prev => prev + count);

    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2000);
  };

  const handleItemHover = (item: typeof menuItems[0]) => {
    spawnParticles(item.particles, item.colors);
  };

  const handleClick = (href: string | null) => {
    if (href) {
      if (href.startsWith('http')) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <>
      {/* Laser Strike Beam - shoots from center-right to top-right corner */}
      {showStrike && (
        <motion.div
          className="fixed pointer-events-none z-[9998]"
          style={{
            top: '50%',
            left: '60%',
            width: '4px',
            height: '800px',
            background: 'linear-gradient(to bottom, rgba(220, 38, 38, 0.9), rgba(220, 38, 38, 0))',
            transformOrigin: 'top center',
            filter: 'drop-shadow(0 0 6px #dc2626) drop-shadow(0 0 12px #dc2626) drop-shadow(0 0 18px #dc2626)',
          }}
          initial={{ scaleY: 0, opacity: 0, rotate: -35 }}
          animate={{
            scaleY: [0, 1.2, 1],
            opacity: [0, 1, 0],
            rotate: -35
          }}
          transition={{
            duration: 0.35,
            times: [0, 0.7, 1],
            ease: "easeOut"
          }}
        />
      )}

      {/* Flame Particles from Strike */}
      <div className="fixed top-4 right-4 pointer-events-none z-[9999]">
        <AnimatePresence>
          {flameParticles.map((particle) => (
            <motion.div
              key={`flame-${particle.id}`}
              className="absolute text-3xl"
              style={{ color: particle.color }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
                scale: 0.2,
                rotate: Math.random() * 360
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeOut"
              }}
            >
              {particle.symbol}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Particle Container for Menu Hovers - OPTIMIZED EXPLOSIONS! */}
      <div className="fixed top-4 right-4 pointer-events-none z-[9999]">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-4xl font-bold"
              style={{ color: particle.color }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
                scale: 0.3,
                rotate: Math.random() * 540 // Optimized rotation
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                ease: "linear" // Linear for outer space momentum feel
              }}
            >
              {particle.symbol}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Menu Button with Proximity-Based Glow */}
      <div className="fixed top-4 right-4 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white flex items-center justify-center text-2xl relative border-0 outline-none"
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          animate={{
            opacity: 1,
            scale: [0, 1.2, 0.95, 1.05, 1],
            rotate: [15, -5, 2, 0]
          }}
          transition={{
            delay: 2.3,
            duration: 0.6,
            times: [0, 0.3, 0.6, 0.85, 1],
            ease: "easeOut"
          }}
          style={{
            filter: `drop-shadow(0 0 ${20 * brightness}px rgba(147, 51, 234, ${0.8 * brightness})) drop-shadow(0 0 ${40 * brightness}px rgba(147, 51, 234, ${0.6 * brightness})) drop-shadow(0 0 ${60 * brightness}px rgba(147, 51, 234, ${0.4 * brightness}))`,
            boxShadow: 'none',
            textDecoration: 'none',
            border: 'none',
            outline: 'none',
          }}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Pulsing glow effect on initial appearance */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-blue-400"
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: [0.8, 0],
              scale: [1, 1.8]
            }}
            transition={{
              delay: 2.3,
              duration: 0.8,
              ease: "easeOut"
            }}
          />
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
            style={{ textDecoration: 'none', border: 'none', outline: 'none' }}
          >
            {isOpen ? '✕' : '⚡'}
          </motion.span>
        </motion.button>

        {/* Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-16 right-0 flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleClick(item.href)}
                  onMouseEnter={() => handleItemHover(item)}
                  className={`
                    w-48 px-4 py-3 rounded-lg shadow-lg
                    flex items-center gap-3
                    font-semibold
                    transition-all duration-300
                    ${item.label === 'Music' ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600' : ''}
                    ${item.label === 'GitHub' ? 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800' : ''}
                    ${item.label === 'For Anna' ? 'bg-gradient-to-r from-blue-500 to-yellow-400 hover:from-blue-600 hover:to-yellow-500' : ''}
                    ${!item.href ? 'cursor-default' : 'cursor-pointer'}
                  `}
                  style={{
                    color: '#F93C45', // Bright red text
                    textDecoration: 'none', // No underline
                  }}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span style={{ color: '#F93C45' }}>{item.label}</span>
                </motion.button>
              ))}

              {/* No Fun Zone Toggle */}
              <motion.button
                onClick={toggleNoFunZone}
                className={`
                  w-48 px-4 py-3 rounded-lg shadow-lg
                  flex items-center gap-3
                  font-semibold
                  transition-all duration-300
                  cursor-pointer
                  ${noFunZone
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                  }
                `}
                style={{
                  color: '#F93C45',
                  textDecoration: 'none',
                }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{
                  delay: menuItems.length * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">{noFunZone ? '😴' : '🎉'}</span>
                <span style={{ color: '#F93C45' }}>
                  {noFunZone ? 'Fun Mode' : 'No Fun Zone'}
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FloatingMenu;
