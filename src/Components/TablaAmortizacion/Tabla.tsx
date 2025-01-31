import TablaAmortizacion from "./TablaAmortizacion";
import AmortizacionAnual from "./TablaAmortizacionAnual";

interface Props {
  montoPrestamoCalculado: number;
  tasaDeInteres: number;
  duracion: number;
}

export const Tabla = ({
  montoPrestamoCalculado,
  tasaDeInteres,
  duracion,
}: Props) => {
  return (
    <div
      id="table"
      style={{
        width: "100%",
        marginBlock: "1rem",
        display: "flex",
        gap: "2rem",
        flexDirection: "column",
      }}>
      <TablaAmortizacion
        montoPrestamo={montoPrestamoCalculado}
        tasaInteres={tasaDeInteres}
        duracion={duracion}
      />
      <AmortizacionAnual
        montoPrestamo={montoPrestamoCalculado}
        tasaInteres={tasaDeInteres}
        duracion={duracion}
      />
    </div>
  );
};
