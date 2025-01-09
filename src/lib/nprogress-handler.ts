import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { startProgress, stopProgress } from "@/lib/nprogress-config";

export const ProgressHandler = () => {
  const location = useLocation();

  useEffect(() => {
    startProgress();
    stopProgress();

    return () => stopProgress();
  }, [location]);

  return null;
};
