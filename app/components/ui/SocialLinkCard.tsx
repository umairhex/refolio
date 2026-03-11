"use client";

import { ArrowRight } from "lucide-react";
import type { SocialProfile } from "@/types";

interface SocialLinkCardProps {
  profile: SocialProfile;
  onClick?: () => void;
}

const SocialLinkCard = ({ profile, onClick }: SocialLinkCardProps) => {
  const Icon = profile.icon;

  return (
    <a
      href={profile.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="group flex flex-col gap-2 py-4 border-b border-foreground/5 hover:border-foreground transition-colors duration-500"
    >
      <span className="text-xs opacity-40 uppercase font-bold tracking-widest flex items-center gap-2">
        <Icon size={16} />
        {profile.key}
      </span>
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium">{profile.handle}</span>
        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </a>
  );
};

export default SocialLinkCard;
