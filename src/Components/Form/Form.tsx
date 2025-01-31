import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputForm from "../InputForm/InputForm";
import { FormValues, schema } from "../../helpers/zod/formSchema";
import { DetallesPrestamo } from "../DetallesPrestamo";
import {
  calcularMontoPrestamoCalculado,
  calcularPagoMensual,
} from "../../helpers/Formulas/formulas";
import { UFValue } from "../UFValue";
import { AsideContainer } from "../AsideContainer";
import RangeInput from "../RangeInput";
import "./form.css";
import { Tabla } from "../TablaAmortizacion/Tabla";

export const Form = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      costoInmueble: 0,
      pie: 0,
      bonoPie: 0,
      tasaDeInteres: 0,
      duracion: 0,
    },
  });

  // Escuchar cambios en los valores
  const costoInmueble = watch("costoInmueble");
  const pie = watch("pie");
  const bonoPie = watch("bonoPie");
  const tasaDeInteres = watch("tasaDeInteres");
  const duracion = watch("duracion");

  // Calcular monto del préstamo dinámicamente
  const montoPrestamoCalculado = calcularMontoPrestamoCalculado(
    costoInmueble,
    pie,
    bonoPie
  );

  // Calcular pago mensual estimado
  const pagoMensual = calcularPagoMensual(
    montoPrestamoCalculado,
    tasaDeInteres,
    duracion
  );

  return (
    <section id="main-container">
      <div id="form">
        <UFValue />
        <form>
          <InputForm
            name="costoInmueble"
            control={control}
            label="Costo Inmueble"
            type="number"
            error={errors.costoInmueble}
            clarificationPosition="end"
            clarificationText="$"
          />
          <InputForm
            name="pie"
            control={control}
            label="Pie"
            type="number"
            error={errors.pie}
            clarificationPosition="start"
            clarificationText="$"
          />
          <RangeInput
            name="pie"
            control={control}
            label="Pie"
            error={errors.pie}
            min={0}
            max={costoInmueble}
            step={1000}
          />
          <InputForm
            name="bonoPie"
            control={control}
            label="Bono Pie"
            type="number"
            error={errors.bonoPie}
            clarificationPosition="start"
            clarificationText="$"
          />
          <RangeInput
            name="bonoPie"
            control={control}
            label="Bono Pie"
            error={errors.bonoPie}
            min={0}
            max={costoInmueble - pie}
            step={1000}
          />
          <p>
            <strong>Monto del Préstamo Calculado:</strong>{" "}
            {montoPrestamoCalculado}
          </p>
          <InputForm
            name="tasaDeInteres"
            control={control}
            label="Tasa de Interés"
            type="number"
            error={errors.tasaDeInteres}
            clarificationPosition="start"
            clarificationText="%"
          />
          <RangeInput
            name="tasaDeInteres"
            control={control}
            label="Tasa de Interés"
            error={errors.tasaDeInteres}
            min={0}
            max={100}
            step={1}
          />
          <InputForm
            name="duracion"
            control={control}
            label="Duración"
            type="number"
            error={errors.duracion}
            clarificationPosition="start"
            clarificationText="años"
          />
        </form>
        <Tabla
          montoPrestamoCalculado={montoPrestamoCalculado}
          tasaDeInteres={tasaDeInteres}
          duracion={duracion}
        />
      </div>

      <AsideContainer
        montoPrestamoCalculado={montoPrestamoCalculado}
        pie={pie}
        bonoPie={bonoPie}
        duracion={duracion}
        pagoMensual={pagoMensual}
      />

      <DetallesPrestamo
        montoPrestamoCalculado={montoPrestamoCalculado}
        pie={pie}
        bonoPie={bonoPie}
        duracion={duracion}
        pagoMensual={pagoMensual}
      />
    </section>
  );
};
