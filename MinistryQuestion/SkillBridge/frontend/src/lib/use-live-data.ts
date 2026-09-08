"use client";

import { useEffect, useState } from "react";

export interface LiveState<T> {
  data: T;
  status: "static" | "live" | "loading" | "offline";
  refresh: () => void;
}

// Hydrates a page dataset from the given /api endpoint, falling back to the
// bundled static catalog while the fetch is in flight or if it fails.
export function useLiveData<T>(endpoint: string, fallback: T): LiveState<T> {
  const [data, setData] = useState<T>(fallback);
  const [status, setStatus] = useState<LiveState<T>["status"]>("static");

  const refresh = () => {
    setStatus("loading");
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(() => setStatus("live"))
      .catch(() => setStatus("offline"));
  };

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setData(json as unknown as T);
        setStatus("live");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("offline");
      });
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  return { data, status, refresh };
}