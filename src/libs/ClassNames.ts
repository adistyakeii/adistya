import { twMerge } from "tailwind-merge";

export default function classNames(...classes: string[]) {
  return twMerge(...classes);
}
