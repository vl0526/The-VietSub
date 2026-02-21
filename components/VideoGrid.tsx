'use client';

import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Video } from '@/lib/types';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (id: string) => void;
}

import { memo } from 'react';

interface VideoRowProps {
  virtualRow: any;
  columns: number;
  videos: Video[];
  onVideoClick: (id: string) => void;
}

const VideoRow = memo(({ virtualRow, columns, videos, onVideoClick }: VideoRowProps) => {
  const startIndex = virtualRow.index * columns;
  const rowVideos = videos.slice(startIndex, startIndex + columns);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${virtualRow.size}px`,
        transform: `translateY(${virtualRow.start}px)`,
        willChange: 'transform',
        contentVisibility: 'auto',
        containIntrinsicSize: `0 ${virtualRow.size}px`,
      }}
      className={`grid gap-4 px-1 ${
        columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-2' : 'grid-cols-4'
      }`}
    >
      {rowVideos.map((video, idx) => (
        <div key={video.id} className="h-full">
          <VideoCard 
            video={video} 
            onClick={onVideoClick} 
            priority={virtualRow.index === 0 && idx < columns} // Priority for first row
          />
        </div>
      ))}
    </div>
  );
});

VideoRow.displayName = 'VideoRow';

export default function VideoGrid({ videos, onVideoClick }: VideoGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);

  // Use useLayoutEffect to prevent layout shift on mount
  useLayoutEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(4);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const rowCount = Math.ceil(videos.length / columns);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (columns === 1 ? 320 : 260),
    overscan: 30, // Even higher overscan for ultra-smooth fast scrolling
  });

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-200px)] overflow-y-auto scroll-smooth scrollbar-hide gpu-accelerated"
      style={{
        contain: 'strict',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <VideoRow
            key={virtualRow.key}
            virtualRow={virtualRow}
            columns={columns}
            videos={videos}
            onVideoClick={onVideoClick}
          />
        ))}
      </div>
    </div>
  );
}
