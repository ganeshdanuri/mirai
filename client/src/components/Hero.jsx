import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Heart,
  Star,
  GitFork,
  Users,
} from "lucide-react";
import { Button } from "@/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import FeatureCards from "./Features";
import AppLogo from "./AppLogo";

const Hero = () => {
  const navigate = useNavigate();

  const handleCreateResume = () => {
    navigate("resume");
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left column: Hero content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 z-10">
            <div className="flex items-center mb-6 space-x-4">
              <AppLogo className="w-28 md:w-32" />
              <span className="relative top-[2px] bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                🚀 Open Source
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Build Your <span className="text-primary">ATS-Optimized</span>{" "}
              Resume with Open Source
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              Free, customizable, and community-driven resume builder. No
              tracking, no paywalls, just pure open source goodness.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                onClick={handleCreateResume}
                size="lg"
                className="w-full sm:w-auto text-lg font-medium"
              >
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-lg font-medium"
                onClick={() =>
                  window.open("https://github.com/ganeshdanuri/mirai", "_blank")
                }
              >
                <GitHubLogoIcon className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                <span>2.1k stars</span>
              </div>
              <div className="flex items-center">
                <GitFork className="h-4 w-4 mr-1" />
                <span>340 forks</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>15k+ users</span>
              </div>
            </div>
          </div>

          {/* Right column: Image with absolute positioned badges */}
          <div className="hidden lg:block lg:w-1/2 ml-10 relative">
            <img
              src="/images/hero/background.svg"
              alt="Open Source Resume Builder"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />

            {/* Open Source Badge - Absolutely positioned */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center space-x-3 max-w-xs">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">MIT Licensed</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Free to use & modify
                </p>
              </div>
            </div>

            {/* Community Badge - Absolutely positioned */}
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center space-x-3 max-w-xs">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Community Driven</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Built by developers, for developers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="mt-20">
          <FeatureCards />
        </div>
      </div>
    </section>
  );
};

export default Hero;
