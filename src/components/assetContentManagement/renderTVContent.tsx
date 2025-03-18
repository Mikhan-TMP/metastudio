import React from "react";
import { Tv, Play, Search } from "lucide-react";

const RenderTVContent = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="font-medium mb-6">TV Content Management</h2>
    
    {/* Upload Section */}
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
      <Tv className="mx-auto mb-4 text-gray-400" size={48} />
      <p className="text-gray-500 mb-2">Upload video content for TV display</p>
      <p className="text-gray-400 text-sm mb-4">.mp4, .mov, .avi files supported</p>
      <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Upload Video
      </button>
    </div>

    {/* Uploaded Content List */}
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Uploaded Content</h3>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            className="pl-10 pr-4 py-2 border rounded-lg"
            placeholder="Search content..."
          />
        </div>
      </div>
      
      {/* Content List */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border rounded-lg p-4">
            <div className="bg-gray-100 h-32 rounded-lg mb-2 flex items-center justify-center">
              <Play className="text-gray-400" size={32} />
            </div>
            <p className="font-medium">Video Content {item}</p>
            <p className="text-sm text-gray-500">Duration: 2:30</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RenderTVContent;