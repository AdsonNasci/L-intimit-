import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  Hero,
  Benefits,
  Collection,
  Manifesto,
  SocialProof,
  Support,
} from "../components/HomeSections";
import { SizeModal } from "../components/SizeModal";
import { AdminPanel } from "../components/AdminPanel";
import { AuthPanel } from "../components/AuthPanel";
import { signOut } from "../lib/supabase";
import { useAuthSession } from "../hooks/useAuthSession";
import {
  benefits,
  faqs,
  products,
  testimonials,
  WHATSAPP_NUMBER,
} from "../data/content";

export function HomePage() {
  const [catalogProducts, setCatalogProducts] = useState(() => {
    try {
      const savedProducts = window.localStorage.getItem("lintimite-catalog");
      const initialProducts = savedProducts
        ? JSON.parse(savedProducts)
        : products;
      return initialProducts.map((product, index) => ({
        ...product,
        id: product.id || `product-${index + 1}`,
      }));
    } catch {
      return products;
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showSizes, setShowSizes] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { session: authSession } = useAuthSession();
  useEffect(() => {
    window.localStorage.setItem(
      "lintimite-catalog",
      JSON.stringify(catalogProducts),
    );
  }, [catalogProducts]);
  const whatsappUrl = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const openSizes = () => setShowSizes(true);
  const openAdmin = () => {
    if (authSession) setShowAdmin(true);
    else setShowAuth(true);
  };
  const scrollToCollection = () =>
    document.getElementById("colecao")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="site-shell">
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onOpenSizes={openSizes}
        onOpenAdmin={openAdmin}
        whatsappUrl={whatsappUrl}
      />
      <main id="top">
        <Hero
          scrollToCollection={scrollToCollection}
          whatsappUrl={whatsappUrl}
        />
        <Benefits benefits={benefits} />
        <Collection
          products={catalogProducts}
          whatsappUrl={whatsappUrl}
          onOpenSizes={openSizes}
        />
        <Manifesto />
        <SocialProof
          testimonials={testimonials}
          activeTestimonial={activeTestimonial}
          setActiveTestimonial={setActiveTestimonial}
        />
        <Support
          faqs={faqs}
          activeFaq={activeFaq}
          setActiveFaq={setActiveFaq}
          whatsappUrl={whatsappUrl}
        />
      </main>
      <Footer whatsappUrl={whatsappUrl} onOpenSizes={openSizes} />
      {showSizes && <SizeModal onClose={() => setShowSizes(false)} />}
      {showAdmin && (
        <AdminPanel
          products={catalogProducts}
          onChange={setCatalogProducts}
          onClose={() => setShowAdmin(false)}
          user={authSession?.user}
          onSignOut={async () => {
            await signOut();
            setShowAdmin(false);
          }}
        />
      )}
      {showAuth && (
        <AuthPanel
          onClose={() => setShowAuth(false)}
          onAuthenticated={() => {
            setShowAuth(false);
            setShowAdmin(true);
          }}
        />
      )}
    </div>
  );
}
