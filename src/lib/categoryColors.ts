// Category color schemes
export const categoryColors: Record<string, {
  bg: string;
  text: string;
  border: string;
  hover: string;
}> = {
  'stances-dachi': {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-300 dark:border-blue-700',
    hover: 'hover:border-blue-500 dark:hover:border-blue-400'
  },
  'blocks-uke': {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-300 dark:border-green-700',
    hover: 'hover:border-green-500 dark:hover:border-green-400'
  },
  'punches-zuki': {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-300 dark:border-red-700',
    hover: 'hover:border-red-500 dark:hover:border-red-400'
  },
  'kicks-geri': {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-300 dark:border-orange-700',
    hover: 'hover:border-orange-500 dark:hover:border-orange-400'
  },
  'strikes-uchi': {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-700 dark:text-yellow-300',
    border: 'border-yellow-300 dark:border-yellow-700',
    hover: 'hover:border-yellow-500 dark:hover:border-yellow-400'
  },
  'forms-routines-kata': {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-300 dark:border-purple-700',
    hover: 'hover:border-purple-500 dark:hover:border-purple-400'
  },
  'concepts': {
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    text: 'text-pink-700 dark:text-pink-300',
    border: 'border-pink-300 dark:border-pink-700',
    hover: 'hover:border-pink-500 dark:hover:border-pink-400'
  },
  'self-defense-goshin-jitsu': {
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-300 dark:border-indigo-700',
    hover: 'hover:border-indigo-500 dark:hover:border-indigo-400'
  },
  'goshin-jitsu-grab-escapes': {
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    text: 'text-cyan-700 dark:text-cyan-300',
    border: 'border-cyan-300 dark:border-cyan-700',
    hover: 'hover:border-cyan-500 dark:hover:border-cyan-400'
  },
  'goshin-jitsu-throws': {
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-300 dark:border-teal-700',
    hover: 'hover:border-teal-500 dark:hover:border-teal-400'
  },
  'goshin-jitsu-joint-attacks-strangles': {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-300 dark:border-emerald-700',
    hover: 'hover:border-emerald-500 dark:hover:border-emerald-400'
  },
  'falls-rolls-ukemi': {
    bg: 'bg-lime-50 dark:bg-lime-900/20',
    text: 'text-lime-700 dark:text-lime-300',
    border: 'border-lime-300 dark:border-lime-700',
    hover: 'hover:border-lime-500 dark:hover:border-lime-400'
  },
  'grappling': {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-300 dark:border-amber-700',
    hover: 'hover:border-amber-500 dark:hover:border-amber-400'
  },
  'weapons-kobudo': {
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-300 dark:border-rose-700',
    hover: 'hover:border-rose-500 dark:hover:border-rose-400'
  },
  'bjj-positions': {
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    text: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-300 dark:border-sky-700',
    hover: 'hover:border-sky-500 dark:hover:border-sky-400'
  },
  'bjj-movement-fundamentals': {
    bg: 'bg-lime-50 dark:bg-lime-900/20',
    text: 'text-lime-700 dark:text-lime-300',
    border: 'border-lime-300 dark:border-lime-700',
    hover: 'hover:border-lime-500 dark:hover:border-lime-400'
  },
  'bjj-escapes': {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-300 dark:border-amber-700',
    hover: 'hover:border-amber-500 dark:hover:border-amber-400'
  },
  'bjj-guards': {
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    text: 'text-violet-700 dark:text-violet-300',
    border: 'border-violet-300 dark:border-violet-700',
    hover: 'hover:border-violet-500 dark:hover:border-violet-400'
  },
  'bjj-sweeps': {
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    text: 'text-pink-700 dark:text-pink-300',
    border: 'border-pink-300 dark:border-pink-700',
    hover: 'hover:border-pink-500 dark:hover:border-pink-400'
  },
  'bjj-guard-passing': {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-300 dark:border-orange-700',
    hover: 'hover:border-orange-500 dark:hover:border-orange-400'
  },
  'bjj-submissions': {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-300 dark:border-red-700',
    hover: 'hover:border-red-500 dark:hover:border-red-400'
  },
  'bjj-takedowns': {
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-300 dark:border-teal-700',
    hover: 'hover:border-teal-500 dark:hover:border-teal-400'
  },
  'bjj-transitions-control': {
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-300 dark:border-indigo-700',
    hover: 'hover:border-indigo-500 dark:hover:border-indigo-400'
  }
};

export function getCategoryColor(categorySlug: string) {
  return categoryColors[categorySlug] || {
    bg: 'bg-gray-50 dark:bg-gray-900/20',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-300 dark:border-gray-700',
    hover: 'hover:border-gray-500 dark:hover:border-gray-400'
  };
}
