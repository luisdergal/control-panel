import supabaseAxios from '@/lib/supabaseAxios';

export async function fetchRegions() {
  try {
    const { data } = await supabaseAxios.get('/Region'); 
    return data;
  } catch (error) {
    console.error('Error Fetching Regions', error);
    return [];
  }

}   