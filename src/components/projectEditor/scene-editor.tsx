import React, { useState } from 'react';
import { Plus, Edit, Save, Play, Download } from 'lucide-react';

const Button = ({ children, variant = 'primary', onClick }) => {
  const baseStyles = "px-4 py-2 rounded font-medium transition-colors";
  const styles = variant === 'outline' 
    ? "border border-gray-300 hover:bg-gray-50" 
    : "bg-blue-500 text-white hover:bg-blue-600";
  
  return (
    <button className={`${baseStyles} ${styles}`} onClick={onClick}>
      {children}
    </button>
  );
};

const ProjectEditor = () => {
  const [selectedGeneration, setSelectedGeneration] = useState('ai');

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button variant="outline">
              <div className="flex items-center gap-2">
                <Plus size={16} />
                New Project
              </div>
            </Button>
            <Button variant="outline">
              <div className="flex items-center gap-2">
                <Edit size={16} />
                Modify
              </div>
            </Button>
            <Button variant="outline">
              <div className="flex items-center gap-2">
                <Save size={16} />
                Save
              </div>
            </Button>
          </div>
          <div className="flex space-x-4">
            <Button>
              <div className="flex items-center gap-2">
                <Play size={16} />
                Preview
              </div>
            </Button>
            <Button>
              <div className="flex items-center gap-2">
                <Download size={16} />
                Export
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Project Settings */}
        <div className="w-64 bg-white p-4 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Name</label>
              <input 
                type="text" 
                className="w-full border rounded p-2"
                placeholder="Enter project name" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Topic/Theme</label>
              <input 
                type="text" 
                className="w-full border rounded p-2"
                placeholder="Enter topic or theme" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Scene Generation</label>
              <select 
                className="w-full border rounded p-2"
                value={selectedGeneration}
                onChange={(e) => setSelectedGeneration(e.target.value)}
              >
                <option value="ai">AI Automated</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 p-4">
          <div className="bg-white rounded-lg h-full flex flex-col">
            {/* Timeline Section */}
            <div className="border-b">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Timeline</h3>
                  <div className="flex items-center gap-4">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                      Add Scene
                    </button>
                    <span className="text-sm text-gray-500">Total: 00:05:30</span>
                  </div>
                </div>
                
                <div className="h-64 bg-gray-50 rounded-lg border overflow-x-auto">
                  {/* Time Markers */}
                  <div className="sticky top-0 left-0 right-0 h-6 flex border-b bg-gray-50 z-10">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex-1 border-r text-xs text-gray-500 px-1">
                        {String(i).padStart(2, '0')}:00
                      </div>
                    ))}
                  </div>

                  {/* Background Studio Track */}
                  <div className="relative h-16 flex border-b">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gray-100 flex items-center px-2 border-r z-10">
                      <span className="text-xs font-medium">Background</span>
                    </div>
                    <div className="flex ml-24">
                      <div className="flex-none w-48 p-1">
                        <div className="bg-blue-100 h-full rounded px-2 py-1 text-xs border border-blue-200">
                          Studio Set 1
                        </div>
                      </div>
                      <div className="flex-none w-64 p-1">
                        <div className="bg-blue-100 h-full rounded px-2 py-1 text-xs border border-blue-200">
                          Studio Set 2
                        </div>
                      </div>
                      <div className="flex-none w-32 p-1">
                        <div className="bg-blue-100 h-full rounded px-2 py-1 text-xs border border-blue-200">
                          Studio Set 3
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Avatar Track */}
                  <div className="relative h-16 flex border-b">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gray-100 flex items-center px-2 border-r z-10">
                      <span className="text-xs font-medium">Avatar</span>
                    </div>
                    <div className="flex ml-24">
                      <div className="flex-none w-48 p-1">
                        <div className="bg-green-100 h-full rounded px-2 py-1 text-xs border border-green-200">
                          Avatar Action 1
                        </div>
                      </div>
                      <div className="flex-none w-64 p-1">
                        <div className="bg-green-100 h-full rounded px-2 py-1 text-xs border border-green-200">
                          Avatar Action 2
                        </div>
                      </div>
                      <div className="flex-none w-32 p-1">
                        <div className="bg-green-100 h-full rounded px-2 py-1 text-xs border border-green-200">
                          Avatar Action 3
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Script & Audio Track */}
                  <div className="relative h-16 flex">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gray-100 flex items-center px-2 border-r z-10">
                      <span className="text-xs font-medium">Script & Audio</span>
                    </div>
                    <div className="flex ml-24">
                      <div className="flex-none w-48 p-1">
                        <div className="bg-purple-100 h-full rounded px-2 py-1 text-xs border border-purple-200">
                          Opening Script
                        </div>
                      </div>
                      <div className="flex-none w-64 p-1">
                        <div className="bg-purple-100 h-full rounded px-2 py-1 text-xs border border-purple-200">
                          Main Dialogue
                        </div>
                      </div>
                      <div className="flex-none w-32 p-1">
                        <div className="bg-purple-100 h-full rounded px-2 py-1 text-xs border border-purple-200">
                          Closing Script
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Sections */}
            <div className="flex-1 grid grid-cols-3 gap-4 p-4">
              {/* Background Section */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Background</h3>
                <div className="bg-gray-50 rounded-lg h-40 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-gray-500 text-center">
                    <p>Drop Background Assets</p>
                    <p className="text-sm">or click to upload</p>
                  </div>
                </div>
              </div>

              {/* Avatar Section */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Avatar Slots</h3>
                <div className="bg-gray-50 rounded-lg h-40 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-gray-500 text-center">
                    <p>Configure Avatars</p>
                    <p className="text-sm">Drag avatars here</p>
                  </div>
                </div>
              </div>

              {/* Audio/Script Section */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Audio & Script</h3>
                <div className="bg-gray-50 rounded-lg h-40 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-gray-500 text-center">
                    <p>Audio Controls & Script Editor</p>
                    <p className="text-sm">Configure audio and scripts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditor;