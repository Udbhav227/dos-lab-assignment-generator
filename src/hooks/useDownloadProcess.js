import { useState } from "react";

export function useDownloadProcess() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  function startProcessing(downloadCallback) {
    setIsProcessing(true);
    setCompleted(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 25 + 10);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setCompleted(true);
            if (downloadCallback) {
              downloadCallback();
            }
          }, 350);
        }
        return next;
      });
    }, 300);
  }

  return { isProcessing, progress, completed, startProcessing };
}