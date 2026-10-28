import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart, Quote, Send } from 'lucide-react';

const messages = [
  {
    text: "One more thing, idiot. I’m genuinely glad you’re in my life. You make random days fun, and somehow even the boring ones turn into stories we keep bringing up. ❤️",
    author: "Arshad",
  },
  {
    text: "I probably don’t say this enough, but I appreciate you a lot. Thanks for listening to my nonsense and putting up with me even when I’m being annoying. 😭",
    author: "For real",
  },
  {
    text: "Life would be a lot more boring without our chats, jokes and random drama. I hope we get plenty more memories to laugh about later. 💗",
    author: "Obviously",
  },
  {
    text: "Anyway, enjoy your day properly. Eat something good, take too many pictures, and don’t let anyone ruin your mood. You deserve a good one. 🫶",
    author: "One more thing",
  },
];

const reasons = [
  "You make even a dead chat entertaining 😭",
  "You actually listen when I need to rant",
  "You can make me laugh when I’m in a bad mood",
  "You remember the random little things",
  "You’re honest with me, even when I need to hear it",
  "Your laugh is contagious, unfortunately 😂",
  "You back me up when it matters",
  "You make normal days less boring",
  "You care more than you let on",
  "You’re one of my favourite people, simple as that 💕",
];

export default function MessageSection() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [revealedReasons, setRevealedReasons] = useState<Set<number>>(new Set());

  useEffect(() => {
    setIsTyping(true);
    setTypedText('');
    const text = messages[currentMessage].text;
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.substring(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [currentMessage]);

  const revealReason = (index: number) => {
    setRevealedReasons(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  return (
    <section className="relative py-20 px-4" id="messages">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Quote className="w-6 h-6 text-purple-400" />
          <span className="font-quicksand font-semibold text-purple-400 tracking-widest uppercase text-sm">
            Okay, a little birthday message
          </span>
          <Quote className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="font-sacramento text-5xl md:text-7xl text-gradient-love">
          Things I wanted to say
        </h2>
      </motion.div>

      <div className="max-w-2xl mx-auto mb-16">
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-10 glow-purple relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-love via-purple-dream to-pink-love" />
          
          <div className="flex items-start gap-3 mb-4">
            <Send className="w-5 h-5 text-pink-love mt-1 flex-shrink-0" />
            <div>
              <p className="font-quicksand text-gray-700 text-lg leading-relaxed min-h-[100px]">
                {typedText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-5 bg-pink-love ml-0.5 align-middle"
                  />
                )}
              </p>
              <p className="font-dancing text-xl text-purple-400 mt-4 text-right">
                — {messages[currentMessage].author} 💌
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {messages.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentMessage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentMessage ? 'bg-pink-love w-6' : 'bg-purple-200 hover:bg-purple-300'
                }`}
                whileHover={{ scale: 1.3 }}
                layout
              />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h3 className="font-sacramento text-4xl md:text-5xl text-gradient-love mb-2">
          A few things I like about you
        </h3>
        <p className="font-quicksand text-purple-400/70 text-sm">
          Tap them. I’m not writing all this for nothing 😭
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reasons.map((reason, index) => (
          <motion.button
            key={index}
            onClick={() => revealReason(index)}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className={`relative rounded-2xl p-5 text-left transition-all duration-500 ${
              revealedReasons.has(index)
                ? 'bg-gradient-to-r from-pink-100 to-purple-100 shadow-lg border border-pink-200'
                : 'glass-card hover:shadow-md cursor-pointer'
            }`}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  revealedReasons.has(index)
                    ? 'bg-pink-love text-white'
                    : 'bg-purple-100 text-purple-400'
                }`}
                animate={revealedReasons.has(index) ? { rotate: [0, 360] } : {}}
                transition={{ duration: 0.5 }}
              >
                {index + 1}
              </motion.div>
              <p className={`font-quicksand transition-all duration-500 ${
                revealedReasons.has(index)
                  ? 'text-gray-700'
                  : 'text-purple-300'
              }`}>
                {revealedReasons.has(index) ? reason : 'Tap to see'}
              </p>
            </div>
            {revealedReasons.has(index) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2"
              >
                <Heart className="w-4 h-4 text-pink-love fill-pink-love" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
