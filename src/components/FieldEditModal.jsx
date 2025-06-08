// import React from 'react';

// const FieldEditModal = ({ field, setField, onSave }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
//         <h2 className="text-lg font-bold">Edit Field</h2>

//         <input
//           className="border p-2 w-full"
//           placeholder="Label"
//           value={field.label}
//           onChange={(e) => setField((prev) => ({ ...prev, label: e.target.value }))}
//         />

//         <select
//           className="border p-2 w-full"
//           value={field.fieldType}
//           onChange={(e) => setField((prev) => ({ ...prev, fieldType: e.target.value }))}
//         >
//           <option value="text">Text</option>
//           <option value="email">Email</option>
//           <option value="password">Password</option>
//           {/* Add more field types as needed */}
//         </select>

//         <input
//           className="border p-2 w-full"
//           placeholder="Placeholder"
//           value={field.placeholder || ''}
//           onChange={(e) => setField((prev) => ({ ...prev, placeholder: e.target.value }))}
//         />

//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={field.required}
//             onChange={(e) => setField((prev) => ({ ...prev, required: e.target.checked }))}
//           />
//           <label>Required</label>
//         </div>

//         <div className="flex justify-end gap-2">
//           <button
//             className="bg-gray-300 px-4 py-2 rounded"
//             onClick={() => setField(null)}
//           >
//             Cancel
//           </button>
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//             onClick={() => onSave(field)}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FieldEditModal;


import React from 'react';

const FieldEditModal = ({ field, setField, onSave }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-start justify-center z-50 p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 transform animate-in slide-in-from-bottom-4 duration-300 border border-gray-100 my-4 min-h-fit">
        {/* Header */}
        <div className="text-center border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Edit Field</h2>
          <p className="text-sm text-gray-500">Customize your form field properties</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Label Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Field Label</label>
            <input
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
              placeholder="Enter field label"
              value={field.label}
              onChange={(e) => setField((prev) => ({ ...prev, label: e.target.value }))}
            />
          </div>

          {/* Field Type Select */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Field Type</label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 bg-white appearance-none cursor-pointer"
                value={field.fieldType}
                onChange={(e) => setField((prev) => ({ ...prev, fieldType: e.target.value }))}
              >
                <option value="text">📝 Text</option>
                <option value="email">📧 Email</option>
                <option value="password">🔒 Password</option>
                {/* Add more field types as needed */}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Placeholder Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Placeholder Text</label>
            <input
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
              placeholder="Enter placeholder text"
              value={field.placeholder || ''}
              onChange={(e) => setField((prev) => ({ ...prev, placeholder: e.target.value }))}
            />
          </div>

          {/* Required Checkbox */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={field.required}
                onChange={(e) => setField((prev) => ({ ...prev, required: e.target.checked }))}
              />
              <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 cursor-pointer flex items-center justify-center">
                {field.required && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex-1 cursor-pointer" onClick={() => setField((prev) => ({ ...prev, required: !prev.required }))}>
              <label className="text-sm font-semibold text-gray-700 cursor-pointer">Required Field</label>
              <p className="text-xs text-gray-500">Users must fill this field to submit the form</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:ring-4 focus:ring-gray-100 outline-none"
            onClick={() => setField(null)}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-blue-200 outline-none transform hover:scale-105"
            onClick={() => onSave(field)}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldEditModal;