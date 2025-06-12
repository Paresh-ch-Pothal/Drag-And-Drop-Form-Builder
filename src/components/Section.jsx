
import React, { useState } from 'react';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableField from './SortableField';
import FieldPreview from './FieldPreview';
import FieldEditModal from './FieldEditModal';
import { useSectionContext } from '../context/context';
import { arrayMove } from '@dnd-kit/sortable';
import { Braces, Trash2 } from 'lucide-react';

const Section = ({ section, previewSectionId, setPreviewSectionId }) => {
  const {
    setSections,
    reorderFields,
    addFieldToSection
  } = useSectionContext();

  const sensors = useSensors(useSensor(PointerSensor));
  const [editingName, setEditingName] = useState(false);
  const [editField, setEditField] = useState(null);

  const handleDrop = (e) => {
    const data = e.dataTransfer.getData('application/json');
    if (data) {
      const field = JSON.parse(data);
      addFieldToSection(section.id, field);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = section.fields.findIndex((f) => f.id === active.id);
    const newIndex = section.fields.findIndex((f) => f.id === over.id);
    const reordered = arrayMove(section.fields, oldIndex, newIndex);
    reorderFields(section.id, reordered);
  };

  const handleDeleteSection = () => {
    setSections((prev) => prev.filter((s) => s.id !== section.id));
  };

  const handleFieldDelete = (fieldId) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === section.id
          ? { ...sec, fields: sec.fields.filter((f) => f.id !== fieldId) }
          : sec
      )
    );
  };

  const handleFieldSave = (updatedField) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === section.id
          ? {
            ...sec,
            fields: sec.fields.map((f) =>
              f.id === updatedField.id ? updatedField : f
            ),
          }
          : sec
      )
    );
    setEditField(null);
  };



  const handleNameChange = (e) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === section.id ? { ...sec, name: e.target.value } : sec
      )
    );
  };

  const [jsonOutput, setJsonOutput] = useState(null);

  const handleGenerateJsonSchema = (section) => {
    console.log(section)
    const json = {
      title: section.name,
      type: "object",
      properties: {},
      required: {},
    };

    section.fields.forEach((field) => {
      json.properties[field.id
      ] = {
        type: field.fieldType,
        title: field.label,
        enum: field.options
      };
      if (field.required) json.required[field.id] = {
        type: field.fieldType,
        title: field.label,
      };
    });

    setJsonOutput(
      <pre className="mt-4 p-4 bg-gray-100 border rounded overflow-auto text-sm text-gray-800">
        {JSON.stringify(json, null, 2)}
      </pre>
    );
  };


  return (
    <div
      className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-8 overflow-hidden backdrop-blur-sm"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {editingName ? (
            <div className="flex-1">
              <input
                value={section.name}
                onChange={handleNameChange}
                onBlur={() => setEditingName(false)}
                className="w-full text-xl font-bold bg-white border-2 border-blue-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                autoFocus
                placeholder="Section name..."
              />
            </div>
          ) : (
            <h3
              className="text-xl sm:text-2xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors duration-200 flex-1 group"
              onClick={() => setEditingName(true)}
            >
              {section.name}
              <span className="ml-2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                ✏️
              </span>
            </h3>
          )}

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${previewSectionId === section.id
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                }`}
              onClick={() =>
                setPreviewSectionId(previewSectionId === section.id ? null : section.id)
              }
            >
              {previewSectionId === section.id ? (
                <>
                  <span className="hidden sm:inline">Hide Preview</span>
                  <span className="sm:hidden">Hide</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Preview</span>
                  <span className="sm:hidden">👁️</span>
                </>
              )}
            </button>

            <button
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              onClick={handleDeleteSection}
            >
              <span className="hidden sm:inline"><Trash2 color='white' size={20} /></span>
              <span className="sm:hidden">🗑️</span>
            </button>

            <button
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              onClick={() => { handleGenerateJsonSchema(section) }}
            >
              <span className="hidden sm:inline"><Braces /></span>
            </button>


          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="min-h-[300px] relative">
          {section.fields.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 w-full">
                <div className="text-4xl mb-2">📋</div>
                <p className="text-gray-500 font-medium">Drop fields here</p>
                <p className="text-gray-400 text-sm mt-1">Drag and drop form fields to build your section</p>
              </div>
            </div>
          )}

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={section.fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {section.fields.map((field) => (
                  <SortableField
                    key={field.id}
                    field={field}
                    onEdit={() => setEditField(field)}
                    onDelete={handleFieldDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Preview Section */}
      {previewSectionId === section.id && (
        <div className="border-t border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h4 className="font-semibold text-gray-700">Live Preview</h4>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-inner border border-gray-200">
              <FieldPreview fields={section.fields} name={section.name} />
            </div>
          </div>
        </div>
      )}

      {jsonOutput && (
        <div className="p-6 border-t border-gray-200 bg-white relative">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-700">Generated JSON Schema</h4>
            <button
              onClick={() => setJsonOutput(null)}
              className="text-sm text-red-600 hover:text-red-800 font-medium transition"
            >
              ✖ Cancel
            </button>
          </div>
          {jsonOutput}
        </div>
      )}

      {/* Edit Modal */}
      {editField && (
        <FieldEditModal
          field={editField}
          setField={setEditField}
          onSave={handleFieldSave}
        />
      )}
    </div>
  );
};

export default Section;
