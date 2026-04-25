import React, { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import allVersions from "@/data/versions/all";
import { SlidingTab } from "@/components/SlidingTab";
import clsx from "clsx";
import { useSearchOption } from "@/hooks/useSearchOption";
import { Button } from "@/components/Button";
import {
  DIFFICULTY_COLOR_MAP,
  DIFFICULTY_KEYS,
  LEVELS,
} from "@/data/versions/constants";
import { FilterFlag } from "@/types/searchOption";
import { Bpm } from "@/types/versions";

export interface ScoreOption {
  label: string;
  value: FilterFlag;
}

const SCORE_OPTIONS: ScoreOption[] = [
  { label: "有り", value: "isTrue" },
  { label: "無し", value: "isFalse" },
  { label: "未指定", value: "all" },
];

const SearchFormFilter = () => {
  const { searchOption, updateSearchOption } = useSearchOption();
  const filterRef = useRef<HTMLDetailsElement>(null);
  const [localBpm, setLocalBpm] = useState<{ min: number; max: number }>(
    searchOption.bpm,
  );

  const debouncedBpmUpdate = useMemo(
    () =>
      debounce((newBpm: { min: number; max: number }) => {
        updateSearchOption({ bpm: newBpm });
      }, 300),
    [updateSearchOption],
  );
  const filteringOptionArray = useMemo(() => {
    const result: string[] = [];
    if (searchOption.versions.length > 0) {
      const names = allVersions
        .filter((v) => searchOption.versions.includes(v.id))
        .map((v) => v.shorthand);
      result.push(
        `バージョン：${names.slice(0, 3).join(",")}${names.length > 3 ? "など" : ""}`,
      );
    }
    if (searchOption.difficulties.length > 0) {
      result.push(
        `難易度：${searchOption.difficulties.map((d) => d.toUpperCase()).join(",")}`,
      );
    }
    if (searchOption.levels.length > 0) {
      result.push(
        `レベル：${[...searchOption.levels].sort((a, b) => a - b).join(",")}`,
      );
    }

    const flags: Record<string, FilterFlag> = {
      CN: searchOption.cn,
      HCN: searchOption.hcn,
      BSS: searchOption.bss,
      HBSS: searchOption.hbss,
      MSS: searchOption.mss,
      "SOF-LAN": searchOption.sofLan,
    };

    Object.entries(flags).forEach(([label, val]) => {
      if (val !== "all") {
        result.push(`${label}：${val === "isTrue" ? "有り" : "無し"}`);
      }
    });

    if (searchOption.bpm.min || searchOption.bpm.max) {
      result.push(
        `BPM：${searchOption.bpm.min ? `${searchOption.bpm.min}以上` : ""}${searchOption.bpm.max ? `${searchOption.bpm.max}以下` : ""}`,
      );
    }

    return result;
  }, [searchOption]);
  const handleBpmChange = (type: "min" | "max", value: string) => {
    const newValue = parseInt(value, 10);
    const nextBpm = { ...localBpm, [type]: newValue };
    setLocalBpm(nextBpm);
    debouncedBpmUpdate(nextBpm);
  };
  const toggleOptionArray = (
    value: string | number,
    key: "levels" | "versions" | "difficulties",
  ) => {
    const currentArray = searchOption[key] as (string | number)[];
    let newArray: (string | number)[];
    if (currentArray.includes(value)) {
      newArray = currentArray.filter((el) => el !== value);
    } else {
      newArray = [...currentArray, value];
    }
    updateSearchOption({ [key]: newArray });
  };
  const closeFilter = () => {
    if (filterRef.current) {
      filterRef.current.open = false;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setLocalBpm(searchOption.bpm);
  }, [searchOption.bpm]);

  return (
    <details
      className="border rounded-sm border-zinc-500 overflow-hidden group"
      ref={filterRef}
    >
      <summary className="bg-zinc-800 text-zinc-100 p-3 flex flex-wrap gap-2 items-center cursor-pointer select-none [&::-webkit-details-marker]:hidden">
        <span className="material-symbols-outlined duration-300 group-open:rotate-180">
          expand_circle_down
        </span>
        <div className="font-bold">絞り込み</div>
        {filteringOptionArray.map((el) => (
          <div
            key={el}
            className="text-xs bg-zinc-600 text-zinc-100 font-bold rounded-full py-1 px-2"
          >
            {el}
          </div>
        ))}
      </summary>
      <div className="flex flex-col gap-y-5 p-5">
        <div>
          <div className="font-bold mb-2 flex items-center gap-2">
            バージョン
            <Button
              size="sm"
              onClick={() =>
                updateSearchOption({
                  versions: allVersions.map((el) => el.id),
                })
              }
            >
              全選択
            </Button>
            <Button
              size="sm"
              onClick={() => updateSearchOption({ versions: [] })}
            >
              全解除
            </Button>
          </div>
          <div className="grid grid-cols-[repeat(3,1fr)] md:grid-cols-[repeat(6,1fr)] gap-2 flex-wrap">
            {allVersions.map((el) => {
              return (
                <label
                  key={el.id}
                  htmlFor={el.id}
                  title={el.name}
                  className="border border-zinc-500 text-zinc-500 rounded-sm p-2 cursor-pointer font-bold has-checked:border-zinc-100 has-checked:bg-zinc-100 has-checked:text-zinc-950 select-none leading-5 md:py-3 hover:bg-zinc-800 flex items-center"
                >
                  <input
                    type="checkbox"
                    id={el.id}
                    className="sr-only peer"
                    checked={searchOption.versions.includes(el.id)}
                    onChange={() => toggleOptionArray(el.id, "versions")}
                  />
                  {el.shorthand}
                </label>
              );
            })}
          </div>
        </div>
        <div>
          <div className="font-bold mb-2 flex items-center gap-2">
            難易度
            <Button
              size="sm"
              onClick={() =>
                updateSearchOption({
                  difficulties: [...DIFFICULTY_KEYS],
                })
              }
            >
              全選択
            </Button>
            <Button
              size="sm"
              onClick={() => updateSearchOption({ difficulties: [] })}
            >
              全解除
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {DIFFICULTY_KEYS.map((diff) => (
              <label
                key={diff}
                className={clsx(
                  DIFFICULTY_COLOR_MAP[diff].border,
                  DIFFICULTY_COLOR_MAP[diff].textLight,
                  searchOption.difficulties.includes(diff)
                    ? DIFFICULTY_COLOR_MAP[diff].bgLight
                    : DIFFICULTY_COLOR_MAP[diff].bgDark,
                  "border block py-1 px-2 rounded-sm font-bold has-checked:text-zinc-100 cursor-pointer select-none",
                )}
              >
                {diff.toUpperCase()}
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={searchOption.difficulties.includes(diff)}
                  onChange={() => toggleOptionArray(diff, "difficulties")}
                />
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className="font-bold mb-2 flex items-center gap-2">
            レベル
            <Button
              size="sm"
              onClick={() => updateSearchOption({ levels: LEVELS })}
            >
              全選択
            </Button>
            <Button
              size="sm"
              onClick={() => updateSearchOption({ levels: [] })}
            >
              全解除
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {LEVELS.map((level) => (
              <label
                key={level}
                className="border border-zinc-500 text-zinc-500 rounded-sm w-10 h-10 flex items-center justify-center cursor-pointer font-bold has-checked:border-zinc-100 has-checked:bg-zinc-100 has-checked:text-zinc-950 select-none hover:bg-zinc-800"
              >
                {level}
                <input
                  type="checkbox"
                  className="sr-only"
                  value={level}
                  checked={searchOption.levels.includes(level)}
                  onChange={() => toggleOptionArray(level, "levels")}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div>
            <div className="font-bold mb-2 flex items-center gap-2">CN</div>
            <SlidingTab
              name="cn"
              value={searchOption.cn}
              onChange={(value) => updateSearchOption({ cn: value })}
              options={SCORE_OPTIONS}
            />
          </div>
          <div>
            <div className="font-bold mb-2 flex items-center gap-2">HCN</div>
            <SlidingTab
              name="hcn"
              value={searchOption.hcn}
              onChange={(value) => updateSearchOption({ hcn: value })}
              options={SCORE_OPTIONS}
            />
          </div>
          <div>
            <div className="font-bold mb-2 flex items-center gap-2">BSS</div>
            <SlidingTab
              name="bss"
              value={searchOption.bss}
              onChange={(value) => updateSearchOption({ bss: value })}
              options={SCORE_OPTIONS}
            />
          </div>
          <div>
            <div className="font-bold mb-2 flex items-center gap-2">HBSS</div>
            <SlidingTab
              name="hbss"
              value={searchOption.hbss}
              onChange={(value) => updateSearchOption({ hbss: value })}
              options={SCORE_OPTIONS}
            />
          </div>
          <div>
            <div className="font-bold mb-2 flex items-center gap-2">MSS</div>
            <SlidingTab
              name="mss"
              value={searchOption.mss}
              onChange={(value) => updateSearchOption({ mss: value })}
              options={SCORE_OPTIONS}
            />
          </div>
          <div>
            <div className="font-bold mb-2 flex items-center gap-2">
              SOF-LAN
            </div>
            <SlidingTab
              name="sofLan"
              value={searchOption.sofLan}
              onChange={(value) => updateSearchOption({ sofLan: value })}
              options={SCORE_OPTIONS}
            />
          </div>
        </div>
        <div>
          <div className="font-bold mb-2 flex items-center gap-2">BPM</div>
          <div className="grid grid-cols-[1fr_1fr] gap-5">
            <div>
              <span>{localBpm.min}以上</span>
              <input
                type="range"
                min={0}
                max={300}
                step={5}
                className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer"
                value={localBpm.min}
                onChange={(e) => handleBpmChange("min", e.target.value)}
              />
            </div>
            <div>
              <span>{localBpm.max}以下</span>
              <input
                type="range"
                min={0}
                max={300}
                step={5}
                className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer range range-xs"
                value={localBpm.max}
                onChange={(e) => handleBpmChange("max", e.target.value)}
              />
            </div>
          </div>
        </div>
        <Button onClick={closeFilter} className="w-42 mx-auto">
          <span className="material-symbols-outlined">collapse_all</span>
          閉じる
        </Button>
      </div>
    </details>
  );
};

export const SearchForm = () => {
  const { searchOption, updateSearchOption, resetSearchOption } =
    useSearchOption();
  const [localKeyword, setLocalKeyword] = useState<string>(
    searchOption.keyword,
  );

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        updateSearchOption({ keyword: value });
      }, 300),
    [updateSearchOption],
  );
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    setLocalKeyword(nextValue);
    debouncedUpdate(nextValue);
  };

  useEffect(() => {
    setLocalKeyword(searchOption.keyword);
  }, [searchOption.keyword]);

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-6 mb-15 md:mb-15">
      <div className="flex flex-wrap gap-4 md:grid md:grid-cols-[auto_1fr] md:gap-6">
        <div>
          <div className="font-bold mb-2">プレイスタイル</div>
          <SlidingTab
            name="playStyle"
            value={searchOption.playStyle}
            onChange={(value) => updateSearchOption({ playStyle: value })}
            options={[
              { label: "SP", value: "sp" },
              { label: "DP", value: "dp" },
            ]}
          />
        </div>
        <div className="not-sr-only md:sr-only">
          <div className="font-bold mb-2">キーワードタイプ</div>
          <SlidingTab
            name="keywordType"
            value={searchOption.keywordType}
            onChange={(value) => updateSearchOption({ keywordType: value })}
            options={[
              { label: "曲名", value: "title" },
              { label: "アーティスト", value: "artist" },
            ]}
          />
        </div>
        <div className="w-full">
          <div className="font-bold mb-2">キーワード</div>
          <div className="grid md:grid-cols-[auto_1fr] gap-2">
            <div className="sr-only md:not-sr-only">
              <SlidingTab
                name="keywordType"
                value={searchOption.keywordType}
                onChange={(value) => updateSearchOption({ keywordType: value })}
                options={[
                  { label: "曲名", value: "title" },
                  { label: "アーティスト", value: "artist" },
                ]}
              />
            </div>
            <div className="relative">
              <input
                type="text"
                className="bg-zinc-800 border border-zinc-500 py-3 md:py-[10px] px-4 block rounded-sm w-full"
                placeholder="検索キーワードを入力してください"
                value={localKeyword}
                onChange={handleKeywordChange}
                onKeyDown={handleInputKeyDown}
              />
              {searchOption.keyword && (
                <div
                  className="absolute top-[calc(50%-12px)] right-3"
                  onClick={() => updateSearchOption({ keyword: "" })}
                >
                  <span className="material-symbols-outlined">cancel</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SearchFormFilter />
      <Button onClick={resetSearchOption} className="w-42 mx-auto">
        <span className="material-symbols-outlined">reset_settings</span>
        リセット
      </Button>
    </div>
  );
};
