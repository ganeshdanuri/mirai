/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { tabDetails } from "../../constants/data-constants";
import { Button } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";

import DetailsForm from "./DetailsForm";
import AppDropdown from "./Dropdown";

import "./Resume.scss";
import { ResumeDisplay } from "./ResumeMaker";

const DetailsFooter = ({ activeTabIndex, setActiveTabIndex }) => {
  const handleNext = () => {
    if (activeTabIndex < tabDetails.length - 1) {
      setActiveTabIndex((prev) => prev + 1);
    }
  };

  const hadlePrev = () => {
    if (activeTabIndex > 0) {
      setActiveTabIndex((prev) => prev - 1);
    }
  };
  return (
    <div className="mt-4 p-2 w-full flex justify-end align-middle">
      {activeTabIndex > 0 && activeTabIndex < tabDetails.length - 1 && (
        <Button
          isIconOnly
          variant="faded"
          aria-label="Take a photo"
          onClick={hadlePrev}
        >
          <img src="/images/shape/back.svg" />
        </Button>
      )}
      {activeTabIndex < tabDetails.length - 1 && (
        <Button color="primary" onClick={handleNext} className="ml-2">
          Next
        </Button>
      )}
    </div>
  );
};

const DetailsHeader = ({ label, description }) => {
  return (
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
        {label}
      </h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
        {description}
      </p>
    </div>
  );
};

const DataImages = ({ activeTabInfo }) => {
  return (
    <div className="flex justify-center align-middle h-full w-full">
      <img src={`/images/user/${activeTabInfo.id}/${1}.svg`} height="h-[70%]" />
    </div>
  );
};

const ResumeWrapper = () => {
  const [originalData, setOriginalData] = useState(tabDetails);
  const [addNewInfoId, setAddNewInfoId] = useState("");

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTabInfo, setActiveTabInfo] = useState(originalData[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setActiveTabInfo(originalData[activeTabIndex]);
  }, [activeTabIndex, originalData]);

  useEffect(() => {
    if (addNewInfoId) {
      setOriginalData((prevData) => {
        const updatedData = prevData.map((eachData) => {
          if (eachData.id !== addNewInfoId) {
            return eachData;
          } else {
            let fields = [];
            for (let key in eachData.data) {
              fields = eachData.data[key];
              break;
            } // get the fields related to id
            const id = uuidv4();
            const fieldsToAdd = fields.map((eachField) => {
              return { ...eachField, id: `${eachField.id}#${id}` };
            }); // modify the fields to form new entries
            const newInfo = { ...eachData };
            newInfo.data = {
              [uuidv4()]: fieldsToAdd,
              ...newInfo.data,
            }; // add newly formed fields to exisiting data
            return newInfo;
          }
        });
        setAddNewInfoId("");
        return updatedData;
      });
    }
  }, [addNewInfoId]);

  return (
    <section className="text-gray-600 body-font relative flex-col md:flex-row flex h-dvh">
      <div className="resume-container container px-3 py-24 sm:w-full md:w-[70%] h-full flex flex-col justify-center align-middle">
        <AppDropdown
          setActiveTabIndex={setActiveTabIndex}
          activeTabIndex={activeTabIndex}
          setIsSubmitted={setIsSubmitted}
        />
        <DetailsHeader
          label={activeTabInfo?.label}
          description={activeTabInfo?.description}
        />
        <div className="w-2/3 mx-auto">
          <div className="max-h-[530px] flex flex-wrap -m-2 overflow-y-auto">
            <DetailsForm
              setAddNewInfoId={setAddNewInfoId}
              activeTabInfo={activeTabInfo}
              activeTabIndex={activeTabIndex}
              setOriginalData={setOriginalData}
              setUserData={setUserData}
              setIsSubmitted={setIsSubmitted}
            />
            <DetailsFooter
              activeTabIndex={activeTabIndex}
              setActiveTabIndex={setActiveTabIndex}
            />
          </div>
        </div>
      </div>
      <div className="border-l md:w-[50%] bg-gray-100 sm:w-full overflow-y-auto hidden md:block">
        {isSubmitted ? (
          <ResumeDisplay userData={userData} originalData={originalData} />
        ) : (
          <DataImages activeTabInfo={activeTabInfo} />
        )}
      </div>
    </section>
  );
};

export default ResumeWrapper;
