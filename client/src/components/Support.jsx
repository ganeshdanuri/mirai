import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { Github, Twitter, Linkedin } from "lucide-react";
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

  return (
    <div id="support" className="min-h-screen bg-background border-t-1">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
          Let's Connect!
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="max-w-md mx-auto">
              <p className="text-base md:text-lg text-muted-foreground mb-6 text-center">
                Whether you have a project idea, a question about my work, or
                just want to say hello, I'm always excited to hear from fellow
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

              <p className="mt-4 text-sm text-muted-foreground text-center">
                I typically respond within 24-48 hours.
              </p>
            </div>
          </section>

          <section className="w-full lg:w-1/2 bg-muted p-6 rounded-lg">
            <div className="max-w-md mx-auto">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-center">
                      GitHub
                    </CardTitle>
                    <CardDescription className="text-center">
                      Check out my open-source projects and contributions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <SocialLink
                      href="https://github.com/ganeshdanuri/"
                      icon={Github}
                    >
                      github.com/ganeshdanuri
                    </SocialLink>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-center">
                      Twitter
                    </CardTitle>
                    <CardDescription className="text-center">
                      Follow me for tech insights and project updates.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <SocialLink
                      href="https://x.com/ganeshdanuri1"
                      icon={Twitter}
                    >
                      @ganeshdanuri1
                    </SocialLink>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-center">
                      LinkedIn
                    </CardTitle>
                    <CardDescription className="text-center">
                      Connect with me professionally.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <SocialLink
                      href="https://www.linkedin.com/in/ganeshdanuri/"
                      icon={Linkedin}
                    >
                      @ganeshdanuri
                    </SocialLink>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
