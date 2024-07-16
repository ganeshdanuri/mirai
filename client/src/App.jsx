import ErrorPage from "./components/Error/Error";
import ResumeWrapper from "./components/ResumeWrapper/ResumeWrapper";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Home from "./components/Home/Home";
import SupportPage from "./components/Support/Support";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "resume",
    element: <ResumeWrapper />,
  },
  {
    path: "support",
    element: <SupportPage />,
  },
]);

function App() {
  return (
    <main className="main-container">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
