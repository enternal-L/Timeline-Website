import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ResizableBox = ({ 
  id, 
  type, 
  width, 
  height, 
  onResize, 
  children,
  isTimeline = false
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeSide, setResizeSide] = useState(null); // 'left' or 'right'
  const startPosRef = useRef({ x: 0, width: 0 });

  const handleMouseDown = (e, side) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeSide(side);
    startPosRef.current = {
      x: e.clientX,
      width: width
    };
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startPosRef.current.x;
      let newWidth;
      
      if (resizeSide === 'right') {
        // Right side: dragging right increases width, dragging left decreases
        newWidth = Math.max(100, startPosRef.current.width + deltaX);
      } else if (resizeSide === 'left') {
        // Left side: dragging left increases width, dragging right decreases
        newWidth = Math.max(100, startPosRef.current.width - deltaX);
      }
      
      onResize(id, newWidth, height);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeSide(null);
    };

    // adds listener on mouse movement, calls that function
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // removes event listener once return
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeSide, id, height, onResize]);

  // Timeline styling for Premiere Pro look
  const timelineClasses = isTimeline 
    ? 'relative border border-[#005a9e] rounded-sm select-none transition-all duration-200 bg-[#0078d4] m-0'
    : 'relative border-2 rounded-lg p-4 m-2 select-none transition-all duration-200 border-gray-300 bg-white shadow-sm hover:shadow-md';

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, width: `${width}px`, height: isTimeline ? `${height}px` : `${height}px`, minWidth: isTimeline ? '60px' : '100px' }}
      className={timelineClasses}
      {...attributes}
    >

        {/* left side */}
        <div
            className="absolute top-0 left-0 w-2 h-full cursor-col-resize z-10 group"
            onMouseDown={(e) => handleMouseDown(e, 'left')}
        >
            <div className={`absolute top-0 left-0 w-0.5 h-full ${isTimeline ? 'bg-white/60' : 'bg-blue-500'} opacity-0 group-hover:opacity-100 transition-opacity`} />
        </div>

        {/* right side */}
        <div
            className="absolute top-0 right-0 w-2 h-full cursor-col-resize z-10 group"
            onMouseDown={(e) => handleMouseDown(e, 'right')}
        >
            <div className={`absolute top-0 right-0 w-0.5 h-full ${isTimeline ? 'bg-white/60' : 'bg-blue-500'} opacity-0 group-hover:opacity-100 transition-opacity`} />
        </div>
        
        {/* Timeline-specific elements */}
        {isTimeline && (
          <>
            {/* Top and bottom white lines */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30"></div>
            
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[6px] border-l-[6px] border-t-white/40 border-l-transparent"></div>
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[6px] border-r-[6px] border-t-white/40 border-r-transparent"></div>
            
            {/* FX indicator */}
            <div className="absolute top-1 right-1 text-white text-[10px] font-semibold">
              fx
            </div>
          </>
        )}
        
        {/* Drag handle - center area for dragging */}
        <div 
          className="h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          {...listeners}
        >
            <div className="text-center">
            <div className={`font-semibold ${isTimeline ? 'text-white text-xs' : 'text-gray-700'}`}>{type}</div>
            {children}
            </div>
        </div>
    </div>
  );
};

export default ResizableBox;

