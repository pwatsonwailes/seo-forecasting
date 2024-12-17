import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uxetofnkdwjkjoqmyejt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4ZXRvZm5rZHdqa2pvcW15ZWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NTM1MDMsImV4cCI6MjA1MDAyOTUwM30.dFljP5YSVZq7R2VeclYoif5o_H8YjphDcMshh99HI-Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);