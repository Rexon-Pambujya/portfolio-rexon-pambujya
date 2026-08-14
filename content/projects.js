/**
 * Projects.
 *
 * Order matters — this is the order they render in, and `featuredProjects`
 * below preserves it. AI/ML and Gen AI lead deliberately, so the first
 * thing anyone sees reflects where the work is focused.
 *
 * `featured: true` surfaces it in the homepage carousel. Everything shows
 * on /projects. Image paths point at the optimised WebP files in
 * public/work — see scripts/optimize-images.mjs if you add a new one.
 *
 * @type {import('./types').Project[]}
 */
export const projects = [
  {
    slug: "faq-chatbot-rag",
    name: "FAQ Chatbot using RAG",
    category: "ai-ml",
    description:
      "A web-based chatbot using Retrieval Augmented Generation with chat history as context, giving accurate answers to frequently asked customer questions.",
    image: "/work/10.webp",
    github: "https://github.com/Rexon-Pambujya/FAQChatBotRAG",
    tags: ["Gen AI", "RAG", "LangChain", "LLM", "Python"],
    featured: true,
  },
  {
    slug: "diabetes-prediction",
    name: "Diabetes Prediction & Classification",
    category: "ai-ml",
    description:
      "A machine learning web app built with Streamlit that predicts the onset of diabetes from diagnostic measures.",
    image: "/work/2.webp",
    github: "https://github.com/Rexon-Pambujya/Diabetes_Prediction_Streamlit",
    tags: ["Machine Learning", "Data Science", "scikit-learn", "Streamlit"],
    featured: true,
  },
  {
    slug: "osms",
    name: "Online Service Management System",
    category: "fullstack",
    description:
      "A platform for customers to get electrical equipment repaired, and for technicians to find repair jobs.",
    image: "/work/3.webp",
    github:
      "https://github.com/Rexon-Pambujya/Online_Service_Managements_System",
    tags: ["Full Stack"],
    featured: true,
  },
  {
    slug: "events-management",
    name: "Events Management",
    category: "fullstack",
    description:
      "A full-stack app showcasing CRUD operations with MongoDB and React — improved backend data handling and database interactions behind a dynamic frontend.",
    image: "/work/13.webp",
    github: "https://github.com/Rexon-Pambujya/DynamicEventsWebApp",
    tags: ["React", "MongoDB", "Express"],
    featured: true,
  },
  {
    slug: "food-ordering-fullstack",
    name: "Food Ordering Web App",
    category: "fullstack",
    description:
      "A full-stack ordering app with React on the front and Express behind it — Context API, custom hooks, useReducer and middleware for state and HTTP.",
    image: "/work/11.webp",
    github: "https://github.com/Rexon-Pambujya/foodOderingWebApp",
    tags: ["React", "Express", "Context API"],
  },
  {
    slug: "foodie-community",
    name: "Foodie Community Platform",
    category: "nextjs",
    description:
      "An engaging, interactive platform built with Next.js and React where food enthusiasts share favourite recipes, discover new dishes, and connect with other food lovers.",
    image: "/work/14.webp",
    github: "https://github.com/Rexon-Pambujya/FoodiesCommunityWebAPp",
    tags: ["Next.js", "React"],
    featured: true,
  },
  {
    slug: "place-picker",
    name: "Place Picker",
    category: "react",
    description:
      "An interactive web app for looking up place details, with autocomplete that predicts places based on the user's current location input.",
    image: "/work/4.webp",
    github: "https://github.com/Rexon-Pambujya/PlaceVisitPicker",
    tags: ["React", "Autocomplete"],
  },
  {
    slug: "project-management",
    name: "Project Management App",
    category: "react",
    description:
      "A project management application in React that lets users create and manage projects and their tasks efficiently.",
    image: "/work/5.webp",
    github: "https://github.com/Rexon-Pambujya/projectManagementApp",
    tags: ["React"],
  },
  {
    slug: "challenge-tracker",
    name: "Challenge Tracker",
    category: "react",
    description:
      "A dynamic challenge tracking application covering state management, Context API, animations and routing.",
    image: "/work/15.webp",
    github: "https://github.com/Rexon-Pambujya/DailyChallengeWebApp",
    tags: ["React", "Animation"],
  },
  {
    slug: "events-web-app",
    name: "Events Web App",
    category: "react",
    description:
      "An events app with full event management, efficient routing, intuitive form submissions and data management.",
    image: "/work/12.webp",
    github: "https://github.com/Rexon-Pambujya/eventsWebApp",
    tags: ["React", "Routing"],
  },
  {
    slug: "quiz-app",
    name: "Quiz Web App",
    category: "react",
    description:
      "A React quiz app with timed questions, immediate feedback, and a detailed performance summary at the end.",
    image: "/work/8.webp",
    github: "https://github.com/Rexon-Pambujya/ReactQuizWebapp",
    tags: ["React"],
  },
  {
    slug: "meals-delivery",
    name: "Food Delivery Web App",
    category: "react",
    description:
      "A food ordering front end — pick items, add them to a cart with quantities, and adjust the order before checkout.",
    image: "/work/9.webp",
    github: "https://github.com/Rexon-Pambujya/mealsDeliveryWebapp",
    tags: ["React", "Cart"],
  },
  {
    slug: "timer-challenge",
    name: "Timer Challenge",
    category: "react",
    description:
      "A React game where players try to stop a timer as close to a target time as they can.",
    image: "/work/7.webp",
    github: "https://github.com/Rexon-Pambujya/timerChallenge",
    tags: ["React", "Game"],
  },
  {
    slug: "investment-calculator",
    name: "Investment Calculator",
    category: "react",
    description:
      "An investment calculator where changing any input dynamically recomputes the whole results table.",
    image: "/work/6.webp",
    github: "https://github.com/Rexon-Pambujya/investmentCalculator",
    tags: ["React"],
  },
  {
    slug: "otp-login-java",
    name: "OTP Login System",
    category: "java",
    description:
      "An OTP-based login system in Java and Swing that generates a one-time password by hashing the current timestamp with SHA-256 and delivers it over Gmail SMTP.",
    image: "/work/1.webp",
    github: "https://github.com/Rexon-Pambujya/OTP-LOGIN-SYSTEM-SHA256",
    tags: ["Java", "Swing", "SHA-256", "SMTP"],
    featured: true,
  },
];

/** Filter row on /projects. Order here is the order shown. */
export const categories = [
  { id: "all", label: "All" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "fullstack", label: "Full Stack" },
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "java", label: "Java" },
];

export const featuredProjects = projects.filter((p) => p.featured);

export default projects;
