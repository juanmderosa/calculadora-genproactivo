import { calcularTablaAmortizacionAnual } from "../../helpers/Formulas/formulas";
import { useFormStore } from "../../store/store";

const AmortizacionAnual = () => {
  const { formInfo, montoPrestamoCalculado } = useFormStore();

  const tabla = calcularTablaAmortizacionAnual(
    formInfo,
    montoPrestamoCalculado
  );

  return (
    <div className="tableMainContainer">
      <table
        className="tableContainer"
        border={1}>
        <thead className="tableHead">
          <tr className="tableHeadRow">
            <th>Año</th>
            <th>Pago Anual</th>
            <th>Intereses</th>
            <th>Amortización</th>
            <th>Saldo Pendiente</th>
          </tr>
        </thead>
        <tbody>
          {tabla.map((fila) => (
            <tr key={fila.anio}>
              <td>{fila.anio}</td>
              <td>{fila.cuotaAnual}</td>
              <td>{fila.interes}</td>
              <td>{fila.abonoCapital}</td>
              <td>{fila.saldoRestante}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AmortizacionAnual;
