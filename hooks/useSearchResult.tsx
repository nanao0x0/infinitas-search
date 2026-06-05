// hooks/useFilteredSongs.ts
import { useMemo } from "react";
import allVersions from "@/data/versions/all";
import { MUSIC_OPTIONS } from "@/data/versions/constants";
import { DifficultyKey } from "@/data/versions/constants";
import { SearchOption } from "@/types/searchOption";

const getPriority = (str: string) => {
  const firstChar = str.charAt(0);

  if (/[a-zA-Z]/.test(firstChar)) return 1;

  if (/[0-9０-９]/.test(firstChar)) return 2;

  if (/[\u3040-\u30ff\u4e00-\u9faf]/.test(firstChar)) return 3;

  return 4;
};

export const useSearchResult = (searchOption: SearchOption) => {
  const sortedAllVersions = allVersions.map((version) => {
    return {
      ...version,
      songs: version.songs.toSorted((a, b) => {
        const priorityA = getPriority(a.title);
        const priorityB = getPriority(b.title);

        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }

        return a.title.localeCompare(b.title, "ja");
      }),
    };
  });

  const searchResult = useMemo(() => {
    return sortedAllVersions
      .filter(
        (version) =>
          searchOption.versions.length === 0 ||
          searchOption.versions.includes(version.id),
      )
      .map((version) => {
        const regExp = new RegExp(
          searchOption.keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "i",
        );
        return {
          ...version,
          songs: version.songs.filter((song) => {
            const style = searchOption.playStyle;
            const diffsOnStyle = song.difficulty[style];

            // 1. キーワード検索
            if (!regExp.test(song[searchOption.keywordType])) return false;

            // 2. 難易度・属性検索
            const targetDiffs =
              searchOption.difficulties.length > 0
                ? searchOption.difficulties
                : (Object.keys(diffsOnStyle ?? {}) as DifficultyKey[]);

            const isCompoundMatch = targetDiffs.some((diff) => {
              const chart = diffsOnStyle[diff];
              if (!chart || chart.level === null) return false;
              if (
                searchOption.levels.length > 0 &&
                !searchOption.levels.includes(chart.level)
              )
                return false;

              const check = (val: boolean, filter: string) =>
                filter === "all" ? true : filter === "isTrue" ? val : !val;

              return (
                check(
                  (chart.options & MUSIC_OPTIONS.CN) !== 0,
                  searchOption.cn,
                ) &&
                check(
                  (chart.options & MUSIC_OPTIONS.HCN) !== 0,
                  searchOption.hcn,
                ) &&
                check(
                  (chart.options & MUSIC_OPTIONS.BSS) !== 0,
                  searchOption.bss,
                ) &&
                check(
                  (chart.options & MUSIC_OPTIONS.HBSS) !== 0,
                  searchOption.hbss,
                ) &&
                check(
                  (chart.options & MUSIC_OPTIONS.MSS) !== 0,
                  searchOption.mss,
                ) &&
                check(!!(song.bpm.max || chart?.bpm?.max), searchOption.sofLan)
              );
            });

            if (!isCompoundMatch) return false;

            // 3. Bpm検索
            const allBpms = [
              song.bpm.min,
              song.bpm.max,
              ...Object.values(diffsOnStyle ?? {}).flatMap((d) =>
                d?.bpm ? [d.bpm.min, d.bpm.max] : [],
              ),
            ].filter((v): v is number => v != null);

            if (
              searchOption.bpm.min &&
              Math.max(...allBpms) < searchOption.bpm.min
            )
              return false;
            if (
              searchOption.bpm.max &&
              Math.min(...allBpms) > searchOption.bpm.max
            )
              return false;

            return true;
          }),
        };
      })
      .filter((version) => version.songs.length > 0);
  }, [searchOption]);

  const resultCount = useMemo(
    () => searchResult.reduce((acc, cur) => acc + cur.songs.length, 0),
    [searchResult],
  );

  return { searchResult, resultCount };
};
