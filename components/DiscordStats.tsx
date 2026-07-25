'use client'

import { useDiscordMembers } from "@/lib/hooks/useDiscordMembers";
import { servers as communityServers } from "@/lib/community-data";

export function DiscordStats() {
  const statsMap = useDiscordMembers();
  
  // Dynamically adopt any live server
  const liveServers = communityServers.filter(s => s.isLive && s.inviteCode);

  return (
    <div className="flex flex-col gap-3">
      {liveServers.map(server => {
        const stats = statsMap[server.slug];
        const isFallback = !stats || stats.isFallback;
        const totalText = isFallback ? "100+ members" : `${stats.members.toLocaleString()} members`;
        const onlineText = isFallback ? "25+ online" : `${stats.online.toLocaleString()} online`;

        return (
          <div key={server.slug} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent/50 gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">{server.name}</span>
              <span className="text-xs text-muted-foreground capitalize">{server.tags[0] || 'Community'}</span>
            </div>
            <div className="flex flex-col items-end text-right shrink-0">
              <span className="text-sm font-bold text-emerald-500">
                {totalText}
              </span>
              <span className="text-xs text-emerald-500/70 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {onlineText}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
