import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { totalInteresesPagados } from "../helpers/Formulas/formulas";
import "../styles/charts.css";

interface Props {
  montoPrestamoCalculado: number;
  pie: number;
  bonoPie: number;
  duracion: number;
  pagoMensual: number;
}

export const Charts = ({
  montoPrestamoCalculado,
  pie,
  bonoPie,
  duracion,
  pagoMensual,
}: Props) => {
  const data = [
    { name: "Pie", value: Number(pie) },
    { name: "Bono Pie", value: Number(bonoPie) },
    {
      name: "Total Intereses pagados",
      value: totalInteresesPagados(
        duracion,
        pagoMensual,
        montoPrestamoCalculado
      ),
    },
    { name: "Préstamo", value: montoPrestamoCalculado },
  ];
  const COLORS = ["#557b1b", "#c1a4e9", "#713abe", "#97e02d"];

  return (
    <>
      {duracion > 0 && pagoMensual > 0 && montoPrestamoCalculado > 0 && (
        <div className="chartContainer">
          <h2>Desglose del préstamo</h2>
          <ResponsiveContainer
            width="100%"
            height="100%">
            <PieChart
              width={800}
              height={400}>
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
                      key={`cell-${entry.name}-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  </>
                ))}
              </Pie>
              <Legend
                verticalAlign="top"
                height={36}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};
