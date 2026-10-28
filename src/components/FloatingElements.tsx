import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingItem {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'star' | 'sparkle' | 'butterfly';
  color: string;
}

const colors = ['#ff6b9d', '#c44569', '#a855f7', '#f59e0b', '#fb7185', '#c4b5fd', '#fbbf8e'];

export default function FloatingElements() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const generated: FloatingItem[] = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
      type: (['heart', 'star', 'sparkle', 'butterfly'] as const)[Math.floor(Math.random() * 4)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setItems(generated);
  }, []);

  const renderShape = (item: FloatingItem) => {
    switch (item.type) {
      case 'heart':
        return (
          <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill={item.color}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      case 'star':
        return (
          <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill={item.color}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      case 'sparkle':
        return (
          <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill={item.color}>
            <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"/>
          </svg>
        );
      case 'butterfly':
        return (
          <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill={item.color}>
            <path d="M12 12c-2-2.67-6-4-8-2s-1 6 2 8c2 1.33 4 1 6-1 2 2 4 2.33 6 1 3-2 4-6 2-8s-6-.67-8 2z"/>
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
          animate={{
            y: [0, -30, -10, -40, 0],
            x: [0, 10, -10, 5, 0],
            rotate: [0, 10, -10, 5, 0],
            opacity: [0.16, 0.38, 0.25, 0.42, 0.16],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {renderShape(item)}
        </motion.div>
      ))}
    </div>
  );
}
