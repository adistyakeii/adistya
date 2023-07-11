import { useEffect, useState } from "react";

export default function useScrollPos(): number {
  const [scrollPos, setScrollPos] = useState<number>(0);

  useEffect(function () {
    if (typeof window === "undefined") return;

    function updatePosition() {
      setScrollPos(window.scrollY);
    }

    window.addEventListener("scroll", updatePosition);
    return function () {
      return window.removeEventListener("scroll", updatePosition);
    };
  });

  return scrollPos;
}
