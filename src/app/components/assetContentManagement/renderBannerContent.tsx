import React from "react";
import { Type } from "lucide-react";

const RenderBannerContent = ({ bannerText, setBannerText, bannerTemplates, selectedTemplate, setSelectedTemplate }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="font-medium mb-6">Banner Creation</h2>
    
    {/* Text Input */}
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Banner Text</label>
      <textarea
        className="w-full border rounded-lg p-3 h-24"
        placeholder="Enter your banner text..."
        value={bannerText}
        onChange={(e) => setBannerText(e.target.value)}
      />
    </div>

    {/* Template Selection */}
    <div className="grid grid-cols-2 gap-4">
      {bannerTemplates.map((template) => (
        <div
          key={template.id}
          className={`border rounded-lg p-4 cursor-pointer ${
            selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : ''
          }`}
          onClick={() => setSelectedTemplate(template)}
        >
          <div className="h-24 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
            <Type className="text-gray-400" size={24} />
          </div>
          <h3 className="font-medium">{template.name}</h3>
          <p className="text-sm text-gray-500">{template.style}</p>
        </div>
      ))}
    </div>

    {/* Preview & Generate Button */}
    <div className="mt-6">
      <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Generate Banner
      </button>
    </div>
  </div>
);

export default RenderBannerContent;