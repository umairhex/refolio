import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageSection from "../components/ui/PageSection";
import Container from "../components/ui/Container";
import ContactPageAnimated from "./ContactPageAnimated";
import ContactSection from "./ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — M UMAIR KHAN",
  description:
    "Get in touch to discuss your next project or collaboration. I'm currently accepting new projects and partnerships.",
};

export default function ContactPage() {
  return (
    <ContactPageAnimated>
      <main className="bg-background min-h-screen">
        <Navbar />

        <PageSection className="pt-40 pb-64">
          <Container>
            <div className="border-foreground/10 flex flex-col gap-8 overflow-hidden border-b pb-20">
              <div className="overflow-hidden">
                <h1 className="font-arsenica contact-reveal text-[15vw] leading-[0.8] font-medium tracking-tighter uppercase italic md:text-[10vw]">
                  Let&apos;s
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="contact-reveal text-[15vw] leading-[0.8] font-medium tracking-tighter uppercase md:text-[10vw]">
                  Connect
                </h1>
              </div>
            </div>

            <ContactSection />
          </Container>
        </PageSection>

        <Footer disableBodyTheme />
      </main>
    </ContactPageAnimated>
  );
}
