import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Save, ChevronRight, ChevronLeft, Plus, Trash2 } from "lucide-react";
import AIAssistantButton from "./AIAssistantButton";
import AppLogo from "../AppLogo";

// Default sections for the resume
const defaultSections = [
  {
    id: "personal",
    label: "Personal",
    description: "Add your contact details and personal information",
    fields: [
      { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "johndoe@example.com",
      },
      {
        id: "mobileNumber",
        label: "Phone Number",
        type: "tel",
        placeholder: "+1 (555) 123-4567",
      },
      {
        id: "linkedin",
        label: "LinkedIn URL",
        type: "url",
        placeholder: "https://linkedin.com/in/johndoe",
      },
      {
        id: "github",
        label: "GitHub URL",
        type: "url",
        placeholder: "https://github.com/johndoe",
      },
      {
        id: "portfolio",
        label: "Portfolio URL",
        type: "url",
        placeholder: "https://johndoe.com",
      },
    ],
  },
  {
    id: "education",
    label: "Education",
    description: "Add your educational background",
    fields: [
      {
        id: "collegeName",
        label: "Institution Name",
        type: "text",
        placeholder: "University of Example",
      },
      {
        id: "course",
        label: "Degree/Course",
        type: "text",
        placeholder: "Bachelor of Science in Computer Science",
      },
      {
        id: "eduFrom",
        label: "Start Date",
        type: "text",
        placeholder: "Sep 2018",
      },
      { id: "eduTo", label: "End Date", type: "text", placeholder: "May 2022" },
    ],
    canAddMultiple: true,
    multipleKey: "education",
  },
  {
    id: "experience",
    label: "Experience",
    description: "Add your professional experience",
    fields: [
      {
        id: "companyName",
        label: "Company Name",
        type: "text",
        placeholder: "Example Corp",
      },
      {
        id: "jobTitle",
        label: "Job Title",
        type: "text",
        placeholder: "Software Engineer",
      },
      {
        id: "workFrom",
        label: "Start Date",
        type: "text",
        placeholder: "Jun 2022",
      },
      { id: "workTo", label: "End Date", type: "text", placeholder: "Present" },
      {
        id: "workDescription",
        label: "Responsibilities & Achievements",
        type: "textarea",
        placeholder:
          "• Developed features that increased conversion by 20%\n• Led a team of 3 developers to implement new API",
      },
    ],
    canAddMultiple: true,
    multipleKey: "experience",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Add your notable projects",
    fields: [
      {
        id: "projectName",
        label: "Project Name",
        type: "text",
        placeholder: "E-commerce Platform",
      },
      {
        id: "projectLink",
        label: "Project URL",
        type: "url",
        placeholder: "https://github.com/johndoe/project",
      },
      {
        id: "projectDescription",
        label: "Description",
        type: "textarea",
        placeholder:
          "• Built with React, Node.js, and MongoDB\n• Implemented user authentication and payment processing",
      },
    ],
    canAddMultiple: true,
    multipleKey: "projects",
  },
  {
    id: "skills",
    label: "Skills",
    description: "Add your technical skills",
    fields: [
      {
        id: "frontendSkills",
        label: "Frontend Skills",
        type: "text",
        placeholder: "React, JavaScript, HTML, CSS, Tailwind",
      },
      {
        id: "backendSkills",
        label: "Backend Skills",
        type: "text",
        placeholder: "Node.js, Express, Python, Django",
      },
      {
        id: "otherSkills",
        label: "Other Skills",
        type: "text",
        placeholder: "Git, AWS, Docker, Agile methodologies",
      },
    ],
  },
];

// Component for Form Fields
const FormField = ({ field, value = "", onChange, section }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <label
          htmlFor={field.id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {field.label}
        </label>
        {/* Fixed the prop to match the updated AIAssistantButton component */}
        <AIAssistantButton
          field={field}
          updateUserData={(fieldId, value) => onChange(section, fieldId, value)}
        />
      </div>

      {field.type === "textarea" ? (
        <textarea
          id={field.id}
          value={value || ""}
          onChange={(e) => onChange(section, field.id, e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      ) : (
        <input
          id={field.id}
          type={field.type}
          value={value || ""}
          onChange={(e) => onChange(section, field.id, e.target.value)}
          placeholder={field.placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      )}
    </div>
  );
};

// Component for Multiple Entry Fields (education, experience, projects)
const MultipleEntryFields = ({
  section,
  entries = [],
  sectionConfig,
  updateArrayField,
  addNewEntry,
  removeEntry,
}) => {
  // Safety check to ensure entries is an array
  const safeEntries = Array.isArray(entries) ? entries : [];

  return (
    <>
      {safeEntries.map((entry, index) => (
        <div
          key={entry?.id || index}
          className={`${index > 0 ? "mt-6 pt-6 border-t border-gray-200" : ""}`}
        >
          {index > 0 && (
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-medium text-gray-700">
                {sectionConfig.label} #{index + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeEntry(section, index)}
                className="text-red-600 hover:text-red-800"
                title="Remove this entry"
                disabled={safeEntries.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}

          {sectionConfig.fields.map((field) => (
            <FormField
              key={`${entry?.id || index}-${field.id}`}
              field={field}
              value={entry?.[field.id] || ""}
              onChange={(_, fieldId, value) =>
                updateArrayField(section, index, fieldId, value)
              }
              section={section}
            />
          ))}
        </div>
      ))}

      <button
        type="button"
        onClick={() => addNewEntry(section)}
        className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Another {sectionConfig.label}
      </button>
    </>
  );
};

const ResumeForm = ({
  userData,
  updateBasicField,
  updateArrayField,
  addNewEntry,
  removeEntry,
  saveDraft,
}) => {
  const [sections] = useState(defaultSections);
  const [selectedTab, setSelectedTab] = useState("personal");

  // Navigate to next tab
  const goToNextTab = () => {
    const currentIndex = sections.findIndex(
      (section) => section.id === selectedTab
    );
    if (currentIndex < sections.length - 1) {
      setSelectedTab(sections[currentIndex + 1].id);
    }
  };

  // Navigate to previous tab
  const goToPrevTab = () => {
    const currentIndex = sections.findIndex(
      (section) => section.id === selectedTab
    );
    if (currentIndex > 0) {
      setSelectedTab(sections[currentIndex - 1].id);
    }
  };

  return (
    <div className="p-6">
      <AppLogo />
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Build Your Resume</h2>
        <p className="text-gray-600">
          Fill in your details and see your ATS-optimized resume preview in
          real-time
        </p>
      </div>

      <Tabs.Root value={selectedTab} onValueChange={setSelectedTab}>
        <Tabs.List
          className="flex border-b border-gray-200 mb-6 overflow-x-auto"
          aria-label="Resume Sections"
        >
          {sections.map((section) => (
            <Tabs.Trigger
              key={section.id}
              value={section.id}
              className={`px-4 py-2 text-sm font-medium focus:outline-none whitespace-nowrap
                ${
                  selectedTab === section.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              {section.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <ScrollArea.Root className="h-[calc(100vh-240px)] w-full overflow-hidden">
          <ScrollArea.Viewport className="h-full w-full rounded">
            {sections.map((section) => (
              <Tabs.Content
                key={section.id}
                value={section.id}
                className="focus:outline-none"
              >
                <div className="bg-white p-5 rounded-lg shadow-sm mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {section.label}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {section.description}
                  </p>

                  {/* Single fields (personal, skills) */}
                  {(section.id === "personal" || section.id === "skills") &&
                    section.fields.map((field) => (
                      <FormField
                        key={field.id}
                        field={field}
                        value={userData[section.id]?.[field.id] || ""}
                        onChange={updateBasicField}
                        section={section.id}
                      />
                    ))}

                  {/* Multiple entry fields (education, experience, projects) */}
                  {section.canAddMultiple && (
                    <MultipleEntryFields
                      section={section.id}
                      entries={userData[section.id] || []}
                      sectionConfig={section}
                      updateArrayField={updateArrayField}
                      addNewEntry={addNewEntry}
                      removeEntry={removeEntry}
                    />
                  )}
                </div>
              </Tabs.Content>
            ))}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-gray-100 transition-colors duration-150 ease-out hover:bg-gray-200 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="flex-1 bg-gray-300 rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={goToPrevTab}
            disabled={selectedTab === sections[0].id}
            className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium
              ${
                selectedTab === sections[0].id
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </button>

          <div className="space-x-2">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={saveDraft}
            >
              <Save className="h-4 w-4 mr-1" />
              Save Draft
            </button>

            <button
              type="button"
              onClick={goToNextTab}
              disabled={selectedTab === sections[sections.length - 1].id}
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium
                ${
                  selectedTab === sections[sections.length - 1].id
                    ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                    : "text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </Tabs.Root>
    </div>
  );
};

export default ResumeForm;
