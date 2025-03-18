import React, { useState } from 'react';
import {
  Search, Filter, Plus, Folder, Image, Film, Layout, Grid,
  Upload, Download, Trash2, Edit, Eye, Star, Heart, Save,
  Play, Pause, Copy, ChevronRight, ChevronLeft, Settings,
  RotateCw, Sun, Moon, CloudSnow, CloudRain, Menu
} from 'lucide-react';

const BackgroundManagerUI = () => {
  const [activeTab, setActiveTab] = useState('images');
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Mock data
  const backgroundImages = [
    { id: 1, name: "Office Modern", type: "image", path: "office_modern.jpg", category: "Interior", favorite: true },
    { id: 2, name: "City Skyline", type: "image", path: "city_skyline.jpg", category: "Exterior", favorite: false },
    { id: 3, name: "Nature Park", type: "image", path: "nature_park.jpg", category: "Exterior", favorite: true },
    { id: 4, name: "Conference Room", type: "image", path: "conference_room.jpg", category: "Interior", favorite: false },
    { id: 5, name: "Classroom", type: "image", path: "classroom.jpg", category: "Interior", favorite: false },
    { id: 6, name: "Abstract Blue", type: "image", path: "abstract_blue.jpg", category: "Abstract", favorite: false },
    { id: 7, name: "Data Visualization", type: "image", path: "data_viz.jpg", category: "Business", favorite: true },
    { id: 8, name: "Gradient Red", type: "image", path: "gradient_red.jpg", category: "Abstract", favorite: false },
    { id: 9, name: "Home Office", type: "image", path: "home_office.jpg", category: "Interior", favorite: false },
    { id: 10, name: "Mountain View", type: "image", path: "mountain.jpg", category: "Exterior", favorite: true },
    { id: 11, name: "Technology", type: "image", path: "technology.jpg", category: "Business", favorite: false },
    { id: 12, name: "Plain White", type: "image", path: "plain_white.jpg", category: "Solid Color", favorite: false },
  ];
  
  const backgroundVideos = [
    { id: 13, name: "Office People", type: "video", path: "office_people.mp4", category: "Interior", duration: "0:15", favorite: true },
    { id: 14, name: "City Timelapse", type: "video", path: "city_timelapse.mp4", category: "Exterior", duration: "0:30", favorite: true },
    { id: 15, name: "Nature Ambience", type: "video", path: "nature_ambience.mp4", category: "Exterior", duration: "0:45", favorite: false },
    { id: 16, name: "Data Animation", type: "video", path: "data_anim.mp4", category: "Business", duration: "0:20", favorite: false },
    { id: 17, name: "Abstract Flow", type: "video", path: "abstract_flow.mp4", category: "Abstract", duration: "0:25", favorite: true },
    { id: 18, name: "Particles", type: "video", path: "particles.mp4", category: "Abstract", duration: "0:35", favorite: false },
    { id: 19, name: "Conference Call", type: "video", path: "conference_call.mp4", category: "Interior", duration: "0:22", favorite: false },
    { id: 20, name: "Typing Keyboard", type: "video", path: "typing.mp4", category: "Business", duration: "0:18", favorite: false },
  ];
  
  const categories = ["all", "Interior", "Exterior", "Business", "Abstract", "Solid Color"];
  
  const backgrounds = activeTab === 'images' ? backgroundImages : backgroundVideos;
  
  const filteredBackgrounds = currentCategory === 'all'
    ? backgrounds
    : backgrounds.filter(bg => bg.category === currentCategory);
  
  const handleSelectBackground = (background) => {
    setSelectedBackground(background);
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top Toolbar */}
      <div className="flex justify-between items-center p-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center">
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600 mr-2">
            <ChevronLeft size={16} />
          </button>
          <h1 className="text-lg font-medium">Background Manager</h1>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
            <Save size={16} />
          </button>
          <button className="p-2 bg-blue-600 rounded hover:bg-blue-700">
            Apply to Scene
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Browser */}
        <div className="w-3/4 bg-gray-900 flex flex-col">
          {/* Tabs & Search */}
          <div className="bg-gray-800 border-b border-gray-700 p-2 flex justify-between">
            <div className="flex">
              <button
                className={`px-3 py-1 rounded-l ${activeTab === 'images' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={() => setActiveTab('images')}
              >
                <Image size={16} className="mr-1 inline-block" /> Images
              </button>
              <button
                className={`px-3 py-1 rounded-r ${activeTab === 'videos' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={() => setActiveTab('videos')}
              >
                <Film size={16} className="mr-1 inline-block" /> Videos
              </button>
            </div>
            
            <div className="flex space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search backgrounds..."
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1 pl-8 text-sm"
                />
                <Search size={14} className="absolute left-2.5 top-2 text-gray-400" />
              </div>
              
              <button className="p-1 bg-gray-700 rounded hover:bg-gray-600">
                <Filter size={18} />
              </button>
              
              <div className="flex">
                <button
                  className={`p-1 rounded-l ${viewMode === 'grid' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button
                  className={`p-1 rounded-r ${viewMode === 'list' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  onClick={() => setViewMode('list')}
                >
                  <Layout size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="bg-gray-800 p-2 border-b border-gray-700 flex flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 text-sm rounded mr-2 mb-1 ${currentCategory === category ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={() => setCurrentCategory(category)}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
            
            <button className="px-3 py-1 text-sm rounded mr-2 mb-1 bg-gray-700 hover:bg-gray-600">
              <Plus size={14} className="mr-1 inline-block" /> Create Category
            </button>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 overflow-auto p-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-4 gap-4">
                {filteredBackgrounds.map(background => (
                  <div
                    key={background.id}
                    className={`bg-gray-800 rounded overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-blue-500 ${selectedBackground?.id === background.id ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => handleSelectBackground(background)}
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video bg-gray-700 flex items-center justify-center relative">
                      <div className="text-4xl opacity-40">
                        {background.category === 'Interior' ? '🏢' :
                         background.category === 'Exterior' ? '🌆' :
                         background.category === 'Business' ? '📊' :
                         background.category === 'Abstract' ? '🎨' : '🖼️'}
                      </div>
                      
                      {background.type === 'video' && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-xs px-2 py-1 rounded">
                          {background.duration}
                        </div>
                      )}
                      
                      {background.favorite && (
                        <div className="absolute top-2 right-2 text-yellow-400">
                          <Star size={16} fill="currentColor" />
                        </div>
                      )}
                    </div>
                    
                    {/* Info */}
                    <div className="p-2">
                      <div className="flex justify-between items-start">
                        <div className="truncate text-sm font-medium">{background.name}</div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-xs text-gray-400">{background.category}</div>
                        <div className="flex space-x-1">
                          <button className="p-1 text-gray-400 hover:text-white">
                            <Eye size={14} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-white">
                            <Copy size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                    <th className="pb-2"></th>
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Type</th>
                    {activeTab === 'videos' && <th className="pb-2">Duration</th>}
                    <th className="pb-2">Favorite</th>
                    <th className="pb-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBackgrounds.map(background => (
                    <tr 
                      key={background.id} 
                      className={`border-b border-gray-700 text-sm hover:bg-gray-800 cursor-pointer ${selectedBackground?.id === background.id ? 'bg-gray-800' : ''}`}
                      onClick={() => handleSelectBackground(background)}
                    >
                      <td className="py-2 pr-2">
                        <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                          {background.type === 'image' ? <Image size={16} /> : <Film size={16} />}
                        </div>
                      </td>
                      <td className="py-2 pr-4">{background.name}</td>
                      <td className="py-2 pr-4">{background.category}</td>
                      <td className="py-2 pr-4">{background.type === 'image' ? 'Image' : 'Video'}</td>
                      {activeTab === 'videos' && <td className="py-2 pr-4">{background.duration}</td>}
                      <td className="py-2 pr-4">
                        {background.favorite ? (
                          <Star size={16} className="text-yellow-400" fill="currentColor" />
                        ) : (
                          <Star size={16} className="text-gray-500" />
                        )}
                      </td>
                      <td className="py-2 text-right">
                        <button className="p-1 text-gray-400 hover:text-white inline-block mr-1">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-white inline-block mr-1">
                          <Copy size={16} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-500 inline-block">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Bottom Toolbar */}
          <div className="bg-gray-800 border-t border-gray-700 p-2 flex justify-between">
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 flex items-center">
                <Plus size={16} className="mr-1" /> Add New
              </button>
              <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 flex items-center">
                <Upload size={16} className="mr-1" /> Upload
              </button>
              <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 flex items-center">
                <Folder size={16} className="mr-1" /> Import
              </button>
            </div>
            
            <div>
              <span className="text-sm text-gray-400">
                {filteredBackgrounds.length} items • {activeTab === 'images' ? 'Images' : 'Videos'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Preview & Properties */}
        <div className="w-1/4 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* Preview */}
          <div className="p-3 border-b border-gray-700 font-medium">
            Preview & Properties
          </div>
          
          <div className="flex-1 flex flex-col overflow-auto">
            {selectedBackground ? (
              <>
                {/* Preview */}
                <div className="p-3">
                  <div className="aspect-video bg-black rounded mb-2 flex items-center justify-center relative">
                    <div className="text-5xl opacity-40">
                      {selectedBackground.category === 'Interior' ? '🏢' :
                       selectedBackground.category === 'Exterior' ? '🌆' :
                       selectedBackground.category === 'Business' ? '📊' :
                       selectedBackground.category === 'Abstract' ? '🎨' : '🖼️'}
                    </div>
                    
                    {selectedBackground.type === 'video' && (
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                        <div className="bg-black bg-opacity-70 rounded-full p-1">
                          <button className="p-1" onClick={togglePlay}>
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{selectedBackground.name}</h3>
                    <button className="p-1 text-gray-400 hover:text-yellow-400">
                      {selectedBackground.favorite ? (
                        <Star size={16} className="text-yellow-400" fill="currentColor" />
                      ) : (
                        <Star size={16} />
                      )}
                    </button>
                  </div>
                  <div className="text-sm text-gray-400 mb-3">
                    {selectedBackground.type === 'image' ? 'Image' : 'Video'} • {selectedBackground.category}
                    {selectedBackground.type === 'video' && ` • ${selectedBackground.duration}`}
                  </div>
                </div>
                
                {/* Properties */}
                <div className="border-t border-gray-700 p-3">
                  <h3 className="font-medium mb-3">Background Properties</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Name</label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 p-1.5 rounded border border-gray-600 text-sm"
                        value={selectedBackground.name}
                        readOnly
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Category</label>
                        <select className="w-full bg-gray-700 p-1.5 rounded border border-gray-600 text-sm">
                          <option>{selectedBackground.category}</option>
                          {categories.filter(c => c !== 'all' && c !== selectedBackground.category).map(category => (
                            <option key={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Type</label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 p-1.5 rounded border border-gray-600 text-sm"
                          value={selectedBackground.type === 'image' ? 'Image' : 'Video'}
                          readOnly
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">File Path</label>
                      <div className="flex">
                        <input
                          type="text"
                          className="flex-1 bg-gray-700 p-1.5 rounded-l border border-gray-600 text-sm"
                          value={selectedBackground.path}
                          readOnly
                        />
                        <button className="bg-gray-600 px-2 rounded-r border border-gray-600">
                          <Folder size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {selectedBackground.type === 'video' && (
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Duration</label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 p-1.5 rounded border border-gray-600 text-sm"
                          value={selectedBackground.duration}
                          readOnly
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Adjustment Options */}
                <div className="border-t border-gray-700 p-3">
                  <h3 className="font-medium mb-3">Adjustments</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Brightness</label>
                      <input type="range" className="w-full" min="0" max="100" defaultValue="50" />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Contrast</label>
                      <input type="range" className="w-full" min="0" max="100" defaultValue="50" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Blur</label>
                        <input type="range" className="w-full" min="0" max="100" defaultValue="0" />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Opacity</label>
                        <input type="range" className="w-full" min="0" max="100" defaultValue="100" />
                      </div>
                    </div>
                    
                    {/* Effects */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Effects</label>
                      <div className="flex flex-wrap gap-2">
                        <button className="p-1.5 bg-gray-700 rounded hover:bg-gray-600 text-xs flex items-center">
                          <RotateCw size={12} className="mr-1" /> Rotate
                        </button>
                        <button className="p-1.5 bg-gray-700 rounded hover:bg-gray-600 text-xs flex items-center">
                          <Sun size={12} className="mr-1" /> Warm
                        </button>
                        <button className="p-1.5 bg-gray-700 rounded hover:bg-gray-600 text-xs flex items-center">
                          <Moon size={12} className="mr-1" /> Cool
                        </button>
                        <button className="p-1.5 bg-gray-700 rounded hover:bg-gray-600 text-xs flex items-center">
                          <CloudRain size={12} className="mr-1" /> Rain
                        </button>
                        <button className="p-1.5 bg-gray-700 rounded hover:bg-gray-600 text-xs flex items-center">
                          <CloudSnow size={12} className="mr-1" /> Snow
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center flex-col p-6 text-center">
                <div className="mb-3 p-3 rounded-full bg-gray-700">
                  <Image size={24} />
                </div>
                <p className="text-gray-400 mb-1">No background selected</p>
                <p className="text-xs text-gray-500">Select a background to view and edit its properties</p>
              </div>
            )}
          </div>
          
          {/* Apply Button */}
          <div className="p-3 border-t border-gray-700">
            <button 
              className="w-full bg-blue-600 p-2 rounded font-medium hover:bg-blue-700 mb-2"
              disabled={!selectedBackground}
            >
              Apply to Scene
            </button>
            <button 
              className="w-full bg-gray-700 p-2 rounded font-medium hover:bg-gray-600"
              disabled={!selectedBackground}
            >
              Preview in Timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundManagerUI;
