import {
  calcularCae,
  calcularGastosOperacionales,
} from "../helpers/Formulas/formulas";

interface Props {
  montoPrestamoCalculado: number;
  pagoMensual: number;
}

export const DinamicResults = ({
  montoPrestamoCalculado,
  pagoMensual,
}: Props) => {
  return (
    <div>
      {/* Mostrar resultado dinámico */}
      <p>
        CAE estimado: 1%: <strong>{calcularCae(montoPrestamoCalculado)}</strong>
      </p>
      <p>
        Gastos Operacionales: 1%:{" "}
        <strong>{calcularGastosOperacionales(montoPrestamoCalculado)}</strong>
      </p>
      <p>
        <strong>Pago mensual estimado:</strong> {pagoMensual.toFixed(2)}
      </p>
    </div>
  );
};
