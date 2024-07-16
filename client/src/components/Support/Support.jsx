import { useState } from "react";
import { Image } from "@nextui-org/image";
import { useNavigate } from "react-router-dom";
import AppLogo from "../AppLogo";

const SupportPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex w-full h-full relative">
      <section className="overflow-hidden md:pt-40 w-[50%]">
        <div className="absolute top-5 left-9">
          <AppLogo />
        </div>
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex justify-center items-center">
            <div className="w-full">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                Need Help? Contact Support
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Get Assistance from Our Team
              </h1>
              <p>
                If you have any questions, feedback, or issues, feel free to
                reach out to our support team. We are here to help you.
              </p>

              <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-5">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Enter your email address"
                      className="rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />
                    <button
                      onClick={() => navigate("/contact")}
                      aria-label="contact support button"
                      className="flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                    >
                      Contact Support
                    </button>
                  </div>
                </form>

                <p className="mt-5 text-black dark:text-white">
                  Our support team typically responds within 24 hours.
                </p>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/support/illustration.svg"
                  alt="support illustration"
                  width={800}
                  height={600}
                  className="absolute -left-11.5 top-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 dark:bg-gray-800 py-10 w-[50%] h-full">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-8">
              Additional Resources
            </h2>
            <div className="flex flex-col justify-between">
              <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 m-10">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                  Knowledge Base
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Explore our comprehensive knowledge base for answers to common
                  questions and troubleshooting tips.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 m-10">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                  Community Forums
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join discussions and connect with other users in our community
                  forums to get support and share your experiences.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 m-5">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                  Contact Us
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  For urgent inquiries or issues not covered by our resources,
                  please reach out to us directly via email or phone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
