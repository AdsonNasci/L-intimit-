import { useEffect, useState } from "react";
import { getCurrentSession, subscribeToAuthChanges } from "../lib/supabase";

export function useAuthSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCurrentSession()
      .then((currentSession) => mounted && setSession(currentSession))
      .catch(() => mounted && setSession(null))
      .finally(() => mounted && setLoading(false));

    const unsubscribe = subscribeToAuthChanges((nextSession) => {
      if (mounted) setSession(nextSession);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return { session, loading };
}
