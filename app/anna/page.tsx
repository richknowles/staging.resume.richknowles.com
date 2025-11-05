"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  delay: number;
  duration: number;
}

export default function AnnaPage() {
  const [hearts, setHearts] = useState<FloatingParticle[]>([]);
  const [clickedHearts, setClickedHearts] = useState<FloatingParticle[]>([]);
  const [heartId, setHeartId] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate continuous floating particles
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: FloatingParticle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: 110,
        symbol: ['💙', '💛', '🌻', '💕', '✨', '🕊️', '🇺🇦'][Math.floor(Math.random() * 7)],
        delay: 0,
        duration: 8 + Math.random() * 4,
      };
      setHearts((prev) => [...prev.slice(-20), newHeart]);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Handle click to spawn hearts
  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newHearts: FloatingParticle[] = [];
    for (let i = 0; i < 8; i++) {
      newHearts.push({
        id: heartId + i,
        x,
        y,
        symbol: ['💙', '💛', '❤️', '💕'][Math.floor(Math.random() * 4)],
        delay: 0,
        duration: 2,
      });
    }
    setClickedHearts((prev) => [...prev, ...newHearts]);
    setHeartId((prev) => prev + 8);

    setTimeout(() => {
      setClickedHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
    }, 2000);
  };

  const supportLinks = [
    {
      name: 'UNITED24',
      url: 'https://u24.gov.ua/',
      description: 'Official fundraising platform of Ukraine',
      icon: '🇺🇦',
    },
    {
      name: 'Red Cross Ukraine',
      url: 'https://www.icrc.org/en/where-we-work/europe-central-asia/ukraine',
      description: 'Humanitarian aid and relief',
      icon: '❤️',
    },
    {
      name: 'Come Back Alive',
      url: 'https://savelife.in.ua/en/',
      description: 'Support for Ukrainian Armed Forces',
      icon: '🛡️',
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-gray-100 relative overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Ambient light effect following cursor */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,87,183,0.15) 0%, rgba(255,215,0,0.1) 50%, transparent 70%)',
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Floating background particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute text-4xl"
              style={{
                left: `${heart.x}%`,
                filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.5))',
              }}
              initial={{ y: '100vh', opacity: 0.6, scale: 0.8 }}
              animate={{
                y: '-20vh',
                opacity: [0.6, 1, 0.6, 0],
                scale: [0.8, 1.2, 0.8],
                x: [0, Math.sin(heart.id) * 30, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: heart.duration,
                ease: 'linear',
              }}
            >
              {heart.symbol}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Clicked hearts explosion */}
      <div className="fixed inset-0 pointer-events-none z-20">
        <AnimatePresence>
          {clickedHearts.map((heart) => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 100;
            return (
              <motion.div
                key={heart.id}
                className="absolute text-3xl"
                style={{
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                }}
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  scale: 0,
                  opacity: 0,
                  rotate: 360,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: heart.duration, ease: 'easeOut' }}
              >
                {heart.symbol}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Main content */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 py-16">
        {/* Ukrainian Flag Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="flex justify-center mb-8">
            <motion.div
              className="w-32 h-20 rounded-lg overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.1 }}
              style={{
                boxShadow: '0 0 30px rgba(0,87,183,0.5), 0 0 60px rgba(255,215,0,0.3)',
              }}
            >
              <div className="w-full h-1/2 bg-[#0057B7]" />
              <div className="w-full h-1/2 bg-[#FFD700]" />
            </motion.div>
          </div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold text-center mb-4"
            style={{
              background: 'linear-gradient(135deg, #0057B7 0%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            For Anna
          </motion.h1>

          <motion.div
            className="text-center text-2xl text-blue-300 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            З України з любов&rsquo;ю 💙💛
            <br />
            <span className="text-lg text-gray-400">From Ukraine with Love</span>
          </motion.div>
        </motion.div>

        {/* Main Message */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="bg-gradient-to-br from-blue-900/40 to-yellow-900/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-blue-500/30 shadow-2xl">
            <motion.p
              className="text-2xl md:text-3xl leading-relaxed mb-6 text-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              In a world where darkness tries to prevail, your light shines brighter than ever.
            </motion.p>

            <motion.p
              className="text-xl md:text-2xl leading-relaxed mb-6 text-blue-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              Through every siren, every sleepless night, every moment of fear—you remain unbreakable.
            </motion.p>

            <motion.p
              className="text-xl md:text-2xl leading-relaxed text-yellow-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              Your courage inspires me. Your strength humbles me. Your resilience reminds me what true bravery looks like.
            </motion.p>

            <motion.div
              className="mt-8 text-3xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              🌻
            </motion.div>
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <div className="bg-gradient-to-r from-blue-900/30 to-yellow-900/30 backdrop-blur-sm rounded-xl p-8 border-l-4 border-yellow-400 shadow-xl">
            <p className="text-2xl italic text-gray-200 mb-4">
              &ldquo;Hope is being able to see that there is light despite all of the darkness.&rdquo;
            </p>
            <p className="text-right text-yellow-400 text-lg">— Desmond Tutu</p>
          </div>
        </motion.div>

        {/* Personal Message */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          <div className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-pink-500/30 shadow-2xl">
            <motion.div
              className="text-5xl mb-6"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              ❤️
            </motion.div>

            <p className="text-2xl md:text-3xl leading-relaxed text-pink-200">
              Distance cannot diminish what we share. Every day I think of you, pray for your safety, and dream of the day when peace returns to your beautiful land.
            </p>

            <p className="text-xl md:text-2xl leading-relaxed mt-6 text-purple-200">
              Until that day comes, know that you are loved beyond measure, admired beyond words, and carried in my heart always.
            </p>

            <motion.div
              className="mt-8 text-4xl"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              💕
            </motion.div>
          </div>
        </motion.div>

        {/* Support Ukraine Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
        >
          <h2 className="text-4xl font-bold text-center mb-8 text-blue-300">
            Stand with Ukraine 🇺🇦
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {supportLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-blue-800/50 to-yellow-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30 hover:border-yellow-400/50 transition-all shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.6 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(0,87,183,0.4), 0 0 60px rgba(255,215,0,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-5xl mb-4 text-center">{link.icon}</div>
                <h3 className="text-xl font-bold text-blue-200 mb-2 text-center">
                  {link.name}
                </h3>
                <p className="text-sm text-gray-300 text-center">
                  {link.description}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Slava Ukraini */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
        >
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.1 }}
            animate={{
              textShadow: [
                '0 0 20px rgba(0,87,183,0.5)',
                '0 0 40px rgba(255,215,0,0.5)',
                '0 0 20px rgba(0,87,183,0.5)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-2">
              Слава Україні!
            </h2>
            <p className="text-2xl text-blue-400">
              Героям слава!
            </p>
          </motion.div>
        </motion.div>

        {/* Back to home link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 rounded-full text-white font-semibold text-lg shadow-lg transition-all"
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Interactive hint */}
        <motion.div
          className="text-center mt-8 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 3, delay: 3.5, repeat: Infinity, repeatDelay: 2 }}
        >
          Click anywhere to send hearts 💙
        </motion.div>
      </div>
    </div>
  );
}
