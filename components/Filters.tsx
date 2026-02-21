'use client';

import { Search, Filter, SortAsc } from 'lucide-react';
import { SortOption } from '@/lib/types';

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  sortBy: SortOption;
  onSortChange: (val: SortOption) => void;
  categories: string[];
}

export default function Filters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
}: FiltersProps) {
  return (
    <div className="space-y-6 mb-12">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Search */}
        <div className="relative w-full lg:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
          <input
            type="text"
            placeholder="Tìm kiếm phim hệ thống, tu tiên..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 px-12 py-3.5 rounded-2xl outline-none transition-all text-sm font-medium"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          <div className="flex items-center gap-2 text-zinc-500 mr-2 shrink-0">
            <SortAsc className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Sắp xếp</span>
          </div>
          {(['newest', 'views', 'duration'] as SortOption[]).map((option) => (
            <button
              key={option}
              onClick={() => onSortChange(option)}
              className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                sortBy === option
                  ? 'bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {option === 'newest' ? 'Mới nhất' : option === 'views' ? 'Nhiều view' : 'Dài nhất'}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex items-center gap-2 text-zinc-500 mr-2 shrink-0">
          <Filter className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Thể loại</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCategory === cat
                ? 'bg-zinc-100 border-white text-black'
                : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
