import clsx from "clsx";
import { throttle } from "lodash";
import { useEffect, useState } from "react";

const DISPLAY_THRESHOLD = 500;

export const FloatingScrollTop = () => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleWindowScroll = throttle(() => {
      setIsDisplay(window.scrollY > DISPLAY_THRESHOLD);
    });
    window.addEventListener("scroll", handleWindowScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollTop}
      aria-label="ページトップへ戻る"
      className={clsx(
        "leading-none cursor-pointer bg-zinc-100 w-10 aspect-square rounded-full hover:opacity-70 fixed bottom-12 right-2 md:bottom-15 md:right-5 leading-none flex justify-center items-center duration-200",
        !isDisplay && "opacity-0 invisible",
      )}
    >
      <span className="material-symbols-outlined !text-[2.4rem] text-zinc-800">
        keyboard_arrow_up
      </span>
    </button>
  );
};
