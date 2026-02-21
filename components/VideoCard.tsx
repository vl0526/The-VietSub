'use client';

import { Video } from '@/lib/types';
import { Play, Eye, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { formatViews } from '@/lib/api';
import { memo } from 'react';

interface VideoCardProps {
  video: Video;
  onClick: (id: string) => void;
  priority?: boolean;
}

const VideoCard = memo(function VideoCard({ video, onClick, priority }: VideoCardProps) {
  return (
    <div
      className="group cursor-pointer bg-zinc-900/40 border border-zinc-800/50 rounded-xl overflow-hidden transition-all hover:border-red-600/40 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] h-full flex flex-col will-change-transform"
      style={{ contain: 'content' }}
      onClick={() => onClick(video.id)}
    >
      <div className="relative aspect-video overflow-hidden bg-zinc-800/50">
        {/* Shimmer effect placeholder */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />
        
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? undefined : "lazy"}
          priority={priority}
          unoptimized // Faster loading for YouTube thumbnails by bypassing Next.js processing
          referrerPolicy="no-referrer"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
        
        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-[10px] font-bold px-1.5 py-0.5 rounded text-white border border-white/10">
          {video.duration}
        </div>

        <div className="absolute top-2 left-2">
          <span className="bg-red-600/90 backdrop-blur-sm text-[9px] font-black px-2 py-0.5 rounded text-white uppercase tracking-tighter border border-red-500/50">
            {video.category}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-red-600 p-3 rounded-full shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 text-white fill-current" />
          </div>
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-bold text-zinc-100 text-xs line-clamp-2 group-hover:text-red-500 transition-colors mb-2 leading-snug min-h-[2rem]">
          {video.title}
        </h3>
        
        <div className="mt-auto flex items-center justify-between text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            {formatViews(video.view_count)}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {video.duration}
          </div>
        </div>
      </div>
    </div>
  );
});

export default VideoCard;
