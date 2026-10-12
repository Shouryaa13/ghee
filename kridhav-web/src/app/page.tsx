import Announcement from "@/components/Announcement";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ScrollStory from "@/components/ScrollStory";
import ProductShowcase from "@/components/ProductShowcase";
import PurityProof from "@/components/PurityProof";
import GoldenTest from "@/components/GoldenTest";
import GiftBuilder from "@/components/GiftBuilder";
import Recipes from "@/components/Recipes";
import Subscription from "@/components/Subscription";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Wholesale from "@/components/Wholesale";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import MobileBar from "@/components/MobileBar";

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Announcement />
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <ScrollStory />
        <ProductShowcase />
        <PurityProof />
        <GoldenTest />
        <GiftBuilder />
        <Recipes />
        <Subscription />
        <Testimonials />
        <FAQ />
        <Wholesale />
      </main>
      <Footer />
      <CartDrawer />
      <MobileBar />
    </>
  );
}
