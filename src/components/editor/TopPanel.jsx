const TopPanel = ({ onExitEdit }) => {
  return (
    <div className="w-full h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
      {/* Left side - can add tools/buttons here */}
      <div className="text-white">Editor</div>
      
      {/* Right side - exit to view mode button */}
      <button
        onClick={onExitEdit}
        className="text-white hover:text-gray-300 px-3 py-1 rounded transition-colors flex items-center gap-2"
        title="Switch to View Mode"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" 
          />
        </svg>
      </button>
    </div>
  );
};

export default TopPanel;

