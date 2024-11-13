import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = 'https://fbqujatqoyhwtktitqso.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicXVqYXRxb3lod3RrdGl0cXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MTU5NjUsImV4cCI6MjA0NzA5MTk2NX0.77fnT5uJOPIAwsHf6SsHaQYWeNhAGBrBx_LQG4pYny4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
