import { useFormStore } from "../../store/store";
import TablaAmortizacion from "./TablaAmortizacion";
import AmortizacionAnual from "./TablaAmortizacionAnual";
import "./tables.css";

export const Tabla = () => {
  const { showMonthlyTable, showYearTable } = useFormStore();
  return (
    <section
      id="detailTable"
      className={`${showMonthlyTable} || ${showYearTable} ?  "show" : ""`}>
      {showMonthlyTable && <TablaAmortizacion />}
      {showYearTable && <AmortizacionAnual />}
    </section>
  );
};
