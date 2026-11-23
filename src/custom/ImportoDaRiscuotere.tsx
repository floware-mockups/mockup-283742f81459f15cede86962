// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("ImportoDaRiscuotere");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("ImportoDaRiscuotere");
import { useTable, type SectionProps } from "../floware";

export default function ImportoDaRiscuotere({ pageId }: SectionProps) {__mk();
  const table = useTable(pageId);
  if (!table) return null;
  const importo = table.column("Importo sanzione applicata");
  const stato = table.column("Stato");
  if (importo < 0 || stato < 0) return <p className="text-sm text-(--mk-muted)">Totale non disponibile: mancano le colonne Stato o Importo sanzione applicata.</p>;
  const totale = table.rows.reduce((somma, riga) => {__mk();
    if ((riga[stato] || "").trim() === "Definito") return somma;
    const valore = Number((riga[importo] || "").replaceAll("€", "").split(".").join("").replace(",", ".").trim());
    return somma + (Number.isFinite(valore) ? valore : 0);
  }, 0);
  const formato = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });
  return (
    <section aria-label="Importo da riscuotere aggiornato" className="rounded-xl border border-(--mk-border) bg-(--mk-subtle) p-5 text-(--mk-text)">
      <h2 className="text-sm font-semibold">Importo da riscuotere</h2>
      <p aria-live="polite" className="mt-2 text-3xl font-bold">{formato.format(totale)}</p>
      <p className="mt-2 text-sm text-(--mk-muted)">Totale aggiornato automaticamente. Esclude i ricorsi con stato Definito.</p>
    </section>
  );
}
