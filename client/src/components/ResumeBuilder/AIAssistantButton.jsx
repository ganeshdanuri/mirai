import { Sparkles } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const AIAssistantButton = ({ field, updateUserData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Initialize Google GenAI
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_API_KEY,
      });

      // Fixed role as developer, get experience from user input or use default
      const role = "developer";
      const experience = "3 years";

      // Build prompt with clear sections
      const prompt = buildPrompt({
        field: field.label || field.id,
        role,
        experience,
        additionalContext: userInput.trim(),
      });
      console.log("Sending prompt:", prompt);

      // Call Gemini API
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite-preview-06-17",
        contents: [{ parts: [{ text: prompt }] }],
      });
      console.log("API Response:", response);

      // Extract and process the generated content
      const generatedContent = response.candidates[0].content.parts[0].text;
      console.log("Raw generated content:", generatedContent);

      const formattedContent = formatContent(generatedContent);
      console.log("Formatted content:", formattedContent);

      if (!formattedContent) {
        setError("Received empty content from AI. Please try again.");
        setIsLoading(false);
        return;
      }

      updateUserData(field.id, formattedContent);
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error generating content:", error);
      setError("Failed to generate content. Please try again.");
      setIsLoading(false);
    }
  };

  // Helper function to build structured prompt
  const buildPrompt = ({ field, role, experience, additionalContext }) => {
    let prompt = `Generate content for the "${field}" section of a resume.
  ROLE INFORMATION:
  - Position: ${role}
  - Experience: ${experience}`;

    if (additionalContext) {
      prompt += `
  ADDITIONAL CONTEXT:
  ${additionalContext}`;
    }

    prompt += `
  FORMATTING REQUIREMENTS:
  - Format as bullet points starting with "•"
  - Focus on achievements and quantifiable results
  - Keep each point concise and impactful
  - Use action verbs and specific metrics when possible
  - No additional styling, markdown, or explanatory text
  - Maximum 5-6 bullet points
  
  EXAMPLE FORMAT:
  • Developed and deployed 15+ responsive web applications using React and TypeScript
  • Improved website performance by 40% through code optimization and lazy loading
  • Collaborated with cross-functional teams to deliver projects 20% ahead of schedule`;

    return prompt;
  };

  // Helper function to format the generated content
  const formatContent = (content) => {
    if (!content || !content.trim()) {
      return "";
    }

    // Check if content already has bullet points
    const hasExistingBullets = content.includes("•");
    let formattedContent;

    if (hasExistingBullets) {
      // Content already has bullets, clean up formatting
      formattedContent = content
        .split("\n")
        .map((line) => line.trim())
        .filter(
          (line) => line && !line.match(/^(EXAMPLE|FORMAT|NOTE|REQUIREMENTS)/i)
        ) // Remove instruction text
        .filter((line) => line.startsWith("•")) // Keep only bullet points
        .join("\n");
    } else {
      // Content doesn't have bullets, add them
      formattedContent = content
        .split("\n")
        .map((line) => line.trim())
        .filter(
          (line) => line && !line.match(/^(EXAMPLE|FORMAT|NOTE|REQUIREMENTS)/i)
        )
        .map((line) => (line.startsWith("•") ? line : `• ${line}`))
        .join("\n");
    }

    return formattedContent;
  };

  // Conditional rendering
  if (
    !["textarea", "text"].includes(field.type) ||
    (!field.id.includes("skills") && !field.id.includes("Description"))
  ) {
    return null;
  }

  // Determine friendly field name for display
  const getFieldDisplayName = () => {
    if (field.label) return field.label;

    // Create a human-readable name from the field ID
    const name = field.id
      .replace(/([A-Z])/g, " $1") // Insert space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim();

    return name;
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="ml-2 inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Sparkles className="h-3 w-3 mr-1" />
          AI Assist
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold text-gray-900">
            AI Assistant for {getFieldDisplayName()}
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-gray-500">
            Add details to customize content for a frontend engineer with 3
            years of experience.
          </Dialog.Description>

          <textarea
            rows={4}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={`E.g., Specializes in React, worked on e-commerce platforms, led a team of 3 junior developers`}
            className="mt-4 w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}

          <div className="mt-4 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button
                className="rounded-md px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                disabled={isLoading}
              >
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate
                </>
              )}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AIAssistantButton;
