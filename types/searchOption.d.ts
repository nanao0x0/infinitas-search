import { DifficultyKey } from "@/data/versions/constants";

export type FilterFlag = "all" | "isTrue" | "isFalse";

export interface SearchOption {
  playStyle: "sp" | "dp";
  versions: string[];
  keyword: string;
  keywordType: "title" | "artist";
  difficulties: DifficultyKey[];
  levels: number[];
  cn: FilterFlag;
  hcn: FilterFlag;
  bss: FilterFlag;
  hbss: FilterFlag;
  mss: FilterFlag;
  sofLan: FilterFlag;
  bpm: {
    min: number;
    max: number;
  };
}

export interface SearchOptionContextType {
  searchOption: SearchOption;
  updateSearchOption: (value: Partial<SearchOption>) => void;
  resetSearchOption: () => void;
}
