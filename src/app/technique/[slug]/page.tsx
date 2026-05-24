'use client';

import { useParams } from 'next/navigation';
import { Technique } from '@/types/technique';
import techniquesData from '@/data/techniques.json';

export default function TechniquePage() {
  const params = useParams();
  const techniqueSlug = params.slug as string;
  
  // Find the technique across all categories
  let technique: Technique | undefined;
  let categoryName = '';
  
  for (const category of techniquesData) {
    const found = category.techniques.find(t => t.slug === techniqueSlug);
    if (found) {
      technique = found;
      categoryName = category.name;
      break;
    }
  }

  if (!technique) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Technique not found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            The requested technique does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>Categories</span>
          <span className="mx-2">/</span>
          <span>{categoryName}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{technique.name}</span>
        </nav>

        {/* Technique Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {technique.name}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {categoryName}
            </span>
            {technique.primary && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Primary
              </span>
            )}
            {technique.secondary && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Secondary
              </span>
            )}
            {technique.tertiary && (
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                Tertiary
              </span>
            )}
          </div>

          {technique.description ? (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {technique.description}
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">
              Description coming soon...
            </p>
          )}
        </div>

        {/* Media Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Media & Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image Placeholder */}
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-8 text-center">
              <div className="text-gray-500 dark:text-gray-400 mb-2">
                🖼️ Image Placeholder
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Add technique images here
              </p>
            </div>

            {/* Video Placeholder */}
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-8 text-center">
              <div className="text-gray-500 dark:text-gray-400 mb-2">
                📹 Video Placeholder
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Add technique videos here
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button 
            onClick={() => window.history.back()}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            ← Back
          </button>
          
          <button 
            onClick={() => window.location.href = '/category/' + categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            View All {categoryName}
          </button>
        </div>
      </div>
    </div>
  );
}