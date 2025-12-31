const TimelinePanel = () => {
  return (
    <div className="w-full h-48 bg-gray-800 border-t border-gray-700">
      {/* Timeline panel - video and audio tracks */}
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-4">Timeline</h3>
        <div className="space-y-2">
          {/* Video track */}
          <div className="h-16 bg-gray-700 rounded p-2">
            <div className="text-sm mb-1">Video Track</div>
            <div className="h-8 bg-gray-600 rounded"></div>
          </div>
          {/* Audio track */}
          <div className="h-16 bg-gray-700 rounded p-2">
            <div className="text-sm mb-1">Audio Track</div>
            <div className="h-8 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePanel;

