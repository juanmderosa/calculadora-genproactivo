import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputForm from "../InputForm/InputForm";
import { FormValues, schema } from "../../helpers/zod/formSchema";
import "./form.css";
import { useEffect } from "react";
import { useFormStore } from "../../store/store";
import RangeInput from "../RangeInput/RangeInput";

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

  const costoInmueble = Number(watch("costoInmueble"));
  const pie = Number(watch("pie"));
  const bonoPie = Number(watch("bonoPie"));
  const tasaDeInteres = Number(watch("tasaDeInteres"));
  const duracion = Number(watch("duracion"));

  const { setFormInfo, montoPrestamoCalculado, valueType } = useFormStore();

  useEffect(() => {
    setFormInfo({ costoInmueble, pie, bonoPie, tasaDeInteres, duracion });
  }, [bonoPie, costoInmueble, pie, tasaDeInteres, duracion, setFormInfo]);

  return (
    <form id="form">
      <InputForm
        name="costoInmueble"
        control={control}
        label="Costo Inmueble:"
        type="number"
        error={errors.costoInmueble}
        clarificationText={valueType === "$" ? "$" : "UF"}
      />
      <InputForm
        name="pie"
        control={control}
        label="Pie: "
        type="number"
        error={errors.pie}
        clarificationText="$"
      />
      <RangeInput
        name="pie"
        control={control}
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
        clarificationText="$"
      />
      <RangeInput
        name="bonoPie"
        control={control}
        error={errors.bonoPie}
        min={0}
        max={costoInmueble - pie}
        step={1000}
      />
      <div className="calculationsDivs">
        <p>
          Monto del Préstamo:<strong>${montoPrestamoCalculado}</strong>
        </p>
        <span>{`(Costo Inmueble en $ - Pie - Bono pie)`}</span>
      </div>
      <InputForm
        name="tasaDeInteres"
        control={control}
        label="Tasa de Interés"
        type="number"
        error={errors.tasaDeInteres}
        clarificationText="%"
      />
      <RangeInput
        name="tasaDeInteres"
        control={control}
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
        clarificationText="años"
      />
    </form>
  );
};
