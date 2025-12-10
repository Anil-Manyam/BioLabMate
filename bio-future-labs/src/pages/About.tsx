import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Users, Leaf, Lightbulb, Award, Target, Eye, Trophy, Globe, Heart, Droplets, Wind, Sprout, Zap, Leaf as LeafIcon } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import biolabmateImage from '@/assets/biolabmate.jpg';
import sanjayImage from '@/assets/Sanjay.jpg';
import sarikaImage from '@/assets/Sarika.jpg';
import bothCoFounders from '@/assets/both.jpg';
import awardImage from '@/assets/award.jpg';

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Environmental responsibility is at the core of everything we do, from sourcing to production.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously push boundaries to develop cutting-edge solutions for a sustainable future.'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'We maintain the highest standards in our products, ensuring they meet and exceed expectations.'
    }
  ];

  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  const Particle = ({ delay, duration, size, color }) => (
    <motion.div
      className={`absolute rounded-full ${color} opacity-20`}
      style={{
        width: size,
        height: size,
      }}
      animate={{
        y: [0, -600, 0],
        x: [0, Math.random() * 300 - 150, 0],
        opacity: [0.1, 0.4, 0.1],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );

  const FloatingOrb = ({ delay, size, colors, top, left }) => (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        width: size,
        height: size,
        top: top,
        left: left,
      }}
      animate={{
        y: [0, -40, 0],
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 8 + delay,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
  const Planet = ({ cx, cy, r, color, delay }) => (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={color}
      opacity="0.7"
      animate={{
        r: [r, r * 1.2, r],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 4 + delay,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      filter="drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))"
    />
  );


  const ShootingStar = ({ startX, startY, endX, endY, delay, duration }) => (
    <motion.line
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      stroke="url(#cometGradient)"
      strokeWidth="2"
      opacity="0"
      animate={{
        opacity: [0, 1, 0],
        x1: [startX, endX],
        y1: [startY, endY],
        x2: [endX, startX],
        y2: [endY, startY],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut",
      }}
    />
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Space-Like Gradient Background */}
      <div className="fixed inset-0 -z-30">
        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <motion.stop
                offset="0%"
                stopColor="#e0f2fe"
                animate={{
                  stopColor: ['#e0f2fe', '#f0fdf4', '#f5f3ff', '#e0f2fe'],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.stop
                offset="50%"
                stopColor="#dcfce7"
                animate={{
                  stopColor: ['#dcfce7', '#cffafe', '#e9d5ff', '#dcfce7'],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <motion.stop
                offset="100%"
                stopColor="#cffafe"
                animate={{
                  stopColor: ['#cffafe', '#e0f2fe', '#dcfce7', '#cffafe'],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </linearGradient>

            <radialGradient id="radialGrad1" cx="50%" cy="50%" r="50%">
              <motion.stop
                offset="0%"
                stopColor="#a5f3fc"
                stopOpacity="0.3"
                animate={{
                  stopColor: ['#a5f3fc', '#86efac', '#a5f3fc'],
                  stopOpacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.stop
                offset="100%"
                stopColor="#e0f2fe"
                stopOpacity="0"
              />
            </radialGradient>

            {/* Nebula gradient */}
            <radialGradient id="nebula" cx="40%" cy="60%" r="60%">
              <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#a5f3fc" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0" />
            </radialGradient>

            {/* Comet gradient */}
            <linearGradient id="cometGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="starGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.rect
            width="100%"
            height="100%"
            fill="url(#grad1)"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Nebula clouds */}
          <motion.ellipse
            cx="200"
            cy="300"
            rx="300"
            ry="200"
            fill="url(#nebula)"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              cx: [200, 220, 200],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.ellipse
            cx="800"
            cy="400"
            rx="250"
            ry="300"
            fill="url(#nebula)"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              cx: [800, 780, 800],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Planets with glow */}
          <defs>
            <filter id="planetGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.circle
            cx="150"
            cy="200"
            r="35"
            fill="#86efac"
            opacity="0.6"
            animate={{
              r: [35, 42, 35],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            filter="url(#planetGlow)"
          />

          <motion.circle
            cx="900"
            cy="150"
            r="28"
            fill="#a5f3fc"
            opacity="0.7"
            animate={{
              r: [28, 35, 28],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            filter="url(#planetGlow)"
          />

          <motion.circle
            cx="500"
            cy="550"
            r="32"
            fill="#c7d2fe"
            opacity="0.65"
            animate={{
              r: [32, 39, 32],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            filter="url(#planetGlow)"
          />

          {/* Shooting stars/Comets */}
          <defs>
            <filter id="cometGlow">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          <motion.line
            x1="100"
            y1="50"
            x2="400"
            y2="200"
            strokeWidth="3"
            opacity="0"
            animate={{
              opacity: [0, 1, 0],
              x1: [100, 400],
              y1: [50, 200],
              x2: [400, 100],
              y2: [200, 50],
            }}
            transition={{
              duration: 4,
              delay: 0,
              repeat: Infinity,
              repeatDelay: 6,
              ease: "easeInOut",
            }}
            stroke="url(#cometGradient)"
            filter="url(#cometGlow)"
          />

          <motion.line
            x1="900"
            y1="100"
            x2="600"
            y2="300"
            strokeWidth="3"
            opacity="0"
            animate={{
              opacity: [0, 1, 0],
              x1: [900, 600],
              y1: [100, 300],
              x2: [600, 900],
              y2: [300, 100],
            }}
            transition={{
              duration: 5,
              delay: 2,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut",
            }}
            stroke="url(#cometGradient)"
            filter="url(#cometGlow)"
          />

          <motion.line
            x1="200"
            y1="600"
            x2="600"
            y2="300"
            strokeWidth="2"
            opacity="0"
            animate={{
              opacity: [0, 1, 0],
              x1: [200, 600],
              y1: [600, 300],
              x2: [600, 200],
              y2: [300, 600],
            }}
            transition={{
              duration: 4.5,
              delay: 4,
              repeat: Infinity,
              repeatDelay: 6.5,
              ease: "easeInOut",
            }}
            stroke="url(#cometGradient)"
            filter="url(#cometGlow)"
          />

          {/* Animated constellation lines */}
          <motion.path
            d="M 150 200 L 500 550 L 900 150 L 150 200"
            stroke="#a5f3fc"
            strokeWidth="1"
            fill="none"
            opacity="0.15"
            animate={{
              opacity: [0.1, 0.25, 0.1],
              strokeDashoffset: [0, 100],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            strokeDasharray="10 5"
          />

          {/* Enhanced wave patterns */}
          <motion.path
            d="M0,200 Q250,150 500,200 T1000,200"
            stroke="#7ee8c4"
            strokeWidth="2"
            fill="none"
            opacity="0.2"
            animate={{
              d: [
                "M0,200 Q250,150 500,200 T1000,200",
                "M0,200 Q250,250 500,200 T1000,200",
                "M0,200 Q250,150 500,200 T1000,200",
              ],
              strokeDashoffset: [0, 100],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.path
            d="M0,300 Q250,250 500,300 T1000,300"
            stroke="#a5f3fc"
            strokeWidth="2"
            fill="none"
            opacity="0.2"
            animate={{
              d: [
                "M0,300 Q250,250 500,300 T1000,300",
                "M0,300 Q250,350 500,300 T1000,300",
                "M0,300 Q250,250 500,300 T1000,300",
              ],
              strokeDashoffset: [100, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Bright stars with different sizes */}
          <motion.circle cx="120" cy="80" r="2.5" fill="#fbbf24" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} filter="url(#starGlow)" />
          <motion.circle cx="250" cy="120" r="1.8" fill="#fcd34d" animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} filter="url(#starGlow)" />
          <motion.circle cx="600" cy="80" r="2" fill="#fbbf24" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} filter="url(#starGlow)" />
          <motion.circle cx="800" cy="120" r="1.5" fill="#fcd34d" animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }} filter="url(#starGlow)" />
          <motion.circle cx="950" cy="90" r="2.2" fill="#fbbf24" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} filter="url(#starGlow)" />

          {/* More stars scattered */}
          <motion.circle cx="100" cy="450" r="1.5" fill="#fbbf24" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} filter="url(#starGlow)" />
          <motion.circle cx="350" cy="500" r="2" fill="#fcd34d" animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} filter="url(#starGlow)" />
          <motion.circle cx="700" cy="480" r="1.8" fill="#fbbf24" animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 2 }} filter="url(#starGlow)" />
          <motion.circle cx="550" cy="150" r="1.3" fill="#fcd34d" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }} filter="url(#starGlow)" />
          <motion.circle cx="820" cy="550" r="2.1" fill="#fbbf24" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.8 }} filter="url(#starGlow)" />

          {/* Pulsing center glow */}
          <motion.circle
            cx="500"
            cy="300"
            r="300"
            fill="none"
            stroke="#a5f3fc"
            strokeWidth="1"
            opacity="0.1"
            animate={{
              r: [300, 400, 300],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.circle
            cx="500"
            cy="300"
            r="200"
            fill="none"
            stroke="#86efac"
            strokeWidth="0.5"
            opacity="0.1"
            animate={{
              r: [200, 280, 200],
              opacity: [0.08, 0.18, 0.08],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </svg>
      </div>

      {/* Animated Particle System - Lite Colors */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <Particle delay={0} duration={12} size="80px" color="bg-emerald-200" />
        <Particle delay={1} duration={14} size="60px" color="bg-cyan-200" />
        <Particle delay={2} duration={13} size="70px" color="bg-green-200" />
        <Particle delay={0.5} duration={15} size="65px" color="bg-blue-200" />
        <Particle delay={1.5} duration={12.5} size="75px" color="bg-purple-200" />
        <Particle delay={2.5} duration={14.5} size="55px" color="bg-teal-200" />
      </div>

      {/* Floating Orbs - Creative Background Animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <FloatingOrb
          delay={0}
          size="300px"
          colors="linear-gradient(135deg, rgba(165, 243, 252, 0.2), rgba(134, 239, 172, 0.2))"
          top="5%"
          left="10%"
        />
        <FloatingOrb
          delay={1}
          size="250px"
          colors="linear-gradient(135deg, rgba(199, 210, 254, 0.2), rgba(126, 232, 196, 0.2))"
          top="50%"
          left="80%"
        />
        <FloatingOrb
          delay={2}
          size="280px"
          colors="linear-gradient(135deg, rgba(134, 239, 172, 0.2), rgba(165, 243, 252, 0.2))"
          top="60%"
          left="5%"
        />
        <FloatingOrb
          delay={0.5}
          size="220px"
          colors="linear-gradient(135deg, rgba(199, 210, 254, 0.2), rgba(165, 243, 252, 0.2))"
          top="25%"
          left="75%"
        />
      </div>

      <Navigation />
      
      {/* Section 1: Hero Image with Brief Goal */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            }
          }
        }}
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={scrollVariants}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-8">
              <motion.img
                src={biolabmateImage}
                alt="BioLabMate Innovation"
                className="w-full h-[400px] md:h-[500px] object-cover"
                whileInView={{ scale: 1.05 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: false }}
              />
              <motion.div
                className="absolute bottom-8 left-8 right-8 text-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: false }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {/* Welcome to <span className="text-emerald-300">BioLabMate</span> */}
                </h1>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-green-200/50">
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium">
                  Our goal is to revolutionize research laboratories worldwide by replacing conventional petroleum-based plastics with innovative seaweed-derived bioplastics, creating a sustainable future for scientific research while preserving our planet's health.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 2: Founders with Tile Layout */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            }
          }
        }}
        className="py-16 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={scrollVariants}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Meet Our Founders</h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full shadow-lg"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(16, 185, 129, 0.5)',
                  '0 0 20px rgba(16, 185, 129, 0.8)',
                  '0 0 10px rgba(16, 185, 129, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Founders Tiles */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Sarika Tile */}
            <motion.div
              variants={scrollVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <motion.div 
                className="bg-gradient-to-br from-cyan-100/60 to-teal-100/60 backdrop-blur-md rounded-2xl p-8 border border-cyan-300/50 hover:shadow-2xl transition-all duration-500 shadow-lg"
                whileHover={{ scale: 1.02 }}
                animate={{
                  borderColor: [
                    'rgba(6, 182, 212, 0.5)',
                    'rgba(13, 148, 136, 0.8)',
                    'rgba(6, 182, 212, 0.5)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-6">
                  <motion.div
                    whileInView={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: false }}
                    className="relative"
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-lg w-40 h-40">
                      <img
                        src={sarikaImage}
                        alt="Sarika - Co-Founder"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent"
                        animate={{
                          background: [
                            'linear-gradient(to top, rgba(6, 78, 59, 0.2), transparent)',
                            'linear-gradient(to top, rgba(6, 78, 59, 0.4), transparent)',
                            'linear-gradient(to top, rgba(6, 78, 59, 0.2), transparent)',
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">Dr. Sarika Kumari</h3>
                    <p className="text-cyan-700 font-semibold">CEO & Co-Founder</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            {/* Sanjay Tile */}
            <motion.div
              variants={scrollVariants}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group"
            >
              <motion.div 
                className="bg-gradient-to-br from-emerald-100/60 to-green-100/60 backdrop-blur-md rounded-2xl p-8 border border-emerald-300/50 hover:shadow-2xl transition-all duration-500 shadow-lg"
                whileHover={{ scale: 1.02 }}
                animate={{
                  borderColor: [
                    'rgba(16, 185, 129, 0.5)',
                    'rgba(5, 150, 105, 0.8)',
                    'rgba(16, 185, 129, 0.5)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-6">
                  <motion.div
                    whileInView={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false }}
                    className="relative"
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-lg w-40 h-40">
                      <img
                        src={sanjayImage}
                        alt="Sanjay - Co-Founder"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"
                        animate={{
                          background: [
                            'linear-gradient(to top, rgba(5, 46, 22, 0.2), transparent)',
                            'linear-gradient(to top, rgba(5, 46, 22, 0.4), transparent)',
                            'linear-gradient(to top, rgba(5, 46, 22, 0.2), transparent)',
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">Sanjay Dubey</h3>
                    <p className="text-emerald-700 font-semibold">CTO & Co-Founder</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Shared Message */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <motion.div 
              className="bg-gradient-to-br from-emerald-500/70 via-teal-500/70 to-cyan-500/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-white/30"
              animate={{
                borderColor: [
                  'rgba(255, 255, 255, 0.3)',
                  'rgba(255, 255, 255, 0.5)',
                  'rgba(255, 255, 255, 0.3)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"
              />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Quote className="w-8 h-8 text-white/90 flex-shrink-0" />
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-bold text-center drop-shadow-lg">Our Mission & Commitment</h3>
                </div>
                <blockquote className="text-lg md:text-xl leading-relaxed italic text-center text-white/95 drop-shadow-md">
                  "We are trying to make a seaweed bioplastic that stands out as a promising alternative. They are renewable, biodegradable, and have less environmental impact than any conventional plastic we use. With a competent team and strong support from the scientific community, we are determined to eradicate petroleum-based plastics from research labs. We are fully committed to this cause and invite you to join us in building eco-sustainable products. Let's save our planet from harmful material and create a greener future..."
                </blockquote>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 3: Our Story */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            }
          }
        }}
        className="py-16 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={scrollVariants}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Story</h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full shadow-lg"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(16, 185, 129, 0.5)',
                  '0 0 20px rgba(16, 185, 129, 0.8)',
                  '0 0 10px rgba(16, 185, 129, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={scrollVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                My co-founder and I have worked on this transformative idea for the last two years. We are both researchers and worked in the research lab for a long time. Our journey began when we noticed the amount of plastic waste generated by research labs.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We started looking for alternative or biomaterial-based lab plastic products, but unfortunately, we couldn't find any. This led us to seek out other labs facing similar issues, gradually turning our search into a dedicated mission to reduce plastic waste in research labs.
              </p>
            </motion.div>

            <motion.div
              variants={scrollVariants}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <motion.div 
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                whileInView={{ scale: 1.05 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false }}
              >
                <img
                  src={bothCoFounders}
                  alt="Co-founders working together"
                  className="w-full h-auto object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                  animate={{
                    background: [
                      'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
                      'linear-gradient(to top, rgba(16,185,129,0.2), transparent)',
                      'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 4: Blue Economy */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            }
          }
        }}
        className="py-16 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={scrollVariants}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Globe className="w-8 h-8 text-emerald-600" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Blue Economy</h2>
            </div>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full shadow-lg"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(16, 185, 129, 0.5)',
                  '0 0 20px rgba(16, 185, 129, 0.8)',
                  '0 0 10px rgba(16, 185, 129, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div
            variants={scrollVariants}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-100/70 to-cyan-100/70 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-emerald-200/50 relative overflow-hidden"
          >
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 10,
                ease: 'linear',
                repeat: Infinity
              }}
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
            />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  With a coastline stretching 29,000 kilometres, Newfoundland is rich in seaweed, abundantly available along many parts of its shores. Newfoundland holds immense potential for ocean-based derived products. We believe it's an opportunity to utilize readily available raw materials around us to create such products.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The global commercial seaweed market is projected to grow from $15.01 billion in 2021 to $24.92 billion in 2028 at a CAGR of 7.51%.
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  The potential of bioplastics is vast, evident by the market's impressive Compound Annual Growth Rate (CAGR) of 17.56%, projected to transform it into a thriving $30 billion industry.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Particularly remarkable is the untapped opportunity within the Atlantic provinces, which possess abundant resources ripe for bioplastic innovation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 5: Our Values */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            }
          }
        }}
        className="py-16 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={scrollVariants}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Values</h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full shadow-lg"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(16, 185, 129, 0.5)',
                  '0 0 20px rgba(16, 185, 129, 0.8)',
                  '0 0 10px rgba(16, 185, 129, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={scrollVariants}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group"
              >
                <motion.div 
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-200/50 h-full relative overflow-hidden"
                  whileInView={{ y: -10 }}
                  whileHover={{ y: -15 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: false }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-200/30 to-cyan-200/30 rounded-full -translate-y-12 translate-x-12"
                  />
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-lg">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <value.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 relative z-10">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{value.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 6: Mission & Vision */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            }
          }
        }}
        className="py-16 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={scrollVariants}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Mission & Vision</h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full shadow-lg"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(16, 185, 129, 0.5)',
                  '0 0 20px rgba(16, 185, 129, 0.8)',
                  '0 0 10px rgba(16, 185, 129, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              variants={scrollVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-600/70 to-teal-600/70 backdrop-blur-md rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden border border-white/30"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-16 -right-16 w-32 h-32 bg-white/10 rounded-full"
              />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Target className="w-8 h-8 text-emerald-200" />
                </motion.div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-lg leading-relaxed relative z-10">
                "To revolutionize the materials industry by developing innovative, biodegradable solutions derived from sustainable seaweed sources. We are committed to reducing environmental impact while providing superior alternatives to traditional plastics and laboratory materials."
              </p>
            </motion.div>

            <motion.div
              variants={scrollVariants}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-cyan-600/70 to-blue-600/70 backdrop-blur-md rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden border border-white/30"
            >
              <motion.div
                animate={{
                  rotate: [360, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 6
                }}
                className="absolute -bottom-16 -left-16 w-32 h-32 bg-white/10 rounded-full"
              />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <motion.div
                  animate={{
                    rotate: [360, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Eye className="w-8 h-8 text-cyan-200" />
                </motion.div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-lg leading-relaxed relative z-10">
                "To create a world where sustainable materials are the standard, not the exception. We envision laboratories and industries worldwide adopting our eco-friendly solutions, contributing to a cleaner, healthier planet for future generations."
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 7: Achievements */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            }
          }
        }}
        className="py-16 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={scrollVariants}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Trophy className="w-8 h-8 text-amber-600" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Our Achievements</h2>
            </div>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full shadow-lg"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(16, 185, 129, 0.5)',
                  '0 0 20px rgba(16, 185, 129, 0.8)',
                  '0 0 10px rgba(16, 185, 129, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div
            variants={scrollVariants}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div 
              className="relative overflow-hidden rounded-2xl shadow-2xl max-w-md mx-auto"
              whileInView={{ scale: [0.95, 1.05, 1] }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <img
                src={awardImage}
                alt="econext CleanTech Innovation Award"
                className="w-full h-auto object-cover"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                animate={{
                  background: [
                    'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
                    'linear-gradient(to top, rgba(34,197,94,0.2), transparent)',
                    'linear-gradient(to top, rgba(0,0,0,0.3), transparent)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-amber-100/80 to-yellow-100/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-amber-200/50 relative overflow-hidden"
              whileInView={{ scale: [0.95, 1] }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <motion.div
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 8,
                  ease: 'linear',
                  repeat: Infinity
                }}
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
              />
              <p className="text-lg text-gray-700 leading-relaxed">
                Proud recipient of the <strong>econext CleanTech Innovation Award (2024)</strong>, recognizing our efforts in accelerating clean growth and sustainable innovation in Newfoundland and Labrador.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default About;