import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { IPhonesSection } from "@/sections/IPhones";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { UncommonSection } from "@/sections/Uncommon";

export default function Home() {
  return (
    <div>
      <Header />
      <section id="hero">
        <HeroSection />
      </section>
      <section id="work">
        <UncommonSection />
      </section>
      <section id="iphones">
        <IPhonesSection />
      </section>
      <section id="tape">
        <TapeSection />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="testimonials">
        <TestimonialsSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
    </div>
  );
}
