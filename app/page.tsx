import Features from "@/components/Features";
import Header from "@/components/Header";
import FAQs from "@/components/FAQs";
import CallToAction from "@/components/CallToAction";
import Security from "@/components/Security";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/hooks/AnimateOnScroll";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#141F1F]">
      <div className="container mx-auto">
        <Header />
        <div className="container mx-auto">
          <AnimateOnScroll className="line-bg">
            <Hero />
          </AnimateOnScroll>
          <AnimateOnScroll className="py-4 bg-white">
            <Features />
          </AnimateOnScroll>
          <AnimateOnScroll>
            <FAQs />
          </AnimateOnScroll>
          <AnimateOnScroll>
            <CallToAction />
          </AnimateOnScroll>
          {/* <AnimateOnScroll>
            <Security />
          </AnimateOnScroll> */}
        </div>
        <Footer />
      </div>
    </main>
  );
}