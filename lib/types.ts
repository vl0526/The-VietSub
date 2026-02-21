export interface Video {
  id: string;
  title: string;
  url: string;
  description: string;
  duration: string;
  view_count: number;
  category: string;
  thumbnail: string;
  index: number;
}

export type SortOption = "newest" | "views" | "duration";
