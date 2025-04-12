import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/ui/button";

import FeatureCards from "./Features";

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
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Create Your <span className="text-primary">ATS-Optimized</span>{" "}
              Resume for Free
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              Land your dream job faster with our polished and ATS-friendly
              resume builder. No credit card required!
            </p>

            {/* Main CTA Button */}
            <div className="mb-6">
              <Button
                onClick={handleCreateResume}
                size="lg"
                className="w-full sm:w-auto text-lg font-medium"
              >
                Create Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Join thousands of job seekers who've landed their dream jobs!
            </p>
          </div>

          {/* Right column: Image with absolute positioned badge */}
          <div className="hidden lg:block lg:w-1/2 ml-10 relative">
            <img
              src="/images/hero/background.svg"
              alt="Resume Builder"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />

            {/* Preview Badge - Absolutely positioned */}
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center space-x-3 max-w-xs">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">ATS Verified</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Passes ATS screening tests
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
