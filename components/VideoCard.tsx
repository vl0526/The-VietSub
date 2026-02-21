'use client';

import { Play, Eye, Calendar, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { Video } from '@/lib/data';
import Image from 'next/image';

interface VideoCardProps {
  video: Video;
  onClick: (id: string) => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden transition-all hover:border-red-600/30 hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)]"
      onClick={() => onClick(video.id)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-red-600 p-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Play className="w-6 h-6 text-white fill-current" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-black/60 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded text-white uppercase tracking-wider border border-white/10">
            {video.category}
          </span>
        </div>
        
        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded text-zinc-300 border border-white/5">
          {video.date}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-zinc-100 line-clamp-2 group-hover:text-red-500 transition-colors mb-3 leading-snug">
          {video.title}
        </h3>
        
        <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Eye className="w-3 h-3" />
            {video.views} Lượt xem
          </div>
          <div className="flex items-center gap-1.5">
            <Tag className="w-3 h-3" />
            {video.category}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
