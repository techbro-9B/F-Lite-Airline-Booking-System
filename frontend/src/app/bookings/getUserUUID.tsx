"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useUserId(onResolved?: (userId: string | null) => void) {
  const [userId, setUserId] = useState<string | null>(null);

  const updateUserId = (id: string | null) => {
    setUserId(id);
    onResolved?.(id);
  };

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      updateUserId(data.session?.user.id ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => updateUserId(session?.user.id ?? null)
    );

    return () => subscription.unsubscribe();
  }, []);

  return { userId };
}