'use client';

import { useState } from 'react';
import { Category, Discipline, Technique } from '@/types/technique';
import { disciplines } from '@/data/disciplines';
import { getDescription } from '@/data/technique_descriptions';
import { getCategoryColor } from '@/lib/categoryColors';
import { getEnglishName, isJapaneseName } from '@/data/technique_translations';

type DisplayTechnique = Technique & {
  category: string;
  categorySlug: string;
  uniqueKey: string;
};

const disciplineIds = Object.keys(disciplines) as Discipline[];

function getTechniqueTier(technique: Technique) {
  if (technique.primary) return 'Primary';
  if (technique.secondary) return 'Secondary';
  if (technique.tertiary) return 'Tertiary';
  return null;
}

function TechniqueTierMarker({
  tier,
  colorClass,
}: {
  tier: 'Secondary' | 'Tertiary';
  colorClass: string;
}) {
  if (tier === 'Tertiary') {
    return (
      <span
        className={`absolute right-2 top-1.5 text-sm leading-none ${colorClass}`}
        title="Tertiary technique"
        aria-label="Tertiary technique"
      >
        *
      </span>
    );
  }

  return (
    <span
      className={`absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-current ${colorClass}`}
      title="Secondary technique"
      aria-label="Secondary technique"
    />
  );
}

function DisciplineToggle({
  activeDiscipline,
  compact = false,
  onChange,
}: {
  activeDiscipline: Discipline;
  compact?: boolean;
  onChange: (discipline: Discipline) => void;
}) {
  return (
    <div className={`inline-grid grid-cols-2 rounded border border-white/20 bg-black p-1 ${compact ? 'w-full' : 'min-w-52'}`}>
      {disciplineIds.map((id) => {
        const isActive = activeDiscipline === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`rounded-sm px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
              isActive
                ? 'bg-red-600 text-white'
                : 'text-white/55 hover:bg-white/5 hover:text-white'
            }`}
            aria-pressed={isActive}
          >
            {disciplines[id].shortLabel}
          </button>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline>('karate');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<DisplayTechnique | null>(null);
  const discipline = disciplines[activeDiscipline];
  const categories: Category[] = discipline.categories;

  const switchDiscipline = (nextDiscipline: Discipline) => {
    if (nextDiscipline === activeDiscipline) return;
    setActiveDiscipline(nextDiscipline);
    setSelectedCategories(new Set());
    setSearchTerm('');
    setSelectedTechnique(null);
    setSidebarOpen(false);
  };

  const toggleCategory = (slug: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(slug)) {
      newSelected.delete(slug);
    } else {
      newSelected.add(slug);
    }
    setSelectedCategories(newSelected);
  };

  const selectAllCategories = () => {
    setSelectedCategories(new Set(categories.map(cat => cat.slug)));
  };

  const clearAllCategories = () => {
    setSelectedCategories(new Set());
  };

  // Get filtered techniques based on selected categories and search term
  const filteredTechniques = categories
    .filter(cat => selectedCategories.size === 0 || selectedCategories.has(cat.slug))
    .flatMap(cat => cat.techniques
      .filter(tech => 
        tech.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(tech => tech.primary || tech.secondary || tech.tertiary)
      .map(tech => ({ 
        ...tech, 
        category: cat.name,
        categorySlug: cat.slug,
        uniqueKey: `${cat.slug}-${tech.slug}`,
        description: getDescription(tech.name)
      }))
    );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header - Jitsu-Do Style */}
      <header className="bg-[#111111] border-b border-white/10 sticky top-0 z-20">
        <div className="px-4 sm:px-6 lg:px-8 py-3 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(280px,1fr)_auto_minmax(280px,1fr)] lg:items-center">
          <div className="flex items-center gap-3 sm:gap-4 w-full min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-white/55 hover:text-white border border-white/20 hover:border-white/60 transition-colors rounded"
              aria-label="Open categories"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="bg-[#111111] rounded px-2 py-1">
              <img 
                src="/karate-logo.png?v=1" 
                alt={discipline.logoAlt}
                className="h-10 sm:h-12 w-auto"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                {discipline.title}
              </h1>
              <p className="text-xs tracking-[0.25em] uppercase text-white/40">
                {discipline.label} Techniques Library
              </p>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <DisciplineToggle activeDiscipline={activeDiscipline} onChange={switchDiscipline} />
          </div>

          <div className="w-full lg:max-w-xl lg:justify-self-end">
            <div className="mb-3 lg:hidden">
              <DisciplineToggle activeDiscipline={activeDiscipline} compact onChange={switchDiscipline} />
            </div>
            <input
              type="text"
              placeholder={`Search ${discipline.label} techniques...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-sm bg-black border border-white/20 rounded focus:ring-1 focus:ring-red-600 focus:border-red-600 text-white placeholder-white/40"
            />
            <p className="text-xs text-white/40 mt-1 tracking-wide">
              {filteredTechniques.length} techniques shown
            </p>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-100px)]">
        {/* Sidebar - Jitsu-Do Dark Theme */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0
          fixed lg:relative z-30 lg:z-0
          w-72 bg-[#111111] border-r border-white/10
          overflow-auto
          transition-transform duration-300 ease-in-out
          h-full
        `}>
          <div className="p-4">
            <div className="mb-5 lg:hidden">
              <DisciplineToggle activeDiscipline={activeDiscipline} compact onChange={switchDiscipline} />
            </div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs tracking-[0.25em] uppercase text-white/50">Categories</p>
              <div className="flex gap-1">
                <button
                  onClick={selectAllCategories}
                  className="px-2 py-1 text-xs font-mono tracking-wider uppercase bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  All
                </button>
                <button
                  onClick={clearAllCategories}
                  className="px-2 py-1 text-xs font-mono tracking-wider uppercase border border-white/20 text-white/55 hover:text-white hover:border-white/60 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden px-2 py-1 text-xs font-mono tracking-wider uppercase border border-white/20 text-white/55 hover:text-white hover:border-white/60 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-1 text-sm">
              {categories.map((category) => {
                const isSelected = selectedCategories.has(category.slug);
                const colors = getCategoryColor(category.slug);
                
                return (
                  <label key={category.slug} className={`
                    flex items-center space-x-3 py-2 px-2 rounded cursor-pointer
                    border border-transparent hover:border-white/10
                    ${isSelected ? 'bg-white/5 border-white/20' : ''}
                  `}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCategory(category.slug)}
                      className="w-4 h-4 text-red-600 border-white/30 rounded bg-black/50"
                    />
                    <div className="flex-1 min-w-0">
                      <span className={`font-medium block ${isSelected ? colors.text : 'text-white/70'}`}>
                        {category.name}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Stats */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center p-3 bg-white/5 rounded border border-white/10">
                  <div className="text-2xl font-semibold text-white mb-1">
                    {selectedCategories.size}
                  </div>
                  <div className="text-white/50 tracking-wider uppercase">Selected</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded border border-white/10">
                  <div className="text-2xl font-semibold text-white mb-1">
                    {filteredTechniques.length}
                  </div>
                  <div className="text-white/50 tracking-wider uppercase">Showing</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/80 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content - Jitsu-Do Style */}
        <main className="flex-1 overflow-auto p-3 sm:p-6">
          {filteredTechniques.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3">
              {filteredTechniques.map((technique) => {
                const colors = getCategoryColor(technique.categorySlug);
                const techniqueTier = getTechniqueTier(technique);
                const markerTier = activeDiscipline === 'karate' && techniqueTier !== 'Primary'
                  ? techniqueTier
                  : null;
                return (
                  <div
                    key={technique.uniqueKey}
                    onClick={() => setSelectedTechnique(technique)}
                    className={`
                      bg-[#111111] rounded border-2 
                      ${colors.border} ${colors.hover}
                      relative transition-all duration-200 p-3 
                      cursor-pointer group
                      hover:shadow-lg hover:shadow-red-900/20
                    `}
                  >
                    {(markerTier === 'Secondary' || markerTier === 'Tertiary') && (
                      <TechniqueTierMarker tier={markerTier} colorClass={colors.text} />
                    )}
                    <div className="space-y-1.5">
                      <div>
                        <h3 className="pr-4 font-semibold text-sm text-white leading-tight">
                          {technique.name}
                        </h3>
                        {activeDiscipline === 'karate' && isJapaneseName(technique.name) && (
                          <p className={`text-xs mt-0.5 leading-tight italic ${colors.text}`}>
                            {getEnglishName(technique.name) || ''}
                          </p>
                        )}
                        {(activeDiscipline !== 'karate' || !isJapaneseName(technique.name)) && (
                          <div className="h-4"></div>
                        )}
                      </div>
                      
                      <p className="text-xs text-white/40 leading-tight line-clamp-2">
                        {technique.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="text-white/70 text-lg mb-3">
                  {selectedCategories.size === 0
                    ? 'Select categories to get started'
                    : 'No techniques found'
                  }
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  {selectedCategories.size === 0
                    ? `Choose ${discipline.label} categories from the sidebar or use "Select All" to see all techniques.`
                    : 'Try selecting different categories or adjusting your search term.'
                  }
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal for Technique Details - Jitsu-Do Style */}
      {selectedTechnique && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-3 sm:p-6" onClick={() => setSelectedTechnique(null)}>
          <div className="bg-[#111111] rounded-lg border border-white/20 max-w-3xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#111111] border-b border-white/10 p-4 sm:p-6 flex items-center justify-between">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-2">Technique Details</p>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                  {selectedTechnique.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedTechnique(null)}
                className="text-white/55 hover:text-white border border-white/20 hover:border-white/60 w-10 h-10 flex items-center justify-center rounded transition-colors"
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-6">
              {/* Category Badge */}
              <div>
                <span className={`inline-block px-3 py-1.5 rounded text-sm font-mono tracking-wider uppercase ${getCategoryColor(selectedTechnique.categorySlug).bg} ${getCategoryColor(selectedTechnique.categorySlug).text} border ${getCategoryColor(selectedTechnique.categorySlug).border}`}>
                  {selectedTechnique.category}
                </span>
              </div>

              {/* Image placeholder */}
              <div className="bg-black/50 border border-white/10 rounded-lg p-12 text-center">
                <div className="text-white/30">
                  <svg className="w-20 h-20 sm:w-32 sm:h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-white/50 font-mono tracking-wider uppercase">Photo Coming Soon</p>
                  <p className="text-xs text-white/30 mt-2 font-mono">
                    /public/images/techniques/{selectedTechnique.slug}.jpg
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-3">Description</p>
                <p className="text-white/70 leading-relaxed">
                  {selectedTechnique.description}
                </p>
              </div>

              {/* Videos section */}
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-3">Video Resources</p>
                {selectedTechnique.videos && selectedTechnique.videos.length > 0 ? (
                  <div className="space-y-2">
                    {selectedTechnique.videos.map((video: string, idx: number) => (
                      <a 
                        key={idx}
                        href={video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 bg-red-600/10 border border-red-600/30 text-red-500 rounded hover:bg-red-600/20 hover:border-red-600/50 transition-colors font-mono tracking-wider text-sm"
                      >
                        🎥 Video {idx + 1}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-white/50 italic">No videos available yet</p>
                )}
              </div>

              {/* Additional info */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-white/30 font-mono">
                  slug: {selectedTechnique.slug}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
