import { useState, useRef, useEffect } from "react";

interface Option<T> {
  label: string;
  value: T;
}

interface SlidingTabProps<T> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  name: string;
}

export const SlidingTab = <T extends string>({
  options,
  value,
  onChange,
  name,
}: SlidingTabProps<T>) => {
  const [bgStyle, setBgStyle] = useState<{ width: number; left: number }>({
    width: 0,
    left: 0,
  });

  const labelRefs = useRef<Record<string, HTMLLabelElement | null>>({});

  useEffect(() => {
    // valueを文字列として評価してアクセス
    const activeLabel = labelRefs.current[value as string];
    if (activeLabel) {
      setBgStyle({
        width: activeLabel.offsetWidth,
        left: activeLabel.offsetLeft,
      });
    }
  }, [value, options]);

  return (
    <div className="relative flex w-fit rounded-sm bg-zinc-800 border border-zinc-500 p-1">
      <span
        className="absolute top-1 h-[calc(100%-0.5rem)] rounded-sm bg-zinc-100 transition-all duration-300 ease-out"
        style={{
          width: `${bgStyle.width}px`,
          transform: `translateX(${bgStyle.left - 4}px)`,
        }}
      />
      {options.map((opt) => (
        <label
          key={opt.value}
          ref={(el) => {
            labelRefs.current[opt.value as string] = el;
          }}
          className="relative z-10 cursor-pointer px-4 py-2 transition-colors duration-200"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <span
            className={`
              ${value === opt.value ? "text-zinc-900" : "text-zinc-300 hover:text-white"} 
              font-bold whitespace-nowrap text-sm flex items-center select-none
            `}
          >
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
};
