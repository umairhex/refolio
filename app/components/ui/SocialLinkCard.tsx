import { SoundAnchor } from "./Sound";
import { ArrowRight } from "lucide-react";
import type { SocialProfile } from "@/types";

interface SocialLinkCardProps {
  profile: SocialProfile;
}

const SocialLinkCard = ({ profile }: SocialLinkCardProps) => {
  const Icon = profile.icon;

  return (
    <SoundAnchor
      href={profile.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group border-foreground/5 hover:border-foreground flex flex-col gap-2 border-b py-4 transition-colors duration-500"
    >
      <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase opacity-40">
        <Icon size={16} />
        {profile.key}
      </span>
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium">{profile.handle}</span>
        <ArrowRight className="h-4 w-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
    </SoundAnchor>
  );
};

export default SocialLinkCard;
