
import React, { useState } from 'react';
import Section from './Section';
import { useSectionContext } from '../context/context';
import { v4 as uuidv4 } from 'uuid';

const Canvas = () => {
  const { sections, addSection } = useSectionContext();
  const [previewSectionId, setPreviewSectionId] = useState(null);

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 relative">
      {/* Main Canvas Container with proper height handling */}
      <div className="h-screen overflow-y-auto">
        <div className="p-6 min-h-full">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Form Builder</h1>
                <p className="text-gray-600">Create and customize your form sections</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Auto-saved</span>
              </div>
            </div>

            {/* Add Section Button */}
            <div className="flex items-center gap-4">
              <button
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-blue-200 outline-none flex items-center gap-2"
                onClick={() => addSection(uuidv4())}
              >
                <svg className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Section
              </button>
              
              {sections.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>{sections.length} Section{sections.length !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>

          {/* Sections Container */}
          {sections.length > 0 ? (
            <div className="space-y-6 pb-20">
              {sections.map((section, index) => (
                <div key={section.id} className="relative">
                  {/* Section Number Indicator */}
                  <div className="absolute -left-3 top-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg z-10">
                    {index + 1}
                  </div>
                  
                  <Section
                    section={section}
                    previewSectionId={previewSectionId}
                    setPreviewSectionId={setPreviewSectionId}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Start Building Your Form</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Create your first section to begin building your custom form. Add fields, customize layouts, and make it your own.
              </p>
              <button
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-blue-200 outline-none flex items-center gap-2"
                onClick={() => addSection(uuidv4())}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create First Section
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
