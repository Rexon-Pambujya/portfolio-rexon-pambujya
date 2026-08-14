/**
 * Skills, grouped and ordered for a recruiter skimming top-down.
 *
 * Order is deliberate:
 *   1. Languages    — three items, read in a second, and "Python" is the
 *                     single keyword most AI/ML filters search on.
 *   2. Generative AI — the differentiator, so it lands before anything
 *                     generic. This is the group that should be biggest.
 *   3. ML & Data Science
 *   4. Backend & delivery — proof the models actually ship.
 *   5. Foundations  — supporting, not headline.
 *
 * Everything technical is listed rather than curated down, because ATS
 * keyword matching is literal and each entry costs one small chip.
 *
 * `icon` is looked up in components/skills/iconMap.js. Anything without a
 * match renders as a text chip — a supported outcome, not a bug, so you
 * can add a skill without touching that file.
 *
 * @type {import('./types').SkillGroup[]}
 */
export const skillGroups = [
  {
    title: "Languages & Data",
    items: [
      { name: "Python", icon: "python" },
      { name: "SQL", icon: "sql" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
  {
    title: "Generative AI & Agents",
    items: [
      { name: "LangChain", icon: "langchain" },
      { name: "LangGraph", icon: "langgraph" },
      { name: "LangSmith", icon: "langsmith" },
      { name: "OpenAI APIs", icon: "openai" },
      { name: "RAG Pipelines", icon: "rag" },
      { name: "AI Agents", icon: "agents" },
      { name: "Tool Calling", icon: "tools" },
      { name: "Prompt Engineering", icon: "prompt" },
      { name: "Embeddings", icon: "embeddings" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "n8n", icon: "n8n" },
    ],
  },
  {
    title: "Machine Learning & Data Science",
    items: [
      { name: "PyTorch", icon: "pytorch" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "Keras", icon: "keras" },
      { name: "scikit-learn", icon: "scikitlearn" },
      { name: "NumPy", icon: "numpy" },
      { name: "Pandas", icon: "pandas" },
      { name: "PySpark", icon: "spark" },
      { name: "Predictive Modelling", icon: "modelling" },
      { name: "Forecasting", icon: "forecasting" },
      { name: "Clustering", icon: "clustering" },
      { name: "RapidMiner", icon: "rapidminer" },
    ],
  },
  {
    title: "Backend, Cloud & Delivery",
    items: [
      { name: "Flask", icon: "flask" },
      { name: "Django", icon: "django" },
      { name: "Streamlit", icon: "streamlit" },
      { name: "Docker", icon: "docker" },
      { name: "AWS (EC2, S3)", icon: "aws" },
      { name: "CI/CD", icon: "cicd" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Selenium", icon: "selenium" },
    ],
  },
  {
    // Sits after the AI groups so the focus stays clear, but it's here
    // because the projects below are largely React — Skills claiming pure
    // AI/ML while the work shows frontend reads as a gap.
    title: "Web & Frontend",
    items: [
      { name: "JavaScript", icon: "javascript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Angular", icon: "angular" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Material UI", icon: "materialui" },
      { name: "WordPress", icon: "wordpress" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { name: "Data Structures", icon: "datastructures" },
      { name: "Mathematics & Statistics", icon: "maths" },
      { name: "Data Modelling", icon: "datamodelling" },
      { name: "End-to-End Data Pipelines", icon: "pipelines" },
      { name: "AI Workflows", icon: "aiworkflows" },
      { name: "Automation", icon: "automation" },
      { name: "Observability", icon: "observability" },
      { name: "Agile", icon: "agile" },
    ],
  },
];

/** Rendered as plain chips — no icons. */
export const softSkills = [
  "Problem-Solving",
  "Communication",
  "Teamwork",
  "Leadership",
  "Project Management",
  "Attention to Detail",
];

export default skillGroups;
