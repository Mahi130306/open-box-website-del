'use client';

import { useState, useEffect } from 'react';
import { servers } from '@/lib/community-data';

export interface DiscordServerStats {
  members: number;
  online: number;
  isFallback: boolean;
}

export function useDiscordMembers(targetSlug?: string) {
  const [counts, setCounts] = useState<Record<string, DiscordServerStats>>(() => {
    const initial: Record<string, DiscordServerStats> = {};
    servers.forEach(s => {
      initial[s.slug] = {
        members: s.memberCount,
        online: Math.round(s.memberCount * 0.25), // reasonable starting estimate for online
        isFallback: true
      };
    });
    return initial;
  });

  useEffect(() => {
    let mounted = true;

    const fetchCounts = async () => {
      // Only fetch live servers that have an inviteCode
      const liveServers = servers.filter((s) => s.isLive && s.inviteCode);
      const serversToFetch = targetSlug
        ? liveServers.filter((s) => s.slug === targetSlug)
        : liveServers;

      await Promise.allSettled(
        serversToFetch.map(async (server) => {
          try {
            const res = await fetch(`/api/discord-members?code=${server.inviteCode}`);
            if (res.ok) {
              const data = await res.json();
              if (data.approximate_member_count !== undefined && mounted) {
                setCounts((prev) => ({
                  ...prev,
                  [server.slug]: {
                    members: data.approximate_member_count,
                    online: data.approximate_presence_count || 0,
                    isFallback: false
                  }
                }));
              }
            }
          } catch (error) {
            console.error(`Failed to fetch stats for ${server.slug}`, error);
          }
        })
      );
    };

    fetchCounts();
    // Poll every 160 seconds
    const interval = setInterval(fetchCounts, 160_000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [targetSlug]);

  return counts;
}
