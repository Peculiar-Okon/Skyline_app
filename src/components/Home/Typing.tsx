import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed = 60) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;

      if (i > text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}

export function Cursor() {
  return (
    <span className="inline-block w-[2px] h-6 bg-emerald-400 ml-1 animate-pulse align-middle" />
  );
}