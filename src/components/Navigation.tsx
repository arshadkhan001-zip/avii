import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#', emoji: '🏠' },
  { label: 'Gallery', href: '#gallery', emoji: '📸' },
  { label: 'Game', href: '#game', emoji: '🎮' },
  { label: 'Memes', href: '#memes', emoji: '😂' },
  { label: 'Messages', href: '#messages', emoji: '💌' },
  { label: 'Surprise', href: '#surprise', emoji: '🎨' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 100 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      >
        <div className="max-w-4xl mx-auto glass-card rounded-2xl px-4 py-2.5 flex items-center justify-between">
          <motion.a
            href="#"
            className="flex items-center gap-2 font-dancing text-xl text-pink-deep"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-5 h-5 text-pink-love fill-pink-love animate-heartbeat" />
            <span>Birthday page</span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="font-quicksand text-sm font-medium text-purple-500 hover:text-pink-deep px-3 py-1.5 rounded-full hover:bg-pink-50 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {item.emoji} {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full hover:bg-pink-50"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="w-5 h-5 text-pink-deep" /> : <Menu className="w-5 h-5 text-pink-deep" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-4 right-4 z-50 md:hidden"
          >
            <div className="glass-card rounded-2xl p-4 shadow-xl">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 font-quicksand font-medium text-purple-500 hover:text-pink-deep px-4 py-3 rounded-xl hover:bg-pink-50 transition-all"
                >
                  <span className="text-lg">{item.emoji}</span>
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
