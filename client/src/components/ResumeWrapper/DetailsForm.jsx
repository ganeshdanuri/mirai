import { tabDetails } from "../../constants/data-constants";
import { useForm } from "react-hook-form";
import FormFieldsWrapper from "./FormFieldsWrapper";

/* eslint-disable react/prop-types */
const DetailsForm = (props) => {
  const {
    activeTabIndex,
    activeTabInfo,
    setAddNewInfoId,
    setOriginalData,
    setUserData,
    setIsSubmitted,
  } = props;
  const { register, handleSubmit, getValues, setValue } = useForm();
  const onSubmit = (data) => {
    setIsSubmitted(true);
    setUserData(data);
  };
  const handleAdd = (id) => {
    setAddNewInfoId(id);
  };

  const handleDelete = (deleteId, parentId) => {
    setOriginalData((prevData) => {
      const updatedData = prevData.map((eachData) => {
        if (eachData.id !== parentId) {
          return eachData;
        } else {
          const newInfo = eachData.data;
          delete newInfo[deleteId];
          return { ...eachData, data: newInfo };
        }
      });
      return updatedData;
    });
  };

  return (
    <form className="flex flex-wrap h-full" onSubmit={handleSubmit(onSubmit)}>
      {Object.entries(activeTabInfo?.data).map(([key, eachData], index) => {
        return (
          <FormFieldsWrapper
            key={key}
            activeTabInfo={activeTabInfo}
            data={eachData}
            register={register}
            index={index}
            handleAdd={handleAdd}
            id={key}
            handleDelete={handleDelete}
            setValue={setValue}
            getValues={getValues}
          />
        );
      })}
      {activeTabIndex === tabDetails.length - 1 && (
        <input className="w-full m-2 p-3 submit-button" type="submit" />
      )}
    </form>
  );
};

export default DetailsForm;
