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
      href: 'https://soundcloud.com/richknowles',
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
      href: null, // No link, just visual tribute
      particles: ['💙', '💛', '❤️', '💕', '✨', '🇺🇦'],
      colors: ['#0057B7', '#FFD700', '#ff1744', '#ff4081']
    }
  ];

  const spawnParticles = (itemParticles: string[], itemColors: string[]) => {
    const newParticles: Particle[] = [];
    const count = Math.floor(Math.random() * 8) + 12; // 12-20 particles

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 100 + 50;
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
      window.open(href, '_blank', 'noopener,noreferrer');
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

      {/* Particle Container for Menu Hovers */}
      <div className="fixed top-4 right-4 pointer-events-none z-[9999]">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-2xl font-bold"
              style={{ color: particle.color }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
                scale: 0.3,
                rotate: Math.random() * 360
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                ease: "easeOut"
              }}
            >
              {particle.symbol}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Menu Button */}
      <div className="fixed top-4 right-4 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center text-2xl relative"
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
            filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.8)) drop-shadow(0 0 40px rgba(147, 51, 234, 0.4))',
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
                    text-white font-semibold
                    transition-all duration-300
                    ${item.label === 'Music' ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600' : ''}
                    ${item.label === 'GitHub' ? 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800' : ''}
                    ${item.label === 'For Anna' ? 'bg-gradient-to-r from-blue-500 to-yellow-400 hover:from-blue-600 hover:to-yellow-500' : ''}
                    ${!item.href ? 'cursor-default' : 'cursor-pointer'}
                  `}
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
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FloatingMenu;
