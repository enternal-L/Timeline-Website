import React from "react";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import ResizableBox from "./ResizableBox";
import TopPanel from "./editor/TopPanel";
import MediaPanel from "./editor/MediaPanel";
import ContentPanel from "./editor/ContentPanel";
import ThemePanel from "./editor/ThemePanel";
import TimelinePanel from "./editor/TimelinePanel";

const Editor = ({content, setContent, contentMap, onExitEdit}) => {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleResize = (id, newWidth, newHeight) => {
    setContent(prevContent =>
      prevContent.map(item =>
        item.id === id
          ? { ...item, width: newWidth, height: newHeight }
          : item
      )
    );
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setContent((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const activeItem = content.find(item => item.id === activeId);

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-950">
      {/* Top Panel - spans full width */}
      <TopPanel onExitEdit={onExitEdit} />
      
      {/* Main editing area - three column layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Media */}
        <MediaPanel content={content} handleResize={handleResize} />
        
        {/* Center Panel - Content Preview */}
        <ContentPanel content={content} contentMap={contentMap} />
        
        {/* Right Panel - Themes */}
        <ThemePanel />
      </div>
      
      {/* Bottom Panel - Timeline */}
      <TimelinePanel 
        content={content} 
        handleResize={handleResize}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        sensors={sensors}
        activeId={activeId}
      />
    </div>
  );
};

export default Editor;
