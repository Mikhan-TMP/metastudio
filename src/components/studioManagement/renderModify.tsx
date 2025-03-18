import React from "react";
import { Search, Edit } from "lucide-react";

const RenderModify = ({ myStudioList, selectedStudio, setSelectedStudio }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      {/* Header and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
        <h2 className="font-medium text-lg">My Studios</h2>
        <div className="relative w-full sm:w-64 mt-3 sm:mt-0">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            placeholder="Search studios..."
          />
        </div>
      </div>

      {/* Studio List */}
      <div className="space-y-3 sm:space-y-4">
        {myStudioList.map((studio) => (
          <div
            key={studio.id}
            className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition ${
              selectedStudio?.id === studio.id ? "border-blue-500 bg-blue-50" : ""
            }`}
            onClick={() => setSelectedStudio(studio)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-base">{studio.name}</h3>
                <p className="text-sm text-gray-500">{studio.type}</p>
              </div>
              <Edit className="text-gray-400" size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderModify;
