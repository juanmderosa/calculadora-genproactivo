import { useFormStore } from "../../store/store";
import { calcularTablaAmortizacionMensual } from "../../helpers/Formulas/formulas";

const TablaAmortizacion = () => {
  const { montoPrestamoCalculado, formInfo, ufValue } = useFormStore();
  const tabla = calcularTablaAmortizacionMensual(
    montoPrestamoCalculado,
    formInfo.tasaDeInteres,
    formInfo.duracion
  );

  return (
    <>
      {" "}
      <p className="tableTitle">Tabla de Amortización Mensual</p>
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
                <td>
                  ${fila.cuotaMensual} / UF{" "}
                  {parseFloat(
                    (Number(fila.cuotaMensual) / Number(ufValue)).toFixed(4)
                  )}
                </td>
                <td>
                  ${fila.intereses} / UF{" "}
                  {parseFloat(
                    (Number(fila.intereses) / Number(ufValue)).toFixed(4)
                  )}{" "}
                </td>
                <td>
                  ${fila.amortizacion} / UF{" "}
                  {parseFloat(
                    (Number(fila.amortizacion) / Number(ufValue)).toFixed(4)
                  )}
                </td>
                <td>
                  ${fila.saldoPendiente} / UF{" "}
                  {parseFloat(
                    (Number(fila.saldoPendiente) / Number(ufValue)).toFixed(4)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TablaAmortizacion;
