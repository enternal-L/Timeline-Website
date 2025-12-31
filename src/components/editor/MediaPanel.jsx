const MediaPanel = () => {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto">
      {/* Left panel - media component storage */}
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-4">Media</h3>
        <div className="space-y-2">
          {/* Placeholder for media items */}
          <div className="h-20 bg-gray-800 rounded p-2">Media Item 1</div>
          <div className="h-20 bg-gray-800 rounded p-2">Media Item 2</div>
          <div className="h-20 bg-gray-800 rounded p-2">Media Item 3</div>
        </div>
      </div>
    </div>
  );
};

export default MediaPanel;

