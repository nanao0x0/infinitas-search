"use client";
import { SearchOptionWrapper } from "@/hooks/useSearchOption";
import { FloatingScrollTop } from "@/components/FloatingScrollTop";
import { SearchResult } from "@/components/SearchResult";
import { SearchForm } from "@/components/SearchForm";

export default function Home() {
  return (
    <SearchOptionWrapper>
      <main className="pt-4 pb-10 px-4 md:pb-7">
        <div className="max-w-300 mx-auto">
          <SearchForm />
          <SearchResult />
          <FloatingScrollTop />
        </div>
      </main>
    </SearchOptionWrapper>
  );
}
