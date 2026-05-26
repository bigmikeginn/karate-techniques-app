'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Category, Discipline, Technique } from '@/types/technique';
import { disciplines } from '@/data/disciplines';
import { getDescription } from '@/data/technique_descriptions';
import { getCategoryColor } from '@/lib/categoryColors';
import { getEnglishName } from '@/data/technique_translations';
import Footer from '@/components/footer';

type DisplayTechnique = Technique & {
  category: string;
  categorySlug: string;
  uniqueKey: string;
};

const disciplineIds = Object.keys(disciplines) as Discipline[];
function getKarateSubtitle(technique: DisplayTechnique) {
  const exactSubtitle = getEnglishName(technique.name);
  if (exactSubtitle) return exactSubtitle;

  const categorySubtitles: Record<string, string> = {
    'stances-dachi': 'Stance / Guard',
    'blocks-uke': 'Block',
    'punches-zuki': 'Punch',
    'kicks-geri': 'Kick',
    'strikes-uchi': 'Strike',
    'forms-routines-kata': 'Form / Routine',
    'concepts': 'Training Concept',
    'self-defense-goshin-jitsu': 'Self-Defense',
    'goshin-jitsu-grab-escapes': 'Grab Escape',
    'goshin-jitsu-throws': 'Throw',
    'goshin-jitsu-joint-attacks-strangles': 'Joint Attack / Strangle',
    'falls-rolls-ukemi': 'Fall / Roll',
    'grappling': 'Grappling',
    'weapons-kobudo': 'Weapons',
  };

  return categorySubtitles[technique.categorySlug] || 'Karate Technique';
}

function getBjjSubtitle(technique: DisplayTechnique) {
  const categorySubtitles: Record<string, string> = {
    'bjj-positions': 'Position',
    'bjj-movement-fundamentals': 'Movement',
    'bjj-escapes': 'Escape',
    'bjj-guards': 'Guard',
    'bjj-sweeps': 'Sweep',
    'bjj-guard-passing': 'Pass',
    'bjj-submissions': 'Submission',
    'bjj-takedowns': 'Takedown',
    'bjj-transitions-control': 'Transition / Control',
  };

  return categorySubtitles[technique.categorySlug] || 'BJJ Technique';
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
  const selectedCategoryKey = Array.from(selectedCategories).sort().join('|') || 'all';

  return (
    <div className="relative flex h-dvh min-h-screen flex-col bg-black text-white">
      {/* Header - Jitsu-Do Style */}
      <header className="bg-[#111111] border-b border-white/10 sticky top-0 z-20">
        <div className="px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 grid grid-cols-1 gap-2.5 sm:gap-3 lg:grid-cols-[minmax(340px,1fr)_minmax(260px,360px)_minmax(340px,1fr)] lg:items-center">
          <div className="flex items-center gap-2.5 sm:gap-4 w-full min-w-0">
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
              <Image
                src="/karate-logo.png"
                alt={discipline.logoAlt}
                width={96}
                height={96}
                priority
                className="h-9 sm:h-12 w-auto"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-semibold tracking-tight">
                {discipline.title}
              </h1>
              <p className="text-[10px] sm:text-xs tracking-[0.22em] sm:tracking-[0.25em] uppercase text-white/55">
                {discipline.label} Techniques Library
              </p>
            </div>
          </div>

          <div className="hidden lg:flex justify-center lg:self-center">
            <DisciplineToggle activeDiscipline={activeDiscipline} onChange={switchDiscipline} />
          </div>

          <div className="w-full lg:max-w-xl lg:justify-self-end lg:self-center">
            <div className="mb-3 lg:hidden">
              <DisciplineToggle activeDiscipline={activeDiscipline} compact onChange={switchDiscipline} />
            </div>
            <input
              type="text"
              placeholder={`Search ${discipline.label} techniques...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-2 text-sm bg-black border border-white/20 rounded focus:ring-1 focus:ring-red-600 focus:border-red-600 text-white placeholder-white/40"
            />
          </div>
        </div>
      </header>

      <div className="relative flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar - Jitsu-Do Dark Theme */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0
          absolute lg:relative z-30 lg:z-0
          w-72 bg-[#111111] border-r border-white/10
          overflow-auto
          transition-transform duration-300 ease-in-out
          h-full
        `}>
          <div className="p-3 sm:p-4">
            <div className="mb-4 lg:hidden">
              <DisciplineToggle activeDiscipline={activeDiscipline} compact onChange={switchDiscipline} />
            </div>
            <div className="flex items-center justify-between mb-4">
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

            <div className="space-y-0.5 text-[13px]">
              {categories.map((category) => {
                const isSelected = selectedCategories.has(category.slug);
                const colors = getCategoryColor(category.slug);
                const techniqueCount = category.techniques.filter(tech => tech.primary || tech.secondary || tech.tertiary).length;
                
                return (
                  <label key={category.slug} className={`
                    flex items-center space-x-2.5 py-1.5 px-2 rounded cursor-pointer
                    border transition-all duration-300 ease-out
                    hover:translate-x-1 hover:border-white/15 hover:bg-white/[0.03]
                    ${isSelected ? `category-selected bg-white/[0.07] border-white/20 ${colors.text}` : 'border-transparent'}
                  `}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCategory(category.slug)}
                      className="h-3.5 w-3.5 accent-red-600 border-white/30 rounded bg-black/50"
                    />
                    <div className="flex-1 min-w-0">
                      <span className={`font-medium block ${isSelected ? colors.text : 'text-white/70'}`}>
                        {category.name}
                      </span>
                    </div>
                    <span className={`rounded border px-1.5 py-0.5 text-[10px] font-mono leading-none transition-colors ${
                      isSelected
                        ? `${colors.border} ${colors.text} bg-white/5`
                        : 'border-white/10 text-white/35'
                    }`}>
                      {techniqueCount}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Stats */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center p-2.5 bg-white/5 rounded border border-white/10">
                  <div className="text-xl font-semibold text-white mb-1">
                    {selectedCategories.size}
                  </div>
                  <div className="text-white/50 tracking-wider uppercase">Selected</div>
                </div>
                <div className="text-center p-2.5 bg-white/5 rounded border border-white/10">
                  <div className="text-xl font-semibold text-white mb-1">
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
            className="absolute inset-0 bg-black/80 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content - Jitsu-Do Style */}
        <main className="min-w-0 flex-1 overflow-auto p-3 sm:p-6 pb-12">
          {filteredTechniques.length > 0 ? (
            <div
              key={`${activeDiscipline}-${selectedCategoryKey}`}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3"
            >
              {filteredTechniques.map((technique, index) => {
                const colors = getCategoryColor(technique.categorySlug);
                const subtitle = activeDiscipline === 'karate'
                  ? getKarateSubtitle(technique)
                  : getBjjSubtitle(technique);
                return (
                  <div
                    key={technique.uniqueKey}
                    onClick={() => setSelectedTechnique(technique)}
                    className={`
                      bg-[#111111] rounded border-2 
                      ${colors.border} ${colors.hover}
                      premium-card animate-soft-enter relative h-32 sm:h-36 transition-all duration-300 ease-out p-2.5 sm:p-3 
                      cursor-pointer group
                      hover:-translate-y-1 hover:scale-[1.015] hover:shadow-xl hover:shadow-red-950/25
                      active:translate-y-0 active:scale-[0.99]
                    `}
                    style={{ animationDelay: `${Math.min(index, 20) * 18}ms` }}
                  >
                    <div className="flex h-full flex-col justify-between gap-2">
                      <div className="space-y-1">
                        <h2 className="font-semibold text-sm text-white leading-tight line-clamp-2">
                          {technique.name}
                        </h2>
                        {subtitle && (
                          <p className={`text-xs mt-0.5 leading-tight italic line-clamp-2 ${colors.text}`}>
                            {subtitle}
                          </p>
                        )}
                        {!subtitle && (
                          <div className="h-4"></div>
                        )}
                      </div>
                      
                      <p className="text-xs text-white/55 leading-tight line-clamp-2">
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
        <div className="animate-modal-overlay fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-6" onClick={() => setSelectedTechnique(null)}>
          <div className="animate-modal-panel bg-[#111111] rounded-lg border border-white/20 max-w-3xl w-full max-h-[94dvh] sm:max-h-[90vh] overflow-auto shadow-2xl shadow-black/60" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#111111] border-b border-white/10 p-4 sm:p-6">
              <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-2">Technique Details</p>
              <div className="flex items-center justify-between gap-4">
                <h2 className="min-w-0 flex-1 text-lg sm:text-2xl font-semibold tracking-tight text-white">
                  {selectedTechnique.name}
                </h2>
                <div className="flex shrink-0 items-center gap-2">
                  <span className={`max-w-36 truncate px-2 py-1 rounded text-[10px] font-mono tracking-wider uppercase ${getCategoryColor(selectedTechnique.categorySlug).bg} ${getCategoryColor(selectedTechnique.categorySlug).text} border ${getCategoryColor(selectedTechnique.categorySlug).border}`}>
                    {selectedTechnique.category}
                  </span>
                  <button
                    onClick={() => setSelectedTechnique(null)}
                    className="text-white/55 hover:text-white border border-white/20 hover:border-white/60 w-10 h-10 flex items-center justify-center rounded transition-colors"
                  >
                    <span className="text-2xl leading-none">×</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
              {/* Description */}
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-3">Description</p>
                <p className="text-white/70 leading-relaxed">
                  {selectedTechnique.description}
                </p>
              </div>

              {/* Image placeholder */}
              <div className="bg-black/50 border border-white/10 rounded-lg p-8 sm:p-12 text-center">
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

      <Footer />
    </div>
  );
}
