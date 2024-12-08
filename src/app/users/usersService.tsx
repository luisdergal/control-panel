import dayjs from 'dayjs';
import supabaseAxios from '@/lib/supabaseAxios';

export async function fetchUsers() {
  try {
    const { data } = await supabaseAxios.get('/User'); 
    return data;
  } catch (error) {
    console.error('Error Fetching Users', error);
    return [];
  }
}

export async function addUser(name: string, email: string) {
  try {
    const currentTime = dayjs().toISOString(); 
    const { data } = await supabaseAxios.post('/User', {
      name,
      email,
      updatedAt: currentTime, 
    });
    return data;
  } catch (error) {
    console.error('Error adding user', error);
    return null;
  }
}