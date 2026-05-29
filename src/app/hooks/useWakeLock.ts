"use client";

import { useEffect, useRef, useState } from "react";

export function useWakeLock(enabled: boolean) {
  const wakeLockRef = useRef<any>(null);

  const [isSupported, setIsSupported] = useState(false);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsSupported("wakeLock" in navigator);
  }, []);

  useEffect(() => {
    if (!enabled) {
      releaseWakeLock();
      return;
    }

    requestWakeLock();

    return () => {
      releaseWakeLock();
    };
  }, [enabled]);

  // Re-activar al volver a la pestaña
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (enabled && document.visibilityState === "visible") {
        await requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled]);

  const requestWakeLock = async () => {
    try {
      if (!("wakeLock" in navigator)) return;

      wakeLockRef.current = await navigator.wakeLock.request("screen");

      setIsActive(true);

      wakeLockRef.current.addEventListener("release", () => {
        setIsActive(false);
      });

      console.log("Wake Lock activado");
    } catch (err) {
      console.error("Error activando Wake Lock:", err);
    }
  };

  const releaseWakeLock = async () => {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();

        wakeLockRef.current = null;

        setIsActive(false);

        console.log("Wake Lock liberado");
      }
    } catch (err) {
      console.error("Error liberando Wake Lock:", err);
    }
  };

  return {
    isSupported,
    isActive,
  };
}
