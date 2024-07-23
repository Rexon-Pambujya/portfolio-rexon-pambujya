import { useState, useEffect } from "react";
export default function useScrollProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updatedScrollCompleteion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;

      if (scrollHeight) {
        setCompletion(Number(currentProgress / scrollHeight).toFixed(2) * 100);
      }
    };

    window.addEventListener("scroll", updatedScrollCompleteion);

    return () => window.removeEventListener("scroll", updatedScrollCompleteion);
  }, []);
  return completion;
}
