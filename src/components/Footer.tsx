import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 text-center overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-love to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <motion.div
          className="mb-8"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-16 h-16 mx-auto text-pink-love fill-pink-love drop-shadow-lg" />
        </motion.div>

        <h3 className="font-sacramento text-4xl md:text-5xl text-gradient-love mb-4">
          Made for you ❤️
        </h3>
        
        <p className="font-quicksand text-purple-400 mb-6 max-w-md mx-auto leading-relaxed">
          I wanted to make you something instead of just sending the usual birthday text. It’s not perfect, but I made it for you, and that’s what matters. Happy birthday ❤️
        </p>

        <div className="flex items-center justify-center gap-2 text-sm font-quicksand text-purple-300">
          <Sparkles className="w-4 h-4" />
          <span>Made by me, especially for you</span>
          <Sparkles className="w-4 h-4" />
        </div>

        <motion.div
          className="mt-8 flex items-center justify-center gap-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="font-dancing text-2xl text-pink-deep">
            Now go enjoy your birthday
          </span>
        </motion.div>

        <p className="mt-6 font-quicksand text-xs text-purple-200">
          P.S. Yes, I made a whole website. You’re welcome 😭
        </p>
      </motion.div>
    </footer>
  );
}
