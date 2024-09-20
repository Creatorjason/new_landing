import FeatureSection from "@/components/FeatureSection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import TransferForm from "@/components/TransferForm";
import CallToAction from "@/components/CallToAction";
import Security from "@/components/Security";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/hooks/AnimateOnScroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#141F1F]">
      <div className="container mx-auto">
        <Header />
        <div className="container mx-auto">
          <AnimateOnScroll className="line-bg">
            <div className="line-bg-2"></div>
            <Hero />
          </AnimateOnScroll>
          <AnimateOnScroll className="flex justify-center gap-4 md:gap-32 flex-wrap p-4 md:p-16 mb-10 bg-custom-gradient">
            <FeatureSection />
            <TransferForm />
          </AnimateOnScroll>
          <AnimateOnScroll>
            <Testimonials />
          </AnimateOnScroll>
          <AnimateOnScroll>
            <CallToAction />
          </AnimateOnScroll>
          <AnimateOnScroll>
            <Security />
          </AnimateOnScroll>
        </div>
        <Footer />
      </div>
    </main>
  );
}