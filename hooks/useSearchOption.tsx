import { createContext, ReactNode, useContext, useState } from "react";
import { SearchOption, SearchOptionContextType } from "@/types/searchOption";

const SearchOptionContext = createContext<SearchOptionContextType | undefined>(
  undefined,
);

const DEFAULT_OPTION: SearchOption = {
  playStyle: "sp",
  versions: [],
  keyword: "",
  keywordType: "title",
  difficulties: [],
  levels: [],
  cn: "all",
  hcn: "all",
  bss: "all",
  hbss: "all",
  mss: "all",
  sofLan: "all",
  bpm: {
    min: 0,
    max: 0,
  },
};

export function SearchOptionWrapper({ children }: { children?: ReactNode }) {
  const [searchOption, setSearchOption] = useState<SearchOption>({
    ...DEFAULT_OPTION,
  });
  const updateSearchOption = (value: Partial<SearchOption>) => {
    setSearchOption((prev) => ({ ...prev, ...value }));
  };
  const resetSearchOption = () => {
    setSearchOption({ ...DEFAULT_OPTION });
  };
  return (
    <SearchOptionContext
      value={{ searchOption, updateSearchOption, resetSearchOption }}
    >
      {children}
    </SearchOptionContext>
  );
}

export function useSearchOption() {
  const context = useContext(SearchOptionContext);
  if (!context) {
    throw new Error(
      "useSearchOption must be used within a SearchOptionWrapper",
    );
  }
  return context;
}
