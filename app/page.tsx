'use client';

import { useState, useMemo, useEffect, useDeferredValue } from 'react';
import useSWR from 'swr';
import { fetchVideos } from '@/lib/api';
import { Video, SortOption } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Filters from '@/components/Filters';
import VideoGrid from '@/components/VideoGrid';
import VideoModal from '@/components/VideoModal';
import { Sparkles, Youtube, MessageCircle, Mail, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Home() {
  const { data: allVideos, error, isLoading } = useSWR('videos', fetchVideos, {
    revalidateOnFocus: false,
    dedupingInterval: 3600000,
    fallbackData: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('thevietsub_videos_cache') || 'null') : null,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearch = useDeferredValue(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const categories = useMemo(() => {
    if (!allVideos) return ['Tất cả'];
    const cats = new Set(allVideos.map((v) => v.category));
    return ['Tất cả', ...Array.from(cats).sort()];
  }, [allVideos]);

  const filteredAndSortedVideos = useMemo(() => {
    if (!allVideos) return [];

    let result = [...allVideos];

    // Filter
    if (deferredSearch) {
      const term = deferredSearch.toLowerCase();
      result = result.filter(
        (v) => v.title.toLowerCase().includes(term) || v.description.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== 'Tất cả') {
      result = result.filter((v) => v.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'views') return b.view_count - a.view_count;
      if (sortBy === 'duration') {
        const getSecs = (d: string) => {
          const parts = d.split(':').map(Number);
          if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
          return parts[0] * 60 + parts[1];
        };
        return getSecs(b.duration) - getSecs(a.duration);
      }
      return a.index - b.index; // Newest first (index 0 is now the newest after reverse)
    });

    return result;
  }, [allVideos, deferredSearch, selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar onSearch={setSearchTerm} />
      
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categories={categories}
        />

        <AnimatePresence mode="wait">
          {isLoading && !allVideos ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-4"
            >
              <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Đang tải 558+ bộ phim...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 gap-4 text-red-500"
            >
              <AlertCircle className="w-12 h-12" />
              <p className="font-bold">Lỗi tải dữ liệu. Vui lòng thử lại sau.</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  Kết quả: <span className="text-zinc-100">{filteredAndSortedVideos.length}</span> phim
                </p>
              </div>
              
              <VideoGrid
                videos={filteredAndSortedVideos}
                onVideoClick={setActiveVideoId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* About Section */}
      <section id="about" className="bg-zinc-900/20 border-y border-zinc-900/50 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block p-4 rounded-3xl bg-red-600/10 border border-red-600/20 mb-8">
            <Youtube className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 font-display uppercase">Thế Vietsub</h2>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-12 font-medium">
            Nền tảng xem phim <strong>Hoạt hình Vietsub</strong> hàng đầu. 
            Chuyên dòng Hệ Thống, Tu Tiên, Trọng Sinh với chất lượng cao nhất. 
            Dữ liệu được cập nhật liên tục từ kho lưu trữ chính thức.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a href="https://www.youtube.com/@thevietsub" target="_blank" className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-red-600/50 transition-all group hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]">
              <Youtube className="w-7 h-7 mx-auto mb-4 text-zinc-500 group-hover:text-red-600 transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">YouTube</span>
            </a>
            <a href="https://zalo.me/g/qovdmt067" target="_blank" className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-blue-600/50 transition-all group hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]">
              <MessageCircle className="w-7 h-7 mx-auto mb-4 text-zinc-500 group-hover:text-blue-500 transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">Zalo Group</span>
            </a>
            <a href="mailto:theanh96vn@gmail.com" className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-emerald-600/50 transition-all group hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <Mail className="w-7 h-7 mx-auto mb-4 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">Email</span>
            </a>
            <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-center">
              <div className="text-3xl font-black text-white mb-1">558+</div>
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Video Full</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-zinc-900" />
            <Sparkles className="w-5 h-5 text-red-600" />
            <div className="w-12 h-px bg-zinc-900" />
          </div>
          <p className="text-zinc-600 text-[11px] font-black uppercase tracking-[0.3em]">
            © 2026 THẾ VIETSUB • HIGH PERFORMANCE DONGHUA PLATFORM
          </p>
        </div>
      </footer>

      <VideoModal
        key={activeVideoId}
        videoId={activeVideoId}
        onClose={() => setActiveVideoId(null)}
      />
    </main>
  );
}
