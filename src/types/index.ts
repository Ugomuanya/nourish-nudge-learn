export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  badges: Badge[];
  completedModules: string[];
  moduleProgress: Record<string, ModuleProgress>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  quiz: Quiz;
  icon: string;
  color: string;
}

export interface Quiz {
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ModuleProgress {
  completed: boolean;
  score: number;
  attempts: number;
  lastAttempt?: Date;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  pointsEarned: number;
  passed: boolean;
}