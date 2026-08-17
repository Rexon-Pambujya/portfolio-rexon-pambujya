/**
 * Work history. Newest first — the list renders in array order.
 *
 * To add a job: copy the block below, put it at the top, done.
 * No component needs touching.
 *
 * @type {import('./types').Job[]}
 */
export const experience = [
  {
    company: "NeoSOFT",
    role: "Data Scientist",
    location: "Mumbai",
    start: "Jul 2025",
    end: "Jan 2026",
    url: "https://www.neosofttech.com/",
    summary:
      "Meeting-to-BRD generation platform, insurance QA fine-tuning, and chemical blend production forecasting.",
    highlights: [
      "Designed and deployed an LLM-powered pipeline turning recorded meetings into client-ready BRD documents, cutting manual documentation effort by 90% across 8+ stakeholders.",
      "Built the transcription layer end to end — extracting audio from MP4/MP3, chunking long recordings and calling Azure OpenAI Speech in parallel threads so multi-hour meetings transcribe reliably.",
      "Added a review chatbot that lets stakeholders question and refine requirements, feeding the conversation back into the generator so the BRD updates iteratively.",
      "Shipped it as Flask REST APIs behind JWT auth, with per-session artefacts across Google Cloud Storage, Firestore and Secret Manager, and automated export to Word.",
      "Fine-tuned Gemma 2 2B on 10k+ SBI General Insurance records using LoRA adapters and 4-bit quantisation, building the pipeline that turned 1,000+ policy PDFs into provenance-tracked QA pairs.",
      "Evaluated the fine-tune on BERT-F1, ROUGE, semantic similarity and faithfulness, serving it from FastAPI and Docker endpoints with adapter hot-swap.",
      "Built a time-series forecasting pipeline for SABIC's ethanol blend production datasets in RapidMiner, improving forecast reliability and reducing analysis effort.",
    ],
    stack: [
      "Python",
      "Azure OpenAI",
      "LoRA",
      "PyTorch",
      "Flask",
      "FastAPI",
      "Google Cloud",
      "RapidMiner",
      "Docker",
      "Jenkins",
    ],
  },
  {
    company: "Blitzar Tech Pvt Ltd.",
    role: "Associate Software Engineer",
    location: "Mumbai",
    start: "Feb 2024",
    // FIXME(rexon): placeholder end date. This said "Present", which can't
    // be right now NeoSOFT above it ran Jul 2025 - Jan 2026. Set the real
    // month you left and delete this note.
    end: "Jun 2025",
    url: "",
    summary:
      "Modernised the salary processing system for BMC schools, replacing manual file-based processes with an online system.",
    highlights: [
      "Built backend services using Python, integrating REST APIs for seamless data processing.",
      "Developed several frontend modules using React.js, Next.js, HTML and CSS to enhance navigation and user experience.",
      "Significantly improved efficiency and accuracy in salary disbursement for BMC schools.",
    ],
    stack: ["Python", "REST APIs", "React", "Next.js", "HTML", "CSS"],
  },
  {
    company: "XEMI",
    role: "Software Engineering Intern",
    location: "Mumbai",
    start: "Oct 2023",
    end: "Jan 2024",
    url: "https://www.xemi.io/",
    summary: "HSN Recommender System and EwayBill Module.",
    highlights: [
      "Prepared training data for the machine learning model by annotating essential attributes across 250+ documents, then fine-tuned OpenAI's GPT-3.5 on the HSN dataset.",
      "Trained a model on HSN documents using the LangChain framework, improving HSN code prediction accuracy and streamlining code assignment.",
      "Created an EwayBill module in HTML, CSS and Angular to automate filling out E-waybill forms, reducing manual workload.",
    ],
    stack: ["OpenAI GPT-3.5", "LangChain", "Angular", "HTML", "CSS"],
  },
  {
    company: "Cere Labs",
    role: "Data Science Intern",
    location: "Mumbai",
    start: "Jul 2022",
    end: "Jul 2023",
    url: "https://www.cerelabs.com/",
    summary: "Clustering of Indian addresses to derive business insights.",
    highlights: [
      "Analysed and processed Indian address data, transformed it into a structured format, assigned precise geo-coordinates and clustered locations.",
      "Demonstrated that clustering geographic coordinates could meaningfully reduce transportation costs and improve delivery times.",
    ],
    stack: ["Python", "Clustering", "Geospatial Data"],
  },
];

export default experience;
