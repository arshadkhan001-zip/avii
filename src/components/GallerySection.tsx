import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const photos = [
  {
    url: `${import.meta.env.BASE_URL}avii-1.jpg`,
    caption: 'My favourite girl 🖤',
    color: 'from-pink-400 to-rose-400',
  },
  {
    url: `${import.meta.env.BASE_URL}avii-2.jpg`,
    caption: "Mirror knows what's up 💗",
    color: 'from-purple-400 to-violet-400',
  },
  {
    url: `${import.meta.env.BASE_URL}avii-3.jpg`,
    caption: 'You look stunning, always 🌸',
    color: 'from-rose-400 to-pink-400',
  },
];

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [showHearts, setShowHearts] = useState<{id: number, x: number, y: number}[]>([]);

  const nextPhoto = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
  const prevPhoto = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const toggleLike = (index: number, e: React.MouseEvent) => {
    const newLiked = new Set(liked);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const hearts = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: rect.left + Math.random() * 40 - 20,
        y: rect.top,
      }));
      setShowHearts(prev => [...prev, ...hearts]);
      setTimeout(() => {
        setShowHearts(prev => prev.filter(h => !hearts.find(nh => nh.id === h.id)));
      }, 1500);
    }
    setLiked(newLiked);
  };

  return (
    <section className="relative py-20 px-4" id="gallery">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Camera className="w-6 h-6 text-purple-400" />
          <span className="font-quicksand font-semibold text-purple-400 tracking-widest uppercase text-sm">
            The photo dump
          </span>
          <Camera className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="font-sacramento text-5xl md:text-7xl text-gradient-love">
          Some of my favourite pics
        </h2>
        <p className="font-quicksand text-purple-400/70 mt-3 max-w-md mx-auto">
          Some pictures just deserve their own little corner.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: -15 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative"
            >
              <div className={`relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${photos[currentIndex].color} p-1.5`}>
                <div className="rounded-2xl overflow-hidden bg-white">
                  <img
                    src={photos[currentIndex].url}
                    alt={photos[currentIndex].caption}
                    className="w-full h-[400px] md:h-[550px] object-cover"
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-b-3xl p-6">
                  <motion.p
                    key={`caption-${currentIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-dancing text-2xl md:text-3xl text-white text-center"
                  >
                    {photos[currentIndex].caption}
                  </motion.p>
                </div>

                <motion.button
                  onClick={(e) => toggleLike(currentIndex, e)}
                  className="absolute top-4 right-4 glass-card rounded-full p-3"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Heart
                    className={`w-6 h-6 transition-all ${
                      liked.has(currentIndex)
                        ? 'text-red-500 fill-red-500'
                        : 'text-white'
                    }`}
                  />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            onClick={prevPhoto}
            className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 glass-card rounded-full p-3 glow-pink"
            whileHover={{ scale: 1.2, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 text-pink-deep" />
          </motion.button>
          <motion.button
            onClick={nextPhoto}
            className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 glass-card rounded-full p-3 glow-pink"
            whileHover={{ scale: 1.2, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-pink-deep" />
          </motion.button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {photos.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentIndex
                  ? 'bg-pink-love w-8'
                  : 'bg-purple-200 hover:bg-purple-300'
              }`}
              whileHover={{ scale: 1.3 }}
              layout
            />
          ))}
        </div>

        <div className="flex gap-3 mt-8 justify-center overflow-x-auto pb-2">
          {photos.map((photo, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`relative rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                i === currentIndex
                  ? 'ring-3 ring-pink-love scale-110'
                  : 'opacity-60 hover:opacity-100'
              }`}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <img
                src={photo.url}
                alt=""
                className="w-16 h-16 md:w-20 md:h-20 object-cover"
              />
              {liked.has(i) && (
                <div className="absolute top-1 right-1">
                  <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {showHearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 1, y: 0, x: heart.x, scale: 0.5 }}
          animate={{ opacity: 0, y: -150, x: heart.x + Math.random() * 60 - 30, scale: 1.5 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="fixed z-50 pointer-events-none"
          style={{ top: heart.y }}
        >
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        </motion.div>
      ))}
    </section>
  );
}
