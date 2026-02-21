'use client';

import { Play, Info, Calendar, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/1920/1080?grayscale"
          alt="Hero Background"
          fill
          className="object-cover opacity-40"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">Hot nhất tuần</span>
            <div className="flex items-center gap-1 text-zinc-400 text-xs font-medium">
              <Eye className="w-3 h-3" /> 108K Subscribers
            </div>
          </div>

          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 font-display uppercase">
            Hệ Thống <br />
            <span className="text-red-600">Tu Tiên</span> <br />
            Cực Phẩm
          </h2>

          <p className="text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl">
            Kênh chuyên Vietsub hoạt hình Trung Quốc 2D dòng Hệ Thống – Tu Tiên – Trọng Sinh – Báo Thù. 
            Hơn 552 bộ full tập, cập nhật liên tục mỗi ngày với chất lượng cao nhất.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-colors hover:bg-zinc-200"
            >
              <Play className="w-5 h-5 fill-current" />
              XEM NGAY
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://zalo.me/g/qovdmt067', '_blank')}
              className="bg-zinc-800/80 backdrop-blur-md border border-zinc-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-colors hover:bg-zinc-700"
            >
              <Info className="w-5 h-5" />
              THAM GIA ZALO
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full pointer-events-none opacity-20 hidden lg:block">
        <div className="absolute inset-0 bg-red-600 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
      </div>
    </section>
  );
}
