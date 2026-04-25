import { DifficultyKey } from "@/data/versions/constants";
export type OptionValue = number;
type DifficultyMap = Partial<Record<DifficultyKey, DifficultyDetail>>;

export interface Bpm {
  min: number;
  max: number | null;
}

export interface DifficultyDetail {
  level: number | null;
  options: OptionValue;
  bpm?: Bpm;
}

export interface Song {
  genre: string;
  title: string;
  artist: string;
  bpm: Bpm;
  difficulty: {
    sp: DifficultyMap;
    dp: DifficultyMap;
  };
}

export interface VersionData {
  id: string;
  name: string;
  shorthand: string;
  songs: Song[];
}
