import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Play,
  Ruler,
  Send,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { ProductCard } from "./ProductCard";

export function Hero({ scrollToCollection, whatsappUrl }) {
  const [showAlternateImage, setShowAlternateImage] = useState(false);

  const heroImage = showAlternateImage
    ? "https://demillus.vestemuitomelhor.com.br/wp-content/uploads/2026/02/banner-h001.jpg"
    : "https://images.unsplash.com/photo-1642945680515-faada4c0ca7b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const heroCaption = showAlternateImage
    ? "Lingerie em foco"
    : "Essenciais que abraçam";

  return (
    <section className="hero section-pad">
      <div className="hero-copy">
        <p className="eyebrow">
          <span /> Conforto em estado de alma
        </p>
        <h1>
          Vista o que faz você <em>se sentir bem.</em>
        </h1>
        <p className="hero-text">
          Peças essenciais, bonitas por natureza e feitas para acompanhar o seu
          ritmo. Lingerie e underwear que respeitam seu corpo todos os dias.
        </p>
        <div className="hero-actions">
          <button className="button button-dark" onClick={scrollToCollection}>
            Ver coleção <ArrowRight size={17} />
          </button>
          <a
            className="button button-ghost"
            href={whatsappUrl(
              "Olá, Alma! Gostaria de ajuda para escolher minha peça.",
            )}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={17} /> Falar no WhatsApp
          </a>
        </div>
        <div className="hero-note">
          <div className="avatar-stack">
            <span>J</span>
            <span>M</span>
            <span>C</span>
          </div>
          <span>Mais de 2.000 pessoas vestindo Alma</span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-image-wrap">
          <img
            src={heroImage}
            alt="Modelo usando lingerie em uma campanha de moda íntima"
          />
          <div className="image-caption">
            <span>{showAlternateImage ? "02 / 04" : "01 / 04"}</span>
            <span>{heroCaption}</span>
          </div>
        </div>
        <button
          type="button"
          className={`hero-stamp${showAlternateImage ? " is-active" : ""}`}
          onClick={() => setShowAlternateImage((current) => !current)}
          aria-pressed={showAlternateImage}
          aria-label={
            showAlternateImage
              ? "Voltar para a foto original do banner"
              : "Mostrar uma foto alternativa no banner"
          }
        >
          <span>
            feito para
            <br />
            ser sentido
          </span>
          <ArrowRight size={19} />
        </button>
      </div>
    </section>
  );
}

export function Benefits({ benefits }) {
  return (
    <section className="benefit-strip">
      <div className="benefit-inner">
        {benefits.map(({ icon: Icon, title, text }, index) => (
          <Reveal key={title} delay={index * 0.08}>
            <article className="benefit">
              <Icon size={24} strokeWidth={1.4} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Collection({ products, whatsappUrl, onOpenSizes }) {
  const pageSize = 6;
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(products.length / pageSize);
  const visibleProducts = products.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );

  return (
    <section className="collection section-pad" id="colecao">
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span /> Escolhas da comunidade
            </p>
            <h2>
              Nossa coleção <em>íntima</em>
            </h2>
          </div>
          <button className="text-link" onClick={onOpenSizes}>
            Guia de medidas <Ruler size={16} />
          </button>
        </div>
      </Reveal>
      <div className="product-grid">
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={product.name}
            product={product}
            index={page * pageSize + index}
            whatsappUrl={whatsappUrl}
          />
        ))}
      </div>
      {pageCount > 1 && (
        <div
          className="collection-pagination"
          aria-label="Navegação da coleção"
        >
          <button
            className="collection-page-button"
            onClick={() =>
              setPage((currentPage) => Math.max(currentPage - 1, 0))
            }
            disabled={page === 0}
            aria-label="Ver peças anteriores"
          >
            <ChevronLeft size={18} />
          </button>
          <span>
            Página <strong>{page + 1}</strong> de {pageCount}
          </span>
          <button
            className="collection-page-button"
            onClick={() =>
              setPage((currentPage) => Math.min(currentPage + 1, pageCount - 1))
            }
            disabled={page === pageCount - 1}
            aria-label="Ver mais peças"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}

export function Manifesto() {
  return (
    <section className="manifesto" id="manifesto">
      <div className="manifesto-image">
        <img
          src="https://demillus.vestemuitomelhor.com.br/wp-content/uploads/2026/06/BANNER-HOME.jpg"
          alt="Modelo apresentando uma peça de lingerie em campanha editorial"
        />
      </div>
      <div className="manifesto-copy">
        <p className="eyebrow">
          <span /> Nosso jeito de fazer
        </p>
        <h2>
          Menos excesso.
          <br />
          <em>Mais você.</em>
        </h2>
        <p>
          Acreditamos em roupas íntimas que não pedem atenção, mas fazem toda a
          diferença. Por isso criamos peças que unem tecnologia, beleza e uma
          sensação boa de estar no próprio corpo.
        </p>
        <div className="manifesto-signature">
          Alma é presença.<span>— desde 2018</span>
        </div>
      </div>
    </section>
  );
}

export function SocialProof({
  testimonials,
  activeTestimonial,
  setActiveTestimonial,
}) {
  return (
    <section className="social-proof section-pad">
      <Reveal>
        <div className="section-heading centered">
          <div>
            <p className="eyebrow">
              <span /> Quem veste, conta
            </p>
            <h2>
              Conforto que <em>se sente.</em>
            </h2>
          </div>
        </div>
      </Reveal>
      <div className="testimonial-layout">
        <div className="testimonial-feature">
          <div className="quote-mark">“</div>
          <div className="stars">★★★★★</div>
          <blockquote>{testimonials[activeTestimonial].text}</blockquote>
          <div className="testimonial-person">
            <img src={testimonials[activeTestimonial].image} alt="" />
            <div>
              <strong>{testimonials[activeTestimonial].name}</strong>
              <span>{testimonials[activeTestimonial].city}</span>
            </div>
          </div>
          <div className="slider-controls">
            <button
              onClick={() =>
                setActiveTestimonial(
                  (activeTestimonial + testimonials.length - 1) %
                    testimonials.length,
                )
              }
              aria-label="Depoimento anterior"
            >
              ←
            </button>
            <span>
              0{activeTestimonial + 1} <i>/ 0{testimonials.length}</i>
            </span>
            <button
              onClick={() =>
                setActiveTestimonial(
                  (activeTestimonial + 1) % testimonials.length,
                )
              }
              aria-label="Próximo depoimento"
            >
              →
            </button>
          </div>
        </div>
        <div className="testimonial-portrait">
          <img
            src="https://demillus.vestemuitomelhor.com.br/wp-content/uploads/2026/06/067843_20_016198_70_0999.jpg"
            alt="Modelo usando lingerie em uma campanha de moda íntima"
          />
          <span className="portrait-label">
            <Play size={13} fill="currentColor" /> histórias reais
          </span>
        </div>
      </div>
    </section>
  );
}

export function Support({ faqs, activeFaq, setActiveFaq, whatsappUrl }) {
  return (
    <>
      <section className="faq-section" id="duvidas">
        <div className="faq-inner">
          <Reveal>
            <div className="faq-intro">
              <p className="eyebrow">
                <span /> Estamos aqui para ajudar
              </p>
              <h2>
                Tem alguma
                <br />
                <em>dúvida?</em>
              </h2>
              <p>
                Se não encontrar sua resposta, nosso time está a uma mensagem de
                distância.
              </p>
              <a
                className="button button-dark"
                href={whatsappUrl(
                  "Olá, Alma! Tenho uma dúvida sobre um produto.",
                )}
                target="_blank"
                rel="noreferrer"
              >
                Falar com a gente <Send size={16} />
              </a>
            </div>
          </Reveal>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div
                className={activeFaq === index ? "faq-item active" : "faq-item"}
                key={question}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                  aria-expanded={activeFaq === index}
                >
                  <span>0{index + 1}</span>
                  <strong>{question}</strong>
                  <ChevronDown size={19} />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: activeFaq === index ? "auto" : 0,
                    opacity: activeFaq === index ? 1 : 0,
                  }}
                  className="faq-answer"
                >
                  <p>{answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="newsletter section-pad">
        <div>
          <p className="eyebrow">
            <span /> Da Alma para a sua caixa de entrada
          </p>
          <h2>
            Novidades que <em>fazem bem.</em>
          </h2>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="email">
            Receba lançamentos, cuidados e uma dose de inspiração.
          </label>
          <div className="email-row">
            <input
              id="email"
              type="email"
              placeholder="seu melhor e-mail"
              required
            />
            <button type="submit" aria-label="Assinar newsletter">
              <ArrowRight size={19} />
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
