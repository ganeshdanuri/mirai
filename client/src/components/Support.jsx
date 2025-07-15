import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { Github, Twitter, Linkedin, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/ui/card";
import { Button } from "@/ui/button";
import { Textarea } from "@/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/ui/input";

const formSchema = z.object({
  reply_to: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(1, { message: "Please enter a message" }),
});

const SocialLink = ({ href, icon: Icon, children, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 hover:underline"
    style={{ color }}
  >
    <Icon className="h-5 w-5" />
    <span>{children}</span>
  </a>
);

const BackgroundLines = () => (
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(transparent_1px,transparent_1px),_linear-gradient(to_right,#f0f0f0_1px,transparent_1px),_linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[length:20px_20px]" />
);

const SupportPage = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { reply_to: "", message: "" },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

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
      reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      id="support"
      className="relative min-h-screen bg-background border-t overflow-hidden"
    >
      <BackgroundLines />
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-foreground mb-8"
        >
          Let's Connect!
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-10">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md backdrop-blur-md bg-opacity-80"
          >
            <p className="text-center text-muted-foreground mb-6">
              Have a question, idea, or just want to say hi? Drop me a message
              and I’ll get back within 24–48 hours.
            </p>

            {isSubmitSuccessful && (
              <div className="flex justify-center items-center text-green-600 mb-4">
                <CheckCircle className="mr-2" /> Message sent!
              </div>
            )}

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={control}
                  name="reply_to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Form>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/3 grid gap-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-center">GitHub</CardTitle>
                <CardDescription className="text-center">
                  Check out my open-source projects.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <SocialLink
                  href="https://github.com/ganeshdanuri"
                  icon={Github}
                  color="#333"
                >
                  github.com/ganeshdanuri
                </SocialLink>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Twitter</CardTitle>
                <CardDescription className="text-center">
                  Follow for tech updates.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <SocialLink
                  href="https://x.com/ganeshdanuri1"
                  icon={Twitter}
                  color="#1DA1F2"
                >
                  @ganeshdanuri1
                </SocialLink>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">LinkedIn</CardTitle>
                <CardDescription className="text-center">
                  Connect professionally.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <SocialLink
                  href="https://www.linkedin.com/in/ganeshdanuri/"
                  icon={Linkedin}
                  color="#0077B5"
                >
                  @ganeshdanuri
                </SocialLink>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
