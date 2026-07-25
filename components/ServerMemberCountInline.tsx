'use client'

import { useDiscordMembers } from "@/lib/hooks/useDiscordMembers";

export function ServerMemberCountInline({ slug, initialCount }: { slug: string, initialCount: number }) {
  const statsMap = useDiscordMembers(slug);
  const stats = statsMap[slug];

  if (!stats || stats.isFallback) {
    return (
      <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
        <span>100+ members</span>
        <span className="text-muted-foreground/40">•</span>
        <span className="flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          25+ online
        </span>
      </p>
    );
  }

  return (
    <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
      <span>{stats.members.toLocaleString()} members</span>
      <span className="text-muted-foreground/40">•</span>
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {stats.online.toLocaleString()} online
      </span>
    </p>
  );
}
