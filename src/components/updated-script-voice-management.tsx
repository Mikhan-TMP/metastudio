import React, { useState, useCallback } from 'react';
import {
  FileText, Mic, Music, Play, Pause, Search, Filter, Volume2, SkipBack, SkipForward,
  Plus, Trash2, Edit, Save, Upload, Download, Copy, Star, Clock, Headphones,
  Folder, List, Grid, Scissors, VolumeX, Repeat, Smile
} from 'lucide-react';

const ScriptVoiceManagement = () => {
  const [currentView, setCurrentView] = useState('script');
  const [scriptPrompt, setScriptPrompt] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedContent, setUploadedContent] = useState('');
  const [fileError, setFileError] = useState('');
  
  // Audio management states
  const [activeTab, setActiveTab] = useState('dialogue');
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(20); // Percentage for visualization
  const [currentCategory, setCurrentCategory] = useState('all');
  const [isRecording, setIsRecording] = useState(false);

  // Mock data
  const dialogueAudio = [
    { id: 1, name: "Introduction", duration: "0:15", type: "dialogue", speaker: "Main Presenter", transcript: "Hello and welcome to our presentation...", path: "intro.mp3", favorite: true, category: "Opening" },
    { id: 2, name: "Main Point 1", duration: "0:22", type: "dialogue", speaker: "Main Presenter", transcript: "Our first key point is...", path: "point1.mp3", favorite: false, category: "Content" },
    { id: 3, name: "Question 1", duration: "0:08", type: "dialogue", speaker: "Guest", transcript: "Can you elaborate on that point?", path: "question1.mp3", favorite: false, category: "Interview" },
    { id: 4, name: "Response 1", duration: "0:18", type: "dialogue", speaker: "Main Presenter", transcript: "That's an excellent question...", path: "response1.mp3", favorite: true, category: "Interview" },
    { id: 5, name: "Main Point 2", duration: "0:25", type: "dialogue", speaker: "Main Presenter", transcript: "Moving on to our second point...", path: "point2.mp3", favorite: false, category: "Content" },
    { id: 6, name: "Conclusion", duration: "0:12", type: "dialogue", speaker: "Main Presenter", transcript: "In conclusion, we've shown that...", path: "conclusion.mp3", favorite: true, category: "Closing" },
  ];
  
  const musicAudio = [
    { id: 7, name: "Corporate Intro", duration: "1:30", type: "music", mood: "Professional", tempo: "Medium", path: "corporate_intro.mp3", favorite: true, category: "Business" },
    { id: 8, name: "Upbeat Background", duration: "2:45", type: "music", mood: "Energetic", tempo: "Fast", path: "upbeat.mp3", favorite: false, category: "Energetic" },
    { id: 9, name: "Ambient Loop", duration: "3:15", type: "music", mood: "Calm", tempo: "Slow", path: "ambient.mp3", favorite: true, category: "Calm" },
    { id: 10, name: "Inspiring", duration: "2:05", type: "music", mood: "Motivational", tempo: "Medium", path: "inspiring.mp3", favorite: false, category: "Motivational" },
    { id: 11, name: "Corporate Outro", duration: "1:15", type: "music", mood: "Professional", tempo: "Medium", path: "corporate_outro.mp3", favorite: false, category: "Business" },
    { id: 12, name: "Tech Atmosphere", duration: "2:30", type: "music", mood: "Modern", tempo: "Medium", path: "tech.mp3", favorite: true, category: "Technology" },
  ];
  
  const soundEffects = [
    { id: 13, name: "Notification", duration: "0:02", type: "sfx", category: "UI", path: "notification.mp3", favorite: false },
    { id: 14, name: "Applause", duration: "0:05", type: "sfx", category: "Audience", path: "applause.mp3", favorite: true },
    { id: 15, name: "Click", duration: "0:01", type: "sfx", category: "UI", path: "click.mp3", favorite: false },
    { id: 16, name: "Whoosh", duration: "0:02", type: "sfx", category: "Transition", path: "whoosh.mp3", favorite: true },
    { id: 17, name: "Bell", duration: "0:02", type: "sfx", category: "Notification", path: "bell.mp3", favorite: false },
    { id: 18, name: "Success", duration: "0:03", type: "sfx", category: "UI", path: "success.mp3", favorite: false },
  ];

  // File validation
  const validateFile = (file) => {
    const allowedTypes = ['text/plain', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setFileError('Please upload only .txt or .pdf files');
      return false;
    }
    setFileError('');
    return true;
  };

  // File reading logic
  const readFileContent = async (file) => {
    if (file.type === 'text/plain') {
      const text = await file.text();
      setUploadedContent(text);
    } else if (file.type === 'application/pdf') {
      setUploadedContent('PDF file uploaded. Content preview not available.');
    }
  };

  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      readFileContent(file);
    }
  }, []);

  // Handle file upload via button
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      readFileContent(file);
    }
  };

  // Get the appropriate audio data based on active tab
  const getAudioData = () => {
    switch (activeTab) {
      case 'dialogue': return dialogueAudio;
      case 'music': return musicAudio;
      case 'sfx': return soundEffects;
      default: return dialogueAudio;
    }
  };

  // Get categories for the active tab
  const getCategories = () => {
    const audioData = getAudioData();
    let categories = ["all"];
    
    // Extract unique categories
    audioData.forEach(audio => {
      if (audio.category && !categories.includes(audio.category)) {
        categories.push(audio.category);
      }
    });
    
    return categories;
  };

  // Filter audio by category
  const filteredAudio = currentCategory === 'all'
    ? getAudioData()
    : getAudioData().filter(audio => audio.category === currentCategory);

  const handleSelectAudio = (audio) => {
    setSelectedAudio(audio);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const renderNewScript = () => (
    <div className="grid grid-cols-2 gap-6">
      {/* Left Column - Script Upload */}
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <textarea
          className="w-full h-40 border rounded-lg p-3 mb-4"
          placeholder="Enter your script Topic..."
          value={scriptPrompt}
          onChange={(e) => setScriptPrompt(e.target.value)}
        />
        <h2 className="font-medium mb-4">Reference Script Upload</h2>
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            ${fileError ? 'border-red-500' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragActive(true);
          }}
          onDragLeave={() => setIsDragActive(false)}
          onDrop={handleDrop}
        >
          <FileText className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-500 mb-2">
            {isDragActive ? 'Drop your file here' : 'Upload your reference script or document'}
          </p>
          <p className="text-gray-400 text-sm mb-4">Supported formats: .txt, .pdf</p>
          <input
            type="file"
            accept=".txt,.pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Upload File
          </label>
          {fileError && <p className="text-red-500 mt-2 text-sm">{fileError}</p>}
        </div>

        {/* File Content Display */}
        {uploadedContent && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">File Content</h3>
            <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm">{uploadedContent}</pre>
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Prompt Input */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="font-medium mb-4">AI Script Generation Prompt</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Script Type
          </label>
          <select 
            className="w-full border rounded-lg p-3 bg-white text-gray-700"
            defaultValue="" >
            <option value="" disabled>Choose a script type...</option>
            <option value="informative">Informative Type – Knowledge Sharing</option>
            <option value="storytelling">Storytelling Type – Emotional Narrative</option>
            <option value="qa">Q&A Type – Questions & Answers</option>
            <option value="review">Review Type – Product Review</option>
            <option value="challenge">Challenge Type – Experiment & Challenge</option>
            <option value="comedy">Comedy Type – Humorous Content</option>
            <option value="asmr">ASMR Type – Sensory Content</option>
            <option value="motivational">Motivational Type – Inspirational Message</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Voice Type
          </label>
          <select 
            className="w-full border rounded-lg p-3 bg-white text-gray-700"
            defaultValue="" >
            <option value="" disabled>Choose a Voice type...</option>
            <option value="energetic">Energetic & Enthusiastic – High-energy, engaging, and lively tone.</option>
            <option value="calm">Calm & Soothing – Relaxing, gentle, and peaceful voice style.</option>
            <option value="dramatic">Dramatic & Intense – Deep, suspenseful, and emotionally charged narration</option>
            <option value="conversational">Conversational & Friendly – Casual, natural, and approachable speaking style.</option>
            <option value="serious">Serious & Authoritative – Confident, firm, and knowledgeable tone</option>
            <option value="whispery">Whispery & ASMR – Soft-spoken, delicate, and immersive audio style</option>
            <option value="inspirational">Inspirational & Motivational – Uplifting, powerful, and passionate voice</option>
            <option value="humorous">Humorous & Playful – Fun, exaggerated, and comedic delivery</option>
            <option value="fastpaced">Fast-paced & Urgent – Quick, action-driven, and intense for excitement</option>
            <option value="narrative">Narrative & Storytelling – Engaging, expressive, and immersive tone.</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Number of Scene
          </label>
          <input type="number" className="w-full border rounded-lg p-3" placeholder="Enter the number of scene"/>
        </div>
        <textarea
          className="w-full h-40 border rounded-lg p-3 mb-4"
          placeholder="Enter your script generation prompt..."
          value={scriptPrompt}
          onChange={(e) => setScriptPrompt(e.target.value)}
        />
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Generate Script
        </button>
      </div>
    </div>
  );

  const renderAudioManager = () => (
    <div className="flex h-full">
      {/* Left Panel - Browser */}
      <div className="w-3/4 bg-white shadow rounded mr-4 flex flex-col">
        {/* Tabs & Search */}
        <div className="bg-white border-b p-2 flex justify-between">
          <div className="flex">
            <button
              className={`px-3 py-1 rounded-l flex items-center ${activeTab === 'dialogue' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('dialogue')}
            >
              <Mic size={16} className="mr-1" /> Dialogue
            </button>
            <button
              className={`px-3 py-1 flex items-center ${activeTab === 'music' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('music')}
            >
              <Music size={16} className="mr-1" /> Music
            </button>
            <button
              className={`px-3 py-1 rounded-r flex items-center ${activeTab === 'sfx' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('sfx')}
            >
              <Volume2 size={16} className="mr-1" /> Sound FX
            </button>
          </div>

          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search audio..."
                className="bg-white border rounded px-3 py-1 pl-8 text-sm"
              />
              <Search size={14} className="absolute left-2.5 top-2 text-gray-500" />
            </div>

            <button className="p-1 border rounded hover:bg-gray-50">
              <Filter size={18} />
            </button>

            <div className="flex">
              <button
                className={`p-1 rounded-l border ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
              <button
                className={`p-1 rounded-r border ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white p-2 border-b flex flex-wrap">
          {getCategories().map(category => (
            <button
              key={category}
              className={`px-3 py-1 text-sm rounded mr-2 mb-1 ${currentCategory === category ? 'bg-blue-500 text-white' : 'border hover:bg-gray-50'}`}
              onClick={() => setCurrentCategory(category)}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {viewMode === 'list' ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="py-2 px-3"></th>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Duration</th>
                  {activeTab === 'dialogue' && <th className="py-2 px-3">Speaker</th>}
                  {activeTab === 'music' && <th className="py-2 px-3">Mood</th>}
                  <th className="py-2 px-3">Category</th>
                  <th className="py-2 px-3">Favorite</th>
                  <th className="py-2 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAudio.map(audio => (
                  <tr
                    key={audio.id}
                    className={`border-b text-sm hover:bg-gray-50 cursor-pointer ${selectedAudio?.id === audio.id ? 'bg-blue-50' : ''}`}
                    onClick={() => handleSelectAudio(audio)}
                  >
                    <td className="py-2 px-3">
                      <button
                        className="p-1.5 border rounded-full hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay();
                        }}
                      >
                        {isPlaying && selectedAudio?.id === audio.id ? (
                          <Pause size={14} />
                        ) : (
                          <Play size={14} />
                        )}
                      </button>
                    </td>
                    <td className="py-2 px-3">{audio.name}</td>
                    <td className="py-2 px-3">{audio.duration}</td>
                    {activeTab === 'dialogue' && <td className="py-2 px-3">{audio.speaker}</td>}
                    {activeTab === 'music' && <td className="py-2 px-3">{audio.mood}</td>}
                    <td className="py-2 px-3">{audio.category}</td>
                    <td className="py-2 px-3">
                      {audio.favorite ? (
                        <Star size={16} className="text-yellow-500" fill="currentColor" />
                      ) : (
                        <Star size={16} className="text-gray-400" />
                      )}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700 inline-block mr-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700 inline-block mr-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        className="p-1 text-gray-500 hover:text-red-500 inline-block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-3 gap-4 p-4">
              {filteredAudio.map(audio => (
                <div
                  key={audio.id}
                  className={`bg-white rounded-lg border overflow-hidden cursor-pointer transition-all hover:shadow-md ${selectedAudio?.id === audio.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => handleSelectAudio(audio)}
                >
                  {/* Audio Waveform Visual */}
                  <div className="h-16 bg-gray-100 flex items-center justify-center relative p-2">
                    <div className="w-full h-8 flex items-center">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 mx-0.5 ${audio.type === 'dialogue' ? 'bg-green-500' : audio.type === 'music' ? 'bg-purple-500' : 'bg-blue-500'}`}
                          style={{ 
                            height: `${10 + Math.sin(i / 2) * 20 + Math.random() * 20}px`,
                            opacity: i > 20 ? 0.5 : 1
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    <button
                      className="absolute bottom-2 right-2 p-1.5 bg-white border rounded-full shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                    >
                      {isPlaying && selectedAudio?.id === audio.id ? (
                        <Pause size={12} />
                      ) : (
                        <Play size={12} />
                      )}
                    </button>
                    
                    {audio.favorite && (
                      <div className="absolute top-2 right-2 text-yellow-500">
                        <Star size={12} fill="currentColor" />
                      </div>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="p-2">
                    <div className="flex justify-between items-start mb-1">
                      <div className="truncate text-sm font-medium">{audio.name}</div>
                      <div className="flex text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                        <Clock size={10} className="mr-1" />
                        {audio.duration}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {audio.type === 'dialogue' ? audio.speaker : 
                         audio.type === 'music' ? audio.mood : 
                         audio.category}
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-0.5 text-gray-400 hover:text-gray-700">
                          <Copy size={12} />
                        </button>
                        <button className="p-0.5 text-gray-400 hover:text-gray-700">
                          <Edit size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Toolbar */}
        <div className="bg-white border-t p-2 flex justify-between">
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
              <Plus size={16} className="mr-1" /> Add New
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50 flex items-center">
              <Upload size={16} className="mr-1" /> Upload
            </button>
            <button 
              className={`px-3 py-1 rounded flex items-center ${isRecording ? 'bg-red-500 text-white hover:bg-red-600' : 'border hover:bg-gray-50'}`}
              onClick={toggleRecording}
            >
              <Mic size={16} className="mr-1" /> {isRecording ? 'Recording...' : 'Record'}
            </button>
          </div>

          <div>
            <span className="text-sm text-gray-500">
              {filteredAudio.length} items • {activeTab === 'dialogue' ? 'Dialogue' : activeTab === 'music' ? 'Music' : 'Sound Effects'}
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel - Preview & Properties */}
      <div className="w-1/4 bg-white shadow rounded flex flex-col">
        {/* Preview */}
        <div className="p-3 border-b font-medium">
          Preview & Properties
        </div>

        <div className="flex-1 flex flex-col overflow-auto">
          {selectedAudio ? (
            <>
              {/* Audio Preview Player */}
              <div className="p-3 border-b">
                <h3 className="font-medium mb-2">{selectedAudio.name}</h3>
                <div className="mb-3 flex items-center text-sm text-gray-500">
                  <div className="mr-3">
                    {selectedAudio.type === 'dialogue' ? (
                      <Mic size={14} className="mr-1 inline-block" />
                    ) : selectedAudio.type === 'music' ? (
                      <Music size={14} className="mr-1 inline-block" />
                    ) : (
                      <Volume2 size={14} className="mr-1 inline-block" />
                    )}
                    {selectedAudio.type === 'dialogue' ? 'Dialogue' : 
                     selectedAudio.type === 'music' ? 'Music' : 'Sound Effect'}
                  </div>
                  <div>
                    <Clock size={14} className="mr-1 inline-block" />
                    {selectedAudio.duration}
                  </div>
                </div>
                
                {/* Waveform Visualization */}
                <div className="mb-3 h-16 bg-gray-100 rounded relative flex items-center overflow-hidden">
                  <div className="absolute inset-0 flex items-center">
                    {Array.from({ length: 60 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-full w-1 mx-px ${
                          i < currentProgress / 100 * 60 
                            ? selectedAudio.type === 'dialogue'
                              ? 'bg-green-500'
                              : selectedAudio.type === 'music'
                                ? 'bg-purple-500'
                                : 'bg-blue-500'
                            : 'bg-gray-300'
                        }`}
                        style={{ 
                          height: `${40 + Math.sin(i / 3) * 30 + Math.random() * 20}%`,
                          opacity: i > 40 ? 0.7 : 1
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Playhead */}
                  <div 
                    className="absolute top-0 bottom-0 w-px bg-gray-900 z-10" 
                    style={{ left: `${currentProgress}%` }}
                  ></div>
                </div>
                
                {/* Player Controls */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">00:00</span>
                    <span className="text-xs text-gray-500">{selectedAudio.duration}</span>
                  </div>
                  <input 
                    type="range" 
                    className="w-full mb-2" 
                    min="0" 
                    max="100" 
                    value={currentProgress} 
                    onChange={(e) => setCurrentProgress(parseInt(e.target.value))}
                  />
                  <div className="flex justify-center space-x-3">
                    <button className="p-1.5 border rounded-full hover:bg-gray-50">
                      <SkipBack size={16} />
                    </button>
                    <button 
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button className="p-1.5 border rounded-full hover:bg-gray-50">
                      <SkipForward size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 border rounded hover:bg-gray-50">
                    <Volume2 size={14} />
                  </button>
                  <input type="range" className="flex-1" min="0" max="100" defaultValue="80" />
                  <button className="p-1.5 border rounded hover:bg-gray-50">
                    <Headphones size={14} />
                  </button>
                </div>
              </div>
              
              {/* Properties */}
              <div className="p-3 border-b">
                <h3 className="font-medium mb-3">Audio Properties</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full border p-1.5 rounded text-sm"
                      value={selectedAudio.name}
                      readOnly
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Category</label>
                      <select className="w-full border p-1.5 rounded text-sm">
                        <option>{selectedAudio.category}</option>
                        {getCategories().filter(c => c !== 'all' && c !== selectedAudio.category).map(category => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Type</label>
                      <input
                        type="text"
                        className="w-full border p-1.5 rounded text-sm"
                        value={selectedAudio.type === 'dialogue' ? 'Dialogue' : 
                               selectedAudio.type === 'music' ? 'Music' : 'Sound Effect'}
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">File Path</label>
                    <div className="flex">
                      <input
                        type="text"
                        className="flex-1 border p-1.5 rounded-l text-sm"
                        value={selectedAudio.path}
                        readOnly
                      />
                      <button className="bg-gray-100 px-2 rounded-r border">
                        <Folder size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {selectedAudio.type === 'dialogue' && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Speaker</label>
                      <select className="w-full border p-1.5 rounded text-sm">
                        <option>{selectedAudio.speaker}</option>
                        <option>Guest</option>
                        <option>Narrator</option>
                        <option>Secondary Presenter</option>
                      </select>
                    </div>
                  )}
                  
                  {selectedAudio.type === 'music' && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Mood</label>
                        <select className="w-full border p-1.5 rounded text-sm">
                          <option>{selectedAudio.mood}</option>
                          <option>Energetic</option>
                          <option>Calm</option>
                          <option>Dramatic</option>
                          <option>Inspirational</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Tempo</label>
                        <select className="w-full border p-1.5 rounded text-sm">
                          <option>{selectedAudio.tempo}</option>
                          <option>Slow</option>
                          <option>Medium</option>
                          <option>Fast</option>
                        </select>
                      </div>
                    </div>
                  )}
                  
                  {selectedAudio.type === 'dialogue' && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Transcript</label>
                      <textarea
                        className="w-full border p-1.5 rounded text-sm h-20"
                        value={selectedAudio.transcript}
                        readOnly
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Adjustment Options */}
              <div className="p-3 border-b">
                <h3 className="font-medium mb-3">Audio Adjustments</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Volume</label>
                    <input type="range" className="w-full" min="0" max="100" defaultValue="80" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Fade In</label>
                      <select className="w-full border p-1.5 rounded text-sm">
                        <option>None</option>
                        <option>0.5s</option>
                        <option>1s</option>
                        <option>2s</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Fade Out</label>
                      <select className="w-full border p-1.5 rounded text-sm">
                        <option>None</option>
                        <option>0.5s</option>
                        <option>1s</option>
                        <option>2s</option>
                      </select>
                    </div>
                  </div>
                  
                  {selectedAudio.type === 'music' && (
                    <>
                      <div className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" id="loopAudio" className="border" />
                        <label htmlFor="loopAudio">Loop Audio</label>
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">EQ Preset</label>
                        <select className="w-full border p-1.5 rounded text-sm">
                          <option>Default</option>
                          <option>Background Music</option>
                          <option>Voice Boost</option>
                          <option>Bass Boost</option>
                          <option>Treble Boost</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  {selectedAudio.type === 'dialogue' && (
                    <>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Noise Reduction</label>
                        <input type="range" className="w-full" min="0" max="100" defaultValue="30" />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Voice Enhancement</label>
                        <select className="w-full border p-1.5 rounded text-sm">
                          <option>None</option>
                          <option>Clarity</option>
                          <option>Warmth</option>
                          <option>Brightness</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Timing</label>
                    <input
                      type="text"
                      className="w-full border p-1.5 rounded text-sm"
                      placeholder="Start: 00:00:00.000"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col p-6 text-center">
              <div className="mb-3 p-3 rounded-full bg-gray-100 border">
                <Volume2 size={24} className="text-gray-500" />
              </div>
              <p className="text-gray-500 mb-1">No audio selected</p>
              <p className="text-xs text-gray-400">Select an audio file to view and edit its properties</p>
            </div>
          )}
        </div>

        {/* Apply Button */}
        <div className="p-3 border-t">
          <button 
            className="w-full bg-blue-500 text-white p-2 rounded font-medium hover:bg-blue-600 mb-2"
            disabled={!selectedAudio}
          >
            Apply to Timeline
          </button>
          <button 
            className="w-full border p-2 rounded font-medium hover:bg-gray-50"
            disabled={!selectedAudio}
          >
            Preview in Scene
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex space-x-8">
          <button
            onClick={() => setCurrentView('script')}
            className={`px-4 py-2 flex items-center gap-2 border-b-2 ${
              currentView === 'script'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText size={16} />
            New AI Script
          </button>
          <button
            onClick={() => setCurrentView('audio')}
            className={`px-4 py-2 flex items-center gap-2 border-b-2 ${
              currentView === 'audio'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Volume2 size={16} />
            Audio Manager
          </button>
          <button
            onClick={() => setCurrentView('voice')}
            className={`px-4 py-2 flex items-center gap-2 border-b-2 ${
              currentView === 'voice'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Mic size={16} />
            Voice Generator
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {currentView === 'script' && renderNewScript()}
        {currentView === 'audio' && renderAudioManager()}
        {currentView === 'voice' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">AI Voice Generator</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Input
                  </label>
                  <textarea 
                    className="w-full h-40 border rounded-lg p-3 mb-4"
                    placeholder="Enter the text to convert to speech..."
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voice Selection
                  </label>
                  <select className="w-full border rounded-lg p-3 bg-white text-gray-700">
                    <option>Professional Male</option>
                    <option>Professional Female</option>
                    <option>Casual Male</option>
                    <option>Casual Female</option>
                    <option>Narrator</option>
                    <option>Energetic</option>
                    <option>Calm</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Speaking Rate
                    </label>
                    <input type="range" className="w-full" min="0.5" max="2" step="0.1" defaultValue="1" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Slow</span>
                      <span>Normal</span>
                      <span>Fast</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pitch
                    </label>
                    <input type="range" className="w-full" min="-10" max="10" step="1" defaultValue="0" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Low</span>
                      <span>Normal</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Generate Voice
                </button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Voice Preview</h3>
                
                <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-4">
                  <div className="text-center text-gray-500">
                    <Smile size={32} className="mb-2 mx-auto" />
                    <p>No preview available</p>
                    <p className="text-xs">Generate voice to hear a preview</p>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-3 mb-4">
                  <button className="p-1.5 border rounded-full hover:bg-gray-50">
                    <SkipBack size={16} />
                  </button>
                  <button className="p-2 border rounded-full hover:bg-gray-50">
                    <Play size={18} />
                  </button>
                  <button className="p-1.5 border rounded-full hover:bg-gray-50">
                    <SkipForward size={16} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recent Generations
                    </label>
                    <div className="space-y-2">
                      <div className="p-2 border rounded-lg flex justify-between items-center">
                        <div className="flex items-center">
                          <Play size={14} className="mr-2 text-blue-500" />
                          <span className="text-sm">Introduction</span>
                        </div>
                        <div className="text-xs text-gray-500">0:15</div>
                      </div>
                      <div className="p-2 border rounded-lg flex justify-between items-center">
                        <div className="flex items-center">
                          <Play size={14} className="mr-2 text-blue-500" />
                          <span className="text-sm">Product Explanation</span>
                        </div>
                        <div className="text-xs text-gray-500">0:22</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 border rounded hover:bg-gray-50 text-sm flex items-center justify-center">
                      <Download size={14} className="mr-1" /> Download
                    </button>
                    <button className="flex-1 px-3 py-2 border rounded hover:bg-gray-50 text-sm flex items-center justify-center">
                      <Save size={14} className="mr-1" /> Save to Library
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptVoiceManagement;
