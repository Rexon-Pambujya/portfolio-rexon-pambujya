/**
 * Who you are. Edit freely — every component reads from here.
 *
 * Bio paragraphs support **bold** the same way markdown does.
 * (The old site used Unicode bold characters like 𝗣𝘆𝘁𝗵𝗼𝗻, which screen
 * readers pronounce as gibberish and search engines cannot index.)
 */

export const profile = {
  name: "Rexon Pambujya",
  firstName: "Rexon",
  role: "Software Engineer",
  location: "Mumbai, India",

  /** Drives the "years of experience" stat so it never goes stale. */
  careerStartISO: "2022-07-01",

  /**
   * Set a number here to state your years of experience explicitly and
   * ignore careerStartISO. Useful when you'd rather count from your first
   * full-time role than your first internship.
   * Leave as null to go back to computing it from the date above.
   */
  yearsOverride: 3,

  email: "rexonpambujya2001@gmail.com",
  /** Leave "" to hide the phone row on /contact entirely. */
  phone: "",

  resume: "/RexonPambujya_Resume.pdf",
  avatar: "/hero/dev.webp",

  /** Hero copy. Keep the headline short — it sits over the ocean. */
  kicker: "Software Engineer · Mumbai",
  headline: "Rexon Pambujya",
  tagline:
    "I build AI systems and web applications that hold up in production.",

  bio: [
    "A passionate **Software Engineer** based in Mumbai with strong skills in **Python**, **Data Science**, **Machine Learning** and **Web Development**.",
    "With hands-on experience at **Blitzar Tech**, **XEMI**, and **Cere Labs**, I've delivered real-world impact — fine-tuning AI models to improve prediction accuracy, building intelligent chatbots that cut customer response time, and streamlining web applications for faster deployments.",
    "I love blending technology and innovation to solve business problems, whether that's creating machine learning models, automating processes, or enhancing user experiences.",
  ],

  /** Shown on /about. `Passion fuels Purpose!` was the old heading. */
  aboutHeading: "Passion fuels Purpose",
};

/**
 * Years of experience: the explicit override if set, otherwise whole
 * years since careerStartISO, recomputed on every render.
 */
export function yearsOfExperience(now = new Date()) {
  if (typeof profile.yearsOverride === "number") return profile.yearsOverride;

  const start = new Date(profile.careerStartISO);
  let years = now.getFullYear() - start.getFullYear();
  const monthDelta = now.getMonth() - start.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && now.getDate() < start.getDate())) {
    years -= 1;
  }
  return Math.max(0, years);
}

export default profile;
