import { useFormStore } from "../../store/store";
import "./tables.css";

export const TablaButtons = () => {
  const { setShowMontlyTable, setShowYearTable } = useFormStore();

  return (
    <div className="tableButtonContainer">
      <button onClick={() => setShowMontlyTable()}>Ver Tabla por Meses</button>
      <button onClick={() => setShowYearTable()}>Ver Tabla por Años</button>
    </div>
  );
};
