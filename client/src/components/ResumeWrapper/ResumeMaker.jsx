/* eslint-disable react/prop-types */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
  Link,
} from "@react-pdf/renderer";

import ArialRegular from "/fonts/arial/ARIAL.TTF?url";
import React, { useEffect, useState } from "react";
import {
  getArrayOfFieldsData,
  getArrayOfProjectsData,
  getData,
} from "../../utils/app-utils";

import { v4 as uuidv4 } from "uuid";

Font.register({
  family: "Arial",
  src: ArialRegular,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontFamily: "Arial",
    fontSize: 11,
  },
  section: {
    marginTop: 10,
  },
  sectionCenter: {
    textAlign: "center",
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  subHeading: {
    fontSize: 12,
    marginBottom: 5,
  },
  content: {
    fontSize: 10,
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  educationLeft: {
    flexGrow: 1,
  },
  educationRight: {
    textAlign: "right",
    alignSelf: "flex-end",
  },
  link: {
    color: "blue",
    textDecoration: "none",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
    marginLeft: 5,
  },
  listItemText: {
    fontSize: 10,
    marginLeft: 5,
  },
  underline: {
    borderBottom: 1,
    borderColor: "#E2E8F0",
    marginBottom: 10,
  },
});

const CommonSection = ({ title, subtitles, dates, links }) => (
  <View>
    {title && (
      <>
        <Text style={styles.heading}>{title}</Text>
        <View style={styles.underline}></View>
      </>
    )}
    <View style={styles.rowContainer}>
      <View style={styles.educationLeft}>
        {subtitles?.map((eachSub, i) => {
          return (
            <Text key={i} style={styles.content}>
              {eachSub}
            </Text>
          );
        })}
      </View>
      {links ? (
        <View style={styles.educationRight}>
          {links?.map((link, i) => {
            return (
              <Link key={i} src={link} style={styles.link}>
                View
              </Link>
            );
          })}
        </View>
      ) : (
        <View style={styles.educationRight}>
          {dates?.map((date, i) => {
            return (
              <Text key={i} style={styles.content}>
                {date}
              </Text>
            );
          })}
        </View>
      )}
    </View>
  </View>
);

export const ResumeMaker = ({ userData, originalData }) => {
  const [finalWorkDetails, setFinalWorkDetails] = useState([]);
  const [finalProjects, setFinalProjects] = useState([]);

  useEffect(() => {
    const workData = getData(originalData, userData, "experiance");
    const projectsData = getData(originalData, userData, "projects");

    const workArray = getArrayOfFieldsData(workData);
    const projectsArray = getArrayOfProjectsData(projectsData);

    setFinalWorkDetails(workArray);
    setFinalProjects(projectsArray);
  }, [userData, originalData]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sectionCenter}>
          <Text style={styles.heading}>{userData?.name}</Text>
          <Text style={styles.content}>
            {userData?.email}
            {` | ${userData?.mobileNumber} `}

            {userData?.linkedin && (
              <Link src={userData.linkedin} style={styles.link}>
                {` | LinkedIn `}
              </Link>
            )}
            {userData?.github && (
              <Link src={userData.github} style={styles.link}>
                {` | Github `}
              </Link>
            )}
            {userData?.portfolio && (
              <Link src={userData.portfolio} style={styles.link}>
                {` | Portfolio `}
              </Link>
            )}
          </Text>
        </View>

        <View style={styles.section}>
          <CommonSection
            title={"EDUCATION"}
            dates={[`${userData?.eduFrom}-${userData?.eduTo}`]}
            subtitles={[userData?.collegeName, userData?.course]}
          />
        </View>

        <View style={styles.section}>
          {finalWorkDetails?.map((eachDetail, i) => {
            return (
              <React.Fragment key={uuidv4()}>
                <CommonSection
                  title={i === 0 ? "PROFESSIONAL EXPERIENCE" : null}
                  dates={eachDetail.dates}
                  subtitles={eachDetail.subtitles}
                />
                <View style={styles.content}>
                  <View style={styles.content}>
                    {eachDetail?.workData?.map((eachData, i) => {
                      return (
                        <View style={styles.listItem} key={i}>
                          <Text>{"\u2022"}</Text>
                          <Text style={styles.listItemText}>{eachData}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.heading}>TECHNICAL SKILLS</Text>
                  <View style={styles.underline}></View>
                  <View style={styles.listItem} key={i}>
                    <Text></Text>
                    <Text style={styles.listItemText}>
                      Frontend : {userData.frontendSkills}
                    </Text>
                  </View>
                  <View style={styles.listItem} key={i}>
                    <Text></Text>
                    <Text style={styles.listItemText}>
                      Backend : {userData.frontendSkills}
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          {finalProjects?.map((eachProject, i) => {
            return (
              <>
                <CommonSection
                  title={i === 0 ? "PROJECTS" : null}
                  subtitles={eachProject.subtitles}
                  links={[eachProject.link]}
                />
                <View style={styles.content}>
                  <View style={styles.content}>
                    {eachProject?.description?.map((eachData, i) => {
                      return (
                        <View style={styles.listItem} key={i}>
                          <Text>{"\u2022"}</Text>
                          <Text style={styles.listItemText}>{eachData}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </>
            );
          })}
        </View>

        {/* <View style={styles.section}>
          <CommonSection
            title={"CERTIFICATIONS"}
            dates={["AWS Developer - Associate"]}
            subtitles={["AWS Solutions Architect - Associate"]}
          />
        </View> */}
      </Page>
    </Document>
  );
};

export const ResumeDisplay = ({ userData, originalData }) => {
  return (
    <div className="h-full">
      <PDFViewer width="100%" height="100%">
        <ResumeMaker userData={userData} originalData={originalData} />
      </PDFViewer>
    </div>
  );
};
