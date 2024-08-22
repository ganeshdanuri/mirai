import { Image } from "@nextui-org/image";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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
    <>
      <section className="pt-10 md:h-[90%]">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0 pb-10 lg:h-[70%]">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className="lg:w-1/2 w-full">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                🔥 Create a Killer Resume. Land Your Dream Job.
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                Free
                <span className="ml-5 mr-5 inline-block border-b-3 border-teal-400">
                  ATS Resume
                </span>
                Maker {"   "}
              </h1>
              <p>
                A polished and ATS-optimized resume that positions you as a top
                candidate and helps you land your dream job faster.
              </p>

              <div className="mt-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-wrap gap-5">
                    <div className="flex flex-col">
                      <input
                        {...register("reply_to", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                        type="text"
                        placeholder="Your email address"
                        className="h-12 rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                      />
                      {errors.reply_to && (
                        <span className="text-red-500 ml-3">
                          Please enter a valid email address
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      aria-label="send message button"
                      className="h-12 flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                    >
                      Get Started
                    </button>
                  </div>
                </form>
                <p className="mt-5 text-black dark:text-white">
                  Try Our Free Forever Resume Builder - No Credit Card Needed!
                </p>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={56}
                  height={206}
                  className="absolute -left-10.5 top-0"
                />
                <Image
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={36.9}
                  height={36.7}
                  className="absolute bottom-0 right-0 z-10"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className=" relative aspect-[700/444] w-full">
                  <Image
                    src="/images/hero/background.svg"
                    width={800.64}
                    height={1000.66}
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="bg-gray-100 dark:bg-gray-800 lg:h-[30%] flex flex-col items-center justify-center p-5">
          <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  ATS-Optimized Resumes
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Create resumes that are optimized for Applicant Tracking
                  Systems (ATS), ensuring your resume gets noticed by
                  recruiters.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  Easy-to-Use Interface
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our intuitive interface makes it simple to build and customize
                  your resume with no technical skills required.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  Free Forever
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Enjoy unlimited access to our resume builder without any
                  subscription fees or credit card requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Hero;
