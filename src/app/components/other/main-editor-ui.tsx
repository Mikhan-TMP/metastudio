import React, { useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Square, Scissors, Copy, 
  Volume2, Volume, VolumeX, ChevronDown, ChevronRight, 
  Plus, Minus, Monitor, Smile, Image, Music, Film, Type, Sliders,
  Save, Upload, Download, Folder, Maximize, Grid
} from 'lucide-react';

const MainEditorUI = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedScene, setSelectedScene] = useState(0);
  
  // Mock scenes data
  const scenes = [
    { id: 0, name: "Opening", duration: 15, thumbnail: "🏙️" },
    { id: 1, name: "Introduction", duration: 25, thumbnail: "👋" },
    { id: 2, name: "Main Point 1", duration: 40, thumbnail: "🔍" },
    { id: 3, name: "Interview", duration: 35, thumbnail: "🎤" },
    { id: 4, name: "Main Point 2", duration: 30, thumbnail: "📊" },
    { id: 5, name: "Conclusion", duration: 20, thumbnail: "✨" }
  ];
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.25, 0.5));
  };
  
  const handleTimelineClick = (e) => {
    const timeline = e.currentTarget;
    const rect = timeline.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedTime = (x / rect.width) * 100;
    setCurrentTime(clickedTime);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top Toolbar */}
      <div className="flex justify-between items-center p-2 bg-gray-800 border-b border-gray-700">
        <div className="flex space-x-2">
          <button className="p-2 bg-blue-600 rounded hover:bg-blue-700">
            <Save size={16} />
          </button>
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
            <Upload size={16} />
          </button>
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
            <Download size={16} />
          </button>
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
            <Folder size={16} />
          </button>
        </div>
        
        <div className="flex space-x-2">
          <span className="bg-blue-800 px-2 py-1 rounded text-sm font-medium">META-Studio Project</span>
          <span className="bg-gray-700 px-2 py-1 rounded text-sm">00:03:45 / 00:12:30</span>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
            <Grid size={16} />
          </button>
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
            <Maximize size={16} />
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Scene Navigator */}
        <div className="w-56 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-2 border-b border-gray-700 font-medium">
            Scenes
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {scenes.map(scene => (
              <div 
                key={scene.id}
                className={`flex items-center p-2 mb-2 rounded cursor-pointer ${
                  selectedScene === scene.id ? 'bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedScene(scene.id)}
              >
                <div className="w-8 h-8 mr-2 flex items-center justify-center bg-gray-600 rounded">
                  {scene.thumbnail}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{scene.name}</div>
                  <div className="text-xs text-gray-400">00:{scene.duration.toString().padStart(2, '0')}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-2 border-t border-gray-700">
            <button className="w-full p-1 bg-blue-600 rounded hover:bg-blue-700 flex items-center justify-center">
              <Plus size={16} className="mr-1" /> Add Scene
            </button>
          </div>
        </div>
        
        {/* Center - Preview and Timeline */}
        <div className="flex-1 flex flex-col bg-gray-900 overflow-hidden">
          {/* Preview Area */}
          <div className="h-1/2 min-h-0 p-4 flex justify-center items-center border-b border-gray-700">
            <div className="relative bg-black w-full max-w-3xl aspect-video rounded overflow-hidden">
              {/* Preview Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-600">Interview Scene Preview</div>
              </div>
              
              {/* Preview Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 flex justify-between items-center">
                <div className="text-sm">00:01:45:12</div>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <SkipBack size={16} />
                  </button>
                  <button className="p-1 hover:bg-gray-700 rounded" onClick={togglePlay}>
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <Square size={16} />
                  </button>
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <SkipForward size={16} />
                  </button>
                </div>
                <div className="flex items-center">
                  <Volume2 size={16} className="mr-2" />
                  <input type="range" className="w-24" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Timeline Controls */}
          <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
            <div className="flex space-x-3">
              <div className="flex items-center space-x-1">
                <select className="bg-gray-700 border border-gray-600 rounded p-1 text-sm">
                  <option>Scene: Interview</option>
                  <option>All Scenes</option>
                </select>
              </div>
              
              <div className="flex space-x-1">
                <button className="p-1 bg-gray-700 rounded hover:bg-gray-600">
                  <Scissors size={16} />
                </button>
                <button className="p-1 bg-gray-700 rounded hover:bg-gray-600">
                  <Copy size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm">00:01:45:12</span>
              
              <div className="flex items-center space-x-1">
                <button onClick={handleZoomOut} className="p-1 bg-gray-700 rounded hover:bg-gray-600">
                  <Minus size={16} />
                </button>
                <span className="text-sm">{Math.round(zoomLevel * 100)}%</span>
                <button onClick={handleZoomIn} className="p-1 bg-gray-700 rounded hover:bg-gray-600">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="flex-1 bg-gray-800 overflow-hidden flex flex-col">
            {/* Time Markers */}
            <div className="h-6 border-b border-gray-700 flex px-16">
              <div className="flex-1 relative">
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(percent => (
                  <div 
                    key={percent} 
                    className="absolute top-0 bottom-0 flex flex-col items-center justify-center text-xs text-gray-400"
                    style={{ left: `${percent}%` }}
                  >
                    <div className="h-2 w-px bg-gray-600"></div>
                    <div>{`00:${Math.floor(percent / 10)}${percent % 10}`}</div>
                  </div>
                ))}
                {/* Playhead */}
                <div 
                  className="absolute top-0 bottom-0 w-px bg-red-500 z-10" 
                  style={{ left: `${currentTime}%` }}
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full -ml-1.5"></div>
                </div>
              </div>
            </div>
            
            {/* Track Groups */}
            <div className="flex-1 overflow-y-auto">
              {/* Video Group */}
              <div className="border-b border-gray-700">
                <div className="flex items-center px-2 py-1 bg-gray-900">
                  <ChevronDown size={14} className="mr-1" />
                  <span className="text-xs font-medium">VIDEO</span>
                </div>
                
                {/* Background Video Track */}
                <div className="flex h-10 border-b border-gray-700">
                  <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                    <Film size={12} className="mr-1" /> Bg Vid
                  </div>
                  <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-1 w-full bg-gray-600"></div>
                    </div>
                    <div className="relative h-full bg-blue-900 rounded"></div>
                  </div>
                </div>
                
                {/* Background Image Track */}
                <div className="flex h-10 border-b border-gray-700">
                  <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                    <Image size={12} className="mr-1" /> Bg Img
                  </div>
                  <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-1 w-full bg-gray-600"></div>
                    </div>
                    <div className="absolute top-1 left-[30%] h-8 w-32 bg-indigo-900 rounded flex items-center justify-center text-xs">
                      Office Background
                    </div>
                  </div>
                </div>
                
                {/* Avatar Video Track */}
                <div className="flex h-10 border-b border-gray-700">
                  <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                    <Monitor size={12} className="mr-1" /> Avatar
                  </div>
                  <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-1 w-full bg-gray-600"></div>
                    </div>
                    <div className="absolute top-1 h-8 w-full">
                      <div className="absolute top-0 left-[10%] h-8 w-40 bg-green-900 rounded flex items-center justify-center text-xs">
                        Presenter Avatar
                      </div>
                      <div className="absolute top-0 left-[55%] h-8 w-40 bg-green-900 rounded flex items-center justify-center text-xs">
                        Guest Avatar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Avatar Controls Group */}
              <div className="border-b border-gray-700">
                <div className="flex items-center px-2 py-1 bg-gray-900">
                  <ChevronDown size={14} className="mr-1" />
                  <span className="text-xs font-medium">AVATAR CONTROLS</span>
                </div>
                
                {/* Gestures Track */}
                <div className="flex h-10 border-b border-gray-700">
                  <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                    Gestures
                  </div>
                  <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-1 w-full bg-gray-600"></div>
                    </div>
                    <div className="absolute top-1 h-8 w-full">
                      <div className="absolute top-0 left-[5%] h-8 w-16 bg-yellow-800 rounded flex items-center justify-center text-xs">
                        👋 Wave
                      </div>
                      <div className="absolute top-0 left-[25%] h-8 w-16 bg-yellow-800 rounded flex items-center justify-center text-xs">
                        👉 Point
                      </div>
                      <div className="absolute top-0 left-[60%] h-8 w-16 bg-yellow-800 rounded flex items-center justify-center text-xs">
                        🤝 Shake
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Emotions Track */}
                <div className="flex h-10 border-b border-gray-700">
                  <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                    Emotions
                  </div>
                  <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-1 w-full bg-gray-600"></div>
                    </div>
                    <div className="absolute top-1 h-8 left-0 right-0">
                      {/* Emotion curve */}
                      <svg className="w-full h-full">
                        <path 
                          d="M0,20 C50,5 100,25 150,10 C200,0 250,15 300,20 C350,25 400,5 450,15 C500,20 550,10 600,5" 
                          stroke="#8B5CF6" 
                          fill="none" 
                          strokeWidth="2"
                        />
                      </svg>
                      
                      {/* Emotion keyframes */}
                      <div className="absolute top-0 left-[0%] w-4 h-4 bg-purple-600 rounded-full -ml-2 -mt-2"></div>
                      <div className="absolute top-0 left-[25%] w-4 h-4 bg-purple-600 rounded-full -ml-2 -mt-2"></div>
                      <div className="absolute top-0 left-[50%] w-4 h-4 bg-purple-600 rounded-full -ml-2 -mt-2"></div>
                      <div className="absolute top-0 left-[75%] w-4 h-4 bg-purple-600 rounded-full -ml-2 -mt-2"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Audio Group */}
              <div className="border-b border-gray-700">
                <div className="flex items-center px-2 py-1 bg-gray-900">
                  <ChevronDown size={14} className="mr-1" />
                  <span className="text-xs font-medium">AUDIO</span>
                </div>
                
                {/* Dialogue Tracks */}
                {[1, 2, 3].map(index => (
                  <div key={`dialogue-${index}`} className="flex h-10 border-b border-gray-700">
                    <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                      <Volume size={12} className="mr-1" /> 
                      Dial {index}
                    </div>
                    <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                      <div className="absolute inset-0 flex items-center">
                        <div className="h-1 w-full bg-gray-600"></div>
                      </div>
                      <div className="relative h-full bg-green-900 rounded">
                        <div className="absolute inset-y-0 w-full">
                          {/* Audio waveform simulation */}
                          <div className="h-full flex items-center">
                            {Array.from({ length: 50 }).map((_, i) => (
                              <div 
                                key={i} 
                                className="w-1 mx-px bg-green-500"
                                style={{ 
                                  height: `${30 + Math.random() * 70}%`,
                                  opacity: i > 25 && index === 1 ? 0.3 : 
                                           i < 20 && index === 2 ? 0.3 : 
                                           i < 35 && index === 3 ? 0.3 : 1
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Background Music */}
                <div className="flex h-10 border-b border-gray-700">
                  <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                    <Music size={12} className="mr-1" /> 
                    Music
                  </div>
                  <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-1 w-full bg-gray-600"></div>
                    </div>
                    <div className="absolute top-1 h-8 w-full">
                      <div className="absolute top-0 left-0 h-8 w-full bg-purple-900 opacity-70 rounded flex items-center text-xs">
                        <div className="px-2">Background Ambient</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sound Effects */}
                <div className="flex h-10 border-b border-gray-700">
                  <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                    <Volume size={12} className="mr-1" /> 
                    SFX
                  </div>
                  <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-1 w-full bg-gray-600"></div>
                    </div>
                    <div className="absolute top-1 h-8 w-full">
                      <div className="absolute top-0 left-[20%] h-8 w-12 bg-purple-800 rounded flex items-center justify-center text-xs">
                        🔔
                      </div>
                      <div className="absolute top-0 left-[45%] h-8 w-12 bg-purple-800 rounded flex items-center justify-center text-xs">
                        👏
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Effects Group */}
              <div className="border-b border-gray-700">
                <div className="flex items-center px-2 py-1 bg-gray-900">
                  <ChevronDown size={14} className="mr-1" />
                  <span className="text-xs font-medium">EFFECTS & TEXT</span>
                </div>
                
                {/* Effects Track */}
                <div className="flex h-10 border-b border-gray-700">
                  <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                    <Sliders size={12} className="mr-1" /> 
                    Effects
                  </div>
                  <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-1 w-full bg-gray-600"></div>
                    </div>
                    <div className="absolute top-1 h-8 w-full">
                      <div className="absolute top-0 left-[5%] h-8 w-24 bg-blue-800 rounded flex items-center justify-center text-xs">
                        Fade In
                      </div>
                      <div className="absolute top-0 left-[80%] h-8 w-24 bg-blue-800 rounded flex items-center justify-center text-xs">
                        Fade Out
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Text Overlays */}
                <div className="flex h-10 border-b border-gray-700">
                  <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                    <Type size={12} className="mr-1" /> 
                    Text
                  </div>
                  <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-1 w-full bg-gray-600"></div>
                    </div>
                    <div className="absolute top-1 h-8 w-full">
                      <div className="absolute top-0 left-[10%] h-8 w-40 bg-red-900 rounded flex items-center justify-center text-xs">
                        Name: John Smith
                      </div>
                      <div className="absolute top-0 left-[55%] h-8 w-48 bg-red-900 rounded flex items-center justify-center text-xs">
                        Subscribe Now Banner
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Properties */}
        <div className="w-64 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="p-2 border-b border-gray-700 font-medium flex justify-between items-center">
            <span>Properties</span>
            <div className="flex">
              <button className="p-1 bg-gray-700 rounded hover:bg-gray-600 mr-1">
                <ChevronRight size={16} />
              </button>
              <button className="p-1 bg-gray-700 rounded hover:bg-gray-600">
                <Smile size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Selected Item Properties</h3>
              <div className="bg-gray-700 p-2 rounded">
                <div className="text-xs text-gray-400">No item selected</div>
                <div className="text-xs">Click on a timeline item to edit its properties</div>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Current Scene</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm"
                    defaultValue="Interview"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Duration</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm"
                    defaultValue="00:00:35:00"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Transition</label>
                  <select className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm">
                    <option>Fade</option>
                    <option>Cut</option>
                    <option>Dissolve</option>
                    <option>Slide</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Output Settings</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Resolution</label>
                  <select className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm">
                    <option>1920x1080 (HD)</option>
                    <option>3840x2160 (4K)</option>
                    <option>1280x720 (720p)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Format</label>
                  <select className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm">
                    <option>MP4 (H.264)</option>
                    <option>WebM</option>
                    <option>MOV</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 border-t border-gray-700">
            <button className="w-full bg-blue-600 p-2 rounded font-medium hover:bg-blue-700">
              Render Scene
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainEditorUI;
