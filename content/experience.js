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
    company: "Blitzar Tech Pvt Ltd.",
    role: "Associate Software Engineer",
    location: "Mumbai",
    start: "Feb 2024",
    end: "Present",
    current: true,
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
