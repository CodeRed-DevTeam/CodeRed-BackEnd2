import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = 'https://gcfevddvevmfyolqafjy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjZmV2ZGR2ZXZtZnlvbHFhZmp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1NjIyODAsImV4cCI6MjA0NzEzODI4MH0.PjfUsOSVa15ItpgQJVp-A87LD1ugOwW8XD7zMznkRjE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    