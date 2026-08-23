import { LRUCache } from 'lru-cache';

const tokenCache = new LRUCache<string, number>({
  max: 1000,
  ttl: 60000, // 1 minute window
});

export async function rateLimit(request: Request, limit: number = 10): Promise<{ success: boolean }> {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'anonymous-ip';
  
  const currentUsage = (tokenCache.get(ip) || 0) + 1;
  tokenCache.set(ip, currentUsage);

  return {
    success: currentUsage <= limit,
  };
}
