import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

import FeatureCards from "./Features";

const Hero = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
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
              resume builder. No  card required!
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <Input
                    {...register("reply_to", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    type="email"
                    placeholder="Your email address"
                    className="w-full"
                  />
                  {errors.reply_to && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.reply_to.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full sm:w-auto">
                  Create Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Join thousands of job seekers who've landed their dream jobs!
            </p>
          </div>

          <div className="hidden lg:block lg:w-1/2 ml-10">
            <img
              src="/images/hero/background.svg"
              alt="Resume Builder"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
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
