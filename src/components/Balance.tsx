import React from 'react';
import { TrendingDown } from 'lucide-react';

interface BalanceProps {
  initial: number;
  current: number;
}

export const Balance: React.FC<BalanceProps> = ({ initial, current }) => {
  const spent = initial - current;
  const spentPercentage = (spent / initial) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Balance</h2>
        <TrendingDown className="text-red-500" size={24} />
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600 dark:text-gray-400">Initial Balance</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${initial.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400">Current Balance</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${current.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400">Spent</p>
          <p className="text-2xl font-bold text-red-500">${spent.toLocaleString()}</p>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${spentPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};