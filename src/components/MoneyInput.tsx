import React from 'react';
import { DollarSign, User } from 'lucide-react';
import { Billionaire } from '../types';
import { billionaires } from '../data/billionaires.ts';

interface MoneyInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const MoneyInput: React.FC<MoneyInputProps> = ({ value, onChange }) => {
  const presetAmounts = [
    { label: '$1M', value: 1000000 },
    { label: '$1B', value: 1000000000 },
    { label: '$10B', value: 10000000000 },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Choose Starting Amount</h2>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter your starting amount"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {presetAmounts.map((amount) => (
            <button
              key={amount.label}
              onClick={() => onChange(amount.value)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {amount.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Or Choose a Billionaire's Fortune</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {billionaires.map((billionaire) => (
            <button
              key={billionaire.id}
              onClick={() => onChange(billionaire.netWorth)}
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={billionaire.image}
                alt={billionaire.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">{billionaire.name}</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  ${(billionaire.netWorth / 1000000000).toFixed(1)}B
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};