'use client';

import { useParams } from 'next/navigation';
import { Category, Technique } from '@/types/technique';
import techniquesData from '@/data/techniques.json';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;
  
  const categories: Category[] = techniquesData;
  const category = categories.find(cat => cat.slug === categorySlug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Category not found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            The requested category does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {category.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {category.techniques.length} techniques in this category
          </p>
        </div>

        {/* Techniques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.techniques.map((technique: Technique) => (
            <div
              key={technique.slug}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {technique.name}
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-3">
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

              <a 
                href={`/technique/${technique.slug}`}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm text-center block"
              >
                View Details
              </a>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button 
            onClick={() => window.history.back()}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            ← Back to Categories
          </button>
        </div>
      </div>
    </div>
  );
}