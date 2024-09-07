import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Button } from "@/ui/button";

const TemplateCard = ({ title, description, image }) => (
  <Card className="w-[300px] overflow-hidden">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-md"
      />
    </CardContent>
    <CardFooter>
      <Button className="w-full">Use Template</Button>
    </CardFooter>
  </Card>
);

const TemplatesShowcase = () => {
  const templates = [
    {
      title: "Professional",
      description: "Clean and modern design",
      image: "/images/professional.jpg",
    },
    {
      title: "Creative",
      description: "Stand out with unique layouts",
      image: "/images/creative.jpg",
    },
    {
      title: "Academic",
      description: "Perfect for researchers and educators",
      image: "/images/academic.jpg",
    },
  ];

  return (
    <div className="py-12 bg-gray-50" id="templates">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Choose Your Template
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {templates.map((template, index) => (
            <TemplateCard key={index} {...template} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesShowcase;
