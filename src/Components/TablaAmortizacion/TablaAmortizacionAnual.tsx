import { calcularTablaAmortizacionAnual } from "../../helpers/Formulas/formulas";
import { useFormStore } from "../../store/store";

const AmortizacionAnual = () => {
  const { formInfo, montoPrestamoCalculado, ufValue, valueType } =
    useFormStore();

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
                  {valueType === "$" ? (
                    <>
                      ${fila.cuotaAnual.toFixed(2)} / UF{" "}
                      {(fila.cuotaAnual / ufValue).toFixed(4)}
                    </>
                  ) : (
                    <>
                      ${(fila.cuotaAnual * ufValue).toFixed(2)} / UF{" "}
                      {fila.cuotaAnual.toFixed(4)}
                    </>
                  )}
                </td>
                <td>
                  {valueType === "$" ? (
                    <>
                      ${fila.interes.toFixed(2)} / UF{" "}
                      {(fila.interes / ufValue).toFixed(4)}
                    </>
                  ) : (
                    <>
                      ${(fila.interes * ufValue).toFixed(2)} / UF{" "}
                      {fila.interes.toFixed(4)}
                    </>
                  )}
                </td>
                <td>
                  {valueType === "$" ? (
                    <>
                      ${fila.abonoCapital.toFixed(2)} / UF{" "}
                      {(fila.abonoCapital / ufValue).toFixed(4)}
                    </>
                  ) : (
                    <>
                      ${(fila.abonoCapital * ufValue).toFixed(2)} / UF{" "}
                      {fila.abonoCapital.toFixed(4)}
                    </>
                  )}
                </td>
                <td>
                  {valueType === "$" ? (
                    <>
                      ${fila.saldoRestante.toFixed(2)} / UF{" "}
                      {(fila.saldoRestante / ufValue).toFixed(4)}
                    </>
                  ) : (
                    <>
                      ${(fila.saldoRestante * ufValue).toFixed(2)} / UF{" "}
                      {fila.saldoRestante.toFixed(4)}
                    </>
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
