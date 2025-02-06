import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputForm from "../InputForm/InputForm";
import { FormValues, schema } from "../../helpers/zod/formSchema";
import "./form.css";
import { useEffect } from "react";
import { useFormStore } from "../../store/store";
import RangeInput from "../RangeInput/RangeInput";
import { formatNumber } from "../../helpers/formatNumber";

export const Form = () => {
  const { setFormInfo, montoPrestamoCalculado, valueType, ufValue, formInfo } =
    useFormStore();
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      ...formInfo,
    },
  });

  const costoInmueble = Number(watch("costoInmueble")) || 0;
  const pie = Number(watch("pie")) || 0;
  const bonoPie = Number(watch("bonoPie"));
  const tasaDeInteres = Number(watch("tasaDeInteres")) || 0;
  const duracion = Number(watch("duracion")) || 0;
  const piePorcentaje = Number(watch("piePorcentaje")) || 20;
  const bonoPiePorcentaje = Number(watch("bonoPiePorcentaje")) || 0;

  console.log(formInfo);

  useEffect(() => {
    setFormInfo({
      costoInmueble,
      pie,
      bonoPie,
      tasaDeInteres,
      duracion,
      piePorcentaje,
      bonoPiePorcentaje,
    });
  }, [
    bonoPie,
    costoInmueble,
    pie,
    tasaDeInteres,
    duracion,
    bonoPiePorcentaje,
    piePorcentaje,
    setFormInfo,
  ]);

  useEffect(() => {
    if (
      piePorcentaje !== null &&
      piePorcentaje !== undefined &&
      costoInmueble !== null &&
      costoInmueble !== undefined
    ) {
      const pie = (costoInmueble * piePorcentaje) / 100;
      if (pie !== watch("pie")) {
        setValue("pie", pie);
      }
    }

    if (
      bonoPiePorcentaje !== null &&
      bonoPiePorcentaje !== undefined &&
      costoInmueble !== null &&
      costoInmueble !== undefined
    ) {
      const bonoPie = (costoInmueble * bonoPiePorcentaje) / 100;
      if (bonoPie !== watch("bonoPie")) {
        setValue("bonoPie", bonoPie);
      }
    }
  }, [piePorcentaje, bonoPiePorcentaje, setValue]);

  useEffect(() => {
    if (
      pie !== null &&
      pie !== undefined &&
      costoInmueble !== null &&
      costoInmueble !== undefined
    ) {
      const piePorcentaje = (pie / costoInmueble) * 100;
      if (piePorcentaje !== watch("piePorcentaje")) {
        setValue("piePorcentaje", piePorcentaje);
      }
    }

    if (
      bonoPie !== null &&
      bonoPie !== undefined &&
      costoInmueble !== null &&
      costoInmueble !== undefined
    ) {
      const bonoPiePorcentaje = (bonoPie / costoInmueble) * 100;
      if (bonoPiePorcentaje !== watch("bonoPiePorcentaje")) {
        setValue("bonoPiePorcentaje", bonoPiePorcentaje);
      }
    }
  }, [pie, bonoPie, costoInmueble, setValue]);

  return (
    <form id="form">
      <InputForm
        name="costoInmueble"
        control={control}
        label="Precio de escrituración:"
        type="number"
        error={errors.costoInmueble}
        clarificationText={valueType === "$" ? "$" : "UF"}
      />
      <div className="inputLineContainer">
        <InputForm
          name="pie"
          control={control}
          label="Pie: "
          type="number"
          error={errors.pie}
          clarificationText={valueType === "$" ? "$" : "UF"}
          max={costoInmueble}
        />
        <InputForm
          name="piePorcentaje"
          control={control}
          type="number"
          error={errors.pie}
          clarificationText="%"
          min={0}
          max={100}
        />
      </div>

      <RangeInput
        name="pie"
        control={control}
        error={errors.pie}
        min={0}
        max={costoInmueble}
        step={0.1}
      />
      <div className="inputLineContainer">
        <InputForm
          name="bonoPie"
          control={control}
          label="Bono Pie"
          type="number"
          error={errors.bonoPie}
          clarificationText={valueType === "$" ? "$" : "UF"}
          max={costoInmueble - pie}
        />
        <InputForm
          name="bonoPiePorcentaje"
          control={control}
          type="number"
          error={errors.pie}
          clarificationText="%"
          min={0}
          max={100}
        />
      </div>

      <RangeInput
        name="bonoPie"
        control={control}
        error={errors.bonoPie}
        min={0}
        max={costoInmueble - pie}
        step={0.1}
      />
      <div className="calculationsDivs">
        <p>
          Monto del Préstamo:
          {montoPrestamoCalculado > 0 && (
            <strong>
              {valueType === "$" ? (
                <>
                  {" "}
                  ${formatNumber(montoPrestamoCalculado)} / UF
                  {formatNumber(montoPrestamoCalculado / ufValue)}
                </>
              ) : (
                <>
                  ${formatNumber(montoPrestamoCalculado * ufValue)} / UF
                  {formatNumber(montoPrestamoCalculado)}
                </>
              )}
            </strong>
          )}
        </p>
        <span>{`(Precio de escrituración - Pie - Bono pie)`}</span>
      </div>
      <InputForm
        name="tasaDeInteres"
        control={control}
        label="Tasa de Interés"
        type="number"
        min={0}
        max={20}
        error={errors.tasaDeInteres}
        clarificationText="%"
      />
      <RangeInput
        name="tasaDeInteres"
        control={control}
        error={errors.tasaDeInteres}
        min={0}
        max={20}
        step={0.1}
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
