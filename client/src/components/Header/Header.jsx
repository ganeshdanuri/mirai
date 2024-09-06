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
import { useRef } from "react"; // For focus management

import AppLogo from "../AppLogo";
import Login from "../Login/Login";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const menuData = [
  { title: "Home", path: "/" },
  { title: "Support", path: "/support" },
  // ... other menu items
];

const Header = () => {
  const dialogRef = useRef(null);

  const renderMenu = () => (
    <nav className="flex flex-col space-y-4">
      {menuData.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="text-sm font-medium text-muted-foreground hover:text-primary"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="flex justify-between items-center p-3 sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex">
        <AppLogo />
      </div>
      <nav className="hidden md:block">
        <div className="flex items-center space-x-6">
          {menuData.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
      <div className="flex items-center">
        <Link
          to="https://github.com/yourusername/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex"
        >
          <Button variant="ghost" size="sm">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <Login />
        <Dialog ref={dialogRef}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Menu</DialogTitle>
            </DialogHeader>
            <DialogDescription>{renderMenu()}</DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
