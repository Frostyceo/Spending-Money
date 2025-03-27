export interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface Celebrity {
  id: string;
  name: string;
  image: string;
  netWorth: number;
  costPerDay: number;
  company: string;
  expertise: string;
}

export interface Billionaire {
  id: string;
  name: string;
  image: string;
  netWorth: number;
  company: string;
}

export interface Player {
  name: string;
  initialBalance: number;
  currentBalance: number;
  purchases: { item: Item; quantity: number }[];
  hiredCelebrities: { celebrity: Celebrity; days: number }[];
}