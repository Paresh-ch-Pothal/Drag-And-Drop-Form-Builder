import { ScanSearch } from 'lucide-react';
import React from 'react';
import { Binary, CalendarDays, Circle, CircleCheckBig, Clock, LetterText, Link, LockKeyhole, Mail, MessageCircle, MoveUp, Palette, Phone, SquareMousePointer, Upload } from 'lucide-react';

const FieldPreview = ({ fields,name }) => {
  // Field type icons and colors
  const getFieldIcon = (fieldType) => {
    const iconMap = {
      text: <LetterText />,
      email: <Mail />,
      password: <LockKeyhole />,
      number: <Binary />,
      date: <CalendarDays />,
      textarea: <MessageCircle />,
      select: <SquareMousePointer />,
      radio: <Circle />,
      checkbox: <CircleCheckBig />,
      file: <Upload />,
      color: <Palette />,
      range: <MoveUp />,
      time: <Clock />,
      url: <Link />,
      tel: <Phone />
    };
    return iconMap[fieldType] || '📝';
  };

  const renderField = (field) => {
    switch (field.fieldType) {
      case 'textarea':
        return (
          <textarea
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none bg-gray-50"
            placeholder={field.placeholder || 'Enter your text here...'}
            rows="4"

          />
        );
      case 'select':
        return (
          <select
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50 cursor-not-allowed"
          >
            <option>Choose an option...</option>
            {field.options.map((opt)=>{
              return(
              <option>{opt}</option>)
            })}
          </select>
        );
      case 'radio':
        return (
          <div className="space-y-3">
            {['Option 1', 'Option 2', 'Option 3'].map((option, index) => (
              <label key={index} className="flex items-center gap-3 cursor-not-allowed">
                <input
                  type="radio"
                  name={field.id}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-3">
            {['Option 1', 'Option 2', 'Option 3'].map((option, index) => (
              <label key={index} className="flex items-center gap-3 cursor-not-allowed">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-not-allowed slider"
              min="0"
              max="100"
              defaultValue="50"
              disabled
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        );
      case 'file':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xl">📎</span>
              </div>
              <p className="text-gray-500 text-sm">Click to upload or drag and drop</p>
              <p className="text-gray-400 text-xs">File upload disabled in preview</p>
            </div>
          </div>
        );
      default:
        return (
          <input
            type={field.fieldType}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50"
            placeholder={field.placeholder || `Enter ${field.fieldType}...`}
          />
        );
    }
  };

  return (
    <div className="z-20 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl"><ScanSearch color='black' /></span>
          </div>
          <div>
            <h4 className="text-xl font-bold">{name}</h4>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {fields.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl opacity-50">📝</span>
            </div>
            <p className="text-gray-500 text-lg font-medium mb-2">No fields yet</p>
            <p className="text-gray-400 text-sm">Add some fields to see the preview</p>
          </div>
        ) : (
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="group">
                {/* Field Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-white shadow-sm">
                    <span className="text-sm">{getFieldIcon(field.fieldType)}</span>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-medium">
                        {field.fieldType}
                      </span>
                      <span className="text-xs text-gray-400">
                        Field #{index + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Field Input */}
                <div className="relative">
                  {renderField(field)}

                  {/* Disabled overlay indicator */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                      Preview Mode
                    </div>
                  </div>
                </div>

                {/* Field separator */}
                {index < fields.length - 1 && (
                  <div className="mt-6 pt-6 border-b border-gray-100"></div>
                )}
              </div>
            ))}

            {/* Form Actions Preview */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg cursor-not-allowed opacity-75">
                  Submit Form
                </button>
                <button className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 cursor-not-allowed opacity-75">
                  Reset
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">
                ⚠️ Form interactions are disabled in preview mode
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldPreview;
