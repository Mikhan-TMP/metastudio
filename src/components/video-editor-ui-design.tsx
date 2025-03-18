import React, { useState } from 'react';
import { 
  Play, Pause, Square, Scissors, Copy, 
  Volume2, Volume, VolumeX, 
  Smile, Frown, Meh, 
  ChevronRight, ChevronDown, Sliders,
  Plus, Minus, RotateCcw, RotateCw,
  Save, Upload, Download,
  Maximize, Minimize, 
  Grid, Layout, Layers
} from 'lucide-react';

const VideoEditorUI = () => {
  const [selectedGesture, setSelectedGesture] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [zoom, setZoom] = useState(1);
  
  // Mock data
  const gestures = [
    { id: 1, name: 'Wave', thumbnail: '👋', category: 'Greeting' },
    { id: 2, name: 'Point', thumbnail: '👉', category: 'Direction' },
    { id: 3, name: 'Clap', thumbnail: '👏', category: 'Reaction' },
    { id: 4, name: 'Thumbs Up', thumbnail: '👍', category: 'Reaction' },
    { id: 5, name: 'Handshake', thumbnail: '🤝', category: 'Greeting' },
    { id: 6, name: 'Thinking', thumbnail: '🤔', category: 'Contemplative' }
  ];
  
  const emotions = [
    { id: 1, name: 'Happy', intensity: 80, icon: <Smile size={20} /> },
    { id: 2, name: 'Sad', intensity: 60, icon: <Frown size={20} /> },
    { id: 3, name: 'Surprised', intensity: 70, icon: '😮' },
    { id: 4, name: 'Angry', intensity: 90, icon: '😠' },
    { id: 5, name: 'Neutral', intensity: 50, icon: <Meh size={20} /> },
  ];
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleGestureSelect = (gesture) => {
    setSelectedGesture(gesture);
  };
  
  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
  };
  
  const handleTimelineClick = (e) => {
    const timeline = e.currentTarget;
    const rect = timeline.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedTime = (x / rect.width) * 100; // Convert to percentage
    setCurrentTime(clickedTime);
  };
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top Toolbar */}
      <div className="flex justify-between items-center p-2 bg-gray-800 border-b border-gray-700">
        <div className="flex space-x-4">
          <button className="p-2 bg-blue-600 rounded hover:bg-blue-700">
            <Save size={18} />
          </button>
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
            <Upload size={18} />
          </button>
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
            <Download size={18} />
          </button>
        </div>
        
        <div className="flex space-x-2">
          <span className="text-sm bg-gray-700 px-2 py-1 rounded">Project: Avatar Demo</span>
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
            <RotateCcw size={18} />
          </button>
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
            <RotateCw size={18} />
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
            <Layout size={18} />
          </button>
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
            <Maximize size={18} />
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Asset Libraries */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Library Tabs */}
          <div className="flex border-b border-gray-700">
            <button className="flex-1 py-2 bg-gray-700 text-blue-400 font-medium">Gestures</button>
            <button className="flex-1 py-2 hover:bg-gray-700">Emotions</button>
            <button className="flex-1 py-2 hover:bg-gray-700">Effects</button>
          </div>
          
          {/* Category Filter */}
          <div className="p-2 border-b border-gray-700">
            <select className="w-full bg-gray-700 p-1 rounded border border-gray-600">
              <option>All Categories</option>
              <option>Greeting</option>
              <option>Direction</option>
              <option>Reaction</option>
              <option>Contemplative</option>
            </select>
          </div>
          
          {/* Asset Items */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="grid grid-cols-2 gap-2">
              {gestures.map(gesture => (
                <div 
                  key={gesture.id}
                  className={`p-2 rounded cursor-pointer transition-colors ${selectedGesture?.id === gesture.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  onClick={() => handleGestureSelect(gesture)}
                >
                  <div className="text-2xl text-center mb-1">{gesture.thumbnail}</div>
                  <div className="text-xs text-center truncate">{gesture.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Search and Add */}
          <div className="p-2 border-t border-gray-700">
            <div className="flex mb-2">
              <input 
                type="text" 
                placeholder="Search assets..." 
                className="flex-1 p-1 bg-gray-700 rounded-l border border-gray-600"
              />
              <button className="bg-gray-600 px-2 rounded-r border border-gray-600">
                <ChevronRight size={18} />
              </button>
            </div>
            <button className="w-full flex items-center justify-center p-1 bg-blue-600 rounded hover:bg-blue-700">
              <Plus size={18} className="mr-1" /> New Gesture
            </button>
          </div>
        </div>
        
        {/* Center - Preview and Timeline */}
        <div className="flex-1 flex flex-col bg-gray-900 overflow-hidden">
          {/* Preview Area */}
          <div className="flex-1 min-h-0 p-4 flex justify-center items-center">
            <div className="relative bg-black w-full max-w-3xl aspect-video rounded overflow-hidden">
              {/* Preview Window */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-48 bg-gray-800 rounded relative">
                  {/* Avatar placeholder */}
                  <div className="w-full h-full flex items-center justify-center">
                    {selectedEmotion ? (
                      <div className="text-4xl">{typeof selectedEmotion.icon === 'string' ? selectedEmotion.icon : 
                        <div className="text-blue-400">
                          {selectedEmotion.icon}
                        </div>
                      }</div>
                    ) : (
                      <Meh size={48} className="text-gray-500" />
                    )}
                  </div>
                  
                  {/* Gesture indicator */}
                  {selectedGesture && (
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-600 py-1 px-2 text-xs text-center">
                      {selectedGesture.name}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Preview Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 flex justify-between items-center">
                <div className="text-sm">00:00:15:00</div>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <RotateCcw size={16} />
                  </button>
                  <button className="p-1 hover:bg-gray-700 rounded" onClick={togglePlay}>
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <Square size={16} />
                  </button>
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <RotateCw size={16} />
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
          <div className="p-2 bg-gray-800 border-t border-gray-700 flex items-center justify-between">
            <div className="flex space-x-2">
              <button className="p-1 bg-gray-700 rounded hover:bg-gray-600">
                <Scissors size={16} />
              </button>
              <button className="p-1 bg-gray-700 rounded hover:bg-gray-600">
                <Copy size={16} />
              </button>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">00:00:15:00</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button onClick={handleZoomOut} className="p-1 bg-gray-700 rounded hover:bg-gray-600">
                <Minus size={16} />
              </button>
              <span className="text-xs">{(zoom * 100).toFixed(0)}%</span>
              <button onClick={handleZoomIn} className="p-1 bg-gray-700 rounded hover:bg-gray-600">
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="h-48 bg-gray-800 border-t border-gray-700 overflow-hidden flex flex-col">
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
            
            {/* Tracks */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex h-10 border-b border-gray-700">
                <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                  Video
                </div>
                <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                  <div className="absolute inset-0 flex items-center">
                    <div className="h-1 w-full bg-gray-600"></div>
                  </div>
                  <div className="relative h-full bg-blue-900 rounded"></div>
                </div>
              </div>
              
              <div className="flex h-10 border-b border-gray-700">
                <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                  Audio
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
                            style={{ height: `${30 + Math.random() * 70}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex h-10 border-b border-gray-700">
                <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                  Gestures
                </div>
                <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                  <div className="absolute inset-0 flex items-center">
                    <div className="h-1 w-full bg-gray-600"></div>
                  </div>
                  {/* Example gestures on timeline */}
                  <div className="absolute top-1 h-8 w-16 bg-yellow-800 left-[10%] rounded flex items-center justify-center text-xs">
                    👋 Wave
                  </div>
                  <div className="absolute top-1 h-8 w-16 bg-yellow-800 left-[35%] rounded flex items-center justify-center text-xs">
                    👉 Point
                  </div>
                  <div className="absolute top-1 h-8 w-16 bg-yellow-800 left-[60%] rounded flex items-center justify-center text-xs">
                    👏 Clap
                  </div>
                </div>
              </div>
              
              <div className="flex h-10 border-b border-gray-700">
                <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                  Emotions
                </div>
                <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                  <div className="absolute inset-0 flex items-center">
                    <div className="h-1 w-full bg-gray-600"></div>
                  </div>
                  {/* Emotion keyframes */}
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
                    <div className="absolute top-0 left-[100%] w-4 h-4 bg-purple-600 rounded-full -ml-2 -mt-2"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex h-10 border-b border-gray-700">
                <div className="w-16 flex items-center justify-center bg-gray-900 text-xs">
                  Effects
                </div>
                <div className="flex-1 bg-gray-700 relative px-1 py-1" onClick={handleTimelineClick}>
                  <div className="absolute inset-0 flex items-center">
                    <div className="h-1 w-full bg-gray-600"></div>
                  </div>
                  <div className="absolute top-1 h-8 w-20 bg-purple-900 left-[45%] rounded flex items-center justify-center text-xs">
                    <Layers size={12} className="mr-1" /> Fade In
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Properties */}
        <div className="w-72 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* Properties Header */}
          <div className="p-3 border-b border-gray-700 font-medium">
            Properties
          </div>
          
          {/* Gesture Properties (if gesture selected) */}
          {selectedGesture && (
            <div className="p-3 border-b border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Gesture: {selectedGesture.name}</h3>
                <span className="text-2xl">{selectedGesture.thumbnail}</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Duration</label>
                  <input 
                    type="range" 
                    className="w-full" 
                    min="0.5" 
                    max="5" 
                    step="0.1" 
                    defaultValue="2" 
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>0.5s</span>
                    <span>2.0s</span>
                    <span>5.0s</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Intensity</label>
                  <input 
                    type="range" 
                    className="w-full" 
                    min="0" 
                    max="100" 
                    step="5" 
                    defaultValue="75" 
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>Subtle</span>
                    <span>Medium</span>
                    <span>Strong</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Transition In</label>
                  <select className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm">
                    <option>Natural</option>
                    <option>Abrupt</option>
                    <option>Smooth</option>
                    <option>None</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Transition Out</label>
                  <select className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm">
                    <option>Natural</option>
                    <option>Abrupt</option>
                    <option>Smooth</option>
                    <option>None</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Loop Count</label>
                  <input 
                    type="number" 
                    className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm"
                    min="1"
                    max="10"
                    defaultValue="1"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Emotion Properties (if emotion selected) */}
          {selectedEmotion && (
            <div className="p-3 border-b border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Emotion: {selectedEmotion.name}</h3>
                <span className="text-2xl">
                  {typeof selectedEmotion.icon === 'string' ? selectedEmotion.icon : selectedEmotion.icon}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Intensity</label>
                  <input 
                    type="range" 
                    className="w-full" 
                    min="0" 
                    max="100" 
                    step="5" 
                    defaultValue={selectedEmotion.intensity} 
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>Subtle</span>
                    <span>Medium</span>
                    <span>Strong</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Brow Adjust</label>
                    <input 
                      type="range" 
                      className="w-full" 
                      min="-100" 
                      max="100" 
                      step="10" 
                      defaultValue="0" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Mouth Adjust</label>
                    <input 
                      type="range" 
                      className="w-full" 
                      min="-100" 
                      max="100" 
                      step="10" 
                      defaultValue="50" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Duration</label>
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      className="w-20 bg-gray-700 p-1 rounded-l border border-gray-600 text-sm"
                      defaultValue="00:05"
                    />
                    <span className="bg-gray-600 px-2 py-1 text-sm border border-l-0 border-gray-600">to</span>
                    <input 
                      type="text" 
                      className="w-20 bg-gray-700 p-1 rounded-r border border-l-0 border-gray-600 text-sm"
                      defaultValue="00:10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Blend Method</label>
                  <select className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm">
                    <option>Linear</option>
                    <option>Ease In</option>
                    <option>Ease Out</option>
                    <option>Ease In-Out</option>
                    <option>Step</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="syncAudio" className="rounded" defaultChecked />
                  <label htmlFor="syncAudio" className="text-sm">Sync with audio emotion</label>
                </div>
              </div>
            </div>
          )}
          
          {/* Avatar Settings */}
          <div className="p-3 border-b border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Avatar Settings</h3>
              <button className="p-1 bg-gray-700 rounded hover:bg-gray-600">
                <Sliders size={14} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Avatar Model</label>
                <select className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm">
                  <option>Business Woman</option>
                  <option>Business Man</option>
                  <option>Casual Woman</option>
                  <option>Casual Man</option>
                  <option>Custom...</option>
                </select>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Position X</label>
                  <input 
                    type="number" 
                    className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm"
                    defaultValue="0"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Position Y</label>
                  <input 
                    type="number" 
                    className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm"
                    defaultValue="0"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Scale</label>
                  <input 
                    type="number" 
                    className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm"
                    defaultValue="100"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Lighting</label>
                <select className="w-full bg-gray-700 p-1 rounded border border-gray-600 text-sm">
                  <option>Studio Lighting</option>
                  <option>Natural Light</option>
                  <option>Dramatic</option>
                  <option>Warm</option>
                  <option>Cool</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Output Settings */}
          <div className="p-3 mt-auto border-t border-gray-700">
            <button className="w-full bg-blue-600 p-2 rounded font-medium hover:bg-blue-700 mb-2">
              Apply Changes
            </button>
            <button className="w-full bg-green-600 p-2 rounded font-medium hover:bg-green-700">
              Export Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEditorUI;
