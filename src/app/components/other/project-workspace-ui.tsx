import React, { useState } from 'react';
import { 
  Video, Film, Image, Music, Type, Smile, 
  Settings, Menu, Search, ChevronLeft, ChevronRight, 
  Save, Upload, Download, Play, Pause, Eye, Share2,
  Clock, Layers, Grid, Monitor, MessageSquare, Users,
  Edit, Trash2, Copy, MoreVertical, Folder, User,
  RefreshCw, Lock, CheckCircle, XCircle, Bell
} from 'lucide-react';

const ProjectWorkspaceUI = () => {
  const [activeModule, setActiveModule] = useState('editor');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  
  // Mock project data
  const projectData = {
    name: "제품 데모 프로젝트",
    lastSaved: "10분 전",
    duration: "02:45",
    scenes: [
      { id: 1, name: "인트로", duration: "00:15", thumbnail: "🎬" },
      { id: 2, name: "제품 소개", duration: "00:45", thumbnail: "📱" },
      { id: 3, name: "기능 시연", duration: "01:15", thumbnail: "🔍" },
      { id: 4, name: "마무리", duration: "00:30", thumbnail: "✨" }
    ],
    collaborators: [
      { id: 1, name: "나", role: "편집자", avatar: "👨‍💻" },
      { id: 2, name: "김디자인", role: "디자이너", avatar: "👩‍🎨" },
      { id: 3, name: "이매니저", role: "프로젝트 매니저", avatar: "👨‍💼" }
    ]
  };
  
  // Module definitions - map to different UI components
  const modules = [
    { 
      id: 'editor', 
      name: '에디터 타임라인', 
      icon: <Video size={20} />,
      description: '통합 타임라인으로 전체 프로젝트 편집'
    },
    { 
      id: 'scenes', 
      name: '씬 관리', 
      icon: <Layers size={20} />,
      description: '프로젝트의 씬 구성 및 관리'
    },
    { 
      id: 'avatar', 
      name: '아바타 제어', 
      icon: <Smile size={20} />,
      description: '아바타 제스처 및 감정 편집'
    },
    { 
      id: 'backgrounds', 
      name: '배경 관리', 
      icon: <Image size={20} />,
      description: '배경 이미지 및 비디오 관리'
    },
    { 
      id: 'audio', 
      name: '오디오 관리', 
      icon: <Music size={20} />,
      description: '대화, 배경 음악, 효과음 관리'
    },
    { 
      id: 'effects', 
      name: '효과 & 텍스트', 
      icon: <Type size={20} />,
      description: '영상 효과 및 텍스트 오버레이 편집'
    }
  ];
  
  const togglePreview = () => {
    setIsPreviewPlaying(!isPreviewPlaying);
  };
  
  const handleModuleChange = (moduleId) => {
    setActiveModule(moduleId);
  };
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  const getActiveModuleDescription = () => {
    const module = modules.find(m => m.id === activeModule);
    return module ? module.description : '';
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top Header */}
      <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center">
          <button className="p-2 mr-2 bg-gray-700 rounded hover:bg-gray-600">
            <ChevronLeft size={18} />
          </button>
          
          <div className="mr-4">
            <h1 className="font-medium">{projectData.name}</h1>
            <div className="flex items-center text-xs text-gray-400">
              <Clock size={12} className="mr-1" />
              마지막 저장: {projectData.lastSaved}
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
              <Save size={16} />
            </button>
            <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
              <Upload size={16} />
            </button>
            <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
              <Download size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="검색..." 
              className="bg-gray-700 border border-gray-600 rounded px-8 py-1.5 text-sm w-56"
            />
            <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-1 ml-2 bg-gray-700 px-2 py-1 rounded text-sm">
            <Users size={16} />
            <span>{projectData.collaborators.length}</span>
          </div>
          
          <button className="p-2 bg-blue-600 rounded hover:bg-blue-700 flex items-center">
            <Play size={16} className="mr-1" /> 미리보기
          </button>
          
          <button className="p-2 bg-green-600 rounded hover:bg-green-700 flex items-center">
            <Download size={16} className="mr-1" /> 내보내기
          </button>
          
          <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
            <Settings size={16} />
          </button>
        </div>
      </header>
      
      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Module Navigation Sidebar */}
        <div className={`bg-gray-800 border-r border-gray-700 flex flex-col transition-all duration-200 ${
          isSidebarCollapsed ? 'w-16' : 'w-60'
        }`}>
          {/* Sidebar Header */}
          <div className="p-3 border-b border-gray-700 flex items-center justify-between">
            {!isSidebarCollapsed && <h2 className="font-medium">모듈</h2>}
            <button 
              className="p-1 bg-gray-700 rounded hover:bg-gray-600 ml-auto"
              onClick={toggleSidebar}
            >
              {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
          
          {/* Module List */}
          <div className="flex-1 overflow-y-auto py-2">
            {modules.map(module => (
              <button
                key={module.id}
                className={`w-full flex items-center p-3 ${
                  activeModule === module.id 
                    ? 'bg-blue-900/40 border-l-2 border-blue-500' 
                    : 'hover:bg-gray-700'
                } ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}
                onClick={() => handleModuleChange(module.id)}
              >
                <div className={`${activeModule === module.id ? 'text-blue-400' : 'text-gray-300'}`}>
                  {module.icon}
                </div>
                {!isSidebarCollapsed && (
                  <span className={`ml-3 ${activeModule === module.id ? 'text-blue-400' : ''}`}>
                    {module.name}
                  </span>
                )}
              </button>
            ))}
          </div>
          
          {/* Project Info */}
          <div className="p-3 border-t border-gray-700">
            {!isSidebarCollapsed ? (
              <>
                <div className="mb-3">
                  <div className="text-xs text-gray-400 mb-1">프로젝트 정보</div>
                  <div className="flex justify-between text-sm">
                    <span>총 길이:</span>
                    <span>{projectData.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>장면 수:</span>
                    <span>{projectData.scenes.length}개</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">협업자</div>
                  <div className="flex space-x-1 mb-1">
                    {projectData.collaborators.map(user => (
                      <div key={user.id} className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                        {user.avatar}
                      </div>
                    ))}
                    <button className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                  {projectData.collaborators[0].avatar}
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                  <Users size={14} />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Main Content Area - Module Container */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Module Header */}
          <div className="bg-gray-800 border-b border-gray-700 p-3 flex justify-between items-center">
            <div>
              <div className="flex items-center">
                {modules.find(m => m.id === activeModule)?.icon}
                <h2 className="ml-2 font-medium">
                  {modules.find(m => m.id === activeModule)?.name}
                </h2>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{getActiveModuleDescription()}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-xs bg-gray-700 px-2 py-1 rounded">
                <RefreshCw size={12} className="inline-block mr-1" /> 자동 저장됨
              </div>
              
              {/* Module specific controls */}
              {activeModule === 'editor' && (
                <div className="flex space-x-1">
                  <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
                    <Layers size={16} />
                  </button>
                  <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
                    <Grid size={16} />
                  </button>
                </div>
              )}
              
              {activeModule === 'avatar' && (
                <div className="flex space-x-1">
                  <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
                    <Copy size={16} />
                  </button>
                  <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
                    <Monitor size={16} />
                  </button>
                </div>
              )}
              
              {activeModule === 'audio' && (
                <div className="flex space-x-1">
                  <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
                    <Music size={16} />
                  </button>
                  <button className="p-2 bg-gray-700 rounded hover:bg-gray-600">
                    <Volume2 size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Module Content - This would be where each module UI is loaded */}
          <div className="flex-1 overflow-hidden flex">
            {/* Main Module Area */}
            <div className="flex-1 flex items-center justify-center bg-gray-850 overflow-auto">
              <div className="text-center">
                <div className="text-5xl mb-4">
                  {modules.find(m => m.id === activeModule)?.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">
                  {modules.find(m => m.id === activeModule)?.name} 모듈
                </h3>
                <p className="text-gray-400 max-w-md">
                  여기에 해당 모듈의 인터페이스가 로드됩니다. 
                  메인 대시보드에서 선택한 모듈을 불러와 프로젝트를 편집하세요.
                </p>
              </div>
            </div>
            
            {/* Preview Panel - Can be toggled */}
            <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
              <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                <h3 className="font-medium">미리보기</h3>
                <button className="p-1 bg-gray-700 rounded hover:bg-gray-600">
                  <Maximize size={14} />
                </button>
              </div>
              
              <div className="p-3">
                <div className="aspect-video bg-black rounded mb-2 relative flex items-center justify-center">
                  <div className="text-2xl opacity-70">{projectData.scenes[0].thumbnail}</div>
                  
                  <button 
                    className="absolute inset-0 flex items-center justify-center"
                    onClick={togglePreview}
                  >
                    <div className="w-10 h-10 rounded-full bg-black bg-opacity-60 flex items-center justify-center">
                      {isPreviewPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </div>
                  </button>
                </div>
                
                {/* Playback Controls */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>00:00:15</span>
                    <span>{projectData.duration}</span>
                  </div>
                  <div className="relative">
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-1/4 h-full bg-blue-500"></div>
                    </div>
                    <div 
                      className="absolute top-1/2 left-1/4 w-3 h-3 bg-blue-500 rounded-full -translate-y-1/2 -translate-x-1/2"
                    ></div>
                  </div>
                </div>
                
                {/* Scene Selection */}
                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-2">장면</h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {projectData.scenes.map(scene => (
                      <div 
                        key={scene.id}
                        className="flex items-center p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded bg-gray-600 flex items-center justify-center mr-2">
                          {scene.thumbnail}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm truncate">{scene.name}</div>
                          <div className="text-xs text-gray-400">{scene.duration}</div>
                        </div>
                        <button className="text-gray-400 hover:text-white">
                          <Play size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Resolution & Quality */}
                <div>
                  <h4 className="text-sm font-medium mb-2">설정</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">해상도</label>
                      <select className="w-full bg-gray-700 rounded border border-gray-600 p-1.5 text-sm">
                        <option>1920 × 1080 (Full HD)</option>
                        <option>3840 × 2160 (4K)</option>
                        <option>1280 × 720 (HD)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">미리보기 품질</label>
                      <select className="w-full bg-gray-700 rounded border border-gray-600 p-1.5 text-sm">
                        <option>고품질 (느림)</option>
                        <option>중간 (권장)</option>
                        <option>저품질 (빠름)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto p-3 border-t border-gray-700">
                <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded flex items-center justify-center">
                  <Share2 size={16} className="mr-2" /> 공유하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat & Notification Panel - Can be toggled */}
      <div className="absolute bottom-4 right-4 flex flex-col">
        <button className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 mb-2">
          <MessageSquare size={20} />
        </button>
        <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );
};

// Missing icon definition
const Plus = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// Missing icon definition
const Volume2 = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
  </svg>
);

// Missing icon definition
const Maximize = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
  </svg>
);

export default ProjectWorkspaceUI;
