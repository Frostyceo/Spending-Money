import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
  quantity: number;
  onBuy: () => void;
  onSell: () => void;
  disabled: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, quantity, onBuy, onSell, disabled }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.name}</h3>
        <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
          ${item.price.toLocaleString()}
        </p>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={onSell}
            disabled={quantity === 0}
            className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 disabled:opacity-50"
          >
            <Minus size={20} />
          </button>
          <span className="text-xl font-bold text-gray-900 dark:text-white">{quantity}</span>
          <button
            onClick={onBuy}
            disabled={disabled}
            className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 disabled:opacity-50"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};