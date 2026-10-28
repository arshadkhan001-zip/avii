import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BIRTHDAY = new Date('2026-10-29T00:00:00');

function getTimeLeft() {
  const diff = BIRTHDAY.getTime() - Date.now();
  if (diff <= 0) return null;
  const days    = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hours   = Math.floor((diff / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = timeLeft
    ? [
        { label: 'Days',    value: timeLeft.days    },
        { label: 'Hours',   value: timeLeft.hours   },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
      ]
    : null;

  return (
    <section className="relative py-20 px-4 text-center" id="countdown">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <motion.p
          className="text-center text-purple-500 font-quicksand font-semibold mb-4 text-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎂 Your birthday countdown
        </motion.p>

        <AnimatePresence mode="wait">
          {items ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <div className="flex gap-3 md:gap-6 justify-center">
                {items.map((item) => (
                  <motion.div
                    key={item.label}
                    className="glass-card rounded-2xl p-3 md:p-5 text-center min-w-[70px] md:min-w-[100px] glow-pink"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                  >
                    <motion.span
                      key={item.value}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="block text-2xl md:text-4xl font-bold text-pink-deep"
                    >
                      {String(item.value).padStart(2, '0')}
                    </motion.span>
                    <span className="text-xs md:text-sm text-purple-400 font-medium">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-6 font-dancing text-xl md:text-2xl text-purple-500 italic"
              >
                Till 29 October 2026 — your special day 🎀
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="birthday"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-center"
            >
              <div className="text-7xl mb-4">🎉</div>
              <p className="font-sacramento text-5xl md:text-6xl text-gradient-love">
                Happy Birthday Avii!! 🎂
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
