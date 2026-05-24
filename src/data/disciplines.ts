import { Category, Discipline } from '@/types/technique';
import karateTechniques from '@/data/techniques.json';
import bjjTechniques from '@/data/bjj-techniques.json';

export const disciplines: Record<Discipline, {
  id: Discipline;
  label: string;
  shortLabel: string;
  title: string;
  logoAlt: string;
  categories: Category[];
}> = {
  karate: {
    id: 'karate',
    label: 'Karate',
    shortLabel: 'Karate',
    title: 'Jitsu-Do Karate',
    logoAlt: 'Jitsu-Do Karate',
    categories: karateTechniques as Category[],
  },
  bjj: {
    id: 'bjj',
    label: 'BJJ',
    shortLabel: 'BJJ',
    title: 'Jitsu-Do BJJ',
    logoAlt: 'Jitsu-Do BJJ',
    categories: bjjTechniques as Category[],
  },
};
