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

const ContentType = {
  INTRO: 'Intro',
  DESC: 'Desc',
  HISTORY: 'History',
  ICONS: 'Icons'
};

// Initial content with default dimensions
const initialContent = [
  { id: 1, type: ContentType.INTRO, width: 200, height: 150 },
  { id: 2, type: ContentType.DESC, width: 200, height: 150 },
  { id: 3, type: ContentType.HISTORY, width: 200, height: 150 },
  { id: 4, type: ContentType.ICONS, width: 200, height: 150 },
];

const Editor = () => {
  const [content, setContent] = useState(initialContent);
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

    if (active.id !== over?.id) {
      setContent((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const activeItem = content.find(item => item.id === activeId);

  return (
    // ensure that dnd can be used here
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={content.map(item => item.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex flex-row p-4 bg-gray-100 min-h-screen">
          {content.map((item) => (
            <ResizableBox
              key={item.id}
              id={item.id}
              type={item.type}
              width={item.width}
              height={item.height}
              onResize={handleResize}
            >
              <div className="text-sm text-gray-500 mt-2">
                {item.width} × {item.height}px
              </div>
            </ResizableBox>
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeItem ? (
          <div
            className="border-2 border-gray-300 bg-white rounded-lg p-4 shadow-2xl scale-110 rotate-2 opacity-95"
            style={{ 
              width: `${activeItem.width}px`, 
              height: `${activeItem.height}px`,
              minWidth: '100px'
            }}
          >
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="font-semibold text-gray-700">{activeItem.type}</div>
                <div className="text-sm text-gray-500 mt-2">
                  {activeItem.width} × {activeItem.height}px
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Editor;
