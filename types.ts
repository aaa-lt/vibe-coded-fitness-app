export enum TrainingGoal {
  WeightLoss = 'Похудение',
  MuscleGain = 'Набор массы',
  Endurance = 'Выносливость',
  Flexibility = 'Гибкость',
  Strength = 'Сила'
}

export enum FitnessLevel {
  Beginner = 'Новичок',
  Intermediate = 'Любитель',
  Advanced = 'Профессионал'
}

export interface Trainer {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}