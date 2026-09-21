import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";

export function ProductCard({ product, index, whatsappUrl }) {
  const [size, setSize] = useState("M");
  const [color, setColor] = useState(0);

  return (
    <Reveal delay={index * 0.08}>
      <article className="product-card">
        <div className="product-image">
          <img
            className={
              product.imageFit === "contain" ? "product-image-contain" : ""
            }
            src={product.image}
            alt={product.name}
          />
          <span className="product-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <button
            className="quick-buy"
            onClick={() =>
              window.open(
                whatsappUrl(
                  `Olá, Alma! Quero comprar o ${product.name}, tamanho ${size}.`,
                ),
                "_blank",
              )
            }
          >
            <MessageCircle size={15} /> Comprar
          </button>
        </div>
        <div className="product-info">
          <div className="product-title">
            <div>
              <h3>{product.name}</h3>
              <p>{product.category}</p>
            </div>
            <strong>R$ {product.price}</strong>
          </div>
          <div className="product-options">
            <div className="sizes" aria-label={`Tamanhos de ${product.name}`}>
              {["P", "M", "G", "GG"].map((item) => (
                <button
                  className={size === item ? "selected" : ""}
                  key={item}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="colors" aria-label={`Cores de ${product.name}`}>
              {product.colors.map((item, itemIndex) => (
                <button
                  key={item}
                  style={{ backgroundColor: item }}
                  className={color === itemIndex ? "color-selected" : ""}
                  onClick={() => setColor(itemIndex)}
                  aria-label={`Cor ${itemIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
