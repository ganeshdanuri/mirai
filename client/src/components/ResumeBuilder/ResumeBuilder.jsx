import { useState, useEffect } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";

const ResumeBuilder = () => {
  // Initialize state with a more structured approach for multiple entries
  const [userData, setUserData] = useState({
    // Personal information
    personal: {
      name: "",
      email: "",
      mobileNumber: "",
      linkedin: "",
      github: "",
      portfolio: "",
    },
    // Arrays for multiple entries
    education: [
      {
        id: 0,
        collegeName: "",
        course: "",
        eduFrom: "",
        eduTo: "",
      },
    ],
    experience: [
      {
        id: 0,
        companyName: "",
        jobTitle: "",
        workFrom: "",
        workTo: "",
        workDescription: "",
      },
    ],
    projects: [
      {
        id: 0,
        projectName: "",
        projectLink: "",
        projectDescription: "",
      },
    ],
    // Skills section
    skills: {
      frontendSkills: "",
      backendSkills: "",
      otherSkills: "",
    },
  });

  // Load saved draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem("resumeDraft");
    if (savedDraft) {
      try {
        const parsedData = JSON.parse(savedDraft);

        // Ensure all required arrays and objects exist
        const safeData = {
          // Start with default structure
          ...userData,
          // Merge with loaded data
          ...parsedData,
          // Ensure personal object exists
          personal: {
            ...userData.personal,
            ...(parsedData.personal || {}),
          },
          // Ensure arrays exist with proper structure
          education:
            Array.isArray(parsedData.education) &&
            parsedData.education.length > 0
              ? parsedData.education
              : [
                  {
                    id: 0,
                    collegeName: "",
                    course: "",
                    eduFrom: "",
                    eduTo: "",
                  },
                ],
          experience:
            Array.isArray(parsedData.experience) &&
            parsedData.experience.length > 0
              ? parsedData.experience
              : [
                  {
                    id: 0,
                    companyName: "",
                    jobTitle: "",
                    workFrom: "",
                    workTo: "",
                    workDescription: "",
                  },
                ],
          projects:
            Array.isArray(parsedData.projects) && parsedData.projects.length > 0
              ? parsedData.projects
              : [
                  {
                    id: 0,
                    projectName: "",
                    projectLink: "",
                    projectDescription: "",
                  },
                ],
          // Ensure skills object exists
          skills: {
            ...userData.skills,
            ...(parsedData.skills || {}),
          },
        };

        setUserData(safeData);
      } catch (error) {
        console.error("Error loading saved draft:", error);
      }
    }
  }, []);

  // Function to update basic fields
  const updateBasicField = (section, fieldId, value) => {
    setUserData((prevData) => {
      // Ensure the section exists
      if (!prevData[section]) {
        return {
          ...prevData,
          [section]: { [fieldId]: value },
        };
      }

      return {
        ...prevData,
        [section]: {
          ...prevData[section],
          [fieldId]: value,
        },
      };
    });
  };

  // Function to update an entry in a multiple entries array
  const updateArrayField = (section, index, fieldId, value) => {
    setUserData((prevData) => {
      // Check if the section exists and is an array
      if (!Array.isArray(prevData[section])) {
        console.error(`Section ${section} is not an array or doesn't exist`);
        return prevData;
      }

      // Check if the index is valid
      if (index < 0 || index >= prevData[section].length) {
        console.error(`Invalid index ${index} for section ${section}`);
        return prevData;
      }

      const updatedArray = [...prevData[section]];
      updatedArray[index] = {
        ...updatedArray[index],
        [fieldId]: value,
      };

      return {
        ...prevData,
        [section]: updatedArray,
      };
    });
  };

  // Function to add a new entry to a multiple entries array
  const addNewEntry = (section) => {
    setUserData((prevData) => {
      // Check if the section exists and is an array
      if (!Array.isArray(prevData[section])) {
        console.error(`Section ${section} is not an array or doesn't exist`);
        return prevData;
      }

      const newId =
        prevData[section].length > 0
          ? Math.max(...prevData[section].map((item) => item.id || 0)) + 1
          : 0;

      let newEntry = { id: newId };

      // Set up the default fields based on the section
      if (section === "education") {
        newEntry = {
          ...newEntry,
          collegeName: "",
          course: "",
          eduFrom: "",
          eduTo: "",
        };
      } else if (section === "experience") {
        newEntry = {
          ...newEntry,
          companyName: "",
          jobTitle: "",
          workFrom: "",
          workTo: "",
          workDescription: "",
        };
      } else if (section === "projects") {
        newEntry = {
          ...newEntry,
          projectName: "",
          projectLink: "",
          projectDescription: "",
        };
      }

      return {
        ...prevData,
        [section]: [...prevData[section], newEntry],
      };
    });
  };

  // Function to remove an entry from a multiple entries array
  const removeEntry = (section, index) => {
    setUserData((prevData) => {
      // Check if the section exists and is an array
      if (!Array.isArray(prevData[section])) {
        console.error(`Section ${section} is not an array or doesn't exist`);
        return prevData;
      }

      // Check if there's at least one entry left
      if (prevData[section].length <= 1) {
        console.warn(`Cannot remove the last entry from ${section}`);
        return prevData;
      }

      const updatedArray = [...prevData[section]];
      updatedArray.splice(index, 1);

      return {
        ...prevData,
        [section]: updatedArray,
      };
    });
  };

  // Save resume draft to localStorage
  const saveDraft = () => {
    try {
      localStorage.setItem("resumeDraft", JSON.stringify(userData));
      alert("Resume draft saved!");
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Failed to save draft. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left panel - Form */}
      <div className="w-1/2 h-full overflow-auto border-r border-gray-200">
        <ResumeForm
          userData={userData}
          updateBasicField={updateBasicField}
          updateArrayField={updateArrayField}
          addNewEntry={addNewEntry}
          removeEntry={removeEntry}
          saveDraft={saveDraft}
        />
      </div>

      {/* Right panel - Preview */}
      <div className="w-1/2 h-full overflow-auto">
        <ResumePreview userData={userData} />
      </div>
    </div>
  );
};

export default ResumeBuilder;
