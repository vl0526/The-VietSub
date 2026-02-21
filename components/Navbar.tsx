'use client';

import { useState, useEffect } from 'react';
import { Search, Menu, X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Logo from './Logo';
import Image from 'next/image';

const AVATAR_URL = "https://yt3.googleusercontent.com/SdGSfwXrBU0nHO8b3ZaDNrSZG7s8K1Cr92Rg0mYTiQQIuhaitrnYW1XAz_x4zmZWkolOSpODYg=s160-c-k-c0x00ffffff-no-rj";

export default function Navbar({ onSearch }: { onSearch: (term: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md py-3 border-b border-red-600/50' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="w-10 h-10 text-red-600" />
          <h1 className="text-2xl font-black tracking-tighter font-display">
            THẾ <span className="text-red-600">VIETSUB</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
            <input
              type="text"
              placeholder="Tìm phim hệ thống..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-zinc-900/50 border border-zinc-800 focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 px-10 py-2 rounded-full w-64 outline-none transition-all"
            />
          </div>
          
          <div className="flex gap-6 text-sm font-medium text-zinc-400">
            <Link href="#" className="hover:text-white transition">Trang chủ</Link>
            <Link href="#videos" className="hover:text-white transition">Phim mới</Link>
            <Link href="#about" className="hover:text-white transition">Về kênh</Link>
          </div>

          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-zinc-800">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-600/30 group-hover:border-red-600 transition-colors">
              <Image 
                src={AVATAR_URL}
                alt="Thế Vietsub Avatar"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Tìm phim..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-lg w-full outline-none"
              />
              <Link href="#" className="text-lg font-medium py-2 border-b border-zinc-800">Trang chủ</Link>
              <Link href="#videos" className="text-lg font-medium py-2 border-b border-zinc-800">Phim mới</Link>
              <Link href="#about" className="text-lg font-medium py-2">Về kênh</Link>
              <button className="bg-red-600 text-white py-3 rounded-xl font-bold mt-2">
                Đăng ký ngay
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
