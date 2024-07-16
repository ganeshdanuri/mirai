import { Button, Image } from "@nextui-org/react";
import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="h-dvh flex justify-center items-center flex-col"
    >
      <Image width={600} alt="404" src="/images/404/404-1.svg" />
      <Button color="primary" variant="shadow" onClick={() => navigate("/")}>
        Return to Home
      </Button>
    </div>
  );
}
