'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
}

export default function VideoModal({ videoId, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {videoId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút đóng đơn giản nhất */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-600 text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* CHỈ NHÚNG VIDEO - KHÔNG THÊM GÌ HẾT */}
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&iv_load_policy=3&cc_load_policy=0`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
