import { VersionData } from "@/types/versions";
import { SongCard } from "./SongCard";

export const VersionSection = ({ version }: { version: VersionData }) => {
  return (
    <section>
      <h2 className="text-sm pl-2 border-l-4 mb-5 font-bold leading-none">
        {version.name}
      </h2>
      <div className="grid md:grid-cols-[repeat(4,1fr)] gap-3 pb-15">
        {version.songs.map((song) => (
          <SongCard key={song.title} song={song} />
        ))}
      </div>
    </section>
  );
};
