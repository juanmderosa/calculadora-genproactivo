import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import "./charts.css";
import { totalInteresesPagados } from "../../../helpers/Formulas/formulas";

import { useFormStore } from "../../../store/store";

export const Charts = (/* {
  montoPrestamoCalculado,
  pie,
  bonoPie,
  duracion,
  pagoMensual,
}: Props */) => {
  const { formInfo, pagoMensual, montoPrestamoCalculado } = useFormStore();

  const data = [
    { name: "Pie", value: Number(formInfo.pie) },
    { name: "Bono Pie", value: Number(formInfo.bonoPie) },
    {
      name: "Total Intereses pagados",
      value: totalInteresesPagados(
        formInfo.duracion,
        pagoMensual,
        montoPrestamoCalculado
      ),
    },
    { name: "Préstamo", value: montoPrestamoCalculado },
  ];
  const COLORS = ["#557b1b", "#c1a4e9", "#713abe", "#97e02d"];

  return (
    <>
      {formInfo.duracion > 0 &&
        pagoMensual > 0 &&
        montoPrestamoCalculado > 0 && (
          <div className="chartContainer">
            <ResponsiveContainer
              width="100%"
              height="100%">
              <PieChart
                width={200}
                height={250}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value">
                  {data.map((entry, index) => (
                    <>
                      <Cell
                        key={`cell-${entry.name}-${index}-${Math.random()}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    </>
                  ))}
                </Pie>
                {/* <Legend verticalAlign="top" /> */}
                <Tooltip
                  separator=": $"
                  contentStyle={{ background: "white", fontSize: "14px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
    </>
  );
};
