import { useRef } from "react";
import Header from "./Header";
import Hero from "./Hero";
import SupportPage from "./Support";
import TemplatesShowcase from "./TemplatesShowcase";

const Home = () => {
  const supportPageRef = useRef();
  const templatesRef = useRef();

  return (
    <>
      <Header supportPageRef={supportPageRef} templatesRef={templatesRef} />
      <Hero />
      {/* <TemplatesShowcase /> */}
      <SupportPage />
    </>
  );
};

export default Home;
