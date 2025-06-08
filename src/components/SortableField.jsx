// import React from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// const SortableField = ({ field, onEdit, onDelete }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//     id: field.id,
//   });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className="p-2 border rounded bg-white mb-2 shadow flex justify-between items-center"
//     >
//       <div {...attributes} {...listeners} className="cursor-move flex-1">
//         {field.label} ({field.fieldType}) {field.required && '*'}
//       </div>
//       <div className="flex gap-2 ml-2">
//         <button className="text-xs bg-yellow-300 px-2 py-0.5 rounded" onClick={onEdit}>
//           Edit
//         </button>
//         <button className="text-xs bg-red-400 text-white px-2 py-0.5 rounded" onClick={() => onDelete(field.id)}>
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SortableField;


import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableField = ({ field, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Field type icons and colors
  const getFieldIcon = (fieldType) => {
    const iconMap = {
      text: '📝',
      email: '📧',
      password: '🔒',
      number: '🔢',
      date: '📅',
      textarea: '📄',
      select: '📋',
      radio: '🔘',
      checkbox: '☑️',
      file: '📎',
      color: '🎨',
      range: '🎚️',
      time: '⏰',
      url: '🔗',
      tel: '📞'
    };
    return iconMap[fieldType] || '📝';
  };

  const getFieldColor = (fieldType) => {
    const colorMap = {
      text: 'from-blue-400 to-blue-600',
      email: 'from-green-400 to-green-600',
      password: 'from-red-400 to-red-600',
      number: 'from-purple-400 to-purple-600',
      date: 'from-indigo-400 to-indigo-600',
      textarea: 'from-teal-400 to-teal-600',
      select: 'from-orange-400 to-orange-600',
      radio: 'from-pink-400 to-pink-600',
      checkbox: 'from-cyan-400 to-cyan-600',
      file: 'from-yellow-400 to-yellow-600',
      color: 'from-rose-400 to-rose-600',
      range: 'from-violet-400 to-violet-600',
      time: 'from-emerald-400 to-emerald-600',
      url: 'from-sky-400 to-sky-600',
      tel: 'from-amber-400 to-amber-600'
    };
    return colorMap[fieldType] || 'from-gray-400 to-gray-600';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 mb-3 overflow-hidden hover:-translate-y-0.5"
    >
      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getFieldColor(field.fieldType)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getFieldColor(field.fieldType)} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>

      <div className="relative flex justify-between items-center p-4">
        {/* Drag handle and content */}
        <div {...attributes} {...listeners} className="cursor-move flex-1 flex items-center gap-3 min-w-0">
          {/* Drag indicator */}
          <div className="flex flex-col gap-0.5 opacity-40 group-hover:opacity-70 transition-opacity duration-200">
            <div className="flex gap-0.5">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
            <div className="flex gap-0.5">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
            <div className="flex gap-0.5">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* Field icon */}
          <div className={`w-8 h-8 bg-gradient-to-r ${getFieldColor(field.fieldType)} rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-200`}>
            <span className="text-sm">{getFieldIcon(field.fieldType)}</span>
          </div>

          {/* Field info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-800 group-hover:text-gray-900">
                {field.label}
              </span>
              {field.required && (
                <span className="inline-flex items-center justify-center w-5 h-5 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                  *
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-medium">
                {field.fieldType}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
          <button 
            className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white text-xs font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
            onClick={onEdit}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          
          <button 
            className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
            onClick={() => onDelete(field.id)}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>

        {/* Always visible mobile buttons (fallback) */}
        <div className="flex gap-2 ml-4 sm:hidden">
          <button 
            className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-lg shadow-sm transition-all duration-200"
            onClick={onEdit}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button 
            className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-sm transition-all duration-200"
            onClick={() => onDelete(field.id)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom border animation */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${getFieldColor(field.fieldType)} opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
    </div>
  );
};

export default SortableField;
