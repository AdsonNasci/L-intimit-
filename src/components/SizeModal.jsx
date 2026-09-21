import { Check, X } from "lucide-react";

export function SizeModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="size-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-title"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar guia de medidas"
        >
          <X size={20} />
        </button>
        <p className="eyebrow">
          <span></span> Encontre seu tamanho
        </p>
        <h2 id="size-title">
          Guia de <em>medidas</em>
        </h2>
        <p className="modal-intro">
          Meça o corpo sem apertar a fita e compare com a tabela abaixo.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tamanho</th>
                <th>Busto</th>
                <th>Tórax</th>
                <th>Quadril</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["P", "82–88", "86–92", "88–94"],
                ["M", "89–95", "93–99", "95–101"],
                ["G", "96–102", "100–106", "102–108"],
                ["GG", "103–110", "107–114", "109–116"],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="modal-footnote">
          <Check size={15} /> Entre dois tamanhos? Escolha o maior para mais
          conforto.
        </p>
      </div>
    </div>
  );
}
