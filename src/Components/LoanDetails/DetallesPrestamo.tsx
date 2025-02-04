import { getFinalDate } from "../../helpers/dates/dates";
import {
  calcularCae,
  calcularGastosOperacionales,
  duracionTotal,
  prestamoConIntereses,
  totalInteresesPagados,
  calcularMontoTotal,
  calcularPorcentajeIncidencia,
} from "../../helpers/Formulas/formulas";
import { useFormStore } from "../../store/store";
import "./detalles.css";
import { IoHomeSharp } from "react-icons/io5";

export const DetallesPrestamo = () => {
  const { formInfo, montoPrestamoCalculado, pagoMensual } = useFormStore();
  const { pie, bonoPie, costoInmueble, duracion, tasaDeInteres } = formInfo;

  const interesesPagados = totalInteresesPagados(
    duracion,
    pagoMensual,
    montoPrestamoCalculado
  );
  const cae = calcularCae(montoPrestamoCalculado, tasaDeInteres);
  const gastosOperacionales = calcularGastosOperacionales(
    montoPrestamoCalculado
  );

  const montoTotal = calcularMontoTotal(
    costoInmueble,
    pie,
    bonoPie,
    interesesPagados,
    cae,
    gastosOperacionales
  );

  const renderProgressBar = (valor: number) => {
    const montoTotalNumber = Number(montoTotal);
    const newValor = Number(valor);
    const newCalculo = Number(
      calcularPorcentajeIncidencia(newValor, montoTotalNumber)
    );
    const porcentaje = Math.min(100, newCalculo);

    return (
      <div
        className="progress-bar"
        style={{ "--progress-width": `${porcentaje}%` } as React.CSSProperties}>
        <p className="progress-text">
          {porcentaje > 0 ? `${porcentaje}%` : "0%"}
        </p>
      </div>
    );
  };

  return (
    <section id="details">
      <div className="detailsContainer">
        <IoHomeSharp />
        <h2>Detalles del Préstamo</h2>
      </div>
      <article>
        <div>
          <p>
            Monto del Préstamo: <strong>${montoPrestamoCalculado}</strong>
          </p>
          {renderProgressBar(montoPrestamoCalculado)}
        </div>
        <div>
          <p>
            Pie: <strong>${pie > 0 ? pie : 0}</strong>
          </p>
          {renderProgressBar(pie)}
        </div>
        <div>
          <p>
            Bono Pie: <strong>${bonoPie > 0 ? bonoPie : 0}</strong>
          </p>
          {renderProgressBar(bonoPie)}
        </div>
        <div>
          <p>
            Total de Intereses pagados: <strong>${interesesPagados}</strong>
          </p>
          {renderProgressBar(interesesPagados)}
        </div>
        <div>
          <p>
            CAE {Number(tasaDeInteres) + 1}%: <strong>${cae}</strong>
          </p>
          {renderProgressBar(cae)}
        </div>
        <div>
          <p>
            Gastos Operacionales: <strong>${gastosOperacionales}</strong>
          </p>
          {renderProgressBar(gastosOperacionales)}
        </div>
      </article>
      <div className="resumeContainer">
        <div className="resumeItem">
          <p>Total de {duracionTotal(duracion)} pagos:</p>
          <strong>${prestamoConIntereses(duracion, pagoMensual)}</strong>
        </div>
        <div className="resumeItem">
          <p>Fecha finalización de pagos:</p>
          <strong>
            {formInfo.duracion ? getFinalDate(formInfo.duracion) : ""}
          </strong>
        </div>
      </div>
    </section>
  );
};
