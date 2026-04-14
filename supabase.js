import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://mcxdjisoyqdnyieboqpy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jeGRqaXNveXFkbnlpZWJvcXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MDI3NDAsImV4cCI6MjA5MDk3ODc0MH0.kIwJ1pc-GLX1lTvstLSDZ5Li1rd9vwutI4-Wz_HR6nE"
);