import clsx from "clsx";

export const FloatingResultCount = ({ count }: { count: number }) => {
  return (
    <div
      className={clsx(
        "rounded-full font-bold px-4 py-1 text-sm fixed bottom-2 right-2 md:bottom-5 md:right-5 z-100",
        count > 0
          ? "bg-zinc-100 text-zinc-800"
          : "bg-red-700 text-zinc-100 animate-bounce",
      )}
    >
      検索結果：{count}件
    </div>
  );
};
