import { LockKeyhole, Menu, MessageCircle, X } from "lucide-react";
import brandLogo from "../Img/WhatsApp Image 2026-09-21 at 15.10.18.jpeg";

export function Header({
  menuOpen,
  setMenuOpen,
  onOpenSizes,
  onOpenAdmin,
  whatsappUrl,
}) {
  return (
    <>
      <div className="announcement">
        <span>Oferta especial de lançamento</span>
        <span className="announcement-dot">•</span>
        <span>Primeira troca por nossa conta</span>
      </div>
      <header className="navbar">
        <a className="brand" href="#top" aria-label="L'intimité - início">
          <img
            className="brand-logo"
            src={brandLogo}
            alt="L'intimité Moda Íntima"
          />
        </a>
        <nav
          className={menuOpen ? "nav-links open" : "nav-links"}
          aria-label="Navegação principal"
        >
          <a href="#colecao" onClick={() => setMenuOpen(false)}>
            Coleção
          </a>
          <a href="#manifesto" onClick={() => setMenuOpen(false)}>
            Manifesto
          </a>
          <a
            href="#medidas"
            onClick={(event) => {
              event.preventDefault();
              setMenuOpen(false);
              onOpenSizes();
            }}
          >
            Guia de medidas
          </a>
          <a href="#duvidas" onClick={() => setMenuOpen(false)}>
            Dúvidas
          </a>
        </nav>
        <div className="nav-actions">
          <button
            className="admin-trigger"
            onClick={onOpenAdmin}
            title="Abrir gestão do catálogo"
          >
            <LockKeyhole size={14} /> Admin
          </button>
          <a
            className="nav-whatsapp"
            href={whatsappUrl("Olá, Alma! Gostaria de conhecer a coleção.")}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} /> Atendimento
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
    </>
  );
}
