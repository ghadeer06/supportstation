console.log("supabase.js LOADED");

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://mcxdjisoyqdnyieboqpy.supabase.co",   // رابط مشروعك
  "sb-publishable-key"                          // مفتاحك الصحيح
);

console.log("supabase.js loaded");
