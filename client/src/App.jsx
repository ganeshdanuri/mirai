import ResumeWrapper from "./components/ResumeWrapper/ResumeWrapper";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
