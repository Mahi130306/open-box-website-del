// Blog.tsx - in-page content sections
// slug -> array of paragraphs (each string = one <p> block)

export const blogContents: Record<string, string[]> = {
  'why-we-removed-wick': [
    'On July 20, 2026, we removed Wick from the Open Box servers. Wick is a moderation bot, and we had been using it for a while. We are writing this because members deserve to know why.',
    'The short version: Wick was kicking members for having their Discord DMs disabled.',
    'We noticed something was off when legitimate members were getting flagged and punished without any rule violation. When we dug into the logs, the reason was clear. Wick was treating "DMs disabled" as a suspicious signal and actioning members for it.',
    'DMs being disabled is not suspicious. It is one of the most common privacy settings on Discord, especially for people who have been spammed or harassed before. A lot of our members, particularly students and newer Discord users, have it turned off by default. Punishing someone for a privacy setting is not moderation. It is the opposite.',
    'Beyond the DMs issue, Wick was also applying punishments to members in a way that did not match our moderation policy. Automated systems are useful, but they have to be configured carefully. In this case, the defaults were doing more harm than good.',
    'An automated moderation tool is only as good as its alignment with community values. When a bot operates as a black box, making arbitrary security assumptions that exclude well-intentioned users, it ceases to protect the community and instead begins to dismantle it. Moderation should serve to make a space feel safe and inviting, not turn it into an exclusive and restrictive club.',
    'We removed Wick the same day we caught this. Any members who were affected and want to come back can reach out at support@openboxcomm.in or appeals@openboxcomm.in. We will sort it.',
    'Moving forward, we are committing to transparent, human-first moderation. We will still utilize automation for basic spam filters and link verification, but all disciplinary actions will go through human review to ensure fair and contextual treatment for all members.',
    'Moderation tools are supposed to protect the community, not make it harder for good-faith members to stay in it. We will be more careful about what we run going forward.',
  ],
  'why-we-kept-it-free': [
    'Open Box has been free since the beginning. Not free with a catch, not free until we figure out monetisation. Free as the default, with optional support tiers for people who want to contribute.',
    'The decision was not complicated. Communities that charge for entry tend to become communities for people who can pay. We did not want that. The whole point was to build something accessible for students and early-career folks in India, and putting a paywall at the door would have killed that immediately.',
    'There is also a practical reason. When people pay to be somewhere, they expect a return on that. They come in with expectations the community might not meet yet. When people join for free, they come in curious. That is a much better starting energy.',
    'Free access cultivates a diverse and organic environment where ideas can spark without commercial pressures. When the barrier to entry is zero, the diversity of thoughts, skills, and backgrounds increases exponentially. Students, hobbyists, and industry veterans can mingle on equal footing, creating a unique peer-learning dynamic that money simply cannot buy.',
    'The supporter tiers exist because running a community has real costs. Hosting, tools, bots, the website, event overhead. NPC, Rookie, GOAT, and Legend are for people who want to chip in and get something back for it. But they are optional, and the community works without them.',
    'We have never run ads. We have never done a paid promotion. We have never let a brand pay to reach our members. That is not a stance we have to take because we have found other funding. It is just not something we want to do. The servers are for the people in them.',
    'Our commitment to privacy means we do not sell member attention or data. By maintaining complete financial independence, we make sure that our community guidelines, features, and future growth are directed solely by what benefits our members, rather than what satisfies advertisers or sponsors.',
    'Free also means we have to be selective about what we build. We cannot throw money at problems. Everything has to earn its place. That pressure has actually been good for us. It keeps the focus on what actually matters to the people here.',
    'If you want to support Open Box and get some perks in return, the tiers are at openboxcomm.in/support. If you just want to be here, that is also completely fine. You are welcome either way.',
  ],
  'what-is-dbw': [
    'Every Friday, Open Box puts out a weekly update called DBW. Day Before Weekend. It is a short rundown of what happened in the community that week and what is coming up next.',
    'It started as a simple way to keep people in the loop without making them read through every channel they missed. One post, once a week, covers the key stuff.',
    'DBW goes out in the "DBW -♾" announcements channel across the servers. It covers Added/Deleted channel(s), Added/Deleted Bot(s), events that ran, anything that shipped, and a heads-up on what is planned for the following week.',
    'Having a predictable, centralized weekly communication loop keeps everyone aligned without the fatigue of constant, scattered announcements. DBW acts as a reliable ledger of our evolution, documenting our technical progress, operational changes, and community celebrations in an easily digestible layout.',
    'The format is intentionally short. A few sections, a few lines each. If something happened that week and it matters to the community, it is in DBW. If it is not in DBW, it probably was not that important.',
    'You can follow DBW without being active every day. That is the point. It is the once-a-week read that keeps you connected to what is happening without requiring you to be online constantly.',
    'The name comes from Friday being the day before the weekend. Simple. We liked it. The infinity symbol in the channel name means it keeps going. Every week, indefinitely.',
    'If you want to catch up on what you missed, start with the latest DBW. Everything important from that week is in there.',
  ],
  'where-we-go-from-here': [
    'OpenBox started as a side project inside a college club. It is its own thing now, with its own domain, its own servers, its own community, and a website that actually works. That is further than we expected to get this fast, and we are not done.',
    'The honest answer to where we go from here is: we build what the community needs, in the order it needs it.',
    'On the product side, the next priorities are clear. The tickets.openboxcomm.in site comes first. Discord OAuth login, event registration, ticket claiming, and a dashboard where you can track everything tied to your account. That is the foundation for running proper events at scale without managing everything manually.',
    'Expanding our custom bot framework is another major focus. By developing internal open-source bots, we can replace closed-source third-party tools, bringing personalized and secure integrations to our development, gaming, and study servers.',
    'On the community side, GG is in beta and we are watching how people use it before we commit to a structure. OB Study is in alpha and still taking shape. We are not rushing either of them. The other servers are stable and we are focused on making them better rather than adding new ones just to add them.',
    'Events are something we want to do more of. We have done small things here and there but we want to run things that actually bring people together, online and eventually offline. The ticketing system is the first step toward making that real.',
    'What we are not trying to do is grow for the sake of numbers. A bigger member count that is not active is not a win. We would rather have a smaller community where people actually show up, talk, build things, and help each other out.',
    'If you have been here for a while, thank you for sticking around through the rough patches. If you just joined, you showed up at a good time.',
    'Come say hi in Junction. That is where most of the conversation happens. And if you have ideas for what you want to see, we are always listening at team@openboxcomm.in.',
  ],

  'ob-gg-gaming-server-beta': [
    'OB GG started as a fix for a real problem. OB Dev, our server for builders and developers, was not pulling people in the way we had hoped. The content was good and the community was there, but the draw was not strong enough on its own. We needed something that could bring more people into the OpenBox world.',
    'Gaming was the obvious answer. It is social by default, low-barrier to get into, and a lot of the people we wanted to reach were already gamers. So we built GG as the entry point, a place that is easy to join and easy to enjoy, with Dev and the other servers waiting for when people are ready to go deeper.',
    'GG serves as a relaxed, low-friction social space where builders and players can discover each other. Many great projects start not with a formal specification, but during a casual gaming match where like-minded creators exchange thoughts and decide to collaborate on a prototype.',
    'The server is in beta right now because we want to get the structure right before it sets. A hard launch with the wrong channels or the wrong setup means more work to undo later. Beta means we build it with the people who are actually going to use it.',
    'Right now GG has channels for general gaming chat, a few game-specific spots, and a place to share clips and finds. Bots are minimal for now. We added what was immediately useful and left the rest for after we hear what people actually want.',
    'What we are looking for during beta: which channels get used and which ones sit empty, what games need their own dedicated space, what kinds of events would actually bring people in, and what is missing that you expected to find.',
    'Access is open to everyone in the community. No application, no waitlist, no tier requirement. Just join and start using it.',
    'Drop your thoughts in the feedback channel or reach out at support@openboxcomm.in. We are reading everything.',
  ],

  'the-new-website': [
    'This website is the second version. We rebuilt it from scratch after the first one broke and made it clear that patching was not going to cut it. The new site runs on Next.js 16 with the App Router, TypeScript, and Tailwind CSS. It is deployed on Vercel, which handles builds, previews, and global delivery.',
    'The structure is cleaner now. Routing is file-based through the App Router. Styles use Tailwind CSS with shadcn/ui components and Radix UI primitives under the hood. Headings use Syne, body text uses Inter. Dark and light mode is handled by next-themes. The legal pages are all live, formatted correctly, and pointing to the right Indian legislation. The server directory shows total member counts pulled from Discord\'s public widget API.',
    'The performance improvement is significant, with near-instant page transitions, optimized layout shifts, and streamlined asset delivery. We also prioritized accessibility and clean visual layouts, adhering to our modern, solid-color design principles to ensure a seamless experience on all screens.',
    'What the site does right now is give you a clear picture of what OpenBox is, what each server is for, how to join, and what the tiers look like. That core is solid and stable.',
    'What is coming next is where it gets more interesting.',
    'We are building a separate site at tickets.openboxcomm.in for event registration and ticketing. When OpenBox runs events, you will be able to register and claim or buy tickets there. No form fills, no DMs, no manual tracking. Login will use Discord OAuth so there is nothing new to sign up for.',
    'The ticketing site will also have a dashboard where you can see all the tickets you have claimed or bought, past and upcoming. Everything tied to your Discord account in one place.',
    'None of this is live yet. But the foundation is built for it. We are not adding features on top of a broken base this time.',
    'If you want to follow along or report something, reach out at support@openboxcomm.in or hello@openboxcomm.in.',
  ],

  'the-first-website-broke': [
    'We shipped the first OpenBox website quickly and we were proud of it. It had the server directory, the join links, the rules pages. It looked the part. Then it broke, and we did not notice for longer than we should have.',
    'The failure was in the build pipeline. A package we were using had a minor version bump that changed a behavior we were relying on. We had not pinned our dependencies tightly, so the next deploy pulled the new version automatically. The build failed silently. Cloudflare Pages returned the last successful deploy for a bit, then started serving errors.',
    'Anyone clicking our links during that window hit a broken page. We had no uptime monitoring, no build status alerts, no fallback. We found out because someone in the community mentioned it in the server.',
    'When we finally dug into the issue, it was not just the package version. The build config had a path alias that only worked correctly in our local environment. The CI environment resolved it differently and failed. We had never actually tested a clean build from scratch. We had only ever deployed from our own machines where everything was already set up.',
    'Building robust continuous integration pipelines means testing all scenarios before going live. This failure taught us the invaluable lesson of environment isolation, dependency pinning, and proper build logging.',
    'Fixing it took a few hours. But by that point, we had already decided the first site had to go. The codebase had too many workarounds stacked on each other. It was faster to rebuild than to keep patching.',
    'A few things we do now that we did not do then: dependency versions are pinned and updated deliberately, every deploy runs a clean build in a controlled environment, and we have monitoring that actually alerts when something goes down.',
    'Shipping fast is the right call. Shipping without any observability is just hoping nothing breaks.',
  ],

  'how-we-started': [
    'OpenBox did not start as its own thing. It started inside a college club, as a small Discord server that a few of us were running on the side. It was meant to be a space for the club members to hang out, share resources, and talk about what they were building.',
    'For a while, that worked fine. But as the club went through its own changes, the direction we wanted to take the community stopped aligning with where things were heading. There were differences in how we thought the space should be run, who it should be for, and what it should prioritize. Nothing dramatic. Just enough to make it clear that we needed to go a different way.',
    'So we did. We took what we had learned, started fresh, and registered OpenBox as its own thing under openboxcomm.in. No club backing, no institution behind it. Just us and whoever wanted to help build it.',
    'That independence shaped everything. We made it free from the start because we did not want the community to exist only for people who could pay. We kept it builder-first because that was who we were. And we kept the structure flat and simple because we had seen what happened when communities got too bureaucratic too fast.',
    'Building a community from scratch without institutional backing is challenging, but it gives you complete creative freedom. Every channel, every event, and every rule we crafted was born from genuine conversations with early members, ensuring our platform evolved to meet real developer needs.',
    'The early days were messy. A few channels, no bots, no events, just people figuring out what this place was supposed to be. A lot of trial and error. Some things we tried did not stick. Some things we almost gave up on ended up becoming the core of how OpenBox works today.',
    'If you are here now, you are part of whatever this becomes next. That has always been the point.',
  ],

};

export function getBlogContent(slug: string): string[] | undefined {
  return blogContents[slug]
}
