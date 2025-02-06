import { formatNumber } from "../../../helpers/formatNumber";
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
                ? formatNumber(pagoMensual)
                : formatNumber(pagoMensual * ufValue)}
            </strong>
          </p>
          <strong style={{ fontSize: "14px" }}>UF: </strong>{" "}
          {valueType === "$"
            ? formatNumber(pagoMensual / ufValue)
            : formatNumber(pagoMensual)}
        </div>
      </div>

      <div className="asociatedValues">
        <p>
          CAE estimado del {`${formInfo.tasaDeInteres + 1}%:`}
          <strong>
            $
            {valueType === "$"
              ? montoPrestamoCalculado > 0 &&
                pagoMensual > 0 &&
                formInfo.tasaDeInteres > 0
                ? formatNumber(
                    calcularCae(montoPrestamoCalculado, formInfo.tasaDeInteres)
                  )
                : 0
              : montoPrestamoCalculado > 0 &&
                pagoMensual > 0 &&
                formInfo.tasaDeInteres > 0
              ? formatNumber(
                  calcularCae(montoPrestamoCalculado, formInfo.tasaDeInteres) *
                    ufValue
                )
              : 0}
          </strong>
        </p>
        <p>
          Gastos Operacionales: 1%:{" "}
          <strong>
            $
            {valueType === "$"
              ? montoPrestamoCalculado > 0 && pagoMensual > 0
                ? formatNumber(
                    calcularGastosOperacionales(montoPrestamoCalculado)
                  )
                : 0
              : montoPrestamoCalculado > 0 && pagoMensual > 0
              ? formatNumber(
                  calcularGastosOperacionales(montoPrestamoCalculado) * ufValue
                )
              : 0}
          </strong>
        </p>
      </div>
    </div>
  );
};
