export const MUSIC_OPTIONS = {
  NONE: 0,
  CN: 1 << 0, // 1
  HCN: 1 << 1, // 2
  BSS: 1 << 2, // 4
  HBSS: 1 << 3, // 8
  MSS: 1 << 4, // 16
} as const;

export type MusicOption = (typeof MUSIC_OPTIONS)[keyof typeof MUSIC_OPTIONS];

export const DIFFICULTY_KEYS = [
  "beginner",
  "normal",
  "hyper",
  "another",
  "leggendaria",
] as const;

export type DifficultyKey = (typeof DIFFICULTY_KEYS)[number];

interface DifficultyColors {
  border: string;
  bgDark: string;
  bgLight: string;
  textLight: string;
  textDark: string;
}

export const DIFFICULTY_COLOR_MAP: Record<DifficultyKey, DifficultyColors> = {
  beginner: {
    border: "border-lime-700",
    bgDark: "bg-lime-950",
    bgLight: "bg-lime-700",
    textLight: "text-lime-400",
    textDark: "text-lime-700",
  },
  normal: {
    border: "border-sky-700",
    bgDark: "bg-sky-950",
    bgLight: "bg-sky-700",
    textLight: "text-sky-400",
    textDark: "text-sky-700",
  },
  hyper: {
    border: "border-yellow-600",
    bgDark: "bg-yellow-950",
    bgLight: "bg-yellow-600",
    textLight: "text-yellow-400",
    textDark: "text-yellow-700",
  },
  another: {
    border: "border-rose-700",
    bgDark: "bg-rose-950",
    bgLight: "bg-rose-700",
    textLight: "text-rose-400",
    textDark: "text-rose-700",
  },
  leggendaria: {
    border: "border-purple-700",
    bgDark: "bg-purple-950",
    bgLight: "bg-purple-700",
    textLight: "text-purple-400",
    textDark: "text-purple-700",
  },
};

export const LEVELS: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
