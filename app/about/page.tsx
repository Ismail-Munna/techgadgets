import type { Metadata } from "next";
import { AboutIntroductionSection } from "@/components/sections/AboutIntroductionSection";
import { MissionVisionSection } from "@/components/sections/MissionVisionSection";
import { TeamSection } from "@/components/sections/TeamSection";
import {
  companyHighlights,
  missionAndVision,
  teamMembers,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About | TechGadgets",
  description: "Learn how TechGadgets curates modern tech for work, play, and home.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <AboutIntroductionSection highlights={companyHighlights} />
      <MissionVisionSection items={missionAndVision} />
      <TeamSection members={teamMembers} />
    </div>
  );
}
