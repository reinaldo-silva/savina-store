"use client";
import { useCallback, useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const start = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stop = useCallback(() => {
    setIsLoading(false);
  }, []);

  return { isLoading, start, stop };
};
