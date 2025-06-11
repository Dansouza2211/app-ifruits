import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://puanebabsnbvfzinaqal.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1YW5lYmFic25idmZ6aW5hcWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNTU0MjksImV4cCI6MjA2NDgzMTQyOX0.bPOi24VwqmufF4xh9tQmmgd3-X_nNLllqRMFVhHZIBM";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Anon Key in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
        