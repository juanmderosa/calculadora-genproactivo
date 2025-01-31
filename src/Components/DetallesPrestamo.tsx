import {
  calcularCae,
  calcularGastosOperacionales,
  duracionTotal,
  prestamoConIntereses,
  totalInteresesPagados,
} from "../helpers/Formulas/formulas";

interface Props {
  montoPrestamoCalculado: number;
  pie: number;
  bonoPie: number;
  duracion: number;
  pagoMensual: number;
}

export const DetallesPrestamo = ({
  montoPrestamoCalculado,
  pie,
  bonoPie,
  duracion,
  pagoMensual,
}: Props) => {
  return (
    <article id="details">
      <p>
        Monto del Préstamo: <span>{montoPrestamoCalculado}</span>
      </p>
      <p>
        Pie: <span>{pie}</span>
      </p>
      <p>
        Bono Pie: <span>{bonoPie}</span>
      </p>
      <p>
        Total de Intereses pagados:{" "}
        <span>
          {totalInteresesPagados(duracion, pagoMensual, montoPrestamoCalculado)}{" "}
        </span>
      </p>

      <p>
        Total de {duracionTotal(duracion)} de pagos:
        <span>{prestamoConIntereses(duracion, pagoMensual)}</span>
      </p>
      <p>
        Fecha finalización de pagos: <span></span>
      </p>
      <p>
        CAE: <span>{calcularCae(montoPrestamoCalculado)}</span>
      </p>
      <p>
        Gastos Operacionales:{" "}
        <span>{calcularGastosOperacionales(montoPrestamoCalculado)}</span>
      </p>
    </article>
  );
};
