import React, { useState } from "react";
import { Upload } from "lucide-react";

const RenderNewStudio = () => {
  const [promptText, setPromptText] = useState("");

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left Column - Reference Image Upload */}
      <div className="bg-white p-6 rounded-lg shadow-sm w-full md:w-1/2">
        <h2 className="font-medium mb-4">Reference Image Upload</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-500 mb-2">Drag and drop your reference image here</p>
          <p className="text-gray-400 text-sm mb-4">or</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Browse Files
          </button>
        </div>
      </div>

      {/* Right Column - AI Prompt Input */}
      <div className="bg-white p-6 rounded-lg shadow-sm w-full md:w-1/2">
        <h2 className="font-medium mb-4">AI Generation Prompt</h2>
        <textarea
          className="w-full h-40 border rounded-lg p-3 mb-4"
          placeholder="Enter your studio generation prompt..."
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
        />
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Generate Studio
        </button>
      </div>
    </div>
  );
};

export default RenderNewStudio;
