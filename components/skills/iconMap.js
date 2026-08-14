import { FaCss3, FaHtml5, FaJava, FaPython, FaReact } from "react-icons/fa";
import {
  SiAmazonaws,
  SiAngular,
  SiApachespark,
  SiDjango,
  SiDocker,
  SiFlask,
  SiGit,
  SiGithub,
  SiJavascript,
  SiKeras,
  SiMui,
  SiMysql,
  SiNextdotjs,
  SiNumpy,
  SiOpenai,
  SiPandas,
  SiPytorch,
  SiScikitlearn,
  SiSelenium,
  SiStreamlit,
  SiTailwindcss,
  SiTensorflow,
  SiWordpress,
} from "react-icons/si";
import {
  Activity,
  Binary,
  Blocks,
  Bot,
  Boxes,
  Database,
  FileSearch,
  Gauge,
  GitBranch,
  Layers,
  LineChart,
  Link2,
  Network,
  RefreshCw,
  ScatterChart,
  Share2,
  Sigma,
  Smile,
  Terminal,
  TrendingUp,
  Waypoints,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";

/**
 * Maps the `icon` key in content/skills.js to a component.
 *
 * Brand marks come from react-icons. Everything else — LangChain, RAG,
 * prompt engineering, the Foundations group — has no brand icon and never
 * will, so those use a lucide glyph chosen to suggest the concept: a chain
 * link for LangChain, a graph for LangGraph, a bot for agents, a wrench
 * for tool calling.
 *
 * A skill with no entry still renders, just without a glyph. Only add a
 * key here if the export genuinely exists — a missing named import from
 * react-icons or lucide is a build error, not a silent no-op.
 */
export const skillIcons = {
  // languages & data
  python: FaPython,
  sql: Database,
  mysql: SiMysql,
  javascript: SiJavascript,
  java: FaJava,

  // generative AI & agents
  langchain: Link2,
  langgraph: Share2,
  langsmith: Gauge,
  openai: SiOpenai,
  rag: FileSearch,
  agents: Bot,
  tools: Wrench,
  prompt: Terminal,
  embeddings: Boxes,
  huggingface: Smile,
  n8n: Waypoints,

  // ML & data science
  pytorch: SiPytorch,
  tensorflow: SiTensorflow,
  keras: SiKeras,
  scikitlearn: SiScikitlearn,
  numpy: SiNumpy,
  pandas: SiPandas,
  spark: SiApachespark,
  modelling: TrendingUp,
  forecasting: LineChart,
  clustering: ScatterChart,
  rapidminer: Blocks,

  // backend, cloud & delivery
  flask: SiFlask,
  django: SiDjango,
  streamlit: SiStreamlit,
  docker: SiDocker,
  aws: SiAmazonaws,
  cicd: GitBranch,
  git: SiGit,
  github: SiGithub,
  selenium: SiSelenium,

  // foundations
  datastructures: Binary,
  maths: Sigma,
  datamodelling: Network,
  pipelines: Layers,
  aiworkflows: Workflow,
  automation: Zap,
  observability: Activity,
  agile: RefreshCw,

  // web & frontend
  react: FaReact,
  nextjs: SiNextdotjs,
  angular: SiAngular,
  tailwind: SiTailwindcss,
  materialui: SiMui,
  html5: FaHtml5,
  css3: FaCss3,
  wordpress: SiWordpress,
};

export default skillIcons;
