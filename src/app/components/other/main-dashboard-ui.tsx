import React, { useState } from 'react';
import { 
  Home, Video, Film, Image, Music, Type, Smile, 
  Settings, Bell, Search, Plus, Folder, Upload, 
  Download, User, Calendar, Clock, Edit, Play,
  ChevronRight, Star, MoreVertical, Menu, Save,
  Layers, HelpCircle, LogOut, Monitor, Coffee
} from 'lucide-react';

const MainDashboardUI = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  
  // Mock data for projects
  const recentProjects = [
    { id: 1, name: "Product Demo", thumbnail: "🎥", lastEdited: "10 minutes ago", duration: "02:45", scenes: 6 },
    { id: 2, name: "Training Course", thumbnail: "🧑‍🏫", lastEdited: "Yesterday", duration: "15:20", scenes: 12 },
    { id: 3, name: "Marketing Video", thumbnail: "📊", lastEdited: "3 days ago", duration: "01:30", scenes: 4 },
    { id: 4, name: "Company Overview", thumbnail: "🏢", lastEdited: "1 week ago", duration: "05:10", scenes: 8 }
  ];
  
  const templates = [
    { id: 101, name: "Product Demo", thumbnail: "📱", category: "Marketing", duration: "03:00" },
    { id: 102, name: "Tutorial", thumbnail: "📝", category: "Education", duration: "05:00" },
    { id: 103, name: "Interview Setup", thumbnail: "🎤", category: "Media", duration: "10:00" },
    { id: 104, name: "Corporate Presentation", thumbnail: "📊", category: "Business", duration: "07:00" }
  ];

  const moduleCards = [
    { 
      id: 1, 
      title: "에디터 타임라인", 
      description: "통합 타임라인으로 모든 자산을 관리하고 비디오를 편집하세요",
      icon: <Video size={28} />,
      color: "bg-blue-500",
      route: "/editor"
    },
    { 
      id: 2, 
      title: "씬 관리", 
      description: "씬을 생성하고 구성하여 프로젝트를 구조화하세요",
      icon: <Layers size={28} />,
      color: "bg-purple-500",
      route: "/scenes"
    },
    { 
      id: 3, 
      title: "아바타 제어", 
      description: "아바타 제스처와 감정을 편집하여 생생한 캐릭터를 만드세요",
      icon: <Smile size={28} />,
      color: "bg-green-500",
      route: "/avatar"
    },
    { 
      id: 4, 
      title: "배경 관리", 
      description: "이미지와 비디오 배경을 관리하고 편집하세요",
      icon: <Image size={28} />,
      color: "bg-yellow-500",
      route: "/backgrounds"
    },
    { 
      id: 5, 
      title: "오디오 관리", 
      description: "대화, 음악, 효과음을 관리하고 편집하세요",
      icon: <Music size={28} />,
      color: "bg-red-500",
      route: "/audio"
    },
    { 
      id: 6, 
      title: "효과 & 텍스트", 
      description: "비디오 효과와 텍스트 오버레이를 추가하고 편집하세요",
      icon: <Type size={28} />,
      color: "bg-indigo-500",
      route: "/effects"
    }
  ];

  const handleNewProject = () => {
    setShowNewProjectModal(true);
  };

  const handleModuleClick = (route) => {
    // 실제 구현에서는 라우팅 또는 모듈 로드를 처리
    console.log(`Navigate to ${route}`);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4">
        <div className="mb-8 p-2 bg-blue-500 rounded-full">
          <Monitor size={24} />
        </div>
        
        <div className="flex-1 flex flex-col space-y-4">
          <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <Home size={20} />
          </button>
          <button className="p-2 text-blue-400 bg-blue-900/40 rounded-lg">
            <Video size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white rounded-lg">
            <Folder size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white rounded-lg">
            <Star size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white rounded-lg">
            <Coffee size={20} />
          </button>
        </div>
        
        <div className="mt-auto flex flex-col space-y-4">
          <button className="p-2 text-gray-400 hover:text-white rounded-lg">
            <HelpCircle size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white rounded-lg">
            <Settings size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white rounded-lg">
            <LogOut size={20} />
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-xl font-medium">META-Studio</h1>
            <div className="h-6 mx-4 border-r border-gray-600"></div>
            <nav className="flex space-x-4">
              <button className="text-blue-400 font-medium">대시보드</button>
              <button className="text-gray-400 hover:text-white">프로젝트</button>
              <button className="text-gray-400 hover:text-white">템플릿</button>
              <button className="text-gray-400 hover:text-white">자산</button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="검색..." 
                className="bg-gray-700 border border-gray-600 rounded-lg pl-8 pr-4 py-1 text-sm w-56"
              />
              <Search size={16} className="absolute left-2.5 top-2 text-gray-400" />
            </div>
            
            <button className="relative p-2 text-gray-400 hover:text-white">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Welcome Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-medium">안녕하세요, 크리에이터님!</h2>
              <p className="text-gray-400">META-Studio에서 아바타와 함께하는 멋진 콘텐츠를 만들어보세요.</p>
            </div>
            
            <button 
              className="bg-blue-600 hover:bg-blue-700 flex items-center px-4 py-2 rounded-lg"
              onClick={handleNewProject}
            >
              <Plus size={18} className="mr-2" /> 새 프로젝트
            </button>
          </div>
          
          {/* Quick Access Modules */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">편집 모듈</h3>
            <div className="grid grid-cols-3 gap-4">
              {moduleCards.map(module => (
                <button 
                  key={module.id}
                  className="bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg p-4 text-left transition-all hover:border-blue-500 flex"
                  onClick={() => handleModuleClick(module.route)}
                >
                  <div className={`${module.color} rounded-lg p-3 mr-4`}>
                    {module.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{module.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{module.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Recent Projects */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">최근 프로젝트</h3>
              <button className="text-blue-400 text-sm flex items-center">
                모든 프로젝트 보기 <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {recentProjects.map(project => (
                <div 
                  key={project.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 transition-all"
                >
                  <div className="aspect-video bg-gray-700 flex items-center justify-center text-4xl">
                    {project.thumbnail}
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{project.name}</h4>
                      <button className="text-gray-400 hover:text-white">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" /> {project.lastEdited}
                      </div>
                      <div>
                        {project.duration} • {project.scenes}개 씬
                      </div>
                    </div>
                    <div className="flex mt-3 space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-1 rounded flex items-center justify-center text-xs">
                        <Edit size={12} className="mr-1" /> 편집
                      </button>
                      <button className="bg-gray-700 hover:bg-gray-600 p-1 rounded">
                        <Play size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Templates */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">추천 템플릿</h3>
              <button className="text-blue-400 text-sm flex items-center">
                모든 템플릿 보기 <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {templates.map(template => (
                <div 
                  key={template.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 transition-all"
                >
                  <div className="aspect-video bg-gray-700 flex items-center justify-center text-4xl relative">
                    {template.thumbnail}
                    <div className="absolute bottom-2 right-2 text-xs bg-black bg-opacity-70 px-2 py-0.5 rounded">
                      {template.duration}
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium">{template.name}</h4>
                    <div className="text-xs text-gray-400 mt-1">
                      {template.category}
                    </div>
                    <button className="w-full mt-3 bg-gray-700 hover:bg-gray-600 py-1 rounded flex items-center justify-center text-xs">
                      <Plus size={12} className="mr-1" /> 이 템플릿으로 시작
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-medium mb-4">새 프로젝트 만들기</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">프로젝트 이름</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2"
                  placeholder="프로젝트 이름을 입력하세요"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">템플릿 선택 (선택사항)</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2">
                  <option value="">빈 프로젝트로 시작</option>
                  <option>제품 데모</option>
                  <option>기업 소개</option>
                  <option>강의 영상</option>
                  <option>인터뷰</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">해상도</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2">
                  <option>1920x1080 (Full HD)</option>
                  <option>3840x2160 (4K)</option>
                  <option>1280x720 (HD)</option>
                  <option>720x1280 (세로 모드)</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg"
                onClick={() => setShowNewProjectModal(false)}
              >
                취소
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg">
                만들기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainDashboardUI;
