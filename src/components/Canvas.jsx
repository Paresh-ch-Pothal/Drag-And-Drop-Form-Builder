
// import React, { useState } from 'react';
// import {
//     DndContext,
//     closestCenter,
//     useSensor,
//     useSensors,
//     PointerSensor,
// } from '@dnd-kit/core';
// import {
//     arrayMove,
//     SortableContext,
//     useSortable,
//     verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { useSectionContext } from '../context/context';
// import { v4 as uuidv4 } from 'uuid';

// const SortableField = ({ field, sectionId, onEdit, onDelete }) => {
//     const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//         id: field.id,
//     });

//     const style = {
//         transform: CSS.Transform.toString(transform),
//         transition,
//     };

//     return (
//         <div
//             ref={setNodeRef}
//             style={style}
//             className="p-2 border rounded bg-white mb-2 shadow flex justify-between items-center"
//         >
//             {/* 👇 Drag handle area only */}
//             <div {...attributes} {...listeners} className="cursor-move flex-1">
//                 {field.label} ({field.fieldType}) {field.required && '*'}
//             </div>

//             {/* 👇 Action buttons outside of drag listeners */}
//             <div className="flex gap-2 ml-2">
//                 <button
//                     className="text-xs bg-yellow-300 px-2 py-0.5 rounded"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         onEdit(field, sectionId);
//                     }}
//                 >
//                     Edit
//                 </button>
//                 <button
//                     className="text-xs bg-red-400 text-white px-2 py-0.5 rounded"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         onDelete(field.id, sectionId);
//                     }}
//                 >
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );
// };


// const Canvas = () => {
//     const {
//         sections,
//         addFieldToSection,
//         reorderFields,
//         setSections,
//         addSection,
//     } = useSectionContext();

//     const sensors = useSensors(useSensor(PointerSensor));
//     const [editingName, setEditingName] = useState({});
//     const [previewSectionId, setPreviewSectionId] = useState(null);
//     const [editField, setEditField] = useState(null);
//     const [editSectionId, setEditSectionId] = useState(null);

//     const handleDrop = (e, sectionId) => {
//         const data = e.dataTransfer.getData('application/json');
//         if (data) {
//             const field = JSON.parse(data);
//             addFieldToSection(sectionId, field);
//         }
//     };

//     const allowDrop = (e) => e.preventDefault();

//     const handleDragEnd = (event, sectionId, fields) => {
//         const { active, over } = event;
//         if (!over || active.id === over.id) return;
//         const oldIndex = fields.findIndex((f) => f.id === active.id);
//         const newIndex = fields.findIndex((f) => f.id === over.id);
//         const reordered = arrayMove(fields, oldIndex, newIndex);
//         reorderFields(sectionId, reordered);
//     };

//     const handleNameChange = (id, newName) => {
//         setSections((prev) =>
//             prev.map((sec) => (sec.id === id ? { ...sec, name: newName } : sec))
//         );
//     };

//     const handleDeleteSection = (id) => {
//         setSections((prev) => prev.filter((sec) => sec.id !== id));
//     };

//     const handleAddSection = () => {
//         addSection(uuidv4());
//     };

//     const handleFieldEdit = (field, sectionId) => {
//         console.log(field)
//         setEditField(field);
//         setEditSectionId(sectionId);
//     };

//     const handleFieldDelete = (fieldId, sectionId) => {
//         setSections((prev) =>
//             prev.map((sec) =>
//                 sec.id === sectionId
//                     ? { ...sec, fields: sec.fields.filter((f) => f.id !== fieldId) }
//                     : sec
//             )
//         );
//     };

//     const handleFieldSave = () => {
//         setSections((prev) =>
//             prev.map((sec) =>
//                 sec.id === editSectionId
//                     ? {
//                         ...sec,
//                         fields: sec.fields.map((f) =>
//                             f.id === editField.id ? editField : f
//                         ),
//                     }
//                     : sec
//             )
//         );
//         setEditField(null);
//     };

//     return (
//         <div className="p-4 flex-1 bg-gray-50 min-h-screen">
//             <div className="mb-4">
//                 <button
//                     className="bg-blue-600 text-white px-4 py-2 rounded"
//                     onClick={handleAddSection}
//                 >
//                     + Add Section
//                 </button>
//             </div>

//             {sections.map((section) => (
//                 <div
//                     key={section.id}
//                     className="bg-gray-100 p-4 rounded border mb-6"
//                     onDrop={(e) => handleDrop(e, section.id)}
//                     onDragOver={allowDrop}
//                 >
//                     <div className="flex items-center justify-between mb-2">
//                         {editingName[section.id] ? (
//                             <input
//                                 type="text"
//                                 className="border px-2 py-1 rounded w-full mr-2"
//                                 value={section.name}
//                                 onChange={(e) => handleNameChange(section.id, e.target.value)}
//                                 onBlur={() =>
//                                     setEditingName((prev) => ({ ...prev, [section.id]: false }))
//                                 }
//                                 autoFocus
//                             />
//                         ) : (
//                             <h3
//                                 className="font-semibold text-lg cursor-pointer"
//                                 onClick={() =>
//                                     setEditingName((prev) => ({ ...prev, [section.id]: true }))
//                                 }
//                             >
//                                 {section.name}
//                             </h3>
//                         )}
//                         <div className="flex gap-2">
//                             <button
//                                 className="text-sm bg-gray-300 px-2 rounded"
//                                 onClick={() =>
//                                     setPreviewSectionId(
//                                         previewSectionId === section.id ? null : section.id
//                                     )
//                                 }
//                             >
//                                 {previewSectionId === section.id ? 'Hide Preview' : 'Preview'}
//                             </button>
//                             <button
//                                 className="text-sm bg-red-500 text-white px-2 rounded"
//                                 onClick={() => handleDeleteSection(section.id)}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>

//                     <DndContext
//                         sensors={sensors}
//                         collisionDetection={closestCenter}
//                         onDragEnd={(event) => handleDragEnd(event, section.id, section.fields)}
//                     >
//                         <SortableContext
//                             items={section.fields.map((f) => f.id)}
//                             strategy={verticalListSortingStrategy}
//                         >
//                             {section.fields.map((field) => (
//                                 <SortableField
//                                     key={field.id}
//                                     field={field}
//                                     sectionId={section.id}
//                                     onEdit={handleFieldEdit}
//                                     onDelete={handleFieldDelete}
//                                 />
//                             ))}
//                         </SortableContext>
//                     </DndContext>

//                     {previewSectionId === section.id && (
//                         <div className="mt-4 p-4 bg-white border rounded">
//                             <h4 className="font-semibold mb-2">Preview</h4>
//                             {section.fields.length === 0 ? (
//                                 <p className="text-gray-500 italic">No fields yet.</p>
//                             ) : (
//                                 section.fields.map((field) => (
//                                     <div key={field.id} className="mb-2">
//                                         <label className="block text-sm font-medium">
//                                             {field.label}
//                                         </label>
//                                         <input
//                                             type={field.fieldType}
//                                             className="border px-2 py-1 rounded w-full"
//                                             placeholder={field.placeholder || ''}
//                                             disabled
//                                         />
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     )}
//                 </div>
//             ))}

//             {editField && (
//                 <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
//                         <h2 className="text-lg font-bold">Edit Field</h2>

//                         {/* Label */}
//                         <input
//                             className="border p-2 w-full"
//                             placeholder="Label"
//                             value={editField.label}
//                             onChange={(e) => setEditField((prev) => ({ ...prev, label: e.target.value }))}
//                         />

//                         {/* Field Type Selector */}
//                         <select
//                             className="border p-2 w-full"
//                             value={editField.fieldType}
//                             onChange={(e) => setEditField((prev) => ({ ...prev, fieldType: e.target.value }))}
//                         >
//                             <option value="text">Text</option>
//                             <option value="email">Email</option>
//                             <option value="password">Password</option>
//                             <option value="number">Number</option>
//                             <option value="select">Select</option>
//                             <option value="radio">Radio</option>
//                             <option value="checkbox">Checkbox</option>
//                             <option value="textarea">Textarea</option>
//                             <option value="date">Date</option>
//                         </select>

//                         {/* Placeholder (for applicable types) */}
//                         {['text', 'email', 'password', 'number', 'textarea'].includes(editField.fieldType) && (
//                             <input
//                                 className="border p-2 w-full"
//                                 placeholder="Placeholder"
//                                 value={editField.placeholder || ''}
//                                 onChange={(e) =>
//                                     setEditField((prev) => ({ ...prev, placeholder: e.target.value }))
//                                 }
//                             />
//                         )}

//                         {/* Options (for select, radio, checkbox) */}
//                         {['select', 'radio', 'checkbox'].includes(editField.fieldType) && (
//                             <textarea
//                                 className="border p-2 w-full"
//                                 placeholder="Options (comma separated)"
//                                 value={editField.options?.join(',') || ''}
//                                 onChange={(e) =>
//                                     setEditField((prev) => ({
//                                         ...prev,
//                                         options: e.target.value.split(',').map((opt) => opt.trim()),
//                                     }))
//                                 }
//                             />
//                         )}

//                         {/* Number field attributes */}
//                         {editField.fieldType === 'number' && (
//                             <div className="grid grid-cols-3 gap-2">
//                                 <input
//                                     type="number"
//                                     className="border p-2"
//                                     placeholder="Min"
//                                     value={editField.min || ''}
//                                     onChange={(e) =>
//                                         setEditField((prev) => ({ ...prev, min: e.target.value }))
//                                     }
//                                 />
//                                 <input
//                                     type="number"
//                                     className="border p-2"
//                                     placeholder="Max"
//                                     value={editField.max || ''}
//                                     onChange={(e) =>
//                                         setEditField((prev) => ({ ...prev, max: e.target.value }))
//                                     }
//                                 />
//                                 <input
//                                     type="number"
//                                     className="border p-2"
//                                     placeholder="Step"
//                                     value={editField.step || ''}
//                                     onChange={(e) =>
//                                         setEditField((prev) => ({ ...prev, step: e.target.value }))
//                                     }
//                                 />
//                             </div>
//                         )}

//                         {/* Validation for text-based inputs */}
//                         {['text', 'email', 'password'].includes(editField.fieldType) && (
//                             <div className="grid grid-cols-2 gap-2">
//                                 <input
//                                     type="number"
//                                     className="border p-2"
//                                     placeholder="Min Length"
//                                     value={editField.minLength || ''}
//                                     onChange={(e) =>
//                                         setEditField((prev) => ({ ...prev, minLength: e.target.value }))
//                                     }
//                                 />
//                                 <input
//                                     type="number"
//                                     className="border p-2"
//                                     placeholder="Max Length"
//                                     value={editField.maxLength || ''}
//                                     onChange={(e) =>
//                                         setEditField((prev) => ({ ...prev, maxLength: e.target.value }))
//                                     }
//                                 />
//                                 <input
//                                     type="text"
//                                     className="border p-2 col-span-2"
//                                     placeholder="Pattern (Regex)"
//                                     value={editField.pattern || ''}
//                                     onChange={(e) =>
//                                         setEditField((prev) => ({ ...prev, pattern: e.target.value }))
//                                     }
//                                 />
//                             </div>
//                         )}

//                         {/* Required toggle */}
//                         <label className="flex items-center gap-2">
//                             <input
//                                 type="checkbox"
//                                 checked={editField.required || false}
//                                 onChange={(e) =>
//                                     setEditField((prev) => ({ ...prev, required: e.target.checked }))
//                                 }
//                             />
//                             Required
//                         </label>

//                         {/* Buttons */}
//                         <div className="flex justify-end gap-2">
//                             <button
//                                 className="px-4 py-2 bg-gray-300 rounded"
//                                 onClick={() => setEditField(null)}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className="px-4 py-2 bg-blue-600 text-white rounded"
//                                 onClick={handleFieldSave}
//                             >
//                                 Save
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default Canvas;

// import React, { useState } from 'react';
// import Section from './Section';
// import { useSectionContext } from '../context/context';
// import { v4 as uuidv4 } from 'uuid';

// const Canvas = () => {
//   const { sections, addSection } = useSectionContext();
//   const [previewSectionId, setPreviewSectionId] = useState(null);

//   return (
//     <div className="p-4 flex-1 bg-gray-50 min-h-screen">
//       <div className="mb-4">
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//           onClick={() => addSection(uuidv4())}
//         >
//           + Add Section
//         </button>
//       </div>

//       {sections.map((section) => (
//         <Section
//           key={section.id}
//           section={section}
//           previewSectionId={previewSectionId}
//           setPreviewSectionId={setPreviewSectionId}
//         />
//       ))}
//     </div>
//   );
// };

// export default Canvas;


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
