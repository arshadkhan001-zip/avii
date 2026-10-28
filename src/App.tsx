import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import FloatingElements from './components/FloatingElements';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import GallerySection from './components/GallerySection';
import GameSection from './components/GameSection';
import MemeSection from './components/MemeSection';
import MessageSection from './components/MessageSection';
import ColorSurprise from './components/ColorSurprise';
import CountdownTimer from './components/CountdownTimer';
import Footer from './components/Footer';

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(3), 2800);
    const t4 = setTimeout(() => onComplete(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ['#ff6b9d', '#a855f7', '#f59e0b', '#fb7185'][i % 4],
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="text-center">
        <AnimatePresence mode="wait">
          {phase >= 0 && (
            <motion.div
              key="heart"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mb-6"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-20 h-20 mx-auto text-pink-love fill-pink-love drop-shadow-2xl" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase >= 1 && (
            <motion.h1
              key="title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-sacramento text-5xl md:text-7xl text-gradient-love mb-3"
            >
              A little surprise
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase >= 2 && (
            <motion.p
              key="subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-dancing text-2xl md:text-3xl text-purple-400"
            >
              I made you a thing. Open it 💗
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase >= 3 && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >
              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-pink-love"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [countdownComplete, setCountdownComplete] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroSection onCountdownComplete={() => setCountdownComplete(true)} />

          {countdownComplete && (
            <>
              <FloatingElements />
              <Navigation />
          
              <main className="relative z-10">
            
            {/* Decorative divider */}
            <div className="flex items-center justify-center py-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-300" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="mx-4"
              >
                <Heart className="w-4 h-4 text-pink-love fill-pink-love" />
              </motion.div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-300" />
            </div>
            
            <div className="flex items-center justify-center py-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-purple-300" />
              <span className="mx-4 text-xl">✨</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-300" />
            </div>

            <CountdownTimer />

            <div className="flex items-center justify-center py-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-purple-300" />
              <span className="mx-4 text-xl">✨</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-300" />
            </div>

            <GallerySection />

            <div className="flex items-center justify-center py-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-300" />
              <span className="mx-4 text-xl">💕</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-300" />
            </div>

            <GameSection />

            <div className="flex items-center justify-center py-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-300" />
              <span className="mx-4 text-xl">😂</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-300" />
            </div>

            <MemeSection />
            
            <div className="flex items-center justify-center py-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-purple-300" />
              <span className="mx-4 text-xl">🌸</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-300" />
            </div>

            <MessageSection />
            
            <div className="flex items-center justify-center py-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-300" />
              <span className="mx-4 text-xl">🎨</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-300" />
            </div>

            <ColorSurprise />
              </main>

              <Footer />
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
