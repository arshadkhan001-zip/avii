import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Gamepad2, Heart, Star, Gift, Trophy, RotateCcw } from 'lucide-react';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'star' | 'gift' | 'bomb';
  speed: number;
  points: number;
}

const GAME_WIDTH = 360;
const GAME_HEIGHT = 500;
const CATCHER_WIDTH = 70;
const ITEM_SIZE = 36;

export default function GameSection() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [catcherX, setCatcherX] = useState(GAME_WIDTH / 2 - CATCHER_WIDTH / 2);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [sparkles, setSparkles] = useState<{id: number, x: number, y: number}[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const itemIdRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const comboRef = useRef(0);
  const catcherXRef = useRef(GAME_WIDTH / 2 - CATCHER_WIDTH / 2);

  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { livesRef.current = lives; }, [lives]);
  useEffect(() => { comboRef.current = combo; }, [combo]);
  useEffect(() => { catcherXRef.current = catcherX; }, [catcherX]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setItems([]);
    setCombo(0);
    setCatcherX(GAME_WIDTH / 2 - CATCHER_WIDTH / 2);
    scoreRef.current = 0;
    livesRef.current = 3;
    comboRef.current = 0;
    lastSpawnRef.current = Date.now();
  };

  const spawnItem = useCallback(() => {
    const types: Array<'heart' | 'star' | 'gift' | 'bomb'> = ['heart', 'heart', 'heart', 'star', 'star', 'gift', 'bomb'];
    const type = types[Math.floor(Math.random() * types.length)];
    const points = type === 'heart' ? 10 : type === 'star' ? 25 : type === 'gift' ? 50 : -1;
    
    const newItem: FallingItem = {
      id: itemIdRef.current++,
      x: Math.random() * (GAME_WIDTH - ITEM_SIZE),
      y: -ITEM_SIZE,
      type,
      speed: 2 + Math.random() * 2 + (scoreRef.current / 100),
      points,
    };
    setItems(prev => [...prev, newItem]);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent | React.TouchEvent) => {
    if (gameState !== 'playing' || !gameRef.current) return;
    const rect = gameRef.current.getBoundingClientRect();
    let clientX: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    const x = clientX - rect.left - CATCHER_WIDTH / 2;
    setCatcherX(Math.max(0, Math.min(GAME_WIDTH - CATCHER_WIDTH, x)));
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      const now = Date.now();
      
      const spawnInterval = Math.max(400, 1000 - scoreRef.current * 3);
      if (now - lastSpawnRef.current > spawnInterval) {
        spawnItem();
        lastSpawnRef.current = now;
      }

      setItems(prev => {
        let newLives = livesRef.current;
        let newScore = scoreRef.current;
        let newCombo = comboRef.current;
        let caught = false;

        const remaining = prev.map(item => ({
          ...item,
          y: item.y + item.speed,
        })).filter(item => {
          const catcherTop = GAME_HEIGHT - 60;
          const itemBottom = item.y + ITEM_SIZE;
          const itemCenterX = item.x + ITEM_SIZE / 2;
          const cX = catcherXRef.current;

          if (itemBottom >= catcherTop && item.y <= GAME_HEIGHT && 
              itemCenterX >= cX && itemCenterX <= cX + CATCHER_WIDTH) {
            if (item.type === 'bomb') {
              newLives--;
              newCombo = 0;
            } else {
              const multiplier = Math.min(newCombo + 1, 5);
              newScore += item.points * multiplier;
              newCombo++;
              caught = true;
              setSparkles(sp => [...sp, { id: Date.now() + Math.random(), x: item.x + ITEM_SIZE / 2, y: catcherTop }]);
              setTimeout(() => setSparkles(sp => sp.slice(1)), 600);
            }
            return false;
          }

          if (item.y > GAME_HEIGHT) {
            if (item.type !== 'bomb') {
              newLives--;
              newCombo = 0;
            }
            return false;
          }
          return true;
        });

        if (newScore !== scoreRef.current) {
          setScore(newScore);
          scoreRef.current = newScore;
        }
        if (newCombo !== comboRef.current) {
          setCombo(newCombo);
          comboRef.current = newCombo;
        }
        if (caught) {
          setShowCombo(true);
          setTimeout(() => setShowCombo(false), 800);
        }
        if (newLives !== livesRef.current) {
          setLives(newLives);
          livesRef.current = newLives;
          if (newLives <= 0) {
            setGameState('gameover');
            setHighScore(prev => Math.max(prev, newScore));
          }
        }

        return remaining;
      });

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [gameState, spawnItem]);

  const renderItem = (item: FallingItem) => {
    switch (item.type) {
      case 'heart':
        return <Heart className="w-8 h-8 text-pink-500 fill-pink-500 drop-shadow-lg" />;
      case 'star':
        return <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 drop-shadow-lg" />;
      case 'gift':
        return <Gift className="w-8 h-8 text-purple-500 drop-shadow-lg" />;
      case 'bomb':
        return <span className="text-2xl">💣</span>;
    }
  };

  return (
    <section className="relative py-20 px-4" id="game">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Gamepad2 className="w-6 h-6 text-purple-400" />
          <span className="font-quicksand font-semibold text-purple-400 tracking-widest uppercase text-sm">
            Mini Game
          </span>
          <Gamepad2 className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="font-sacramento text-5xl md:text-7xl text-gradient-love">
          Catch the hearts
        </h2>
        <p className="font-quicksand text-purple-400/70 mt-3 max-w-md mx-auto">
          Move the basket to catch hearts, stars & gifts! Avoid the bombs! 💣
        </p>
      </motion.div>

      <div className="flex justify-center">
        <div className="relative">
          <div
            ref={gameRef}
            className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-200/50"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
            onPointerMove={handlePointerMove}
            onTouchMove={handlePointerMove}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-pink-100 via-purple-50 to-rose-100">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-16 h-8 bg-white/40 rounded-full"
                  style={{ top: 30 + i * 80, left: 20 + i * 60 }}
                  animate={{ x: [0, 20, 0] }}
                  transition={{ duration: 8 + i * 2, repeat: Infinity }}
                />
              ))}
            </div>

            {gameState === 'playing' && (
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20">
                <div className="glass-card rounded-full px-3 py-1.5 flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="font-quicksand font-bold text-sm text-pink-deep">{score}</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-5 h-5 ${
                        i < lives ? 'text-red-500 fill-red-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence>
              {showCombo && combo > 1 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-12 left-1/2 -translate-x-1/2 z-20"
                >
                  <span className="font-quicksand font-bold text-lg text-purple-600 bg-white/80 rounded-full px-3 py-1">
                    {combo}x Combo! 🔥
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {items.map(item => (
              <motion.div
                key={item.id}
                className="absolute"
                style={{ left: item.x, top: item.y }}
                animate={{ rotate: item.type === 'bomb' ? [0, 10, -10, 0] : [0, 360] }}
                transition={{ 
                  rotate: { duration: item.type === 'bomb' ? 0.5 : 3, repeat: Infinity }
                }}
              >
                {renderItem(item)}
              </motion.div>
            ))}

            {sparkles.map(s => (
              <motion.div
                key={s.id}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute z-30 pointer-events-none"
                style={{ left: s.x - 10, top: s.y - 10 }}
              >
                <span className="text-2xl">✨</span>
              </motion.div>
            ))}

            {gameState === 'playing' && (
              <motion.div
                className="absolute z-10"
                style={{
                  left: catcherX,
                  bottom: 15,
                  width: CATCHER_WIDTH,
                }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="relative">
                  <div className="text-4xl text-center">🧺</div>
                  <motion.div 
                    className="absolute -top-1 left-1/2 -translate-x-1/2"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {gameState === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-gradient-to-b from-pink-100/90 to-purple-100/90">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-6"
                >
                  💝
                </motion.div>
                <h3 className="font-dancing text-3xl text-pink-deep mb-2">Catch the hearts</h3>
                <p className="font-quicksand text-sm text-purple-400 mb-6 text-center px-8">
                  Move the basket with your mouse or finger. Catch the good stuff and avoid the bombs.
                </p>
                <motion.button
                  onClick={startGame}
                  className="bg-gradient-to-r from-pink-love to-purple-dream text-white font-quicksand font-bold px-8 py-3 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Okay, play
                </motion.button>
              </div>
            )}

            {gameState === 'gameover' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-gradient-to-b from-pink-100/95 to-purple-100/95"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="font-dancing text-3xl text-pink-deep mb-1">Look at that score!</h3>
                <p className="font-quicksand text-2xl font-bold text-purple-600 mb-1">
                  Score: {score}
                </p>
                {score >= highScore && score > 0 && (
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="font-quicksand text-sm text-yellow-500 font-bold mb-2"
                  >
                    🏆 New best score!
                  </motion.p>
                )}
                <p className="font-quicksand text-sm text-purple-400 mb-6">
                  Not bad. Try beating that score now.
                </p>
                <motion.button
                  onClick={startGame}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-love to-purple-dream text-white font-quicksand font-bold px-6 py-3 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Run it back!
                </motion.button>
              </motion.div>
            )}
          </div>

          <div className="mt-4 flex justify-center gap-4 text-xs font-quicksand text-purple-400">
            <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> +10</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> +25</span>
            <span className="flex items-center gap-1"><Gift className="w-3 h-3 text-purple-500" /> +50</span>
            <span className="flex items-center gap-1">💣 -1 life</span>
          </div>
        </div>
      </div>
    </section>
  );
}