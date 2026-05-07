import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const ICON_LIST: string[] = [
  "keyboard_arrow_up",
  "description",
  "cancel",
  "speed",
  "genres",
  "collapse_all",
  "expand_circle_down",
  "search",
  "reset_settings",
].sort();

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  fallback: ["Hiragino Sans", "Hiragino Kaku Gothic ProN", "sans-serif"],
});

export const metadata: Metadata = {
  title: "beatmania IIDX INFINITAS 楽曲検索",
  description: "「beatmania IIDX INFINITAS」の楽曲検索システム（非公式）",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJp.className} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,1,0&icon_names=${ICON_LIST}`}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <header className="bg-zinc-900 p-3 md:px-5 flex justify-between items-center">
          <h1 className="font-bold md:text-lg">
            beatmania IIDX INFINITAS 楽曲検索
          </h1>
          <div className="flex gap-4">
            <button
              popoverTarget="description"
              className="text-zinc-500 cursor-pointer duration-200 leading-none hover:text-zinc-100 [anchor-name:--description]"
            >
              <span className="material-symbols-outlined">description</span>
            </button>
            <div
              popover="auto"
              id="description"
              className="rounded-sm bg-zinc-100 p-2 absolute -right-3 [position-anchor:--description] [position-area:block-end_inline-start] w-50"
            >
              <div className="text-xs font-bold">最終更新日：2026/05/08</div>
              <div className="text-[10px] mt-2 text-zinc-800">
                このサイトは個人が運営する非公式サイトです。情報は最新でない場合があるため正確な情報はゲーム内をご確認ください。情報の修正やバグ報告はGitHubまでお願いします。
              </div>
            </div>
            <Link
              href="https://github.com/nanao0x0/infinitas-search"
              target="_blank"
              title="GitHub"
              className="fill-zinc-500 hover:fill-zinc-100 duration-200 leading-none"
            >
              <svg
                width="98"
                height="96"
                viewBox="0 0 98 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-auto fill-inherit"
              >
                <g clipPath="url(#clip0_730_27136)">
                  <path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z" />
                </g>
                <defs>
                  <clipPath id="clip0_730_27136">
                    <rect width="98" height="96" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
