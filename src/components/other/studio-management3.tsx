import React, { useState } from 'react';
import { Plus, Edit, Image, Grid, Upload, Search, Save } from 'lucide-react';
// import { Select } from '@chakra-ui/react'; // Importing a select component for dropdown options
// import { Select, ChakraProvider, Box, Heading } from '@chakra-ui/react';
const StudioManagement = () => {
  const [currentView, setCurrentView] = useState('new'); // 'new', 'modify', 'gallery'
  const [promptText, setPromptText] = useState('');
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [contentType, setContentType] = useState('');
  const [environmentTheme, setEnvironmentTheme] = useState('');
  const [keyVisualElements, setKeyVisualElements] = useState('');
  const [atmosphere, setAtmosphere] = useState('');
  const [lightingStyle, setLightingStyle] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const myStudioList = [
    { id: 1, name: 'News Studio 1', type: 'News' },
    { id: 2, name: 'Podcast Studio', type: 'Podcast' },
    { id: 3, name: 'Virtual Meeting Room', type: 'Meeting' },
  ];

  // Mock data for gallery
  const galleryStudioList = [
    { id: 1, name: 'Professional News Studio', type: 'News', imgSrc: 'https://datavideo-virtualset.s3.amazonaws.com/product-image/880/video.jpg' ,thumbnail: 'https://datavideo-virtualset.s3.amazonaws.com/product-image/880/video.jpg' },
    { id: 2, name: 'Podcast Recording Studio', type: 'Podcast', imgSrc: 'https://img.freepik.com/premium-photo/cyberpunk-living-room-virtual-background-streaming-video-calls-concept-virtual-backgrounds-cyberpunk-decor-streaming-setup-video-calls_918839-170658.jpg' , thumbnail: 'podcast.jpg' },
    { id: 3, name: 'Modern Meeting Room', type: 'Meeting', imgSrc: 'https://img.freepik.com/free-photo/empty-business-meeting-conference-room-with-graphs-diagrams-tv-background_482257-25767.jpg' , thumbnail: 'meeting.jpg' },
    { id: 4, name: 'Educational Classroom', type: 'Education',imgSrc: 'https://datavideo-virtualset.s3.amazonaws.com/product-image/986/video.jpg' , thumbnail: 'classroom.jpg' },
  ];

  const handleGenerateStudio = () => {
    const prompt = `Content Type: ${contentType}, Environment Theme: ${environmentTheme}, Key Visual Elements: ${keyVisualElements}, Atmosphere: ${atmosphere}, Lighting Style: ${lightingStyle}`;
    setAiPrompt(prompt);
    console.log("AI Generation Prompt: ", prompt);
  };

const renderNewStudio = () => (
    <div className="grid grid-cols-2 gap-6">
      {/* Left Column - Image Upload */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
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

      {/* Right Column - Prompt Input */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
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

  const renderModify = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-medium">My Studios</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            className="pl-10 pr-4 py-2 border rounded-lg"
            placeholder="Search studios..."
          />
        </div>
      </div>
      <div className="space-y-3">
        {myStudioList.map(studio => (
          <div
            key={studio.id}
            className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
              selectedStudio?.id === studio.id ? 'border-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setSelectedStudio(studio)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{studio.name}</h3>
                <p className="text-sm text-gray-500">{studio.type}</p>
              </div>
              <Edit className="text-gray-400" size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-medium">Studio Gallery</h2>
        <div className="flex space-x-4">
          <select className="border rounded-lg px-3 py-2">
            <option>All Types</option>
            <option>News</option>
            <option>Podcast</option>
            <option>Meeting</option>
            <option>Education</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              className="pl-10 pr-4 py-2 border rounded-lg"
              placeholder="Search gallery..."
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {galleryStudioList.map(studio => (
          <div key={studio.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <img src={studio.imgSrc} alt={studio.name} className="w-full h-full object-cover" />
              
            </div>
            <div className="p-4">
              <h3 className="font-medium">{studio.name}</h3>
              <p className="text-sm text-gray-500">{studio.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="studio-management-container p-8">
      <h2 className="text-xl font-bold mb-4" style={{ color: '#333' }}>Meta Town Studio Management</h2>
      <div className="selection-section grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Content Type Selection */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#333' }}>Content Type</label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            placeholder="Select Content Type"
          >
            <option value="Informative">Informative – Knowledge Sharing</option>
            <option value="Storytelling">Storytelling – Emotional Narrative</option>
            <option value="QA">Q&A – Questions & Answers</option>
            <option value="Review">Review – Product or Service</option>
            <option value="Challenge">Challenge – Experiments & Challenges</option>
            <option value="Comedy">Comedy – Humorous Content</option>
            <option value="ASMR">ASMR – Sensory Experiences</option>
            <option value="Motivational">Motivational – Inspiring Content</option>
          </select>
        </div>

        {/* Environment Theme Selection */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#333' }}>Environment Theme</label>
          <select
            value={environmentTheme}
            onChange={(e) => setEnvironmentTheme(e.target.value)}
            placeholder="Select Environment Theme"
          >
            <option value="Nature">Nature (Forests, Beaches)</option>
            <option value="Urban">Urban (Cityscapes)</option>
            <option value="Fantasy">Fantasy Worlds</option>
            <option value="Futuristic">Futuristic Environments</option>
            <option value="Minimalist">Minimalist Spaces</option>
          </select>
        </div>

        {/* Key Visual Elements Selection */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#333' }}>Key Visual Elements</label>
          <select
            value={keyVisualElements}
            onChange={(e) => setKeyVisualElements(e.target.value)}
            placeholder="Select Key Visual Elements"
          >
            <option value="Mountains">Mountains</option>
            <option value="Rivers">Rivers or Lakes</option>
            <option value="Architecture">Unique Architecture</option>
            <option value="Open Fields">Open Fields</option>
            <option value="Skyline">Skyline Backdrops</option>
          </select>
        </div>

        {/* Atmosphere Description Selection */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#333' }}>Atmosphere</label>
          <select
            value={atmosphere}
            onChange={(e) => setAtmosphere(e.target.value)}
            placeholder="Select Atmosphere"
          >
            <option value="Calm">Calm and Peaceful</option>
            <option value="Energetic">Energetic and Vibrant</option>
            <option value="Mysterious">Mysterious and Suspenseful</option>
            <option value="Warm">Warm and Cozy</option>
            <option value="Serene">Serene and Relaxing</option>
          </select>
        </div>

        {/* Lighting Style Selection */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#333' }}>Lighting Style</label>
          <select
            value={lightingStyle}
            onChange={(e) => setLightingStyle(e.target.value)}
            placeholder="Select Lighting Style"
          >
            <option value="Natural" style={{ color: '#333' }}>Natural Light</option>
            <option value="Soft">Soft and Diffused</option>
            <option value="Spotlight">Spotlight Focus</option>
            <option value="Colorful">Colorful and Vibrant</option>
            <option value="Dim">Dim and Dramatic</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">AI Generation Prompt</h3>
        <textarea
          className="w-full p-2 border rounded h-24"
          readOnly
          value={aiPrompt}
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleGenerateStudio}
        >
          Generate Studio
        </button>
      </div>
    </div>
   
    

  );
  return(
  <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex space-x-8">
          <button
            onClick={() => setCurrentView('new')}
            className={`px-4 py-2 flex items-center gap-2 border-b-2 ${
              currentView === 'new'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Plus size={16} />
            New AI Studio
          </button>
          <button
            onClick={() => setCurrentView('modify')}
            className={`px-4 py-2 flex items-center gap-2 border-b-2 ${
              currentView === 'modify'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Edit size={16} />
            Modify
          </button>
          <button
            onClick={() => setCurrentView('gallery')}
            className={`px-4 py-2 flex items-center gap-2 border-b-2 ${
              currentView === 'gallery'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Grid size={16} />
            Gallery
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {currentView === 'new' && renderNewStudio()}
        {currentView === 'modify' && renderModify()}
        {currentView === 'gallery' && renderGallery()}
      </div>
    </div>
  );
};

export default StudioManagement;
