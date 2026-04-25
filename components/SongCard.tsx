import { MUSIC_OPTIONS } from "@/data/versions/constants";
import { useSearchOption } from "@/hooks/useSearchOption";
import { Bpm, Song } from "@/types/versions";
import {
  DIFFICULTY_KEYS,
  DIFFICULTY_COLOR_MAP,
} from "@/data/versions/constants";
import clsx from "clsx";
import { memo } from "react";

type OptionFlag = {
  flag: number;
  label: keyof typeof MUSIC_OPTIONS;
};

const OPTION_FLAGS: OptionFlag[] = (
  Object.entries(MUSIC_OPTIONS) as [keyof typeof MUSIC_OPTIONS, number][]
).map(([key, value]) => ({
  flag: value,
  label: key,
}));

export const SongCard = memo(
  ({ song }: { song: Song }) => {
    const {
      searchOption: { playStyle },
    } = useSearchOption();

    const getBpmText = (bpm?: Bpm) => {
      if (!bpm) {
        return "";
      } else {
        return `${bpm.min}${bpm.max ? `-${bpm.max}` : ""}`;
      }
    };

    return (
      <div className="border border-zinc-800 rounded-md grid grid-rows-subgrid row-span-2 gap-0 overflow-hidden">
        <div className="bg-zinc-800 p-2">
          <div
            className="font-bold leading-5 mb-1 line-clamp-1"
            title={song.title}
          >
            {song.title}
          </div>
          <div
            className="text-xs line-clamp-1 text-zinc-400"
            title={song.artist}
          >
            {song.artist}
          </div>
        </div>
        <div className="grid grid-rows-[auto_1fr] gap-2 p-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined !text-sm">
                  genres
                </span>
                ジャンル
              </div>
              <div className="text-xs line-clamp-1" title={song.genre}>
                {song.genre}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined !text-sm">
                  speed
                </span>
                BPM
              </div>
              <div className="text-xs flex gap-1">
                {getBpmText(song.bpm)}
                {DIFFICULTY_KEYS.map(
                  (diff) =>
                    song.difficulty[playStyle]?.[diff]?.bpm && (
                      <div
                        key={diff}
                        className={DIFFICULTY_COLOR_MAP[diff].textLight}
                      >
                        {getBpmText(song.difficulty[playStyle]?.[diff]?.bpm)}
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {DIFFICULTY_KEYS.map((diff) => (
              <div
                key={diff}
                className={clsx(
                  DIFFICULTY_COLOR_MAP[diff].bgLight,
                  "font-bold flex flex-col justify-center items-center p-2 gap-1 rounded-sm leading-3",
                )}
              >
                {OPTION_FLAGS.filter(({ flag }) => {
                  const chart = song.difficulty[playStyle][diff];
                  return (chart?.options ?? 0) & flag;
                }).map(({ label }) => (
                  <span
                    key={label}
                    className={clsx(
                      DIFFICULTY_COLOR_MAP[diff].textDark,
                      "text-[9px] px-1 rounded-full flex bg-zinc-100 font-bold",
                    )}
                  >
                    {label}
                  </span>
                ))}
                {song.difficulty[playStyle][diff]?.level || "-"}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  (prev, next) => prev.song.title === next.song.title,
);
