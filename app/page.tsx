import FeatureSection from "@/components/FeatureSection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import TransferForm from "@/components/TransferForm";
import CallToAction from "@/components/CallToAction";
import Security from "@/components/Security";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto">
        <Header />
        <div className="container mx-auto">
          <Hero />
          <div className="flex justify-center gap-4 md:gap-32 flex-wrap p-4 md:p-16 mb-10 bg-custom-gradient">
            <FeatureSection />
            <TransferForm />
          </div>
          <Testimonials />
          <CallToAction />
          <Security />
        </div>
        <Footer />
      </div>
    </main>
  );
}
