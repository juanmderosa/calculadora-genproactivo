import { calcularTablaAmortizacionAnual } from "../../helpers/Formulas/formulas";
import { useFormStore } from "../../store/store";

const AmortizacionAnual = () => {
  const { formInfo, montoPrestamoCalculado, ufValue } = useFormStore();

  const tabla = calcularTablaAmortizacionAnual(
    formInfo,
    montoPrestamoCalculado
  );

  return (
    <>
      <p className="tableTitle">Tabla de Amortización Anual</p>
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
                <td>
                  ${fila.cuotaAnual} / UF{" "}
                  {parseFloat(
                    (Number(fila.cuotaAnual) / Number(ufValue)).toFixed(4)
                  )}
                </td>
                <td>
                  ${fila.interes} / UF{" "}
                  {parseFloat(
                    (Number(fila.interes) / Number(ufValue)).toFixed(4)
                  )}
                </td>
                <td>
                  ${fila.abonoCapital} / UF{" "}
                  {parseFloat(
                    (Number(fila.abonoCapital) / Number(ufValue)).toFixed(4)
                  )}
                </td>
                <td>
                  ${fila.saldoRestante} / UF{" "}
                  {parseFloat(
                    (Number(fila.saldoRestante) / Number(ufValue)).toFixed(4)
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

export default AmortizacionAnual;
