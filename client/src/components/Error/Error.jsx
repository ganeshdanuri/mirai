import { useRouteError, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="h-dvh flex justify-center items-center flex-col"
    >
      <img width={600} alt="404" src="/images/404/404-1.svg" />
      <Button onClick={() => navigate("/")}>Return to Home</Button>
    </div>
  );
}
