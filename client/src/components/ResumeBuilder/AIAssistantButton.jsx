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

      // Construct prompt based on the field and user input
      let prompt = `Generate content for the "${
        field.label || field.id
      }" section of a resume.`;

      // Always include the default role and experience, whether user input exists or not
      prompt += ` Considering the following role and experience: frontend engineer with 3 years.`;

      // If user provides additional context, add it
      if (userInput.trim()) {
        prompt += ` Additional context: ${userInput}`;
      }

      prompt += ` Format the output as a list of concise bullet points, with each point starting with "•". Focus on achievements and quantifiable results where applicable. Do not include any additional information, styling, or markdown.`;

      console.log("Sending prompt:", prompt);

      // Call Gemini API
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ parts: [{ text: prompt }] }],
      });

      console.log("API Response:", response);

      // Extract text from the response
      const generatedContent = response.candidates[0].content.parts[0].text;
      console.log("Raw generated content:", generatedContent);

      // Check if content is already in bullet point format
      const hasExistingBullets = generatedContent.includes("•");

      // Process the content
      let formattedContent;

      if (hasExistingBullets) {
        // Content already has bullets, just ensure proper formatting
        formattedContent = generatedContent
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line) // Remove empty lines
          .join("\n");
      } else {
        // Content doesn't have bullets, add them
        formattedContent = generatedContent
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line) // Remove empty lines
          .map((line) => (line.startsWith("•") ? line : `• ${line}`))
          .join("\n");
      }

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

  // Conditional rendering
  if (
    !["textarea", "text"].includes(field.type) ||
    (!field.id.includes("Skills") && !field.id.includes("Description"))
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
