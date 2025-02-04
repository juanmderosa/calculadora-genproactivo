import {
  calcularCae,
  calcularGastosOperacionales,
} from "../../../helpers/Formulas/formulas";
import { useFormStore } from "../../../store/store";
import "./dinamicResults.css";

export const DinamicResults = () => {
  const { montoPrestamoCalculado, pagoMensual, formInfo } = useFormStore();
  return (
    <div className="dinamicResultsContainer">
      <div className="estimatedMontlyPayment">
        <strong>${pagoMensual.toFixed(2)}</strong>
        <p>Tu pago mensual estimado </p>
      </div>
      <div className="asociatedValues">
        <p>
          {`CAE estimado ${Number(formInfo.tasaDeInteres) + 1}%:`}
          <strong>
            $
            {montoPrestamoCalculado > 0 &&
            pagoMensual > 0 &&
            formInfo.tasaDeInteres > 0
              ? calcularCae(montoPrestamoCalculado, formInfo.tasaDeInteres)
              : 0}
          </strong>
        </p>
        <p>
          Gastos Operacionales: 1%:{" "}
          <strong>
            ${calcularGastosOperacionales(montoPrestamoCalculado)}
          </strong>
        </p>
      </div>
    </div>
  );
};
