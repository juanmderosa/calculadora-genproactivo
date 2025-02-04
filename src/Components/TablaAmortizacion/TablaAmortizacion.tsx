import { useFormStore } from "../../store/store";
import { calcularTablaAmortizacionMensual } from "../../helpers/Formulas/formulas";

const TablaAmortizacion = () => {
  const { montoPrestamoCalculado, formInfo } = useFormStore();
  const tabla = calcularTablaAmortizacionMensual(
    montoPrestamoCalculado,
    formInfo.tasaDeInteres,
    formInfo.duracion
  );

  return (
    <div className="tableMainContainer">
      <table
        border={1}
        className="tableContainer">
        <thead className="tableHead">
          <tr className="tableHeadRow">
            <th>Mes</th>
            <th>Pago Mensual</th>
            <th>Intereses</th>
            <th>Amortización</th>
            <th>Saldo Pendiente</th>
          </tr>
        </thead>
        <tbody>
          {tabla.map((fila) => (
            <tr key={fila.mes}>
              <td>{fila.mes}</td>
              <td>${fila.cuotaMensual}</td>
              <td>${fila.intereses}</td>
              <td>${fila.amortizacion}</td>
              <td>${fila.saldoPendiente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAmortizacion;
