import { Sparkles } from "lucide-react";
import { useState } from "react";

// Component for AI Assistant Button
const AIAssistantButton = ({ field, updateUserData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const generateContent = () => {
    setIsLoading(true);

    // Simulated AI processing
    setTimeout(() => {
      let generatedContent = "";

      if (field.id === "workDescription") {
        generatedContent =
          "• Led development of a microservice architecture that improved system reliability by 30%\n• Implemented CI/CD pipeline reducing deployment time by 40%\n• Optimized database queries resulting in 55% faster load times\n• Mentored junior developers and conducted code reviews";
      } else if (field.id === "projectDescription") {
        generatedContent =
          "• Built using React, Node.js and MongoDB with JWT authentication\n• Implemented real-time notifications using Socket.io\n• Designed responsive UI with Tailwind CSS\n• Integrated payment processing with Stripe";
      } else if (field.id.includes("Skills")) {
        if (field.id === "frontendSkills") {
          generatedContent =
            "React, TypeScript, Redux, JavaScript, HTML5, CSS3, Tailwind CSS, Material UI";
        } else if (field.id === "backendSkills") {
          generatedContent =
            "Node.js, Express, Python, Django, RESTful APIs, GraphQL, MongoDB, PostgreSQL";
        } else {
          generatedContent =
            "Git, Docker, AWS, CI/CD, Agile, Scrum, Jira, Figma";
        }
      }

      updateUserData(field.id, generatedContent);
      setIsLoading(false);
    }, 1500);
  };

  // Only show AI button for specific field types
  if (
    !["textarea", "text"].includes(field.type) ||
    (!field.id.includes("Skills") && !field.id.includes("Description"))
  ) {
    return null;
  }

  return (
    <button
      type="button"
      className="ml-2 inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      onClick={generateContent}
      disabled={isLoading}
    >
      <Sparkles className="h-3 w-3 mr-1" />
      {isLoading ? "Generating..." : "AI Assist"}
    </button>
  );
};

export default AIAssistantButton;
