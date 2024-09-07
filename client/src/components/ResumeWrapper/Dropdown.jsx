import { useEffect, useState } from "react";
import { tabDetails } from "../../constants/data-constants";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Button } from "@/ui/button";

import AppLogo from "../AppLogo";

const AppDropdown = ({ activeTabIndex, setActiveTabIndex, setIsSubmitted }) => {
  const [selectedKey, setSelectedKey] = useState("0");

  useEffect(() => {
    setSelectedKey(`${activeTabIndex}`);
  }, [activeTabIndex]);

  return (
    <div className="absolute top-5 left-5 flex justify-between w-[55%]">
      <AppLogo />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {tabDetails.map((eachTab, i) => (
            <DropdownMenuItem
              key={i}
              onSelect={() => {
                setSelectedKey(`${i}`);
                setActiveTabIndex(i);
                setIsSubmitted(false);
              }}
            >
              {eachTab.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AppDropdown;
