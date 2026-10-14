export type ActiveView = 
  | 'cover'
  | 'letter-map'
  | 'intro-area'
  | 'mission-1'
  | 'mission-2'
  | 'mission-3'
  | 'mission-4'
  | 'mission-5'
  | 'secret-table'
  | 'quiz-assessment';

export interface MissionProgress {
  mission1: boolean;
  mission2: boolean;
  mission3: boolean;
  mission4: boolean;
  mission5: boolean;
}

export interface QuizQuestion {
  id: number;
  title: string;
  isBonus?: boolean;
  story: string;
  shapeName: string;
  formulaHint: string;
  dimensions: { [key: string]: number | string };
  correctAnswer: number;
  unit: string;
  options: number[];
  explanation: string;
  stepByStep: string[];
}
