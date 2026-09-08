"use client";

import { useEffect, useRef } from "react";

// Fetches an /api endpoint once on mount and feeds the resulting array into a
// page's state setter, so the live weekly data overrides the bundled static
// catalog while pages stay fully functional offline (static fallback remains).
export function useHydrate<T>(
  endpoint: string,
  pick: (json: any) => T | undefined,
  set: React.Dispatch<React.SetStateAction<T>>
) {
  const pickRef = useRef(pick);
  pickRef.current = pick;

  useEffect(() => {
    let cancelled = false;
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const picked = pickRef.current(json);
        if (!cancelled && picked !== undefined) set(picked);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, set]);
}