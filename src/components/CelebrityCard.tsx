import React, { useState } from 'react';
import { Clock, Briefcase, Star } from 'lucide-react';
import { Celebrity } from '../types';

interface CelebrityCardProps {
  celebrity: Celebrity;
  onHire: (days: number) => void;
  disabled: boolean;
}

export const CelebrityCard: React.FC<CelebrityCardProps> = ({ celebrity, onHire, disabled }) => {
  const [days, setDays] = useState(1);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <img src={celebrity.image} alt={celebrity.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{celebrity.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Briefcase size={16} className="text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">{celebrity.company}</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Star size={16} className="text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">{celebrity.expertise}</p>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Net Worth: ${celebrity.netWorth.toLocaleString()}</p>
        <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">
          ${celebrity.costPerDay.toLocaleString()}/day
        </p>
        <div className="flex items-center gap-2 mt-4">
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value)))}
            className="w-20 px-2 py-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <Clock className="text-gray-400" size={20} />
          <button
            onClick={() => onHire(days)}
            disabled={disabled}
            className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Hire
          </button>
        </div>
      </div>
    </div>
  );
};