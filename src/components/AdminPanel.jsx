import { ImagePlus, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";

const emptyProduct = {
  name: "Nova peça",
  category: "Lingerie · nova coleção",
  price: "0,00",
  image: "",
  imageFit: "contain",
  colors: ["#f4dce0", "#4d1e35", "#c84d73"],
};

function ProductForm({ product, onSave, onCancel }) {
  const [draft, setDraft] = useState({ ...product });
  const update = (field, value) =>
    setDraft((current) => ({ ...current, [field]: value }));

  return (
    <form
      className="admin-product-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSave({ ...draft, price: draft.price.replace("R$", "").trim() });
      }}
    >
      <div className="admin-form-heading">
        <span>{product.id ? "Editar peça" : "Nova peça"}</span>
        <button type="button" onClick={onCancel} aria-label="Cancelar edição">
          <X size={16} />
        </button>
      </div>
      <label>
        Nome
        <input
          value={draft.name}
          onChange={(event) => update("name", event.target.value)}
          required
        />
      </label>
      <label>
        Categoria
        <input
          value={draft.category}
          onChange={(event) => update("category", event.target.value)}
          required
        />
      </label>
      <label>
        Preço
        <input
          value={draft.price}
          onChange={(event) => update("price", event.target.value)}
          placeholder="159,90"
          required
        />
      </label>
      <label>
        URL da foto
        <input
          value={draft.image}
          onChange={(event) => update("image", event.target.value)}
          placeholder="https://..."
          required
          type="url"
        />
      </label>
      <div className="admin-image-preview">
        {draft.image ? (
          <img src={draft.image} alt="Pré-visualização da peça" />
        ) : (
          <ImagePlus size={24} />
        )}
      </div>
      <div className="admin-form-actions">
        <button
          type="button"
          className="admin-secondary-button"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button type="submit" className="admin-primary-button">
          <Save size={15} /> Salvar peça
        </button>
      </div>
    </form>
  );
}

export function AdminPanel({ products, onChange, onClose, user, onSignOut }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [notice, setNotice] = useState("");

  const saveProduct = (product) => {
    const productWithId = {
      ...product,
      id: product.id || `product-${Date.now()}`,
    };
    const exists = products.some((item) => item.id === productWithId.id);
    onChange(
      exists
        ? products.map((item) =>
            item.id === productWithId.id ? productWithId : item,
          )
        : [...products, productWithId],
    );
    setEditingProduct(null);
    setNotice("Catálogo atualizado");
    window.setTimeout(() => setNotice(""), 2200);
  };

  const removeProduct = (productId) => {
    if (window.confirm("Excluir esta peça do catálogo?")) {
      onChange(products.filter((product) => product.id !== productId));
      setNotice("Peça removida");
      window.setTimeout(() => setNotice(""), 2200);
    }
  };

  return (
    <div
      className="admin-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-title"
    >
      <aside className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <p className="admin-kicker">Gestão local</p>
            <h2 id="admin-title">
              Catálogo <em>admin</em>
            </h2>
            <p className="admin-description">
              Altere fotos e informações das peças. As mudanças ficam salvas
              neste navegador.
            </p>
            {user?.email && (
              <p className="admin-user">Conectado como {user.email}</p>
            )}
          </div>
          <button
            className="admin-close"
            onClick={onClose}
            aria-label="Fechar modo admin"
          >
            <X size={21} />
          </button>
        </div>
        {notice && <div className="admin-notice">{notice}</div>}
        {editingProduct ? (
          <ProductForm
            product={editingProduct}
            onSave={saveProduct}
            onCancel={() => setEditingProduct(null)}
          />
        ) : (
          <>
            <div className="admin-toolbar">
              <span>{products.length} peças cadastradas</span>
              <button
                className="admin-primary-button"
                onClick={() => setEditingProduct({ ...emptyProduct })}
              >
                <Plus size={15} /> Nova peça
              </button>
              <button className="admin-secondary-button" onClick={onSignOut}>
                Sair
              </button>
            </div>
            <div className="admin-product-list">
              {products.map((product) => (
                <article
                  className="admin-product-row"
                  key={product.id || product.name}
                >
                  <img src={product.image} alt="" />
                  <div className="admin-product-details">
                    <strong>{product.name}</strong>
                    <span>{product.category}</span>
                    <small>R$ {product.price}</small>
                  </div>
                  <div className="admin-row-actions">
                    <button
                      onClick={() => setEditingProduct(product)}
                      aria-label={`Editar ${product.name}`}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => removeProduct(product.id)}
                      aria-label={`Excluir ${product.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
