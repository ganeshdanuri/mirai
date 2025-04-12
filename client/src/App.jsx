import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ResumeBuilder from "./components/ResumeWrapper/ResumeBuilder";
import ErrorPage from "./components/Error";
import Home from "./components/Home";
import SupportPage from "./components/Support";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "resume",
    element: <ResumeBuilder />,
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
