import { v4 as uuidv4 } from "uuid";

export const inputStyle =
  "w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out";

export const profileInfo = [
  {
    label: "Full Name",
    id: "name",
    type: "text",
    required: true,
  },
  {
    label: "Email",
    id: "email",
    type: "email",
    required: true,
  },
  {
    label: "Mobile Number",
    id: "mobileNumber",
    type: "text",
    required: true,
    info: "Ex: +91 8341661726",
  },
  {
    label: "Personal Website",
    id: "portfolio",
    type: "url",
  },
  {
    label: "Linkedin",
    id: "linkedin",
    type: "url",
    info: "Ex: https://www.linkedin.com/in/ganeshdanuri/",
  },
  {
    label: "Github",
    id: "github",
    type: "url",
    info: "Ex: https://github.com/ganeshdanuri",
  },
];

export const educationInfo = [
  {
    label: "College Name",
    id: "collegeName",
    type: "text",
  },
  {
    label: "Course",
    id: "course",
    type: "cource",
    info: "Ex: BTech in Computer Science Engineering",
  },
  {
    label: "From (Year)",
    id: "eduFrom",
    type: "text",
  },
  {
    label: "To (Year)",
    id: "eduTo",
    type: "text",
  },
  {
    label: "Score",
    id: "eduScore",
    type: "text",
    info: "Ex: 9.0/10",
  },
];

export const workHistory = [
  {
    label: "Company Name",
    id: "workCompanyName",
    type: "text",
  },
  {
    label: "Role",
    id: "workRole",
    type: "text",
    info: "Ex: Backend Engineer",
  },
  {
    label: "From",
    id: "workFrom",
    type: "text",
    info: "Ex: Mar 21",
  },
  {
    label: "To",
    id: "workTo",
    type: "text",
    info: "Ex: Jan 24 (fill as 'Present' for current Company)",
  },
  {
    label: "Summarize role briefly",
    id: "workData",
    type: "textArea",
    AI: true,
  },
];

export const projectsInfo = [
  {
    label: "Project Name",
    id: "projectName",
    type: "text",
  },
  {
    label: "Link",
    id: "projectLink",
    type: "url",
    info: "Ex: https://bloomcode.netlify.app/",
  },
  {
    label: "Skills Used",
    id: "projectSkills",
    type: "input",
    info: "Ex: ReactJS | Javascript",
  },
  {
    label: "Summarize project briefly",
    id: "description",
    type: "textArea",
    AI: true,
  },
];

export const technicalSkills = [
  {
    label: "Frontend",
    id: "frontendSkills",
    type: "textArea",
    required: true,
  },
  {
    label: "Backend (Including Databases)",
    id: "backendSkills",
    type: "textArea",
    required: true,
  },
];

export const tabDetails = [
  {
    id: "profile",
    label: "Profile",
    data: { [uuidv4()]: profileInfo },
    description:
      "Provide your email address, phone text, and optionally, your social media links.",
  },
  {
    id: "education",
    label: "Education Details",
    data: { [uuidv4()]: educationInfo },
    description:
      "List your educational qualifications, including degrees, institutions, and dates of attendance.",
  },
  {
    id: "experiance",
    label: "Experiance",
    data: { [uuidv4()]: workHistory },
    mutliple: true,
    text: "Company",
    description:
      "List your past employment positions. Include company names, job titles, dates of employment, and brief descriptions of responsibilities and achievements.",
  },
  {
    id: "projects",
    label: "Projects",
    data: { [uuidv4()]: projectsInfo },
    mutliple: true,
    text: "Project",
    description:
      "Describe relevant projects you have worked on. Include project names, descriptions, and outcomes if applicable.",
  },
  {
    id: "technicalSkills",
    label: "Technical Skills",
    data: { [uuidv4()]: technicalSkills },
    description:
      "List your technical skills relevant to your profession, such as programming languages, software tools, frameworks, and other expertise. Include your proficiency level for each skill (e.g., proficient, intermediate). These skills showcase your capabilities and qualifications to recruiters and employers.",
  },
];
