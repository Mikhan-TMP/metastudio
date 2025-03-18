import React, { useState } from 'react';
import {
  Tv, Type, Sparkles, Upload, Play, Plus, Search, 
  Wand2, Layers, AlignLeft, AlignCenter, AlignRight, 
  Bold, Italic, Underline, Filter, List, Grid, Edit, Copy, Trash2,
  Eye, Clock, Star, Settings, Palette, Save, SkipForward, SkipBack,
  Volume2, PanelLeft, ChevronLeft, ChevronRight
} from 'lucide-react';

const RenderEffectContent = () => {
  const [currentView, setCurrentView] = useState('tv');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [bannerText, setBannerText] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('effects');
  const [selectedEffect, setSelectedEffect] = useState(null);
  const [selectedTextStyle, setSelectedTextStyle] = useState(null);
  
  // Text styling states
  const [textContent, setTextContent] = useState('Lower Third Text');
  const [textAlignment, setTextAlignment] = useState('center');
  const [textBold, setTextBold] = useState(false);
  const [textItalic, setTextItalic] = useState(false);
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#0047AB');

  // Mock data for banner templates
  const bannerTemplates = [
    { id: 1, name: 'News Headline', style: 'Breaking News style with dynamic background' },
    { id: 2, name: 'Lower Third', style: 'Professional lower third with gradient' },
    { id: 3, name: 'Social Media', style: 'Modern social media style overlay' },
    { id: 4, name: 'Sports Score', style: 'Dynamic sports scoreboard layout' },
  ];

  // Mock data for effects
  const videoEffects = [
    { id: 1, name: "Fade In", duration: "1.5s", category: "Transition", type: "effect", favorite: true },
    { id: 2, name: "Fade Out", duration: "1.5s", category: "Transition", type: "effect", favorite: false },
    { id: 3, name: "Blur", duration: "3.0s", category: "Filter", type: "effect", favorite: false },
    { id: 4, name: "Pan Left", duration: "2.0s", category: "Motion", type: "effect", favorite: true },
    { id: 5, name: "Pan Right", duration: "2.0s", category: "Motion", type: "effect", favorite: false },
    { id: 6, name: "Zoom In", duration: "2.5s", category: "Motion", type: "effect", favorite: true },
    { id: 7, name: "Zoom Out", duration: "2.5s", category: "Motion", type: "effect", favorite: false },
    { id: 8, name: "Color Boost", duration: "Continuous", category: "Filter", type: "effect", favorite: false },
    { id: 9, name: "Black & White", duration: "Continuous", category: "Filter", type: "effect", favorite: false },
    { id: 10, name: "Vignette", duration: "Continuous", category: "Filter", type: "effect", favorite: true },
    { id: 11, name: "Spotlight", duration: "Continuous", category: "Highlight", type: "effect", favorite: false },
    { id: 12, name: "Picture-in-Picture", duration: "Continuous", category: "Composite", type: "effect", favorite: true },
  ];
  
  const textStyles = [
    { id: 101, name: "Lower Third", category: "Information", type: "text", favorite: true },
    { id: 102, name: "Title", category: "Heading", type: "text", favorite: true },
    { id: 103, name: "Subtitle", category: "Heading", type: "text", favorite: false },
    { id: 104, name: "Quote", category: "Content", type: "text", favorite: false },
    { id: 105, name: "Name Tag", category: "Information", type: "text", favorite: true },
    { id: 106, name: "Caption", category: "Information", type: "text", favorite: false },
    { id: 107, name: "Bullet Points", category: "Content", type: "text", favorite: false },
    { id: 108, name: "Animated Title", category: "Heading", type: "text", favorite: true },
    { id: 109, name: "Call to Action", category: "Marketing", type: "text", favorite: true },
    { id: 110, name: "Stats Display", category: "Data", type: "text", favorite: false },
    { id: 111, name: "Location Tag", category: "Information", type: "text", favorite: false },
    { id: 112, name: "Social Media", category: "Marketing", type: "text", favorite: true },
  ];

  // Helper functions
  const getEffectsCategories = () => {
    const categories = ["all"];
    videoEffects.forEach(effect => {
      if (!categories.includes(effect.category)) {
        categories.push(effect.category);
      }
    });
    return categories;
  };
  
  const getTextCategories = () => {
    const categories = ["all"];
    textStyles.forEach(style => {
      if (!categories.includes(style.category)) {
        categories.push(style.category);
      }
    });
    return categories;
  };
  
  const filteredEffects = activeTab === 'effects'
    ? (currentCategory === 'all' ? videoEffects : videoEffects.filter(effect => effect.category === currentCategory))
    : (currentCategory === 'all' ? textStyles : textStyles.filter(style => style.category === currentCategory));
  
  const handleItemSelect = (item) => {
    if (item.type === 'effect') {
      setSelectedEffect(item);
      setSelectedTextStyle(null);
    } else {
      setSelectedTextStyle(item);
      setSelectedEffect(null);
    }
  };

  return (
    <div className="flex h-full">
      {/* Left Panel - Effects & Text Browser */}
      <div className="w-2/3 bg-white rounded-lg shadow-sm mr-4 flex flex-col">
        {/* Tabs & Search */}
        <div className="p-3 border-b flex justify-between">
          <div className="flex">
            <button
              className={`px-3 py-1 rounded-l flex items-center ${activeTab === 'effects' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => {
                setActiveTab('effects');
                setCurrentCategory('all');
              }}
            >
              <Wand2 size={16} className="mr-1" /> Video Effects
            </button>
            <button
              className={`px-3 py-1 rounded-r flex items-center ${activeTab === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => {
                setActiveTab('text');
                setCurrentCategory('all');
              }}
            >
              <Type size={16} className="mr-1" /> Text & Titles
            </button>
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search ${activeTab === 'effects' ? 'effects' : 'text styles'}...`}
                className="bg-white border rounded px-3 py-1 pl-8 text-sm"
              />
              <Search size={14} className="absolute left-2.5 top-2 text-gray-400" />
            </div>
            
            <button className="p-1 border rounded hover:bg-gray-50">
              <Filter size={18} />
            </button>
            
            <div className="flex">
              <button
                className={`p-1 rounded-l border ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
              <button
                className={`p-1 rounded-r border ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="p-2 border-b flex flex-wrap">
          {(activeTab === 'effects' ? getEffectsCategories() : getTextCategories()).map(category => (
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
        <div className="flex-1 overflow-auto p-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-4 gap-4">
              {filteredEffects.map(item => (
                <div
                  key={item.id}
                  className={`bg-white border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                    (selectedEffect?.id === item.id || selectedTextStyle?.id === item.id) ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handleItemSelect(item)}
                >
                  {/* Item Preview */}
                  <div className="h-24 bg-gray-100 flex items-center justify-center relative">
                    {item.type === 'effect' ? (
                      <div className="text-3xl">
                        {item.category === 'Transition' ? '🔄' :
                         item.category === 'Filter' ? '🎨' :
                         item.category === 'Motion' ? '🔄' :
                         item.category === 'Highlight' ? '🔦' :
                         item.category === 'Composite' ? '🖼️' : '✨'}
                      </div>
                    ) : (
                      <div className="text-center w-full px-2">
                        {item.name === 'Lower Third' && 
                          <div className="h-12 flex flex-col justify-end">
                            <div className="text-xs mb-1">JOHN DOE</div>
                            <div className="bg-blue-500 text-white py-1 text-xs">Product Manager</div>
                          </div>
                        }
                        {item.name === 'Title' && 
                          <div className="text-lg font-bold">MAIN TITLE</div>
                        }
                        {item.name === 'Subtitle' && 
                          <div className="text-base">Subtitle Text</div>
                        }
                        {item.name === 'Quote' && 
                          <div className="italic text-sm">"Quote text goes here"</div>
                        }
                        {item.name === 'Name Tag' && 
                          <div className="bg-blue-500 text-white py-1 text-xs inline-block px-2 rounded">John Doe</div>
                        }
                        {item.name === 'Caption' && 
                          <div className="text-xs bg-gray-800 text-white bg-opacity-70 py-1">Caption text example</div>
                        }
                        {(item.name !== 'Lower Third' && 
                          item.name !== 'Title' && 
                          item.name !== 'Subtitle' && 
                          item.name !== 'Quote' && 
                          item.name !== 'Name Tag' && 
                          item.name !== 'Caption') && 
                          <div className="text-sm">Aa</div>
                        }
                      </div>
                    )}
                    
                    {item.favorite && (
                      <div className="absolute top-2 right-2 text-yellow-500">
                        <Star size={16} fill="currentColor" />
                      </div>
                    )}
                    
                    {item.type === 'effect' && item.duration && (
                      <div className="absolute bottom-2 right-2 bg-white shadow text-xs px-2 py-1 rounded">
                        {item.duration}
                      </div>
                    )}
                  </div>
                  
                  {/* Item Info */}
                  <div className="p-2">
                    <div className="flex justify-between items-start">
                      <div className="truncate text-sm font-medium">{item.name}</div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-xs text-gray-500">{item.category}</div>
                      <div className="flex space-x-1">
                        <button 
                          className="p-1 text-gray-400 hover:text-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Preview function would go here
                          }}
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Copy function would go here
                          }}
                        >
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
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-2 pl-3"></th>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Category</th>
                  {activeTab === 'effects' && <th className="pb-2">Duration</th>}
                  <th className="pb-2">Favorite</th>
                  <th className="pb-2 text-right pr-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEffects.map(item => (
                  <tr
                    key={item.id}
                    className={`border-b text-sm hover:bg-gray-50 cursor-pointer ${
                      (selectedEffect?.id === item.id || selectedTextStyle?.id === item.id) ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleItemSelect(item)}
                  >
                    <td className="py-2 pl-3">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        {item.type === 'effect' ? <Wand2 size={16} /> : <Type size={16} />}
                      </div>
                    </td>
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.category}</td>
                    {activeTab === 'effects' && <td className="py-2">{item.duration}</td>}
                    <td className="py-2">
                      {item.favorite ? (
                        <Star size={16} className="text-yellow-500" fill="currentColor" />
                      ) : (
                        <Star size={16} className="text-gray-400" />
                      )}
                    </td>
                    <td className="py-2 text-right pr-3">
                      <button 
                        className="p-1 text-gray-500 hover:text-gray-700 inline-block mr-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Edit function would go here
                        }}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-gray-700 inline-block mr-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Copy function would go here
                        }}
                      >
                        <Copy size={16} />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-red-500 inline-block"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Delete function would go here
                        }}
                      >
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
        <div className="border-t p-2 flex justify-between">
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
              <Plus size={16} className="mr-1" /> Create New
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50 flex items-center">
              <Edit size={16} className="mr-1" /> Customize
            </button>
          </div>
          
          <div>
            <span className="text-sm text-gray-500">
              {filteredEffects.length} items • {activeTab === 'effects' ? 'Video Effects' : 'Text Styles'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Preview & Properties */}
      <div className="w-1/3 bg-white shadow rounded flex flex-col">
        {/* Preview */}
        <div className="p-3 border-b font-medium">
          Preview & Properties
        </div>
        
        <div className="flex-1 flex flex-col overflow-auto">
          {selectedEffect ? (
            /* Effect Properties */
            <>
              {/* Effect Preview */}
              <div className="p-3 border-b">
                <h3 className="font-medium mb-3">{selectedEffect.name}</h3>
                <div className="aspect-video bg-gray-800 rounded mb-3 flex items-center justify-center">
                  <div className="text-5xl">
                    {selectedEffect.category === 'Transition' ? '🔄' :
                     selectedEffect.category === 'Filter' ? '🎨' :
                     selectedEffect.category === 'Motion' ? '🔄' :
                     selectedEffect.category === 'Highlight' ? '🔦' :
                     selectedEffect.category === 'Composite' ? '🖼️' : '✨'}
                  </div>
                  
                  <button className="absolute p-2 bg-white border rounded-full shadow">
                    <Play size={20} />
                  </button>
                </div>
                
                <div className="flex justify-between items-center mb-3 text-sm">
                  <div className="flex items-center">
                    <Wand2 size={14} className="mr-1" />
                    <span>Effect</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{selectedEffect.duration}</span>
                  </div>
                </div>
              </div>
              
              {/* Effect Properties */}
              <div className="p-3 border-b">
                <h3 className="font-medium mb-3">Effect Properties</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full border p-1.5 rounded text-sm"
                      value={selectedEffect.name}
                      readOnly
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Category</label>
                      <select className="w-full border p-1.5 rounded text-sm">
                        <option>{selectedEffect.category}</option>
                        {getEffectsCategories().filter(c => c !== 'all' && c !== selectedEffect.category).map(category => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Duration</label>
                      <select className="w-full border p-1.5 rounded text-sm">
                        <option>{selectedEffect.duration}</option>
                        <option>1.0s</option>
                        <option>2.0s</option>
                        <option>3.0s</option>
                        <option>5.0s</option>
                        <option>Custom...</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Effect-specific properties */}
                  {selectedEffect.category === 'Transition' && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Transition Type</label>
                      <select className="w-full border p-1.5 rounded text-sm">
                        <option>Fade</option>
                        <option>Dissolve</option>
                        <option>Wipe</option>
                        <option>Slide</option>
                        <option>Zoom</option>
                      </select>
                    </div>
                  )}
                  
                  {selectedEffect.category === 'Filter' && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Intensity</label>
                      <input type="range" className="w-full" min="0" max="100" defaultValue="50" />
                    </div>
                  )}
                  
                  {selectedEffect.category === 'Motion' && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Speed</label>
                      <input type="range" className="w-full" min="0" max="100" defaultValue="50" />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Apply To</label>
                    <select className="w-full border p-1.5 rounded text-sm">
                      <option>Entire Scene</option>
                      <option>Background Only</option>
                      <option>Foreground Only</option>
                      <option>Selected Elements</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Timing</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        className="border p-1.5 rounded text-sm"
                        placeholder="Start: 00:00:00.000"
                      />
                      <input 
                        type="text" 
                        className="border p-1.5 rounded text-sm"
                        placeholder="End: 00:00:00.000"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Effect Options */}
              <div className="p-3 border-b">
                <h3 className="font-medium mb-3">Advanced Options</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Easing</label>
                    <select className="w-full border p-1.5 rounded text-sm">
                      <option>Linear</option>
                      <option>Ease In</option>
                      <option>Ease Out</option>
                      <option>Ease In-Out</option>
                      <option>Bounce</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" id="repeatEffect" className="border" />
                    <label htmlFor="repeatEffect">Repeat Effect</label>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" id="reverseEffect" className="border" />
                    <label htmlFor="reverseEffect">Reverse Direction</label>
                  </div>
                </div>
              </div>
            </>
          ) : selectedTextStyle ? (
            /* Text Style Properties */
            <>
              {/* Text Preview */}
              <div className="p-3 border-b">
                <h3 className="font-medium mb-3">{selectedTextStyle.name}</h3>
                <div className="aspect-video bg-gray-800 rounded mb-3 flex items-center justify-center relative">
                  {/* Text Preview */}
                  {selectedTextStyle.name === 'Lower Third' && (
                    <div className="absolute bottom-8 left-0 right-0">
                      <div className="text-center">
                        <div className="text-sm mb-1 text-white" style={{color: textColor, fontWeight: textBold ? 'bold' : 'normal', fontStyle: textItalic ? 'italic' : 'normal'}}>
                          JOHN DOE
                        </div>
                        <div className="py-1 text-sm text-white" style={{backgroundColor, color: textColor, fontWeight: textBold ? 'bold' : 'normal', fontStyle: textItalic ? 'italic' : 'normal', textAlign: textAlignment}}>
                          {textContent}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedTextStyle.name === 'Title' && (
                    <div className="text-center px-4 text-white">
                      <div className="text-2xl font-bold" style={{color: textColor, fontWeight: textBold ? 'bold' : 'normal', fontStyle: textItalic ? 'italic' : 'normal', textAlign: textAlignment}}>
                        {textContent}
                      </div>
                    </div>
                  )}
                  
                  {selectedTextStyle.name === 'Subtitle' && (
                    <div className="text-center px-4 text-white">
                      <div className="text-xl" style={{color: textColor, fontWeight: textBold ? 'bold' : 'normal', fontStyle: textItalic ? 'italic' : 'normal', textAlign: textAlignment}}>
                        {textContent}
                      </div>
                    </div>
                  )}
                  
                  {selectedTextStyle.name === 'Quote' && (
                    <div className="text-center px-8 text-white">
                      <div className="text-lg italic" style={{color: textColor, fontWeight: textBold ? 'bold' : 'normal', fontStyle: textItalic ? 'italic' : 'normal', textAlign: textAlignment}}>
                        "{textContent}"
                      </div>
                    </div>
                  )}
                  
                  {selectedTextStyle.name === 'Name Tag' && (
                    <div style={{backgroundColor, display: 'inline-block', padding: '4px 12px', borderRadius: '4px'}}>
                      <div style={{color: textColor, fontWeight: textBold ? 'bold' : 'normal', fontStyle: textItalic ? 'italic' : 'normal', textAlign: textAlignment}}>
                        {textContent}
                      </div>
                    </div>
                  )}
                  
                  {selectedTextStyle.name === 'Caption' && (
                    <div className="absolute bottom-4 left-0 right-0">
                      <div className="mx-auto px-2 py-1 bg-black bg-opacity-70 max-w-md">
                        <div className="text-sm text-white" style={{color: textColor, fontWeight: textBold ? 'bold' : 'normal', fontStyle: textItalic ? 'italic' : 'normal', textAlign: textAlignment}}>
                          {textContent}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(selectedTextStyle.name !== 'Lower Third' && 
                    selectedTextStyle.name !== 'Title' && 
                    selectedTextStyle.name !== 'Subtitle' && 
                    selectedTextStyle.name !== 'Quote' && 
                    selectedTextStyle.name !== 'Name Tag' && 
                    selectedTextStyle.name !== 'Caption') && (
                    <div style={{color: textColor, fontWeight: textBold ? 'bold' : 'normal', fontStyle: textItalic ? 'italic' : 'normal', textAlign: textAlignment}} className="text-white">
                      {textContent}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Text Content */}
              <div className="p-3 border-b">
                <h3 className="font-medium mb-3">Text Content</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Text</label>
                    <textarea
                      className="w-full border p-1.5 rounded text-sm h-20"
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Font</label>
                    <select className="w-full border p-1.5 rounded text-sm">
                      <option>Roboto</option>
                      <option>Arial</option>
                      <option>Helvetica</option>
                      <option>Montserrat</option>
                      <option>Open Sans</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Size</label>
                      <select className="w-full border p-1.5 rounded text-sm">
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                        <option>X-Large</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Style</label>
                      <div className="flex border rounded">
                        <button 
                          className={`flex-1 p-1.5 ${textBold ? 'bg-blue-500 text-white' : ''}`}
                          onClick={() => setTextBold(!textBold)}
                        >
                          <Bold size={16} />
                        </button>
                        <button 
                          className={`flex-1 p-1.5 ${textItalic ? 'bg-blue-500 text-white' : ''}`}
                          onClick={() => setTextItalic(!textItalic)}
                        >
                          <Italic size={16} />
                        </button>
                        <button className="flex-1 p-1.5">
                          <Underline size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Alignment</label>
                    <div className="flex border rounded">
                      <button 
                        className={`flex-1 p-1.5 ${textAlignment === 'left' ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => setTextAlignment('left')}
                      >
                        <AlignLeft size={16} />
                      </button>
                      <button 
                        className={`flex-1 p-1.5 ${textAlignment === 'center' ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => setTextAlignment('center')}
                      >
                        <AlignCenter size={16} />
                      </button>
                      <button 
                        className={`flex-1 p-1.5 ${textAlignment === 'right' ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => setTextAlignment('right')}
                      >
                        <AlignRight size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Text Color</label>
                      <div className="flex">
                        <div 
                          className="w-8 h-8 rounded-l border"
                          style={{ backgroundColor: textColor }}
                        ></div>
                        <input
                          type="text"
                          className="flex-1 border p-1.5 rounded-r text-sm"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Background Color</label>
                      <div className="flex">
                        <div 
                          className="w-8 h-8 rounded-l border"
                          style={{ backgroundColor }}
                        ></div>
                        <input
                          type="text"
                          className="flex-1 border p-1.5 rounded-r text-sm"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animation Options */}
              <div className="p-3 border-b">
                <h3 className="font-medium mb-3">Animation & Position</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Animation</label>
                    <select className="w-full border p-1.5 rounded text-sm">
                      <option>None</option>
                      <option>Fade In</option>
                      <option>Slide In</option>
                      <option>Zoom In</option>
                      <option>Type</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Duration</label>
                    <select className="w-full border p-1.5 rounded text-sm">
                      <option>1.0s</option>
                      <option>1.5s</option>
                      <option>2.0s</option>
                      <option>3.0s</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Position</label>
                    <select className="w-full border p-1.5 rounded text-sm">
                      <option>Center</option>
                      <option>Top</option>
                      <option>Bottom</option>
                      <option>Left</option>
                      <option>Right</option>
                      <option>Custom...</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Timing</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        className="border p-1.5 rounded text-sm"
                        placeholder="Start: 00:00:00.000"
                      />
                      <input 
                        type="text" 
                        className="border p-1.5 rounded text-sm"
                        placeholder="End: 00:00:00.000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* No item selected */
            <div className="flex-1 flex items-center justify-center flex-col p-6 text-center">
              <div className="mb-3 p-3 rounded-full bg-gray-100 border">
                {activeTab === 'effects' ? <Wand2 size={24} className="text-gray-400" /> : <Type size={24} className="text-gray-400" />}
              </div>
              <p className="text-gray-500 mb-1">No {activeTab === 'effects' ? 'effect' : 'text style'} selected</p>
              <p className="text-xs text-gray-400">
                Select an item to view and edit its properties
              </p>
            </div>
          )}
        </div>
        
        {/* Apply Button */}
        <div className="p-3 border-t">
          <button 
            className="w-full bg-blue-500 text-white p-2 rounded font-medium hover:bg-blue-600 mb-2"
            disabled={!selectedEffect && !selectedTextStyle}
          >
            Apply to Content
          </button>
          <button 
            className="w-full border p-2 rounded font-medium hover:bg-gray-50"
            disabled={!selectedEffect && !selectedTextStyle}
          >
            Save as Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenderEffectContent;