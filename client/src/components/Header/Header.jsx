import { Link } from "react-router-dom";
import { MenuIcon, Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

import AppLogo from "../AppLogo";

const menuData = [
  { title: "Home", path: "/" },
  { title: "Templates", path: "/templates" },
  { title: "Support", path: "/support" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 md:h-20 items-center justify-between pl-5 pr-5">
        <div className="flex items-center">
          <AppLogo className="w-24 md:w-32" />
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {menuData.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-sm lg:text-base font-medium text-foreground/60 hover:text-foreground transition-colors duration-200"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link
            to="https://github.com/ganeshdanuri/mirai"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repo 🌟
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  Menu
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <nav className="flex flex-col space-y-4 mt-4">
                  {menuData.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="text-base font-medium text-foreground/60 hover:text-foreground transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;
