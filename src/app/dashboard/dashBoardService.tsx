import supabaseAxios from '@/lib/supabaseAxios';

export async function fetchTotalRegions() {

try {
    const totalRegions = await supabaseAxios.get('/Region')
    return totalRegions.data.length;
} catch (error) {
        console.error('Error Fetching Total Regions', error);
        return 0;
    }
}

export async function fetchTotalUsers() {

try {
    const totalUsers = await supabaseAxios.get('/User')
    return totalUsers.data.length;
} catch (error) {
    console.error('Error Fetching Total Users', error);
    return 0;
}

}   

export async function fetchTotalVipUsers() {
    try {
      const totalVipUsers = await supabaseAxios.get('/User', {
        params: {
          isVip: 'eq.true',
        },
      });
      return totalVipUsers.data.length;
    } catch (error) {
      console.error('Error Fetching Total VIP Users', error);
      return 0;
    }
  }

export async function fetchTotalActiveUsers() {
    try {
      const totalActiveUsers = await supabaseAxios.get('/User', {
        params: {
          isActive: 'eq.true',
        },
      });
      return totalActiveUsers.data.length;
    } catch (error) {
      console.error('Error Fetching Total Active Users', error);
      return 0;
    }   
}  

export async function fetchTotalActiveRegions() {
    try {
      const totalActiveRegions = await supabaseAxios.get('/Region', {
        params: {
          isActive: 'eq.true',
        },
      });
      return totalActiveRegions.data.length;
    } catch (error) {
      console.error('Error Fetching Total Active Regions', error);
      return 0;
    }
}
