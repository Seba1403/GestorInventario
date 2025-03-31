import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sekdbuyfagmxznohzuhp.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNla2RidXlmYWdteHpub2h6dWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzc1MDMsImV4cCI6MjA1Mzc1MzUwM30.RgFUU0mtYFFm-TBY0hEC_NZ90JaksL9u-xja3C6JXCE'

export const supabase = createClient(supabaseUrl, supabaseKey)
