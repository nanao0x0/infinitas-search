import { Virtuoso } from "react-virtuoso";
import { useSearchOption } from "@/hooks/useSearchOption";
import { useSearchResult } from "@/hooks/useSearchResult";
import { FloatingResultCount } from "@/components/FloatingResultCount";
import { VersionSection } from "@/components/VersionSection";

export const SearchResult = () => {
  const { searchOption } = useSearchOption();
  const { searchResult, resultCount } = useSearchResult(searchOption);

  return (
    <>
      <FloatingResultCount count={resultCount} />
      {resultCount > 0 ? (
        <Virtuoso
          useWindowScroll
          data={searchResult}
          increaseViewportBy={800}
          itemContent={(_, version) => (
            <VersionSection key={version.id} version={version} />
          )}
        />
      ) : (
        <div className="text-center">該当する楽曲がありません</div>
      )}
    </>
  );
};
