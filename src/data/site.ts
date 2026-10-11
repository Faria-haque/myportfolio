// All personal content lives here.
// Keep the jokes in labels; keep project descriptions straight and professional.

export const site = {
  // While true, the site shows only the name and `minimalLine`; everything else is hidden.
  // Set to false to bring back the full portfolio.
  minimal: true,
  minimalLine: "talent not found...xD",
  name: "Faria Haque Marvi",
  role: "UI/UX Designer & Software Engineer",
  positioning:
    "Computer science graduate and UI/UX designer, ready to design and build software that people find easy to use.",
  wink: "Turns out the talent was just loading.",
  location: "Sudbury, Ontario",
  email: "haquefaria404@gmail.com",
  // Optional: a form endpoint (Formspree, Basin, your own API) that accepts POST FormData.
  // Leave empty to fall back to opening the visitor's mail client.
  formEndpoint: "",
  // Add GitHub / LinkedIn links here; the footer shows email when this is empty.
  socials: [] as { label: string; href: string }[],
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  tags: string[];
  award?: string;
  link?: string;
  challenge: string;
  approach: string[];
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "uiu-metaverse",
    title: "UIU Metaverse",
    year: "2023",
    role: "Design & development",
    award: "3rd place, UIU CSE Project Show 2023",
    summary:
      "A collaborative online platform where students get academic guidance from seniors and find course materials in one place.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    challenge:
      "Students at United International University had no shared place to ask seniors for academic advice, and course materials were scattered and hard to find.",
    approach: [
      "Built a collaborative platform that connects students with seniors for academic guidance, fostering a supportive learning community.",
      "Designed an intuitive system for organizing and accessing course materials, so resources are easy to find when students need them.",
      "Implemented the platform with HTML, CSS and JavaScript on the front end, and PHP with a MySQL database on the back end.",
    ],
    outcome: "Secured 3rd place at the UIU CSE Project Show 2023.",
  },
  {
    slug: "gan-sequence-generation",
    title: "Synthetic Biological Sequences with GANs",
    year: "Research",
    role: "Machine learning research",
    summary:
      "Research into generating artificial samples of protein–carbohydrate interactions using generative adversarial networks.",
    tags: ["Python", "PyTorch", "Google Colab", "GANs"],
    challenge:
      "Studying how proteins and carbohydrates interact needs data, and real samples are limited. The question: can a generative model produce realistic synthetic samples of these interactions?",
    approach: [
      "Researched the interactions between proteins and carbohydrates to understand the data being modelled.",
      "Implemented and compared several GAN architectures, including vanilla GAN, DCGAN and WGAN.",
      "Built and trained the models in Python with PyTorch on Google Colab.",
    ],
    outcome:
      "Produced artificial samples from protein–carbohydrate interaction data and compared how different GAN architectures performed on the task.",
  },
  {
    slug: "sign-language-recognition",
    title: "Bangladeshi Sign Language Recognition",
    year: "2019",
    role: "Team project",
    award: "1st place, UIU CSE Project Show 2019",
    summary:
      "A system that recognizes Bangladeshi Sign Language hand gestures and shows their meaning as text on an LCD screen.",
    tags: ["Gesture recognition", "Hardware", "LCD display"],
    challenge:
      "People who communicate in Bangladeshi Sign Language are often not understood by those who don't know it. The goal was a device that could translate gestures into readable text.",
    approach: [
      "Developed a system to recognize different hand gestures of Bangladeshi Sign Language.",
      "Mapped each recognized gesture to its interpretation as a text message.",
      "Displayed the interpreted message on an LCD screen so anyone can read it.",
    ],
    outcome: "Secured 1st place at the UIU CSE Project Show 2019.",
  },
];

export const changelog = [
  {
    version: "v3.0",
    date: "11/2025 – 12/2025",
    title: "Current version, stable release",
    notes: [
      "Advisor, Sport Chek · Sudbury, Ontario (12/2025)",
      "Sales Associate (Seasonal), Bikini Village · Sudbury, Ontario (11/2025)",
      "Open to software engineering and UI/UX roles.",
    ],
  },
  {
    version: "v2.1",
    date: "06/2024 – 08/2025",
    title: "Shipped interfaces for a real product",
    notes: ["UI/UX Designer, VaiRadiology LLC · New York, USA"],
  },
  {
    version: "v2.0",
    date: "09/2023",
    title: "Compiled successfully: BSc in CSE",
    notes: [
      "BSc in Computer Science & Engineering, United International University · Dhaka, Bangladesh",
      "CGPA 3.08",
      "UIU Metaverse took 3rd place at the CSE Project Show 2023.",
    ],
  },
  {
    version: "v1.3",
    date: "02/2020",
    title: "Patch: teamwork at scale",
    notes: [
      "Volunteer, UIU National Job Fair: event coordination, participant guidance, and keeping operations running smoothly for employers and attendees.",
    ],
  },
  {
    version: "v1.2",
    date: "2019",
    title: "First release, first place",
    notes: ["Bangladeshi Sign Language recognition won 1st place at the UIU CSE Project Show 2019."],
  },
  {
    version: "v1.0",
    date: "02/2018",
    title: "Started coding, broke everything",
    notes: ["Began a BSc in Computer Science & Engineering at United International University, Dhaka."],
  },
];

export const knownIssues = [
  { id: 1, title: "Opens Figma before the code editor.", status: "won't fix" },
  { id: 7, title: "Will explain the difference between a vanilla GAN, DCGAN and WGAN if asked. Or if not asked.", status: "by design" },
  { id: 19, title: "Volunteers to coordinate the event, then actually coordinates it.", status: "working as intended" },
  { id: 23, title: "Treats every project show like a production deadline.", status: "won't fix" },
];

export const skills = [
  { group: "Design", items: ["UI/UX design", "Figma", "Canva"] },
  { group: "Front-end", items: ["HTML", "CSS", "JavaScript"] },
  { group: "Back-end & data", items: ["PHP", "MySQL"] },
  { group: "Machine learning", items: ["Python", "PyTorch", "Google Colab"] },
];
