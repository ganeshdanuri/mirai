import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { Github, Twitter, Linkedin, Home } from "lucide-react";

import AppLogo from "../AppLogo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  reply_to: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(1, { message: "Please enter a message" }),
});

const SocialLink = ({ href, icon: Icon, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 text-blue-500 hover:underline"
  >
    <Icon className="h-5 w-5" />
    <span>{children}</span>
  </a>
);

const SupportPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reply_to: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        data,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
          from_name: "Ganesh Danuri",
        }
      );
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background p-4 flex justify-between items-center shadow-md">
        <AppLogo className="w-24 md:w-32" />
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={backToHome}
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </header>

      <div className="flex flex-col lg:flex-row flex-grow">
        <section className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 text-center">
              Let's Connect!
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 text-center">
              Whether you have a project idea, a question about my work, or just
              want to say hello, I'm always excited to hear from fellow
              developers and tech enthusiasts.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="reply_to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </Form>

            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground text-center">
              I typically respond within 24-48 hours.
            </p>
          </div>
        </section>

        <section className="w-full lg:w-1/2 bg-muted p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 text-center">
              Connect With Me
            </h2>
            <div className="grid gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl text-center">
                    GitHub
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-center">
                    Check out my open-source projects and contributions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <SocialLink
                    href="https://github.com/ganeshdanuri/"
                    icon={Github}
                  >
                    <span className="text-sm sm:text-base">
                      github.com/ganeshdanuri
                    </span>
                  </SocialLink>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl text-center">
                    Twitter
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-center">
                    Follow me for tech insights and project updates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <SocialLink href="https://x.com/ganeshdanuri1" icon={Twitter}>
                    <span className="text-sm sm:text-base">@ganeshdanuri1</span>
                  </SocialLink>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl text-center">
                    LinkedIn
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-center">
                    Connect with me professionally.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <SocialLink
                    href="https://www.linkedin.com/in/ganeshdanuri/"
                    icon={Linkedin}
                  >
                    <span className="text-sm sm:text-base">@ganeshdanuri</span>
                  </SocialLink>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
