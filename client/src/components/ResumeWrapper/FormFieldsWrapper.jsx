import { Button, Divider, Tooltip } from "@nextui-org/react";
import { inputStyle } from "../../constants/data-constants";
import { handleGenerate } from "../../utils/app-utils";
import { useState } from "react";

/* eslint-disable react/prop-types */
const FormInput = ({
  activeTabInfo,
  register,
  eachInfo,
  getValues,
  setValue,
}) => {
  const { id, label, type, AI, info } = eachInfo;
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`w-full p-2 ${type === "textArea" ? "w-full" : "lg:w-1/2"}`}
    >
      <div className="relative">
        <label
          htmlFor={id}
          className="leading-7 text-sm text-gray-600 flex items-center"
        >
          <span>{label}</span>
          {info && (
            <Tooltip content={info}>
              <img
                src="/images/shape/info.svg"
                width={"15px"}
                className="ml-1"
              />
            </Tooltip>
          )}
        </label>
        {type === "textArea" ? (
          <>
            <textarea
              {...register(id)}
              className="bg-gray-100 flex-grow w-full bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
            {AI && (
              <div className="flex">
                <Button
                  onClick={() =>
                    handleGenerate(
                      id,
                      activeTabInfo.id,
                      getValues(id),
                      setValue,
                      setLoading
                    )
                  }
                  isLoading={loading}
                  spinner={
                    <svg
                      className="animate-spin h-5 w-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                      />
                    </svg>
                  }
                >
                  Generate with AI
                </Button>
                <Tooltip content="Please add the description and click on generate AI">
                  <img
                    src="/images/shape/info.svg"
                    width={"15px"}
                    className="ml-1"
                  />
                </Tooltip>
              </div>
            )}
          </>
        ) : (
          <input {...register(id)} type={type} className={inputStyle} />
        )}
      </div>
    </div>
  );
};

const FormFieldsWrapper = (props) => {
  const { id, activeTabInfo, data, index, handleAdd, handleDelete } = props;

  const isFirstItem = index === 0;
  return (
    <>
      {activeTabInfo?.mutliple && (
        <>
          {!isFirstItem && <Divider className="my-4" />}
          <div className="w-full flex justify-between p-2 pt-5">
            <h1>
              {index + 1}. {activeTabInfo?.text}
            </h1>
            {isFirstItem ? (
              <Button
                color="primary"
                variant="faded"
                onClick={() => handleAdd(activeTabInfo?.id)}
              >
                + Add {activeTabInfo?.label}
              </Button>
            ) : (
              <Button
                isIconOnly
                onClick={() => handleDelete(id, activeTabInfo.id)}
              >
                <img src="images/shape/delete.svg" />
              </Button>
            )}
          </div>
        </>
      )}
      {data.map((eachInfo) => {
        return <FormInput key={eachInfo.id} eachInfo={eachInfo} {...props} />;
      })}
    </>
  );
};

export default FormFieldsWrapper;
