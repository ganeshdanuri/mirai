import { useRef } from "react";
import Header from "./Header";
import Hero from "./Hero";
import SupportPage from "./Support";

const Home = () => {
  const supportPageRef = useRef();
  const templatesRef = useRef();

  return (
    <>
      <Header supportPageRef={supportPageRef} templatesRef={templatesRef} />
      <Hero />
      <SupportPage />
    </>
  );
};

export default Home;
