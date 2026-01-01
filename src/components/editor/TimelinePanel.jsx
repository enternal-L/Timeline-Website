import ResizableBox from "../ResizableBox";
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

const TimelinePanel = ({content, handleResize, handleDragStart, handleDragEnd, sensors, activeId}) => {
  const activeItem = content.find(item => item.id === activeId);

  return (
    <div className="w-full h-64 bg-[#232323] border-t border-[#3a3a3a]">
      {/* Timeline panel - video and audio tracks */}
      <div className="h-full flex">
        {/* Left side - Track controls */}
        <div className="w-32 bg-[#1e1e1e] border-r border-[#3a3a3a] flex flex-col">
          {/* Video Track Controls */}
          <div className="h-16 border-b border-[#3a3a3a] flex items-center px-2 gap-1">
            <p className="text-white text-sm">Video</p>
          </div>
          
          {/* Audio Track Controls */}
          <div className="h-16 border-b border-[#3a3a3a] flex items-center px-2 gap-1">
            <p className="text-white text-sm">Audio</p>
          </div>
        </div>

        {/* Right side - Timeline tracks */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden bg-[#282828]">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {/* Video Track */}
            <div className="h-16 border-b border-[#3a3a3a] relative">
              <SortableContext 
                items={content.map(item => item.id)} 
                strategy={horizontalListSortingStrategy}
              >
                <div className="h-full flex items-center gap-0.5 px-1">
                  {content.map(item => (
                    <ResizableBox
                      key={item.id}
                      id={item.id}
                      type={item.type}
                      width={item.width}
                      height={40}
                      onResize={handleResize}
                      isTimeline={true}
                    />
                  ))}
                </div>
              </SortableContext>
            </div>

            {/* Drag Overlay */}
            <DragOverlay>
              {activeItem ? (
                <div
                  className="h-[90%] bg-[#0078d4] border border-[#005a9e] rounded-sm relative flex items-center justify-center min-w-[60px] opacity-90 rotate-2 shadow-lg"
                  style={{ width: `${activeItem.width}px` }}
                >
                  {/* Top and bottom white lines */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/30"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30"></div>
                  
                  {/* Corner markers */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[6px] border-l-[6px] border-t-white/40 border-l-transparent"></div>
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[6px] border-r-[6px] border-t-white/40 border-r-transparent"></div>
                  
                  <div className="text-xs text-white font-semibold truncate px-1 z-10">
                    {activeItem.type}
                  </div>
                  
                  {/* FX indicator */}
                  <div className="absolute top-1 right-1 text-white text-[10px] font-semibold">
                    fx
                  </div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>

          {/* Audio Track */}
          <div className="h-16 border-b border-[#3a3a3a] relative">
            <div className="h-full flex items-center gap-0.5 px-1">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePanel;


