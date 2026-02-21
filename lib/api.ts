import { Video } from "./types";

const DATA_URL = "https://raw.githubusercontent.com/vl0526/The-VietSub/refs/heads/main/thevietsub_videos.jsonl";

const CATEGORY_KEYWORDS = [
  "Hệ Thống",
  "Tu Tiên",
  "Trọng Sinh",
  "Báo Thù",
  "Xuyên Không",
  "Sinh Tồn",
  "Võ Giả",
  "Sát Thần",
  "Huyền Huyễn",
  "Đô Thị",
  "Mạt Thế",
];

const CACHE_KEY = "thevietsub_videos_cache";
const CACHE_TIME_KEY = "thevietsub_videos_cache_time";
const CACHE_DURATION = 3600000; // 1 hour

const FALLBACK_URL = "/videos_fallback.jsonl";

export async function fetchVideos(): Promise<Video[]> {
  // Try to get from localStorage first for instant load
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    
    if (cached && cachedTime) {
      const isExpired = Date.now() - parseInt(cachedTime) > CACHE_DURATION;
      if (!isExpired) {
        try {
          return JSON.parse(cached);
        } catch (e) {
          console.error("Failed to parse cache", e);
        }
      }
    }
  }

  const tryFetch = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch from ${url}`);
    return response.text();
  };

  try {
    let text: string;
    try {
      text = await tryFetch(DATA_URL);
    } catch (e) {
      console.warn("Primary URL failed, trying fallback", e);
      text = await tryFetch(FALLBACK_URL);
    }

    const lines = text.split("\n").filter(l => l.trim());
    
    let videoEntries: any[] = [];
    
    // Efficiently parse JSONL or JSON
    try {
      if (lines[0].startsWith('{') && !lines[0].includes('"entries":')) {
        // Likely true JSONL
        videoEntries = lines.map(line => JSON.parse(line));
      } else {
        // Likely a single JSON object with entries array
        const parsed = JSON.parse(text);
        videoEntries = parsed.entries || (Array.isArray(parsed) ? parsed : [parsed]);
      }
    } catch (e) {
      console.error("Parsing error, falling back", e);
      videoEntries = lines.map(line => {
        try { return JSON.parse(line); } catch { return null; }
      }).filter(Boolean);
    }

    const processedVideos = videoEntries
      .filter((item) => 
        item && item.id && item.title && 
        item.id !== "UCfrJX6Jb-jvn1sk1eOR7FsQ"
      )
      .map((raw, index) => {
        const category = CATEGORY_KEYWORDS.find((kw) => 
          raw.title.toLowerCase().includes(kw.toLowerCase())
        ) || "Khác";

        let durationStr = "00:00";
        if (raw.duration) {
          const totalSeconds = Math.floor(raw.duration);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          durationStr = hours > 0 
            ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            : `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        return {
          id: raw.id,
          title: raw.title,
          url: raw.url || `https://www.youtube.com/watch?v=${raw.id}`,
          description: raw.description || "",
          duration: durationStr,
          view_count: raw.view_count || 0,
          category,
          thumbnail: `https://i.ytimg.com/vi/${raw.id}/hqdefault.jpg`, // hqdefault is smaller and faster than maxres
          index,
        };
      });

    // Update cache
    if (typeof window !== "undefined" && processedVideos.length > 0) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(processedVideos));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    }

    return processedVideos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export function formatViews(views: number): string {
  if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
  if (views >= 1000) return (views / 1000).toFixed(1) + "K";
  return views.toString();
}
