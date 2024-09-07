import { Divider } from "@nextui-org/react";
import { inputStyle } from "../../constants/data-constants";
import { handleGenerate } from "../../utils/app-utils";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/ui/toast";
import { Button } from "@/ui/button";

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
  const { toast } = useToast();

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
            <>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger>
                    <img
                      src="/images/shape/info.svg"
                      width={"15px"}
                      className="ml-1"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{info}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
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
                  onClick={(e) => {
                    e.preventDefault();
                    if (!getValues(id)) {
                      console.log("j");
                      toast({
                        title: "Scheduled: Catch up ",
                        description: "Friday, February 10, 2023 at 5:57 PM",
                        action: (
                          <ToastAction altText="Goto schedule to undo">
                            Undo
                          </ToastAction>
                        ),
                      });
                    } else {
                      handleGenerate(
                        id,
                        activeTabInfo.id,
                        getValues(id),
                        setValue,
                        setLoading
                      );
                    }
                  }}
                  variant="secondary"
                  type
                >
                  Generate with AI
                </Button>

                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger>
                      <img
                        src="/images/shape/info.svg"
                        width={"15px"}
                        className="ml-1"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Please add the description and click on generate AI</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
