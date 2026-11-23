// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("TabellaRigheAlternate");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("TabellaRigheAlternate");
import { Card, useTable, type SectionProps } from "../floware";

export default function TabellaRigheAlternate({ pageId }: SectionProps) {__mk();
  const table = useTable(pageId);
  if (!table) return null;
  const stili = [
    "bg-(--mk-surface) text-(--mk-text)",
    "bg-(--mk-subtle) text-(--mk-text)"
  ];
  return (
    <Card title="Vista a righe alternate">
      <p className="mb-3 text-sm text-(--mk-muted)">Gli stessi dati della tabella, con due sfondi alternati per distinguere le righe.</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-(--mk-surface) text-(--mk-text)">
            <tr>{table.columns.map((colonna) => (__mk(), <th key={colonna} scope="col" className="border-b border-(--mk-border) px-3 py-3 font-semibold">{colonna}</th>))}</tr>
          </thead>
          <tbody>
            {table.rows.map((riga, indice) => (
              (__mk(), <tr key={indice} className={stili[indice % 2]}>
                {table.columns.map((colonna) => (
                  (__mk(), <td key={colonna} className="border-b border-(--mk-border) px-3 py-3 align-top">{table.value(riga, colonna)}</td>)
                ))}
              </tr>)
            ))}
          </tbody>
        </table>
        {table.rows.length === 0 && <p className="py-3 text-(--mk-muted)">Nessuna riga disponibile.</p>}
      </div>
    </Card>
  );
}
