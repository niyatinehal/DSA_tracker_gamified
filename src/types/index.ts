export interface User {
  id: string;
  name: string;
  email: string;
  avatar: {
    skinColor: string;
    hairColor: string;
    bodyColor: string;
    accessory: 'none' | 'hat' | 'glasses';
  };
  currentStreak: number;
  bestStreak: number;
  treesPlanted: number;
  totalSolved: number;
  lastCompletedDate: string;
  joinDate: string;
}

export interface Question {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  template: string;
  testCases: Array<{ input: string; expected: string }>;
  url: string;
}

export interface Avatar {
  bodyColor: string;
  skinColor: string;
  hairColor: string;
  accessory?: "hat" | "glasses" | null;
}