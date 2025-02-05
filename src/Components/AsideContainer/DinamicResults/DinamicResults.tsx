import {
  calcularCae,
  calcularGastosOperacionales,
} from "../../../helpers/Formulas/formulas";
import { useFormStore } from "../../../store/store";
import "./dinamicResults.css";

export const DinamicResults = () => {
  const { montoPrestamoCalculado, pagoMensual, formInfo, ufValue, valueType } =
    useFormStore();
  return (
    <div className="dinamicResultsContainer">
      <div className="estimatedMontlyPayment">
        <div>
          <p>
            Valor cuota estimado{" "}
            <strong>
              $
              {valueType === "$"
                ? pagoMensual.toFixed(2)
                : (pagoMensual * ufValue).toFixed(2)}
            </strong>
          </p>
          <strong style={{ fontSize: "14px" }}>UF: </strong>{" "}
          {valueType === "$" ? (pagoMensual / ufValue).toFixed(4) : pagoMensual}
        </div>
      </div>

      <div className="asociatedValues">
        <p>
          CAE estimado del {`${Number(formInfo.tasaDeInteres) + 1}%:`}
          <strong>
            $
            {valueType === "$"
              ? montoPrestamoCalculado > 0 &&
                pagoMensual > 0 &&
                formInfo.tasaDeInteres > 0
                ? calcularCae(montoPrestamoCalculado, formInfo.tasaDeInteres)
                : 0
              : montoPrestamoCalculado > 0 &&
                pagoMensual > 0 &&
                formInfo.tasaDeInteres > 0
              ? (
                  calcularCae(montoPrestamoCalculado, formInfo.tasaDeInteres) *
                  ufValue
                ).toFixed(2)
              : 0}
          </strong>
        </p>
        <p>
          Gastos Operacionales: 1%:{" "}
          <strong>
            $
            {valueType === "$"
              ? montoPrestamoCalculado > 0 && pagoMensual > 0
                ? calcularGastosOperacionales(montoPrestamoCalculado)
                : 0
              : montoPrestamoCalculado > 0 && pagoMensual > 0
              ? (
                  calcularGastosOperacionales(montoPrestamoCalculado) * ufValue
                ).toFixed(2)
              : 0}
          </strong>
        </p>
      </div>
    </div>
  );
};
