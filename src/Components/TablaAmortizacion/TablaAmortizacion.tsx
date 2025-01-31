import { useState } from "react";

interface Props {
  montoPrestamo: number;
  tasaInteres: number; // Anual en porcentaje
  duracion: number; // En años
}

const calcularTablaAmortizacion = (
  montoPrestamo: number,
  tasaInteres: number,
  duracion: number
) => {
  const tasaMensual = tasaInteres / 100 / 12;
  const totalPagos = duracion * 12;

  // Fórmula de cuota fija (método francés)
  const cuotaMensual =
    (montoPrestamo * tasaMensual) /
    (1 - Math.pow(1 + tasaMensual, -totalPagos));

  let saldoPendiente = montoPrestamo;
  const tabla = [];

  for (let mes = 1; mes <= totalPagos; mes++) {
    const intereses = saldoPendiente * tasaMensual;
    const amortizacion = cuotaMensual - intereses;
    saldoPendiente -= amortizacion;

    tabla.push({
      mes,
      cuotaMensual: cuotaMensual.toFixed(2),
      intereses: intereses.toFixed(2),
      amortizacion: amortizacion.toFixed(2),
      saldoPendiente: saldoPendiente > 0 ? saldoPendiente.toFixed(2) : "0.00",
    });
  }

  return tabla;
};

const TablaAmortizacion: React.FC<Props> = ({
  montoPrestamo,
  tasaInteres,
  duracion,
}) => {
  const [showTable, setShowTable] = useState(false);
  const tabla = calcularTablaAmortizacion(montoPrestamo, tasaInteres, duracion);

  return (
    <div>
      <button onClick={() => setShowTable((prev) => !prev)}>
        Mostrar Tabla por Meses
      </button>
      <>
        {showTable && (
          <table
            border={1}
            style={{
              textAlign: "center",
              marginTop: "20px",
              border: "1px",
            }}>
            <thead>
              <h1>TABLA POR MESES</h1>
              <tr>
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
        )}
      </>
    </div>
  );
};

export default TablaAmortizacion;
