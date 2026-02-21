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

export async function fetchVideos(): Promise<Video[]> {
  try {
    const response = await fetch(DATA_URL, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) throw new Error("Failed to fetch data");

    const text = await response.text();
    let rawData: any[] = [];

    try {
      // Try parsing as a single JSON object first (common for channel dumps)
      const parsed = JSON.parse(text);
      if (parsed.entries && Array.isArray(parsed.entries)) {
        rawData = parsed.entries;
      } else if (Array.isArray(parsed)) {
        rawData = parsed;
      } else {
        rawData = [parsed];
      }
    } catch (e) {
      // Fallback to line-by-line JSONL parsing
      rawData = text.split("\n").filter(Boolean).map((line) => JSON.parse(line));
    }

    // Filter out objects that are not videos (e.g., channel info)
    // Videos in this dataset usually have a duration or view_count
    const videoEntries = rawData.filter((item) => 
      item.id && 
      item.title && 
      (item.duration !== undefined || item.view_count !== undefined || item._type === 'url') &&
      item.id !== "UCfrJX6Jb-jvn1sk1eOR7FsQ" // Filter out the channel ID itself
    );

    // The source JSONL is already sorted Newest First (confirmed by checking video IDs)
    return videoEntries.map((raw, index) => {
      // Extract category from title
      const category = CATEGORY_KEYWORDS.find((kw) => 
        raw.title.toLowerCase().includes(kw.toLowerCase())
      ) || "Khác";

      // Format duration (seconds to HH:MM:SS or MM:SS)
      let durationStr = "00:00";
      if (raw.duration) {
        const totalSeconds = Math.floor(raw.duration);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        if (hours > 0) {
          durationStr = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
          durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
      }

      return {
        id: raw.id,
        title: raw.title,
        url: raw.url || `https://www.youtube.com/watch?v=${raw.id}`,
        description: raw.description || "",
        duration: durationStr,
        view_count: raw.view_count || 0,
        category,
        thumbnail: `https://i.ytimg.com/vi/${raw.id}/maxresdefault.jpg`,
        index, // Keep original order for "Newest" sort
      };
    });
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
