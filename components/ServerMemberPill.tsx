'use client'

import { Users } from 'lucide-react'
import { useDiscordMembers } from "@/lib/hooks/useDiscordMembers";

interface ServerMemberPillProps {
  slug: string;
  initialCount: number;
}

export function ServerMemberPill({ slug, initialCount }: ServerMemberPillProps) {
  const statsMap = useDiscordMembers(slug);
  const stats = statsMap[slug];

  if (!stats || stats.isFallback) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-surface px-6 py-4 text-center shadow-lg gap-1 min-w-[120px]">
        <Users className="mb-1 h-5 w-5 text-muted-foreground" />
        <p className="text-2xl font-bold">100+</p>
        <p className="text-xs text-muted-foreground">members</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-surface px-6 py-4 text-center shadow-lg gap-1 min-w-[130px]">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <p className="text-xs font-semibold text-emerald-500">{stats.online.toLocaleString()} online</p>
      </div>
      <p className="text-2xl font-bold">{stats.members.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground font-medium">total members</p>
    </div>
  );
}
