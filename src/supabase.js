import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://vtsqmlibroyhtzcwbpdq.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0c3FtbGlicm95aHR6Y3dicGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNDQ3NzcsImV4cCI6MjA5MjcyMDc3N30.fGajOcZdXntaDcbb4Lpc34zBhGHN9TDbK620v643lRo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)