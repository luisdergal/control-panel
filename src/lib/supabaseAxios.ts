import axios from 'axios';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseAxios = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    apiKey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`, 
  },
});

export default supabaseAxios;