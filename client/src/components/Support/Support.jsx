import { useForm } from "react-hook-form";
import { Image } from "@nextui-org/image";

import AppLogo from "../AppLogo";
import emailjs from "@emailjs/browser";

const SupportPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const navigate = useNavigate();

  const onSubmit = (data) => {
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        data,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
          from_name: "Ganesh Danuri",
        }
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message. Please try again.");
        }
      );
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
                Let's Connect!
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Reach Out for Collaborations or Questions
              </h1>
              <p>
                Whether you have a project idea, a question about my work, or
                just want to say hello, I'm always excited to hear from fellow
                developers and tech enthusiasts.
              </p>

              <div className="mt-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-5">
                    <input
                      {...register("reply_to", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                      type="text"
                      placeholder="Your email address"
                      className="rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />
                    {errors.reply_to && (
                      <span className="text-red-500 ml-3">
                        Please enter a valid email address
                      </span>
                    )}

                    <textarea
                      {...register("message", { required: true })}
                      type="text"
                      placeholder="Your message"
                      className="rounded-md border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />
                    {errors.message && (
                      <span className="text-red-500 ml-3">
                        Please enter a message
                      </span>
                    )}

                    <button
                      type="submit"
                      aria-label="send message button"
                      className="flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                    >
                      Send Message
                    </button>
                  </div>
                </form>

                <p className="mt-5 text-black dark:text-white">
                  I typically respond within 24-48 hours.
                </p>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/support/collaboration.svg"
                  alt="collaboration illustration"
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
              Connect With Me
            </h2>
            <div className="flex flex-col justify-between">
              <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 m-10">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                  GitHub
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Check out my open-source projects and contributions.
                </p>
                <a
                  href="https://github.com/ganeshdanuri/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  github.com/ganeshdanuri
                </a>
              </div>

              <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 m-10">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                  Twitter
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Follow me for tech insights and project updates.
                </p>
                <a
                  href="https://x.com/ganeshdanuri1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  @ganeshdanuri1
                </a>
              </div>

              <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 m-5">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                  Linkedin
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get a glimpse of my coding journey and daily dev life.
                </p>
                <a
                  href="https://www.linkedin.com/in/ganeshdanuri/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  @ganeshdanuri
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
