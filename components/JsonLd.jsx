import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { socials } from "@/content/socials";
import { experience } from "@/content/experience";
import { skillGroups } from "@/content/skills";

/**
 * Person schema, so search engines can attribute the work rather than
 * guessing from page copy. `sameAs` is what links this page to the
 * GitHub/LinkedIn identities as one entity.
 *
 * Everything is derived from /content — nothing to keep in sync by hand.
 */
export default function JsonLd() {
  const current = experience.find((job) => job.current) ?? experience[0];

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: site.url,
    image: new URL(profile.avatar, site.url).toString(),
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.split(",")[0]?.trim(),
      addressCountry: "IN",
    },
    sameAs: socials.map((s) => s.href),
    knowsAbout: skillGroups.flatMap((g) => g.items.map((i) => i.name)),
    ...(current?.company
      ? { worksFor: { "@type": "Organization", name: current.company } }
      : {}),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "St. Francis Institute of Technology",
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapes the content; the `<` guard stops a stray
      // closing tag in any field from breaking out of the script block.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
