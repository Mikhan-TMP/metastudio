import React, { useState } from 'react';
import { Plus, Edit, Image, Grid, Upload, Search, Save } from 'lucide-react';
import ResponsiveTabs from "./ResponsiveTabs";
import RenderNewStudio from "./renderNewStudio";
import RenderModify from "./renderModify";
import RenderGallery from "./renderGallery";

const StudioManagement = () => {
  const [currentView, setCurrentView] = useState('new'); // 'new', 'modify', 'gallery'
  const [promptText, setPromptText] = useState('');
  const [selectedStudio, setSelectedStudio] = useState(null);

  // Mock data for studio list
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

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="flex justify-center px-4">
        <div className="bg-white rounded-[12px] w-full max-w-[900px] sm:w-[90%] md:w-[80%] lg:w-[70%] h-auto">
          {/* Responsive Button Group */}
          <ResponsiveTabs
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {currentView === 'new' && <RenderNewStudio />}
        {currentView === 'modify' && <RenderModify myStudioList={myStudioList} selectedStudio={selectedStudio} setSelectedStudio={setSelectedStudio} />}
        {currentView === 'gallery' && <RenderGallery galleryStudioList={galleryStudioList} />}
      </div>
    </div>
  );
};

export default StudioManagement;