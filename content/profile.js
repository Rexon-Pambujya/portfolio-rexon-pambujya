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
  /**
   * Load-bearing: this string is the page title, the OG card, the footer
   * and the JSON-LD jobTitle. It's the phrase recruiters and search
   * engines match on, so it names the target role rather than the last
   * job title.
   */
  role: "AI/ML Engineer",
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
  kicker: "AI/ML Engineer · Mumbai",
  headline: "Rexon Pambujya",
  // "ML models" first on purpose: without it the hero reads as GenAI-only,
  // which undersells the ML Engineer and Data Scientist side.
  tagline:
    "I build ML models, LLM applications, RAG systems and agentic workflows that hold up in production.",

  bio: [
    "**AI/ML Engineer** with 3+ years building **machine learning models**, **GenAI applications**, **RAG systems** and **agentic AI workflows** most recently as a **Data Scientist** at NeoSOFT.",
    "My work spans **LLM applications**, **RAG** and semantic search, **AI agents** built with **LangGraph** and **LangChain**, fine-tuning and evaluation of domain-specific models, and **predictive modelling** and forecasting. Mostly **Python**, **FastAPI**, **SQL** and vector databases.",
    "Recently that has meant an LLM pipeline turning meeting recordings into client-ready requirement documents, cutting manual documentation effort by **90%**, and fine-tuning **Gemma 2** on insurance data with **LoRA** and 4-bit quantisation. Earlier work covers GPT fine-tuning for HSN classification, logistics route optimisation that cut transport costs **28%**, and stroke risk prediction.",
    "The part I care most about is the one most ML work skips getting the model behind an API, in a container, with evaluation you can actually trust.",
  ],

  /** Section heading on the homepage. */
  aboutHeading: "From prototype to production",
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
