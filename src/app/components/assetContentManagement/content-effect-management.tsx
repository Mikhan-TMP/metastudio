import React, { useState } from "react";
import { Tv, Type, Sparkles, Upload, Play, Plus, Search } from "lucide-react";
import ResponsiveTabs from "./ResponsiveTabs";
import RenderBannerContent from "./renderBannerContent";
import RenderTVContent from "./renderTVContent";
import RenderEffectContent from "./renderEffectContent";

const ContentEffectManagement = () => {
  const [currentView, setCurrentView] = useState("tv");
  const [bannerText, setBannerText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Mock data for banner templates
  const bannerTemplates = [
    { id: 1, name: "Template 1", style: "Style 1" },
    { id: 2, name: "Template 2", style: "Style 2" },
    { id: 3, name: "Template 3", style: "Style 3" },
  ];

  // Mock data for effects
  const effects = [
    { id: 1, name: "Effect 1", category: "Transition" },
    { id: 2, name: "Effect 2", category: "Background" },
    { id: 3, name: "Effect 3", category: "Accent" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="flex justify-center px-4">
        <div className="bg-white rounded-[12px] w-full max-w-[900px] sm:w-[90%] md:w-[80%] lg:w-[70%] h-auto">
          {/* Responsive Button Group */}
          <ResponsiveTabs currentView={currentView} setCurrentView={setCurrentView} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {currentView === "tv" && <RenderTVContent />}
        {currentView === "banner" && (
          <RenderBannerContent
            bannerText={bannerText}
            setBannerText={setBannerText}
            bannerTemplates={bannerTemplates}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        )}
        {currentView === "effect" && <RenderEffectContent effects={effects} />}
      </div>
    </div>
  );
};

export default ContentEffectManagement;
