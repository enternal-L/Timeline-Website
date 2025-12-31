const ContentPanel = () => {
  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
      {/* Main content panel - preview of website */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Content Preview</h3>
        <div className="bg-white rounded-lg shadow p-8 min-h-[500px]">
          {/* Placeholder for content preview */}
          <div className="text-gray-500">Website preview will appear here</div>
        </div>
      </div>
    </div>
  );
};

export default ContentPanel;

