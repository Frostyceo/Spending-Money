import React, { useState, useEffect } from 'react';
import { MoneyInput } from './components/MoneyInput';
import { ItemCard } from './components/ItemCard';
import { CelebrityCard } from './components/CelebrityCard';
import { Balance } from './components/Balance';
import { DarkModeToggle } from './components/DarkModeToggle';
import { items } from './data/items';
import { celebrities } from './data/celebrities';
import { Wallet, Share2 } from 'lucide-react';

function App() {
  const [initialBalance, setInitialBalance] = useState(1000000000);
  const [currentBalance, setCurrentBalance] = useState(initialBalance);
  const [purchases, setPurchases] = useState<Record<string, number>>({});
  const [hiredCelebrities, setHiredCelebrities] = useState<Record<string, number>>({});
  const [gameStarted, setGameStarted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (!gameStarted) {
      setCurrentBalance(initialBalance);
      setPurchases({});
      setHiredCelebrities({});
    }
  }, [initialBalance, gameStarted]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleBuyItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (item && currentBalance >= item.price) {
      setPurchases((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
      setCurrentBalance((prev) => prev - item.price);
    }
  };

  const handleSellItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (item && purchases[itemId] > 0) {
      setPurchases((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      setCurrentBalance((prev) => prev + item.price);
    }
  };

  const handleHireCelebrity = (celebrityId: string, days: number) => {
    const celebrity = celebrities.find((c) => c.id === celebrityId);
    if (celebrity && currentBalance >= celebrity.costPerDay * days) {
      setHiredCelebrities((prev) => ({ ...prev, [celebrityId]: (prev[celebrityId] || 0) + days }));
      setCurrentBalance((prev) => prev - celebrity.costPerDay * days);
    }
  };

  const handleShare = () => {
    const text = `I spent $${(initialBalance - currentBalance).toLocaleString()} playing the Fortune Spender Game! Can you spend it better?`;
    if (navigator.share) {
      navigator.share({
        title: 'Fortune Spender Game',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Share text copied to clipboard!');
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="absolute top-4 right-4">
            <DarkModeToggle isDark={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
          </div>
          <Wallet className="mx-auto text-blue-500" size={64} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Fortune Spender</h1>
          <p className="text-gray-600 dark:text-gray-400">How would you spend your fortune?</p>
          <MoneyInput value={initialBalance} onChange={setInitialBalance} />
          <button
            onClick={handleStartGame}
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start Spending
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fortune Spender</h1>
          <div className="flex items-center gap-4">
            <DarkModeToggle isDark={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Share2 size={20} />
              Share
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Luxury Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  quantity={purchases[item.id] || 0}
                  onBuy={() => handleBuyItem(item.id)}
                  onSell={() => handleSellItem(item.id)}
                  disabled={currentBalance < item.price}
                />
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Hire Celebrities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {celebrities.map((celebrity) => (
                <CelebrityCard
                  key={celebrity.id}
                  celebrity={celebrity}
                  onHire={(days) => handleHireCelebrity(celebrity.id, days)}
                  disabled={currentBalance < celebrity.costPerDay}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Balance initial={initialBalance} current={currentBalance} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;