import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ObjectValues 类型工具在 JS 文件中不生效，如需类型请放到 .d.ts 或 .ts 文件中
