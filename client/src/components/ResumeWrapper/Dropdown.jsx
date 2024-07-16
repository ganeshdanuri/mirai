/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { tabDetails } from "../../constants/data-constants";
import AppLogo from "../AppLogo";

const AppDropdown = ({ activeTabIndex, setActiveTabIndex, setIsSubmitted }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));

  useEffect(() => {
    setSelectedKeys(new Set([`${activeTabIndex}`]));
  }, [activeTabIndex]);

  return (
    <div className="absolute top-5 left-10 flex justify-between w-[55%]">
      <AppLogo />
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" isIconOnly>
            <img src="/images/shape/menu.svg" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onAction={(key) => {
            setActiveTabIndex(parseInt(key));
            setIsSubmitted(false);
          }}
        >
          {tabDetails.map((eachTab, i) => {
            return <DropdownItem key={i}>{eachTab.label}</DropdownItem>;
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default AppDropdown;
