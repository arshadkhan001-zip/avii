import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart, Gift } from 'lucide-react';

export default function ProposalSection() {
  const [stage, setStage] = useState<'hidden' | 'box' | 'open' | 'question' | 'success'>('hidden');
  const [noClickCount, setNoClickCount] = useState(0);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonVisible, setNoButtonVisible] = useState(true);

  useEffect(() => {
    // Start with box appearing
    const timer1 = setTimeout(() => setStage('box'), 500);
    const timer2 = setTimeout(() => setStage('open'), 2000);
    const timer3 = setTimeout(() => setStage('question'), 3500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleYes = () => {
    setStage('success');
  };

  const handleNo = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    if (newCount === 1) {
      // First click: grow yes button
      setYesButtonScale(1.5);
    } else if (newCount === 2) {
      // Second click: make no button move erratically
      const randomX = Math.random() * 200 - 100;
      const randomY = Math.random() * 100 - 50;
      setNoButtonPosition({ x: randomX, y: randomY });
    } else if (newCount >= 3) {
      // Third click and beyond: teleport no button away
      setNoButtonVisible(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background decorations */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-purple-50/50 to-rose-100/50"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">
        {/* Stage 1: Box appears */}
        {stage === 'box' && (
          <motion.div
            key="box"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative z-10"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-9xl"
            >
              🎁
            </motion.div>
          </motion.div>
        )}

        {/* Stage 2: Box opens */}
        {stage === 'open' && (
          <motion.div
            key="open"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative z-10 text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: [0, 1.5, 1], rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-9xl mb-8"
            >
              💍
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-dancing text-3xl md:text-4xl text-pink-deep"
            >
              Okay, one question…
            </motion.p>
          </motion.div>
        )}

        {/* Stage 3: The question */}
        {stage === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 text-center max-w-2xl"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-8"
            >
              💍
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sacramento text-5xl md:text-7xl text-gradient-love mb-4"
            >
              So, listen…
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-dancing text-3xl md:text-5xl text-pink-deep mb-12"
            >
              Will you make this birthday extra special? 💕
            </motion.p>

            <div className="flex gap-8 justify-center items-center">
              {/* Yes Button */}
              <motion.button
                onClick={handleYes}
                animate={{ scale: yesButtonScale }}
                whileHover={{ scale: yesButtonScale * 1.1 }}
                whileTap={{ scale: yesButtonScale * 0.9 }}
                className="bg-gradient-to-r from-pink-love to-purple-dream text-white font-quicksand font-bold px-8 py-4 rounded-full shadow-lg text-xl"
              >
                Yes 😭💗
              </motion.button>

              {/* No 😭 😭 Button */}
              {noButtonVisible && (
                <motion.button
                  onClick={handleNo}
                  animate={{ 
                    x: noButtonPosition.x, 
                    y: noButtonPosition.y,
                    rotate: noClickCount >= 2 ? [0, 10, -10, 0] : 0
                  }}
                  transition={{ 
                    x: { type: 'spring', stiffness: 300 },
                    y: { type: 'spring', stiffness: 300 },
                    rotate: { duration: 0.5, repeat: noClickCount >= 2 ? Infinity : 0 }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-300 text-gray-700 font-quicksand font-bold px-8 py-4 rounded-full shadow-lg text-xl"
                >
                  No 😭 😭
                </motion.button>
              )}
            </div>

            {noClickCount === 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 font-quicksand text-purple-500 italic"
              >
                Are you sure? Look how big the Yes button is getting! 😏
              </motion.p>
            )}

            {noClickCount === 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 font-quicksand text-purple-500 italic"
              >
                The No 😭 😭 button is getting scared! Try clicking it again... if you can! 😂
              </motion.p>
            )}

            {noClickCount >= 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 font-quicksand text-purple-500 italic"
              >
                The No 😭 😭 button ran away! Looks like you have to say Yes! 💕
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Stage 4: Success! */}
        {stage === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 text-center max-w-3xl"
          >
            {/* Celebration hearts */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0,
                  opacity: 1 
                }}
                animate={{ 
                  x: Math.random() * 600 - 300,
                  y: Math.random() * 600 - 300,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute top-1/2 left-1/2 pointer-events-none"
              >
                <Heart className="w-8 h-8 text-pink-love fill-pink-love" />
              </motion.div>
            ))}

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-9xl mb-8"
            >
              💕
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sacramento text-5xl md:text-7xl text-gradient-love mb-6"
            >
              I knew you'd say yes!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-dancing text-3xl md:text-4xl text-pink-deep mb-6"
            >
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
    </section>
  );
}
