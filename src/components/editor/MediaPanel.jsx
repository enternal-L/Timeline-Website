import ResizableBox from "../ResizableBox";
import { useState } from "react";

const MediaPanel = ({ content, handleResize }) => {
  const boxWidth = 100;
  const boxHeight = 80;

  // copy content as standalone state
  const [copiedContent, setContent] = useState(content)

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto">
      {/* Left panel - media component storage */}
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-4">Media</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {copiedContent.map(item => (
            <div key={item.id} className="w-[calc(50%-0.25rem)] max-w-[calc(50%-0.25rem)]">
              <div className="w-full" style={{ maxWidth: '100%' }}>
                <ResizableBox
                  id={item.id}
                  type={item.type}
                  width={boxWidth}
                  height={boxHeight}
                  onResize={handleResize}
                >
                  <div className="text-xs text-gray-500 mt-1 truncate">
                    {item.type}
                  </div>
                </ResizableBox>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaPanel;


