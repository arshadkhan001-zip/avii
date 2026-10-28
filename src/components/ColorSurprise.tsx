import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Palette, Sparkles, Wand2 } from 'lucide-react';

const colorThemes = [
  { name: 'Rose', bg: 'from-rose-200 via-pink-200 to-red-200', text: 'text-rose-700', emoji: '🌹', accent: '#fb7185', desc: 'Pink looks good. That is the whole explanation.' },
  { name: 'Blue', bg: 'from-cyan-200 via-blue-200 to-indigo-200', text: 'text-blue-700', emoji: '🌊', accent: '#38bdf8', desc: 'A calmer one for a change.' },
  { name: 'Sunset', bg: 'from-orange-200 via-amber-200 to-yellow-200', text: 'text-orange-700', emoji: '🌅', accent: '#fb923c', desc: 'This colour combo actually works.' },
  { name: 'Lavender', bg: 'from-violet-200 via-purple-200 to-fuchsia-200', text: 'text-purple-700', emoji: '💜', accent: '#a78bfa', desc: 'Purple. You can’t really go wrong with it.' },
  { name: 'Cherry Blossom', bg: 'from-pink-200 via-rose-100 to-pink-100', text: 'text-pink-700', emoji: '🌸', accent: '#f472b6', desc: 'A little pink, a little extra. Pretty much the vibe.' },
  { name: 'Mint', bg: 'from-emerald-200 via-teal-200 to-green-200', text: 'text-emerald-700', emoji: '🍃', accent: '#34d399', desc: 'Something different from all the pink.' },
];

const confettiColors = ['#ff6b9d', '#a855f7', '#f59e0b', '#38bdf8', '#34d399', '#fb7185', '#c4b5fd'];

export default function ColorSurprise() {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [confetti, setConfetti] = useState<{id: number, x: number, color: string, delay: number, duration: number}[]>([]);
  const [isChanging, setIsChanging] = useState(false);

  const triggerConfetti = () => {
    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 4000);
  };

  const changeTheme = (index?: number) => {
    setIsChanging(true);
    triggerConfetti();
    setTimeout(() => {
      setCurrentTheme(index !== undefined ? index : (prev: number) => (prev + 1) % colorThemes.length);
      setIsChanging(false);
    }, 300);
  };

  const theme = colorThemes[currentTheme];

  return (
    <section className="relative py-20 px-4 overflow-hidden" id="surprise">
      <AnimatePresence>
        {confetti.map(piece => (
          <motion.div
            key={piece.id}
            initial={{ y: -20, x: `${piece.x}vw`, opacity: 1, rotate: 0 }}
            animate={{ y: '100vh', rotate: 720, opacity: [1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: piece.duration, delay: piece.delay, ease: 'easeIn' }}
            className="fixed top-0 z-50 pointer-events-none"
            style={{ left: `${piece.x}%` }}
          >
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: piece.color }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Palette className="w-6 h-6 text-purple-400" />
          <span className="font-quicksand font-semibold text-purple-400 tracking-widest uppercase text-sm">
            Pick a colour
          </span>
          <Palette className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="font-sacramento text-5xl md:text-7xl text-gradient-love">
          Change the vibe
        </h2>
        <p className="font-quicksand text-purple-400/70 mt-3 max-w-md mx-auto">
          Pick whichever colour you like. Tap around and see what happens.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          className={`relative rounded-3xl p-10 md:p-14 bg-gradient-to-br ${theme.bg} shadow-2xl overflow-hidden transition-all duration-700`}
          animate={{ scale: isChanging ? [1, 0.98, 1] : 1 }}
        >
          <motion.div
            className="absolute top-5 right-5 w-20 h-20 rounded-full opacity-20"
            style={{ backgroundColor: theme.accent }}
            animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-5 left-5 w-16 h-16 rounded-full opacity-20"
            style={{ backgroundColor: theme.accent }}
            animate={{ scale: [1.5, 1, 1.5], rotate: [360, 180, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <div className="relative z-10 text-center">
            <motion.div
              key={currentTheme}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-7xl mb-6 inline-block"
            >
              {theme.emoji}
            </motion.div>

            <motion.h3
              key={`name-${currentTheme}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`font-dancing text-4xl md:text-5xl ${theme.text} mb-4`}
            >
              {theme.name}
            </motion.h3>

            <motion.p
              key={`desc-${currentTheme}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`font-quicksand ${theme.text} opacity-70 mb-8`}
            >
              {theme.desc}
            </motion.p>

            <motion.button
              onClick={() => changeTheme()}
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-8 py-4 font-quicksand font-bold shadow-lg hover:shadow-xl transition-shadow"
              style={{ color: theme.accent }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Wand2 className="w-5 h-5" />
              Try another one
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        <div className="flex justify-center gap-3 mt-6">
          {colorThemes.map((t, i) => (
            <motion.button
              key={i}
              onClick={() => changeTheme(i)}
              className={`w-8 h-8 rounded-full border-3 transition-all ${
                i === currentTheme ? 'border-gray-700 scale-125' : 'border-white/50 hover:scale-110'
              }`}
              style={{ background: t.accent }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
