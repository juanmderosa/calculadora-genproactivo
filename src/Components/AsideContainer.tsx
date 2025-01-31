import { Charts } from "./Charts";
import { DinamicResults } from "./DinamicResults";

interface Props {
  montoPrestamoCalculado: number;
  pie: number;
  bonoPie: number;
  duracion: number;
  pagoMensual: number;
}

export const AsideContainer = ({
  montoPrestamoCalculado,
  pie,
  bonoPie,
  duracion,
  pagoMensual,
}: Props) => {
  return (
    <aside id="asideContainer">
      <DinamicResults
        montoPrestamoCalculado={montoPrestamoCalculado}
        pagoMensual={pagoMensual}
      />
      <Charts
        montoPrestamoCalculado={montoPrestamoCalculado}
        pie={pie}
        bonoPie={bonoPie}
        duracion={duracion}
        pagoMensual={pagoMensual}
      />
    </aside>
  );
};
