const ThemePanel = () => {
  return (
    <div className="w-64 bg-gray-900 border-l border-gray-700 overflow-y-auto">
      {/* Right panel - different themes */}
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-4">Themes</h3>
        <div className="space-y-2">
          {/* Placeholder for theme options */}
          <div className="h-16 bg-gray-800 rounded p-2 cursor-pointer hover:bg-gray-700">Theme 1</div>
          <div className="h-16 bg-gray-800 rounded p-2 cursor-pointer hover:bg-gray-700">Theme 2</div>
          <div className="h-16 bg-gray-800 rounded p-2 cursor-pointer hover:bg-gray-700">Theme 3</div>
        </div>
      </div>
    </div>
  );
};

export default ThemePanel;

