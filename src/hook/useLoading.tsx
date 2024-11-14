"use client";
import { useCallback, useState } from "react";

export const useLoading = (startValue = false) => {
  const [isLoading, setIsLoading] = useState(startValue);

  const start = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stop = useCallback(() => {
    setIsLoading(false);
  }, []);

  return { isLoading, start, stop };
};
