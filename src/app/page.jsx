import Hero from "../sections/hero";
import Cars from "../sections/cars";
import About from "@/sections/about";
import Contact from "@/sections/contact";

export default function Home() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>

      <section id="cars">
        <Cars />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
