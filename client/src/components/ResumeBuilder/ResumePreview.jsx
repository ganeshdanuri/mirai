import { memo, useMemo } from "react";
import { Download, Eye } from "lucide-react";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  pdf,
  StyleSheet,
} from "@react-pdf/renderer";

// PDF Styles with cleaner typography
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333333",
  },
  section: {
    marginBottom: 15,
  },
  header: {
    marginBottom: 20,
  },
  headerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  headerContact: {
    fontSize: 9,
    marginBottom: 3,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#555555",
    paddingBottom: 2,
    textTransform: "uppercase",
  },
  entryContainer: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  entryTitle: {
    fontSize: 10,
    fontWeight: "bold",
  },
  entrySubtitle: {
    fontSize: 9,
    fontStyle: "italic",
  },
  entryDate: {
    fontSize: 9,
    textAlign: "right",
  },
  bulletList: {
    marginLeft: 10,
    marginTop: 3,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletPoint: {
    width: 8,
    fontSize: 9,
  },
  bulletText: {
    fontSize: 9,
    flex: 1,
  },
  skillsSection: {
    marginTop: 4,
  },
  skillCategory: {
    flexDirection: "row",
    marginBottom: 3,
  },
  skillCategoryTitle: {
    fontSize: 9,
    fontWeight: "bold",
    width: 60,
  },
  skillList: {
    fontSize: 9,
    flex: 1,
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
  },
});

// Helper function to parse bullet points from textareas
const parseBulletPoints = (text) => {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => (line.startsWith("•") ? line.substring(1).trim() : line));
};

// Memoized PDF Document Component
const ResumePDF = memo(({ userData }) => {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Header/Contact Information */}
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.headerName}>
            {userData.personal?.name || "Your Name"}
          </Text>
          <Text style={pdfStyles.headerContact}>
            {userData.personal?.email ? `${userData.personal.email} | ` : ""}
            {userData.personal?.mobileNumber
              ? `${userData.personal.mobileNumber} | `
              : ""}
            {userData.personal?.linkedin ? (
              <Link src={userData.personal.linkedin} style={pdfStyles.link}>
                LinkedIn
              </Link>
            ) : (
              ""
            )}
            {userData.personal?.linkedin &&
            (userData.personal?.github || userData.personal?.portfolio)
              ? " | "
              : ""}
            {userData.personal?.github ? (
              <Link src={userData.personal.github} style={pdfStyles.link}>
                GitHub
              </Link>
            ) : (
              ""
            )}
            {userData.personal?.github && userData.personal?.portfolio
              ? " | "
              : ""}
            {userData.personal?.portfolio ? (
              <Link src={userData.personal.portfolio} style={pdfStyles.link}>
                Portfolio
              </Link>
            ) : (
              ""
            )}
          </Text>
        </View>

        {/* Education Section */}
        {userData.education && userData.education.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Education</Text>
            {userData.education.map((edu, index) => (
              <View key={`edu-${index}`} style={pdfStyles.entryContainer}>
                <View style={pdfStyles.entryHeader}>
                  <View>
                    <Text style={pdfStyles.entryTitle}>
                      {edu?.collegeName || ""}
                    </Text>
                    <Text style={pdfStyles.entrySubtitle}>
                      {edu?.course || ""}
                    </Text>
                  </View>
                  <Text style={pdfStyles.entryDate}>
                    {edu?.eduFrom
                      ? `${edu.eduFrom} - ${edu.eduTo || "Present"}`
                      : ""}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Experience Section */}
        {userData.experience && userData.experience.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Professional Experience</Text>
            {userData.experience.map((exp, index) => (
              <View key={`exp-${index}`} style={pdfStyles.entryContainer}>
                <View style={pdfStyles.entryHeader}>
                  <View>
                    <Text style={pdfStyles.entryTitle}>
                      {exp?.jobTitle || ""}
                    </Text>
                    <Text style={pdfStyles.entrySubtitle}>
                      {exp?.companyName || ""}
                    </Text>
                  </View>
                  <Text style={pdfStyles.entryDate}>
                    {exp?.workFrom
                      ? `${exp.workFrom} - ${exp.workTo || "Present"}`
                      : ""}
                  </Text>
                </View>

                {exp?.workDescription && (
                  <View style={pdfStyles.bulletList}>
                    {parseBulletPoints(exp.workDescription).map((bullet, i) => (
                      <View
                        key={`exp-${index}-bullet-${i}`}
                        style={pdfStyles.bulletItem}
                      >
                        <Text style={pdfStyles.bulletPoint}>•</Text>
                        <Text style={pdfStyles.bulletText}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects Section */}
        {userData.projects && userData.projects.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Projects</Text>
            {userData.projects.map((project, index) => (
              <View key={`proj-${index}`} style={pdfStyles.entryContainer}>
                <View style={pdfStyles.entryHeader}>
                  <View>
                    <Text style={pdfStyles.entryTitle}>
                      {project?.projectName || ""}
                    </Text>
                    {project?.projectLink && (
                      <Link src={project.projectLink} style={pdfStyles.link}>
                        View Project
                      </Link>
                    )}
                  </View>
                </View>

                {project?.projectDescription && (
                  <View style={pdfStyles.bulletList}>
                    {parseBulletPoints(project.projectDescription).map(
                      (bullet, i) => (
                        <View
                          key={`proj-${index}-bullet-${i}`}
                          style={pdfStyles.bulletItem}
                        >
                          <Text style={pdfStyles.bulletPoint}>•</Text>
                          <Text style={pdfStyles.bulletText}>{bullet}</Text>
                        </View>
                      )
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {(userData.skills?.frontendSkills ||
          userData.skills?.backendSkills ||
          userData.skills?.otherSkills) && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Technical Skills</Text>
            <View style={pdfStyles.skillsSection}>
              {userData.skills?.frontendSkills && (
                <View style={pdfStyles.skillCategory}>
                  <Text style={pdfStyles.skillCategoryTitle}>Frontend:</Text>
                  <Text style={pdfStyles.skillList}>
                    {userData.skills.frontendSkills}
                  </Text>
                </View>
              )}

              {userData.skills?.backendSkills && (
                <View style={pdfStyles.skillCategory}>
                  <Text style={pdfStyles.skillCategoryTitle}>Backend:</Text>
                  <Text style={pdfStyles.skillList}>
                    {userData.skills.backendSkills}
                  </Text>
                </View>
              )}

              {userData.skills?.otherSkills && (
                <View style={pdfStyles.skillCategory}>
                  <Text style={pdfStyles.skillCategoryTitle}>Other:</Text>
                  <Text style={pdfStyles.skillList}>
                    {userData.skills.otherSkills}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
});

// Memo-wrapped Education item component
const EducationItem = memo(({ edu }) => (
  <div className="mb-4">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-semibold text-gray-800">
          {edu?.collegeName || ""}
        </h4>
        <p className="text-sm text-gray-600 italic">{edu?.course || ""}</p>
      </div>
      <p className="text-sm text-gray-500">
        {edu?.eduFrom ? `${edu.eduFrom} - ${edu.eduTo || "Present"}` : ""}
      </p>
    </div>
  </div>
));

// Memo-wrapped Experience item component
const ExperienceItem = memo(({ exp }) => (
  <div className="mb-6">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-semibold text-gray-800">{exp?.jobTitle || ""}</h4>
        <p className="text-sm text-gray-600 italic">{exp?.companyName || ""}</p>
      </div>
      <p className="text-sm text-gray-500">
        {exp?.workFrom ? `${exp.workFrom} - ${exp.workTo || "Present"}` : ""}
      </p>
    </div>
    {exp?.workDescription && (
      <ul className="mt-2 pl-6 text-sm space-y-1">
        {parseBulletPoints(exp.workDescription).map((bullet, i) => (
          <li key={i} className="list-disc text-gray-700">
            {bullet}
          </li>
        ))}
      </ul>
    )}
  </div>
));

// Memo-wrapped Project item component
const ProjectItem = memo(({ project }) => (
  <div className="mb-5">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-semibold text-gray-800">
          {project?.projectName || ""}
        </h4>
        {project?.projectLink && (
          <a
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            View Project
          </a>
        )}
      </div>
    </div>
    {project?.projectDescription && (
      <ul className="mt-2 pl-6 text-sm space-y-1">
        {parseBulletPoints(project.projectDescription).map((bullet, i) => (
          <li key={i} className="list-disc text-gray-700">
            {bullet}
          </li>
        ))}
      </ul>
    )}
  </div>
));

// Main Resume Preview Component
const ResumePreview = ({ userData }) => {
  // Ensure userData is never undefined
  const safeUserData = userData || {
    personal: { name: "Your Name" },
    education: [],
    experience: [],
    projects: [],
    skills: {},
  };

  // Handle PDF download
  const handleDownload = async () => {
    try {
      const blob = await pdf(<ResumePDF userData={safeUserData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${safeUserData.personal?.name || "resume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  // Memoize content sections to prevent unnecessary re-renders
  const educationContent = useMemo(() => {
    return safeUserData.education?.map((edu, index) => (
      <EducationItem key={`edu-${edu?.id || index}`} edu={edu} />
    ));
  }, [safeUserData.education]);

  const experienceContent = useMemo(() => {
    return safeUserData.experience?.map((exp, index) => (
      <ExperienceItem key={`exp-${exp?.id || index}`} exp={exp} />
    ));
  }, [safeUserData.experience]);

  const projectsContent = useMemo(() => {
    return safeUserData.projects?.map((project, index) => (
      <ProjectItem key={`proj-${project?.id || index}`} project={project} />
    ));
  }, [safeUserData.projects]);

  const skillsContent = useMemo(() => {
    const { frontendSkills, backendSkills, otherSkills } =
      safeUserData.skills || {};
    if (!frontendSkills && !backendSkills && !otherSkills) return null;

    return (
      <div className="space-y-2 text-sm">
        {frontendSkills && (
          <div className="flex">
            <span className="font-medium w-20">Frontend:</span>
            <span className="text-gray-700">{frontendSkills}</span>
          </div>
        )}
        {backendSkills && (
          <div className="flex">
            <span className="font-medium w-20">Backend:</span>
            <span className="text-gray-700">{backendSkills}</span>
          </div>
        )}
        {otherSkills && (
          <div className="flex">
            <span className="font-medium w-20">Other:</span>
            <span className="text-gray-700">{otherSkills}</span>
          </div>
        )}
      </div>
    );
  }, [safeUserData.skills]);

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Header with actions */}
      <div className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <Eye size={18} className="text-gray-500" />
            Preview
          </h3>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Download size={16} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Resume Preview - HTML Version (More efficient than PDF for preview) */}
      <div className="flex-grow overflow-auto">
        <div className="max-w-3xl mx-auto my-8 bg-white shadow-md rounded-lg p-8 print:shadow-none">
          {/* Header/Contact Information */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {safeUserData.personal?.name || "Your Name"}
            </h1>
            <p className="text-sm text-gray-600">
              {safeUserData.personal?.email && (
                <span className="inline-block mx-1">
                  {safeUserData.personal.email}
                </span>
              )}
              {safeUserData.personal?.mobileNumber && (
                <span className="inline-block mx-1">
                  • {safeUserData.personal.mobileNumber}
                </span>
              )}
              {safeUserData.personal?.linkedin && (
                <span className="inline-block mx-1">
                  •
                  <a
                    href={safeUserData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    LinkedIn
                  </a>
                </span>
              )}
              {safeUserData.personal?.github && (
                <span className="inline-block mx-1">
                  •
                  <a
                    href={safeUserData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    GitHub
                  </a>
                </span>
              )}
              {safeUserData.personal?.portfolio && (
                <span className="inline-block mx-1">
                  •
                  <a
                    href={safeUserData.personal.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Portfolio
                  </a>
                </span>
              )}
            </p>
          </div>

          {/* Education Section */}
          {safeUserData.education && safeUserData.education.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase">
                Education
              </h3>
              {educationContent}
            </div>
          )}

          {/* Experience Section */}
          {safeUserData.experience && safeUserData.experience.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase">
                Professional Experience
              </h3>
              {experienceContent}
            </div>
          )}

          {/* Projects Section */}
          {safeUserData.projects && safeUserData.projects.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase">
                Projects
              </h3>
              {projectsContent}
            </div>
          )}

          {/* Skills Section */}
          {skillsContent && (
            <div className="mb-6">
              <h3 className="text-base font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3 uppercase">
                Technical Skills
              </h3>
              {skillsContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ResumePreview);
