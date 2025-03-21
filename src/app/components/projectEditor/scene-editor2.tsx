import React, { useState, useRef, useEffect } from 'react';
import { Plus, Edit, Save, Play, Download, X, Music, User, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [projectName, setProjectName] = useState('Untitled Project');
  const [projectTheme, setProjectTheme] = useState('');
  
  // Asset states
  const [backgroundAssets, setBackgroundAssets] = useState([]);
  const [avatarAssets, setAvatarAssets] = useState([]);
  const [audioAssets, setAudioAssets] = useState([]);
  
  // Timeline states
  const [timelineTracks, setTimelineTracks] = useState({
    background: [],
    avatar: [],
    audio: []
  });
  
  // Drag state
  const [draggedAsset, setDraggedAsset] = useState(null);
  const [resizingItem, setResizingItem] = useState(null);
  const [movingItem, setMovingItem] = useState(null);
  const [startX, setStartX] = useState(0);
  const [initialWidth, setInitialWidth] = useState(0);
  const [initialLeft, setInitialLeft] = useState(0);
  
  // Preview state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalDuration, setTotalDuration] = useState(360); // 6 minutes in seconds
  
  const timelineRef = useRef(null);
  const previewIntervalRef = useRef(null);

  // Zoom state
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = 100%, 2 = 200%, etc.

  // Function to handle zoom in
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 4)); // Limit max zoom to 400%
  };

  // Function to handle zoom out
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.25)); // Limit min zoom to 25%
  };

  // Preview animation frame
  useEffect(() => {
    if (isPlaying) {
      previewIntervalRef.current = setInterval(() => {
        setCurrentTime(prevTime => {
          const maxDuration = getProjectDuration();
          if (prevTime >= maxDuration) {
            clearInterval(previewIntervalRef.current);
            setIsPlaying(false);
            return 0;
          }
          return prevTime + 0.1;
        });
      }, 100);
    } else {
      clearInterval(previewIntervalRef.current);
    }

    return () => clearInterval(previewIntervalRef.current);
  }, [isPlaying]);

  // Calculate project duration
  const getProjectDuration = () => {
    const allItems = [
      ...timelineTracks.background,
      ...timelineTracks.avatar,
      ...timelineTracks.audio
    ];
    
    if (allItems.length === 0) return 0;
    
    return Math.max(...allItems.map(item => item.startTime + item.duration));
  };

  // Handle file uploads for different asset types
  const handleAssetUpload = (e, assetType) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      if (assetType === 'background' || assetType === 'avatar') {
        return file.type.startsWith('image/');
      } else if (assetType === 'audio') {
        return file.type.startsWith('audio/');
      }
      return false;
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAsset = {
          id: Date.now() + Math.random().toString(36).substring(2, 9),
          name: file.name,
          type: file.type,
          url: reader.result,
          duration: assetType === 'audio' ? 30 : 10, // Default durations in seconds
        };

        if (assetType === 'background') {
          setBackgroundAssets(prev => [...prev, newAsset]);
        } else if (assetType === 'avatar') {
          setAvatarAssets(prev => [...prev, newAsset]);
        } else if (assetType === 'audio') {
          setAudioAssets(prev => [...prev, newAsset]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle file drop for different asset types
  const handleAssetDrop = (e, assetType) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleAssetUpload({ target: { files } }, assetType);
  };

  // Remove an asset
  const handleRemoveAsset = (id, assetType) => {
    if (assetType === 'background') {
      setBackgroundAssets(prev => prev.filter(asset => asset.id !== id));
    } else if (assetType === 'avatar') {
      setAvatarAssets(prev => prev.filter(asset => asset.id !== id));
    } else if (assetType === 'audio') {
      setAudioAssets(prev => prev.filter(asset => asset.id !== id));
    }
  };

  // Handle drag start from asset library
  const handleDragStart = (e, asset, assetType) => {
    setDraggedAsset({ ...asset, assetType });
    e.dataTransfer.setData('text/plain', JSON.stringify({ id: asset.id, type: assetType }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Handle dropping asset on timeline
  const handleTimelineDrop = (e, trackType) => {
    e.preventDefault();
    if (!draggedAsset || draggedAsset.assetType !== trackType) return;

    // Calculate position in timeline based on drop coordinates
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const dropX = e.clientX - timelineRect.left - 24; // Adjust for label width
    const trackWidth = timelineRect.width - 24;
    
    // Calculate time position (in seconds)
    const timePosition = Math.max(0, Math.round((dropX / trackWidth) * totalDuration));
    
    // Add asset to timeline at calculated position
    const newTimelineItem = {
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      assetId: draggedAsset.id,
      assetName: draggedAsset.name,
      startTime: timePosition,
      duration: draggedAsset.duration,
      url: draggedAsset.url
    };

    setTimelineTracks(prev => ({
      ...prev,
      [trackType]: [...prev[trackType], newTimelineItem]
    }));

    setDraggedAsset(null);
  };

  // Start resizing a timeline item
  const handleResizeStart = (e, trackType, itemId, resizeSide) => {
    e.stopPropagation();
    const item = timelineTracks[trackType].find(i => i.id === itemId);
    if (!item) return;

    setResizingItem({ trackType, itemId, resizeSide });
    setStartX(e.clientX);
    setInitialWidth(item.duration);
    setInitialLeft(item.startTime);

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  // Handle resize movement
  const handleResizeMove = (e) => {
    if (!resizingItem) return;

    const { trackType, itemId, resizeSide } = resizingItem;
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const trackWidth = timelineRect.width - 24;

    const deltaX = e.clientX - startX;
    const deltaSeconds = (deltaX / trackWidth) * totalDuration;

    setTimelineTracks(prev => ({
      ...prev,
      [trackType]: prev[trackType].map(item => 
        item.id === itemId 
          ? {
              ...item,
              startTime: resizeSide === 'left' ? Math.max(0, initialLeft + deltaSeconds) : item.startTime,
              duration: resizeSide === 'left' ? Math.max(1, initialWidth - deltaSeconds) : Math.max(1, initialWidth + deltaSeconds),
            }
          : item
      ),
    }));
  };

  // End resizing
  const handleResizeEnd = () => {
    setResizingItem(null);
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  // Start moving a timeline item
  const handleMoveStart = (e, trackType, itemId) => {
    e.stopPropagation();
    const item = timelineTracks[trackType].find(i => i.id === itemId);
    if (!item) return;
    
    setMovingItem({ trackType, itemId });
    setStartX(e.clientX);
    setInitialLeft(item.startTime);
    
    document.addEventListener('mousemove', handleMoveMove);
    document.addEventListener('mouseup', handleMoveEnd);
  };

  // Handle move movement
  const handleMoveMove = (e) => {
    if (!movingItem) return;
    
    const { trackType, itemId } = movingItem;
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const trackWidth = timelineRect.width - 24;
    
    const deltaX = e.clientX - startX;
    const deltaSeconds = (deltaX / trackWidth) * totalDuration;
    const newStartTime = Math.max(0, initialLeft + deltaSeconds);
    
    setTimelineTracks(prev => ({
      ...prev,
      [trackType]: prev[trackType].map(item => 
        item.id === itemId 
          ? { ...item, startTime: newStartTime } 
          : item
      )
    }));
  };

  // End moving
  const handleMoveEnd = () => {
    setMovingItem(null);
    document.removeEventListener('mousemove', handleMoveMove);
    document.removeEventListener('mouseup', handleMoveEnd);
  };

  // Calculate width and position for timeline items
  const getTimelineItemStyle = (item) => {
    const width = (item.duration / totalDuration) * 100;
    const left = (item.startTime / totalDuration) * 100;
    
    return {
      width: `${width}%`,
      left: `${left}%`,
      WebkitBackfaceVisibility: 'hidden', // Smooth out animations
      backfaceVisibility: 'hidden'
    };
  };

  // Handle timeline item removal
  const handleRemoveTimelineItem = (trackType, itemId) => {
    setTimelineTracks(prev => ({
      ...prev,
      [trackType]: prev[trackType].filter(item => item.id !== itemId)
    }));
  };

  // Get currently visible assets at a given time
  const getVisibleAssetsAtTime = (time) => {
    const visible = {
      background: null,
      avatar: null,
      audio: null
    };
    
    // Find the visible background
    for (const item of timelineTracks.background) {
      if (time >= item.startTime && time < item.startTime + item.duration) {
        visible.background = item;
        break;
      }
    }
    
    // Find the visible avatar
    for (const item of timelineTracks.avatar) {
      if (time >= item.startTime && time < item.startTime + item.duration) {
        visible.avatar = item;
        break;
      }
    }
    
    // Find the visible audio
    for (const item of timelineTracks.audio) {
      if (time >= item.startTime && time < item.startTime + item.duration) {
        visible.audio = item;
        break;
      }
    }
    
    return visible;
  };

  // Toggle preview window
  const handleTogglePreview = () => {
    setIsPreviewOpen(prev => !prev);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  // Handle play/pause
  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  // Preview the project
  const handlePreview = () => {
    setIsPreviewOpen(true);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Format time as MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Export the project
  const handleExport = () => {
    alert('Export functionality would render the final video for download.');
  };

  // Add smooth scrolling to the timeline when dragging
  useEffect(() => {
    if (movingItem || resizingItem) {
      const container = timelineRef.current.querySelector('.overflow-x-auto');
      const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const scrollSpeed = 15;
        
        if (e.clientX > rect.right - 100) {
          container.scrollLeft += scrollSpeed;
        } else if (e.clientX < rect.left + 100) {
          container.scrollLeft -= scrollSpeed;
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [movingItem, resizingItem]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => {
              setProjectName('Untitled Project');
              setProjectTheme('');
              setBackgroundAssets([]);
              setAvatarAssets([]);
              setAudioAssets([]);
              setTimelineTracks({ background: [], avatar: [], audio: [] });
            }}>
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
            <Button onClick={handlePreview}>
              <div className="flex items-center gap-2">
                <Play size={16} />
                Preview
              </div>
            </Button>
            <Button onClick={handleExport}>
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
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Topic/Theme</label>
              <input 
                type="text" 
                className="w-full border rounded p-2"
                placeholder="Enter topic or theme"
                value={projectTheme}
                onChange={(e) => setProjectTheme(e.target.value)}
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
        <div className="flex-1 p-4 overflow-y-auto">
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
                    <span className="text-sm text-gray-500">
                      Total: {formatTime(getProjectDuration())}
                    </span>
                    {/* Zoom Controls */}
                    <div className="flex items-center gap-2">
                      <button onClick={handleZoomOut}>-</button>
                      <span>{Math.round(zoomLevel * 100)}%</span>
                      <button onClick={handleZoomIn}>+</button>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="h-64 bg-gray-50 rounded-lg border overflow-hidden relative"  // removed overflow-x-auto to handle it differently
                  ref={timelineRef}
                >
                  <div className="absolute inset-0 flex flex-col">
                    {/* Time Markers */}
                    <div className="sticky top-0 h-6 flex border-b bg-gray-50 z-10">
                      <div className="w-24 bg-gray-100 border-r flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-500">Time</span>
                      </div>
                      <div className="flex-1 flex">
                        {[...Array(Math.ceil(totalDuration / 60))].map((_, i) => (
                          <div key={i} className="flex-1 border-r text-xs text-gray-500 px-1 flex items-center">
                            {String(i).padStart(2, '0')}:00
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Scrollable Timeline Content */}
                    <div className="flex-1 overflow-x-auto">
                      <div 
                        className="h-full relative"
                        style={{ width: `${100 * zoomLevel}%`, minWidth: '100%' }}
                      >
                        {/* Time Markers Container with Playhead */}
                        <div className="absolute inset-0 flex">
                          <div className="w-24 flex-shrink-0" /> {/* Spacer for label width */}
                          <div className="flex-1 relative">
                            {/* Vertical Grid Lines */}
                            <div className="absolute inset-0 flex pointer-events-none">
                              {[...Array(Math.ceil(totalDuration / 60))].map((_, i) => (
                                <div key={i} className="flex-1 border-r border-gray-200" />
                              ))}
                            </div>

                            {/* Playhead - Now correctly aligned */}
                            {isPreviewOpen && (
                              <div 
                                className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-30 pointer-events-none"
                                style={{
                                  left: `${(Math.min(currentTime / totalDuration, 1) * 100)}%`,
                                  transition: 'left 0.1s linear',
                                  height: '192px' // Matches the height of all three tracks
                                }}
                              />
                            )}
                          </div>
                        </div>

                        {/* Track Container */}
                        <div className="absolute inset-0">
                          {/* Background Track */}
                          <div 
                            className="relative h-16 flex"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleTimelineDrop(e, 'background')}
                          >
                            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gray-100 flex items-center px-2 border-r z-10">
                              <span className="text-xs font-medium">Background</span>
                            </div>
                            <div className="flex-1 ml-24 relative">
                              {timelineTracks.background.map((item) => (
                                <div
                                  key={item.id}
                                  className="absolute bg-blue-100 h-12 mt-2 rounded-md px-2 py-1 text-xs border border-blue-200 overflow-hidden cursor-move shadow-sm hover:shadow-md transition-shadow duration-200"
                                  style={{
                                    ...getTimelineItemStyle(item),
                                    transition: movingItem || resizingItem ? 'none' : 'all 0.2s ease'
                                  }}
                                  onMouseDown={(e) => handleMoveStart(e, 'background', item.id)}
                                >
                                  <div className="flex justify-between">
                                    <span className="truncate">{item.assetName}</span>
                                    <button onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveTimelineItem('background', item.id);
                                    }}>
                                      <X size={12} />
                                    </button>
                                  </div>
                                  {item.url && <img src={item.url} alt="" className="h-6 w-auto object-cover mt-1" />}
                                  <div 
                                    className="absolute right-0 top-0 bottom-0 w-2 bg-blue-300 cursor-ew-resize"
                                    onMouseDown={(e) => handleResizeStart(e, 'background', item.id, 'right')}
                                  />
                                  <div 
                                    className="absolute left-0 top-0 bottom-0 w-2 bg-blue-300 cursor-ew-resize"
                                    onMouseDown={(e) => handleResizeStart(e, 'background', item.id, 'left')}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Avatar Track */}
                          <div 
                            className="relative h-16 flex"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleTimelineDrop(e, 'avatar')}
                          >
                            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gray-100 flex items-center px-2 border-r z-10">
                              <span className="text-xs font-medium">Avatar</span>
                            </div>
                            <div className="flex-1 ml-24 relative">
                              {timelineTracks.avatar.map((item) => (
                                <div
                                  key={item.id}
                                  className="absolute bg-green-100 h-12 mt-2 rounded-md px-2 py-1 text-xs border border-green-200 overflow-hidden cursor-move shadow-sm hover:shadow-md transition-shadow duration-200"
                                  style={{
                                    ...getTimelineItemStyle(item),
                                    transition: movingItem || resizingItem ? 'none' : 'all 0.2s ease'
                                  }}
                                  onMouseDown={(e) => handleMoveStart(e, 'avatar', item.id)}
                                >
                                  <div className="flex justify-between">
                                    <span className="truncate">{item.assetName}</span>
                                    <button onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveTimelineItem('avatar', item.id);
                                    }}>
                                      <X size={12} />
                                    </button>
                                  </div>
                                  {item.url && <img src={item.url} alt="" className="h-6 w-auto object-cover mt-1" />}
                                  <div 
                                    className="absolute right-0 top-0 bottom-0 w-2 bg-green-300 cursor-ew-resize"
                                    onMouseDown={(e) => handleResizeStart(e, 'avatar', item.id, 'right')}
                                  />
                                  <div 
                                    className="absolute left-0 top-0 bottom-0 w-2 bg-green-300 cursor-ew-resize"
                                    onMouseDown={(e) => handleResizeStart(e, 'avatar', item.id, 'left')}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Audio Track */}
                          <div 
                            className="relative h-16 flex"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleTimelineDrop(e, 'audio')}
                          >
                            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gray-100 flex items-center px-2 border-r z-10">
                              <span className="text-xs font-medium">Audio & Script</span>
                            </div>
                            <div className="flex-1 ml-24 relative">
                              {timelineTracks.audio.map((item) => (
                                <div
                                  key={item.id}
                                  className="absolute bg-purple-100 h-12 mt-2 rounded-md px-2 py-1 text-xs border border-purple-200 overflow-hidden cursor-move shadow-sm hover:shadow-md transition-shadow duration-200"
                                  style={{
                                    ...getTimelineItemStyle(item),
                                    transition: movingItem || resizingItem ? 'none' : 'all 0.2s ease'
                                  }}
                                  onMouseDown={(e) => handleMoveStart(e, 'audio', item.id)}
                                >
                                  <div className="flex justify-between">
                                    <span className="truncate">{item.assetName}</span>
                                    <button onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveTimelineItem('audio', item.id);
                                    }}>
                                      <X size={12} />
                                    </button>
                                  </div>
                                  <div className="mt-1 flex items-center">
                                    <Music size={12} className="mr-1" />
                                    <span>{Math.round(item.duration)}s</span>
                                  </div>
                                  <div 
                                    className="absolute right-0 top-0 bottom-0 w-2 bg-purple-300 cursor-ew-resize"
                                    onMouseDown={(e) => handleResizeStart(e, 'audio', item.id, 'right')}
                                  />
                                  <div 
                                    className="absolute left-0 top-0 bottom-0 w-2 bg-purple-300 cursor-ew-resize"
                                    onMouseDown={(e) => handleResizeStart(e, 'audio', item.id, 'left')}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
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
                <div 
                  className="bg-gray-50 rounded-lg h-40 flex items-center justify-center border-2 border-dashed border-gray-300 relative cursor-pointer"
                  onClick={() => document.getElementById('background-upload').click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleAssetDrop(e, 'background')}
                >
                  <div className="text-gray-500 text-center">
                    <p>Drop Background Assets</p>
                    <p className="text-sm">or click to upload</p>
                    <input
                      id="background-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleAssetUpload(e, 'background')}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 max-h-48 overflow-y-auto">
                  {backgroundAssets.map((asset) => (
                    <div 
                      key={asset.id} 
                      className="relative h-24 w-full bg-gray-100 rounded-lg overflow-hidden"
                      draggable
                      onDragStart={(e) => handleDragStart(e, asset, 'background')}
                    >
                      <img src={asset.url} alt={asset.name} className="h-full w-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                        {asset.name}
                      </div>
                      <button
                        onClick={() => handleRemoveAsset(asset.id, 'background')}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avatar Section */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Avatar Assets</h3>
                <div 
                  className="bg-gray-50 rounded-lg h-40 flex items-center justify-center border-2 border-dashed border-gray-300 relative cursor-pointer"
                  onClick={() => document.getElementById('avatar-upload').click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleAssetDrop(e, 'avatar')}
                >
                  <div className="text-gray-500 text-center">
                    <p>Drop Avatar Assets</p>
                    <p className="text-sm">or click to upload</p>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleAssetUpload(e, 'avatar')}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 max-h-48 overflow-y-auto">
                  {avatarAssets.map((asset) => (
                    <div 
                      key={asset.id} 
                      className="relative h-24 w-full bg-gray-100 rounded-lg overflow-hidden"
                      draggable
                      onDragStart={(e) => handleDragStart(e, asset, 'avatar')}
                    >
                      <img src={asset.url} alt={asset.name} className="h-full w-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                        {asset.name}
                      </div>
                      <button
                        onClick={() => handleRemoveAsset(asset.id, 'avatar')}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audio/Script Section */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Audio & Script</h3>
                <div 
                  className="bg-gray-50 rounded-lg h-40 flex items-center justify-center border-2 border-dashed border-gray-300 relative cursor-pointer"
                  onClick={() => document.getElementById('audio-upload').click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleAssetDrop(e, 'audio')}
                >
                  <div className="text-gray-500 text-center">
                    <p>Drop Audio Files</p>
                    <p className="text-sm">or click to upload</p>
                    <input
                      id="audio-upload"
                      type="file"
                      accept="audio/*"
                      multiple
                      onChange={(e) => handleAssetUpload(e, 'audio')}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 mt-4 max-h-48 overflow-y-auto">
                  {audioAssets.map((asset) => (
                    <div 
                      key={asset.id} 
                      className="relative flex items-center p-2 bg-gray-100 rounded-lg"
                      draggable
                      onDragStart={(e) => handleDragStart(e, asset, 'audio')}
                    >
                      <Music size={20} className="text-purple-500 mr-2" />
                      <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-medium truncate">{asset.name}</div>
                        <div className="text-xs text-gray-500">{asset.duration}s</div>
                      </div>
                      <button
                        onClick={() => handleRemoveAsset(asset.id, 'audio')}
                        className="ml-2 text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-4/5 max-w-4xl overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Preview: {projectName}</h3>
              <button onClick={handleTogglePreview} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-black aspect-video relative flex items-center justify-center overflow-hidden">
                {/* Render current visible assets */}
                {(() => {
                  const visibleAssets = getVisibleAssetsAtTime(currentTime);
                  return (
                    <>
                      {visibleAssets.background && (
                        <img 
                          src={visibleAssets.background.url} 
                          alt="Background" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      {visibleAssets.avatar && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 h-1/2">
                          <img 
                            src={visibleAssets.avatar.url} 
                            alt="Avatar" 
                            className="h-full w-auto object-contain"
                          />
                        </div>
                      )}
                      {visibleAssets.audio && (
                        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm flex items-center">
                          <Music size={16} className="mr-1" />
                          <span>{visibleAssets.audio.assetName}</span>
                        </div>
                      )}
                      {!visibleAssets.background && !visibleAssets.avatar && !visibleAssets.audio && (
                        <div className="text-white text-opacity-50">
                          No content at current timestamp
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
              
              {/* Playback Controls */}
              <div className="mt-4 flex items-center space-x-4">
                <button 
                  onClick={handlePlayPause}
                  className="p-2 bg-blue-500 text-white rounded-full"
                >
                  {isPlaying ? (
                    <span className="flex items-center justify-center h-6 w-6">❚❚</span>
                  ) : (
                    <Play size={24} />
                  )}
                </button>
                
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500"
                    style={{ width: `${(currentTime / getProjectDuration()) * 100}%` }}
                  ></div>
                </div>
                
                <div className="text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(getProjectDuration())}
                </div>
              </div>
              
              {/* Preview Info */}
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Current Scene</h4>
                    <p className="text-sm text-gray-500">
                      {(() => {
                        const visibleAssets = getVisibleAssetsAtTime(currentTime);
                        if (visibleAssets.background) {
                          return visibleAssets.background.assetName;
                        }
                        return 'None';
                      })()}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Current Avatar</h4>
                    <p className="text-sm text-gray-500">
                      {(() => {
                        const visibleAssets = getVisibleAssetsAtTime(currentTime);
                        if (visibleAssets.avatar) {
                          return visibleAssets.avatar.assetName;
                        }
                        return 'None';
                      })()}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Current Audio</h4>
                    <p className="text-sm text-gray-500">
                      {(() => {
                        const visibleAssets = getVisibleAssetsAtTime(currentTime);
                        if (visibleAssets.audio) {
                          return visibleAssets.audio.assetName;
                        }
                        return 'None';
                      })()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button onClick={handleExport}>
                  <div className="flex items-center gap-2">
                    <Download size={16} />
                    Export Video
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectEditor;