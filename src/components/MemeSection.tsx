import { motion } from 'framer-motion';
import { useState } from 'react';
import { Laugh, Heart } from 'lucide-react';

const memes = [
  {
    topText: "Her: 'I'm leaving in 5 mins'",
    bottomText: "Me still waiting 😭",
    emoji: "⏰",
    bgColor: "from-yellow-200 to-orange-200",
    reaction: "This has happened too many times",
  },
  {
    topText: "Nobody:",
    bottomText: "Us at 3am: one last thing…",
    emoji: "🌙",
    bgColor: "from-indigo-200 to-purple-200",
    reaction: "And then it’s suddenly 4am",
  },
  {
    topText: "Me: I'm fine",
    bottomText: "Her: “You’re being weird. What happened?”",
    emoji: "🫂",
    bgColor: "from-pink-200 to-rose-200",
    reaction: "Can’t hide anything from her",
  },
  {
    topText: "Someone does something mildly suspicious",
    bottomText: "Us immediately looking at each other 👀",
    emoji: "👯",
    bgColor: "from-teal-200 to-cyan-200",
    reaction: "Same brain cell, different days",
  },
  {
    topText: "When someone interrupts our conversation",
    bottomText: "The look says everything 💀",
    emoji: "😒",
    bgColor: "from-fuchsia-200 to-pink-200",
    reaction: "Noted. Moving on.",
  },
  {
    topText: "When we make eye contact across the room",
    bottomText: "No explanation needed 😭",
    emoji: "✨",
    bgColor: "from-amber-200 to-yellow-200",
    reaction: "We really need to act normal",
  },
];

export default function MemeSection() {
  const [likedMemes, setLikedMemes] = useState<Set<number>>(new Set());

  const toggleMemeLike = (index: number) => {
    setLikedMemes(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section className="relative py-20 px-4" id="memes">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Laugh className="w-6 h-6 text-purple-400" />
          <span className="font-quicksand font-semibold text-purple-400 tracking-widest uppercase text-sm">
            A few very accurate situations
          </span>
          <Laugh className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="font-sacramento text-5xl md:text-7xl text-gradient-love">
          This is literally us
        </h2>
        <p className="font-quicksand text-purple-400/70 mt-3 max-w-md mx-auto">
          Some of these are a little too accurate. Just saying.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memes.map((meme, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, rotate: 1, y: -5 }}
            className="relative group"
          >
            <div className={`bg-gradient-to-br ${meme.bgColor} rounded-2xl p-6 shadow-lg border border-white/50 h-full flex flex-col`}>
              <div className="text-center mb-3">
                <motion.span
                  className="text-5xl inline-block"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                >
                  {meme.emoji}
                </motion.span>
              </div>

              <div className="flex-1 flex flex-col justify-center text-center space-y-3">
                <p className="font-quicksand font-bold text-gray-700 text-lg leading-tight">
                  {meme.topText}
                </p>
                <p className="font-quicksand font-bold text-gray-800 text-xl leading-tight">
                  {meme.bottomText}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-quicksand text-sm text-gray-500 italic">
                  {meme.reaction}
                </span>
                <motion.button
                  onClick={() => toggleMemeLike(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.7 }}
                  className="flex items-center gap-1"
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${
                      likedMemes.has(index)
                        ? 'text-red-500 fill-red-500'
                        : 'text-gray-400 hover:text-red-400'
                    }`}
                  />
                </motion.button>
              </div>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-lg">😂</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <div className="inline-block glass-card rounded-2xl px-6 py-4">
          <p className="font-dancing text-xl text-pink-deep">
            "We can go hours without talking...
            <br />
            <span className="text-purple-500">then send 27 messages at once" 💬</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}