// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("AggiornaTotaliViolazioni");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("AggiornaTotaliViolazioni");
import { useEffect } from "react";
import { useTable, type SectionProps } from "../floware";

export default function AggiornaTotaliViolazioni({ pageId }: SectionProps) {__mk();
  const raccolta = useTable("raccolta-ricorsi");
  const tipologie = useTable("tipologie-violazione");

  useEffect(() => {__mk();
    if (!raccolta || !tipologie) return;
    const origine = raccolta.column("Tipologia violazione");
    const categoria = tipologie.column("Tipologia violazione");
    const totale = tipologie.column("Totale violazioni");
    if (origine < 0 || categoria < 0 || totale < 0) return;
    const conteggi = new Map<string, number>();
    for (const riga of raccolta.rows) {__mk();
      const tipo = riga[origine];
      conteggi.set(tipo, (conteggi.get(tipo) || 0) + 1);
    }
    tipologie.rows.forEach((riga, indice) => {__mk();
      const tipo = riga[categoria];
      const valore = String(tipo ? (conteggi.get(tipo) || 0) : 0);
      if (riga[totale] !== valore) {
        tipologie.setCell(indice, "Totale violazioni", valore);
      }
    });
  }, [raccolta, tipologie]);

  if (pageId !== "tipologie-violazione") return null;
  if (!raccolta || !tipologie || raccolta.column("Tipologia violazione") < 0 || tipologie.column("Tipologia violazione") < 0 || tipologie.column("Totale violazioni") < 0) {
    return <p className="text-sm text-(--mk-muted)">Conteggio non disponibile: controllare le pagine e le colonne richieste.</p>;
  }
  return <p className="text-sm text-(--mk-muted)">Totale violazioni aggiornato automaticamente dalle righe di Raccolta ricorsi, per corrispondenza esatta della tipologia. Le tipologie senza ricorsi valgono zero.</p>;
}
