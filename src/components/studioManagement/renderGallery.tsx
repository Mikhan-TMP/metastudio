import React from "react";
import { Search } from "lucide-react";

const RenderGallery = ({ galleryStudioList }) => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
    {/* Header and Filters */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
      <h2 className="font-medium text-lg">Studio Gallery</h2>
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-3 sm:mt-0">
        <select className="border rounded-lg px-3 py-2 w-full sm:w-auto">
          <option>All Types</option>
          <option>News</option>
          <option>Podcast</option>
          <option>Meeting</option>
          <option>Education</option>
        </select>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            placeholder="Search gallery..."
          />
        </div>
      </div>
    </div>

    {/* Responsive Grid Gallery */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {galleryStudioList.map((studio) => (
        <div
          key={studio.id}
          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="h-40 bg-gray-100 flex items-center justify-center">
            <img
              src={studio.imgSrc}
              alt={studio.name}
              className="w-full h-full object-cover"
            />
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

export default RenderGallery;
