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
      className="group border-foreground/5 hover:border-foreground/20 flex flex-col gap-3 border-b py-6 transition-all duration-500 hover:-translate-y-1"
    >
      <span className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase opacity-30 transition-opacity group-hover:opacity-60">
        <Icon size={14} className="transition-transform duration-500 group-hover:rotate-12" />
        {profile.key}
      </span>
      <div className="flex items-center justify-between">
        <span className="text-base font-medium tracking-tight md:text-lg">{profile.handle}</span>
        <div className="bg-foreground/5 flex h-10 w-10 items-center justify-center rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100">
          <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
        </div>
      </div>
    </SoundAnchor>
  );
};

export default SocialLinkCard;
