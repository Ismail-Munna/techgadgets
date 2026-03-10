import { SectionHeading } from "@/components/sections/SectionHeading";
import type { TeamMember } from "@/lib/site-content";

interface TeamSectionProps {
  members: TeamMember[];
}

export function TeamSection({ members }: TeamSectionProps) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="People"
          title="Meet the team"
          description="A small cross-functional crew handles buying, merchandising, support, and the storefront experience."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {members.map((member) => (
            <article
              key={member.name}
              className="rounded-3xl border border-gray-200 bg-gray-50 p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-700">
                {member.initials}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-indigo-600">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
