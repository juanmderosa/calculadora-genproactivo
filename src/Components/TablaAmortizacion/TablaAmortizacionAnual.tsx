import React, { useState } from "react";

interface AmortizacionProps {
  montoPrestamo: number;
  tasaInteres: number; // Tasa en porcentaje (ej. 5 para 5%)
  duracion: number; // En años
}

const AmortizacionAnual: React.FC<AmortizacionProps> = ({
  montoPrestamo,
  tasaInteres,
  duracion,
}) => {
  const [showTable, setShowTable] = useState(false);

  const tasaDecimal = tasaInteres / 100;
  const cuotaAnual =
    (montoPrestamo * tasaDecimal) / (1 - Math.pow(1 + tasaDecimal, -duracion));

  let saldo = montoPrestamo;
  const tabla = Array.from({ length: duracion }, (_, i) => {
    const interes = saldo * tasaDecimal;
    const abonoCapital = cuotaAnual - interes;
    saldo -= abonoCapital;

    return {
      anio: i + 1,
      cuotaAnual: cuotaAnual.toFixed(2),
      interes: interes.toFixed(2),
      abonoCapital: abonoCapital.toFixed(2),
      saldoRestante: saldo.toFixed(2),
    };
  });

  return (
    <div>
      <button onClick={() => setShowTable((prev) => !prev)}>
        Mostrar Tabla por Años
      </button>
      {showTable && (
        <table border={1}>
          <h1>TABLA POR AÑOS</h1>
          <thead>
            <tr>
              <th>Año</th>
              <th>Cuota Anual</th>
              <th>Interés</th>
              <th>Abono a Capital</th>
              <th>Saldo Restante</th>
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
      )}
    </div>
  );
};

export default AmortizacionAnual;
