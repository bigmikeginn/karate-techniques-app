export type Discipline = 'karate' | 'bjj';

export interface Technique {
  name: string;
  slug: string;
  primary: boolean;
  secondary: boolean;
  tertiary: boolean;
  description: string;
  images?: string[];
  videos?: string[];
}

export interface Category {
  name: string;
  slug: string;
  techniques: Technique[];
}
