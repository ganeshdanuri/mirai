import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

// This array will hold all your templates
const templates = [
  {
    id: 1,
    title: "Basic Template",
    description: "A simple starting point for your project",
    image: "/api/placeholder/400/200", // Replace with actual image path
    link: "/templates/basic",
  },
  // Add more templates here as needed
];

const TemplatesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Templates</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-40 object-cover rounded-md"
              />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to={template.link}>Use This Template</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
