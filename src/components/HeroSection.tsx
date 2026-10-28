import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

const noMessages = [
  "That button is getting bigger, just saying 😭",
  "Think about the chocolate before you decide 🍫",
  "Why is the No button running away 💀",
  "Okay now it’s doing too much 😭",
  "It’s literally avoiding you now",
  "No button has left the chat. Your move 😌",
];

const ribbonColors = [
  '#ff6b9d', '#c44569', '#a855f7', '#f59e0b',
  '#fb7185', '#c4b5fd', '#fbbf8e', '#34d399',
  '#38bdf8', '#f472b6', '#fbbf24', '#818cf8',
];

export default function HeroSection({ onCountdownComplete }: { onCountdownComplete?: () => void }) {
  const [showMessage, setShowMessage] = useState(false);
  const [proposalStage, setProposalStage] = useState<'hidden' | 'ribbons' | 'box' | 'question' | 'success'>('hidden');
  const [noClickCount, setNoClickCount] = useState(0);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noButtonVisible, setNoButtonVisible] = useState(true);
  const [showRibbonBurst, setShowRibbonBurst] = useState(false);

  const teleportNoButton = useCallback(() => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 80;
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    setNoButtonPos({ x: newX, y: newY });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowMessage(true), 800);
    return () => clearTimeout(t);
  }, []);

  // After ribbon burst → box
  useEffect(() => {
    if (proposalStage === 'ribbons') {
      const timer = setTimeout(() => {
        setShowRibbonBurst(false);
        setProposalStage('box');
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (proposalStage === 'box') {
      const timer = setTimeout(() => {
        setProposalStage('question');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [proposalStage]);

  const handleYes = () => {
    setProposalStage('success');
  };

  const handleNo = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    if (newCount === 1) {
      // Yes grows to 2x — that's the max
      setYesButtonScale(2);
    } else if (newCount >= 2 && newCount < 5) {
      // Yes stays at 2x, No button teleports
      teleportNoButton();
    } else if (newCount >= 5) {
      // No button disappears
      setNoButtonVisible(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* ===== RIBBON BURST EFFECT ===== */}
      <AnimatePresence>
        {showRibbonBurst && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            {Array.from({ length: 40 }).map((_, i) => {
              const angle = (i / 40) * 360;
              const distance = 300 + Math.random() * 400;
              const color = ribbonColors[i % ribbonColors.length];
              const width = 4 + Math.random() * 8;
              const height = 40 + Math.random() * 60;
              const delay = Math.random() * 0.3;
              return (
                <motion.div
                  key={`ribbon-${i}`}
                  initial={{ x: 0, y: 0, rotate: angle, scaleY: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((angle * Math.PI) / 180) * distance,
                    y: Math.sin((angle * Math.PI) / 180) * distance,
                    rotate: angle + Math.random() * 180 - 90,
                    scaleY: [0, 1, 1, 0],
                    opacity: [1, 1, 0.8, 0],
                  }}
                  transition={{ duration: 2 + Math.random(), delay, ease: 'easeOut' }}
                  style={{ width: `${width}px`, height: `${height}px`, backgroundColor: color, borderRadius: '4px', position: 'absolute' }}
                />
              );
            })}
            {Array.from({ length: 30 }).map((_, i) => {
              const angle = Math.random() * 360;
              const distance = 200 + Math.random() * 500;
              const color = ribbonColors[i % ribbonColors.length];
              const size = 6 + Math.random() * 12;
              return (
                <motion.div
                  key={`dot-${i}`}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((angle * Math.PI) / 180) * distance,
                    y: Math.sin((angle * Math.PI) / 180) * distance + 200,
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 2 + Math.random(), delay: Math.random() * 0.5, ease: 'easeOut' }}
                  style={{ width: `${size}px`, height: `${size}px`, backgroundColor: color, borderRadius: '50%', position: 'absolute' }}
                />
              );
            })}
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * 360;
              const distance = 250 + Math.random() * 350;
              const color = ribbonColors[(i + 3) % ribbonColors.length];
              return (
                <motion.div
                  key={`streamer-${i}`}
                  initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((angle * Math.PI) / 180) * distance,
                    y: Math.sin((angle * Math.PI) / 180) * distance + 150,
                    rotate: Math.random() * 720 - 360,
                    scale: [0, 1, 0.5],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 2.5 + Math.random(), delay: Math.random() * 0.4, ease: 'easeOut' }}
                  className="absolute text-3xl"
                >
                  <span style={{ color }}>〰️</span>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 3, 5], opacity: [1, 0.5, 0] }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute w-40 h-40 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.6) 0%, rgba(168,85,247,0.3) 40%, transparent 70%)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative circles */}
      <motion.div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pink-200/30 blur-xl" animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} />
      <motion.div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-purple-200/30 blur-xl" animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 5, repeat: Infinity }} />
      <motion.div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-yellow-200/20 blur-lg" animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 6, repeat: Infinity }} />
      {proposalStage === 'hidden' && (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="text-center z-10">
          <motion.div className="flex items-center justify-center gap-2 mb-4" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-sm md:text-base font-quicksand font-semibold text-purple-500 tracking-widest uppercase">
              HAPPY BIRTHDAY
            </span>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
          <h1 className="font-sacramento text-6xl md:text-8xl lg:text-9xl text-gradient-love mb-2">Happy Birthday</h1>
          <motion.p className="font-dancing text-2xl md:text-4xl text-pink-deep/80 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
            I made this little thing for you
          </motion.p>
        </motion.div>
      )}

      {/* Surprise Button */}
      {proposalStage === 'hidden' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
          className="z-10 mb-8 flex flex-col items-center"
        >
          <motion.button
            onClick={() => {
              setShowRibbonBurst(true);
              setProposalStage('ribbons');
              onCountdownComplete?.();
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-love via-rose-400 to-purple-dream text-white font-quicksand font-bold text-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 glow-pink cursor-pointer"
          >
            <span>🎁</span>
            <span>Open Your Surprise</span>
            <span>✨</span>
          </motion.button>

          {showMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-center mt-6 font-dancing text-xl md:text-2xl text-purple-500 italic"
            >
              Tap the button above for your special surprise! 💕
            </motion.p>
          )}
        </motion.div>
      )}


      {/* Ribbon burst transition */}
      {proposalStage === 'ribbons' && (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 text-center">
          <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 1, repeat: Infinity }} className="text-[100px] md:text-[130px] mb-4">
            💝
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="font-sacramento text-4xl md:text-6xl text-gradient-love">
            Okay, here comes your surprise…
          </motion.p>
        </motion.div>
      )}

      {/* Box opening */}
      {proposalStage === 'box' && (
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="relative z-10 text-center">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: [0, 1.2, 1], rotate: [0, 360] }} transition={{ duration: 1.5, ease: 'easeOut' }} className="text-[120px] md:text-[150px] mb-6">
            🎁
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="font-dancing text-3xl md:text-4xl text-purple-500">
            Wait, let me open this…
          </motion.p>
        </motion.div>
      )}

      {/* THE QUESTION */}
      <AnimatePresence mode="wait">
        {proposalStage === 'question' && (
          <motion.div key="question" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="relative z-10 text-center max-w-2xl w-full">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-[80px] md:text-[100px] mb-6">
              💍
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-sacramento text-5xl md:text-7xl text-gradient-love mb-4">
              Okay, so…
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-dancing text-3xl md:text-5xl text-pink-deep mb-6">
              Will you make this birthday extra special? 💕
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="font-quicksand text-lg md:text-xl text-purple-600 mb-8 italic">
              Say yes and I’ll owe you chocolate 🍫
            </motion.p>

            {/* Buttons area */}
            <div className="flex gap-8 justify-center items-center relative min-h-[120px]">
              {/* Yes Button — max 2x */}
              <motion.button
                onClick={handleYes}
                animate={{ scale: yesButtonScale }}
                whileHover={{ scale: yesButtonScale * 1.05 }}
                whileTap={{ scale: yesButtonScale * 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-gradient-to-r from-pink-love to-purple-dream text-white font-quicksand font-bold px-8 py-4 rounded-full shadow-lg text-xl z-20 relative"
              >
                Yes 😭💗
              </motion.button>

              {/* No Button — teleports, NO shaking */}
              {noButtonVisible && (
                <motion.button
                  onClick={handleNo}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ x: { type: 'spring', stiffness: 150, damping: 15 }, y: { type: 'spring', stiffness: 150, damping: 15 } }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-300 text-gray-700 font-quicksand font-bold px-8 py-4 rounded-full shadow-lg text-xl z-20"
                  style={{ position: noClickCount >= 2 ? 'fixed' : 'relative' }}
                >
                  No
                </motion.button>
              )}
            </div>

            {/* Dynamic messages */}
            <AnimatePresence mode="wait">
              {noClickCount > 0 && noClickCount <= noMessages.length && (
                <motion.p key={noClickCount} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-8 font-quicksand text-purple-500 italic text-lg">
                  {noMessages[Math.min(noClickCount - 1, noMessages.length - 1)]}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUCCESS */}
      <AnimatePresence mode="wait">
        {proposalStage === 'success' && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 text-center max-w-3xl">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x: Math.random() * 600 - 300, y: Math.random() * 600 - 300, scale: [0, 1.2, 0], opacity: [1, 1, 0] }}
                transition={{ duration: 3, delay: i * 0.12, repeat: Infinity, repeatDelay: 2 }}
                className="absolute top-1/2 left-1/2 pointer-events-none"
              >
                <Heart className="w-8 h-8 text-pink-love fill-pink-love" />
              </motion.div>
            ))}
            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-[100px] md:text-[130px] mb-6">
              💕
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-sacramento text-5xl md:text-7xl text-gradient-love mb-6">
              I knew you'd say yes!
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-dancing text-3xl md:text-4xl text-pink-deep mb-6">
              I know you love me hehe... Love you ummaahhhh! 💋
            </motion.p>
            <motion.img
              src={`${import.meta.env.BASE_URL}kitty-kiss.gif`}
              alt="kitty kiss"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              className="w-72 h-72 mx-auto rounded-2xl shadow-lg mb-4"
            />

          </motion.div>
        )}
      </AnimatePresence>

      {/* Hearts badge */}
      {showMessage && proposalStage === 'hidden' && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="z-10 text-center">
          <motion.div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-3 cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Heart className="w-5 h-5 text-pink-love fill-pink-love animate-heartbeat" />
            <span className="font-quicksand font-semibold text-pink-deep">Made for your birthday</span>
            <Heart className="w-5 h-5 text-pink-love fill-pink-love animate-heartbeat" />
          </motion.div>
        </motion.div>
      )}

      {/* Scroll indicator */}
      {proposalStage === 'hidden' && (
        <motion.div className="absolute bottom-8 z-10" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="flex flex-col items-center gap-1 text-purple-400">
            <span className="text-xs font-quicksand">Keep going</span>
            <Star className="w-4 h-4 animate-wiggle" />
            <motion.div className="w-0.5 h-8 bg-gradient-to-b from-purple-400 to-transparent" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
