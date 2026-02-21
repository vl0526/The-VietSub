'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VideoCard from '@/components/VideoCard';
import VideoModal from '@/components/VideoModal';
import { VIDEOS, CATEGORIES } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Youtube, MessageCircle, Mail, Github } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const filteredVideos = useMemo(() => {
    return VIDEOS.filter((video) => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Tất cả' || video.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <main className="min-h-screen">
      <Navbar onSearch={setSearchTerm} />
      
      <Hero />

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2 font-display">KHÁM PHÁ</h2>
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">Lọc theo thể loại yêu thích của bạn</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div id="videos" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={setActiveVideoId}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredVideos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="bg-zinc-900/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-zinc-700" />
            </div>
            <h3 className="text-xl font-bold text-zinc-300 mb-2">Không tìm thấy phim nào</h3>
            <p className="text-zinc-500">Thử tìm kiếm với từ khóa khác hoặc chọn thể loại khác nhé!</p>
          </motion.div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="bg-zinc-900/30 border-y border-zinc-900 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block p-3 rounded-2xl bg-red-600/10 border border-red-600/20 mb-8">
            <Youtube className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 font-display">VỀ THẾ VIETSUB</h2>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-12">
            Kênh chuyên Vietsub <strong>hoạt hình Trung Quốc 2D</strong> dòng Hệ Thống – Tu Tiên – Trọng Sinh – Báo Thù. 
            Hơn <strong>558 bộ full tập</strong>, cập nhật liên tục mỗi ngày. 
            Toàn bộ nội dung được phép sử dụng (Fair-use). Liên hệ bản quyền: <strong>theanh96vn@gmail.com</strong>
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a href="https://www.youtube.com/@thevietsub" target="_blank" className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-red-600/50 transition-colors group">
              <Youtube className="w-6 h-6 mx-auto mb-3 text-zinc-500 group-hover:text-red-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">YouTube</span>
            </a>
            <a href="https://zalo.me/g/qovdmt067" target="_blank" className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-600/50 transition-colors group">
              <MessageCircle className="w-6 h-6 mx-auto mb-3 text-zinc-500 group-hover:text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">Zalo Group</span>
            </a>
            <a href="mailto:theanh96vn@gmail.com" className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-600/50 transition-colors group">
              <Mail className="w-6 h-6 mx-auto mb-3 text-zinc-500 group-hover:text-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">Email</span>
            </a>
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="text-2xl font-black text-white mb-1">108K</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Subscribers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-px bg-zinc-800" />
            <Sparkles className="w-4 h-4 text-red-600" />
            <div className="w-8 h-px bg-zinc-800" />
          </div>
          <p className="text-zinc-500 text-sm font-medium tracking-wide">
            © 2026 THẾ VIETSUB • MADE WITH PASSION FOR DONGHUA FANS
          </p>
          <div className="mt-4 flex justify-center gap-6 text-zinc-600 text-xs font-bold uppercase tracking-widest">
            <Link href="#" className="hover:text-white transition">Điều khoản</Link>
            <Link href="#" className="hover:text-white transition">Bảo mật</Link>
            <Link href="#" className="hover:text-white transition">Liên hệ</Link>
          </div>
        </div>
      </footer>

      <VideoModal
        videoId={activeVideoId}
        onClose={() => setActiveVideoId(null)}
      />
    </main>
  );
}
