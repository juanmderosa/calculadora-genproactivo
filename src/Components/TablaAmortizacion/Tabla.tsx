import { useFormStore } from "../../store/store";
import AmortizacionAnual from "./TablaAmortizacionAnual";
import "./tables.css";

export const Tabla = () => {
  const { showYearTable } = useFormStore();
  return (
    <section id="detailTable">{showYearTable && <AmortizacionAnual />}</section>
  );
};
