import { Camera } from "lucide-react";
import brandLogo from "../Img/WhatsApp Image 2026-09-21 at 15.10.18.jpeg";

export function Footer({ whatsappUrl, onOpenSizes }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a className="brand" href="#top" aria-label="L'intimité - início">
            <img
              className="brand-logo"
              src={brandLogo}
              alt="L'intimité Moda Íntima"
            />
          </a>
          <p>
            Conforto que veste
            <br />
            você por inteiro.
          </p>
        </div>
        <div className="footer-col">
          <h3>Alma</h3>
          <a href="#manifesto">Manifesto</a>
          <a href="#colecao">Coleção</a>
          <a
            href="#medidas"
            onClick={(event) => {
              event.preventDefault();
              onOpenSizes();
            }}
          >
            Guia de medidas
          </a>
        </div>
        <div className="footer-col">
          <h3>Ajuda</h3>
          <a href="#duvidas">Trocas e devoluções</a>
          <a href="#duvidas">Prazos de entrega</a>
          <a href="#duvidas">Fale conosco</a>
        </div>
        <div className="footer-col">
          <h3>Atendimento</h3>
          <p>Seg a sex, 9h às 18h</p>
          <a href={whatsappUrl("Olá, Alma!")} target="_blank" rel="noreferrer">
            +55 11 99999-9999
          </a>
          <div className="socials">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <Camera size={18} />
            </a>
            <a
              href="https://tiktok.com"
              aria-label="TikTok"
              target="_blank"
              rel="noreferrer"
            >
              <span className="tiktok-icon">♪</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 Alma Intimates. Todos os direitos reservados.</span>
        <span>
          <a href="#top">Política de privacidade</a>
          <a href="#top">Termos de uso</a>
        </span>
      </div>
    </footer>
  );
}
