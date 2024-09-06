import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle } from "lucide-react";

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <CheckCircle className="mr-2 h-5 w-5" />
            ATS-Optimized Resumes
          </CardTitle>
        </CardHeader>
        <CardContent>
          Create resumes that pass through Applicant Tracking Systems, ensuring
          your application gets noticed.
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <CheckCircle className="mr-2 h-5 w-5" />
            Easy-to-Use Interface
          </CardTitle>
        </CardHeader>
        <CardContent>
          Our intuitive builder makes it simple to create and customize your
          resume, no technical skills required.
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <CheckCircle className="mr-2 h-5 w-5" />
            100% Free, Forever
          </CardTitle>
        </CardHeader>
        <CardContent>
          Enjoy unlimited access to our resume builder without any hidden fees
          or subscriptions.
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureCards;
