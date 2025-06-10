import { ClipboardType } from 'lucide-react';
import React from 'react';
import { Binary, CalendarDays, Circle, CircleCheckBig, Clock, LetterText, Link, LockKeyhole, Mail, MessageCircle, MoveUp, Palette, Phone, SquareMousePointer, Upload } from 'lucide-react';

const inputItems = [
  { fieldType: 'text', label: 'Text Input', icon: <LetterText />, color: 'from-blue-400 to-blue-600', description: 'Single line text field' },
  { fieldType: 'email', label: 'Email Input', icon: <Mail />, color: 'from-green-400 to-green-600', description: 'Email validation input' },
  { fieldType: 'password', label: 'Password Input', icon: <LockKeyhole />, color: 'from-red-400 to-red-600', description: 'Secure password field' },
  { fieldType: 'number', label: 'Number Input', icon: <Binary />, color: 'from-purple-400 to-purple-600', description: 'Numeric input only' },
  { fieldType: 'date', label: 'Date Picker', icon: <CalendarDays />, color: 'from-indigo-400 to-indigo-600', description: 'Date selection widget' },
  { fieldType: 'textarea', label: 'Text Area', icon: <MessageCircle />, color: 'from-teal-400 to-teal-600', description: 'Multi-line text input' },
  { fieldType: 'select', label: 'Dropdown Select', icon: <SquareMousePointer />, color: 'from-orange-400 to-orange-600', description: 'Multiple choice dropdown' },
  { fieldType: 'radio', label: 'Radio Buttons', icon: <Circle />, color: 'from-pink-400 to-pink-600', description: 'Single choice selection' },
  { fieldType: 'checkbox', label: 'Checkboxes', icon: <CircleCheckBig />, color: 'from-cyan-400 to-cyan-600', description: 'Multiple choice options' },
  { fieldType: 'file', label: 'File Upload', icon:  <Upload />, color: 'from-yellow-400 to-yellow-600', description: 'File attachment field' },
  { fieldType: 'color', label: 'Color Picker', icon: <Palette />, color: 'from-rose-400 to-rose-600', description: 'Color selection tool' },
  { fieldType: 'range', label: 'Range Slider', icon: <MoveUp />, color: 'from-violet-400 to-violet-600', description: 'Numeric range selector' },
  { fieldType: 'time', label: 'Time Picker', icon: <Clock />, color: 'from-emerald-400 to-emerald-600', description: 'Time selection input' },
  { fieldType: 'url', label: 'URL Input', icon: <Link />, color: 'from-sky-400 to-sky-600', description: 'Website URL field' },
  { fieldType: 'tel', label: 'Phone Number', icon: <Phone />, color: 'from-amber-400 to-amber-600', description: 'Telephone number input' }
];

const Sidebar = () => {
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
  };

  return (
    <aside className="w-80 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 h-screen overflow-y-auto shadow-xl">
      {/* Header Section */}
      <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 shadow-lg z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl"><ClipboardType color='black'/></span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Form Builder</h2>
            <p className="text-indigo-100 text-sm">Drag & Drop Components</p>
          </div>
        </div>
      </div>

      {/* Input Categories */}
      <div className="p-4 space-y-6">
        {/* Basic Inputs Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Basic Inputs
          </h3>
          <div className="space-y-3">
            {inputItems.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-move transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden"
                draggable  // this is basic html darg and drop
                onDragStart={(e) => handleDragStart(e, item)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 group-hover:text-gray-900">{item.label}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Drag Indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Inputs Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Advanced Inputs
          </h3>
          <div className="space-y-3">
            {inputItems.slice(5, 10).map((item, index) => (
              <div
                key={index + 5}
                className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-move transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden"
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 group-hover:text-gray-900">{item.label}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Drag Indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialized Inputs Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Specialized Inputs
          </h3>
          <div className="space-y-3">
            {inputItems.slice(10).map((item, index) => (
              <div
                key={index + 10}
                className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-move transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden"
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 group-hover:text-gray-900">{item.label}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Drag Indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;