import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputForm from "../InputForm/InputForm";
import { FormValues, schema } from "../../helpers/zod/formSchema";
import "./form.css";
import { useEffect, useRef } from "react";
import { useFormStore } from "../../store/store";
import RangeInput from "../RangeInput/RangeInput";
import { formatNumber } from "../../helpers/formatNumber";

export const Form = () => {
  const { setFormInfo, montoPrestamoCalculado, valueType, ufValue, formInfo } =
    useFormStore();
  const {
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      ...formInfo,
    },
  });

  const costoInmueble = Number(watch("costoInmueble")) || 0;
  const pie = Number(watch("pie")) || 0;
  const bonoPie = Number(watch("bonoPie"));
  const tasaDeInteres = Number(watch("tasaDeInteres")) || 0;
  const duracion = Number(watch("duracion")) || 0;
  const piePorcentaje = Number(watch("piePorcentaje")) || 0;
  const bonoPiePorcentaje = Number(watch("bonoPiePorcentaje")) || 0;

  const prevFormInfo = useRef(formInfo);

  useEffect(() => {
    if (
      prevFormInfo.current.costoInmueble !== costoInmueble ||
      prevFormInfo.current.pie !== pie ||
      prevFormInfo.current.bonoPie !== bonoPie ||
      prevFormInfo.current.tasaDeInteres !== tasaDeInteres ||
      prevFormInfo.current.duracion !== duracion ||
      prevFormInfo.current.piePorcentaje !== piePorcentaje ||
      prevFormInfo.current.bonoPiePorcentaje !== bonoPiePorcentaje
    ) {
      setFormInfo({
        ...formInfo,
        costoInmueble,
        pie,
        bonoPie,
        tasaDeInteres,
        duracion,
        piePorcentaje,
        bonoPiePorcentaje,
      });
      prevFormInfo.current = {
        costoInmueble,
        pie,
        bonoPie,
        tasaDeInteres,
        duracion,
        piePorcentaje,
        bonoPiePorcentaje,
      };
    }
  }, [
    bonoPie,
    costoInmueble,
    pie,
    tasaDeInteres,
    duracion,
    bonoPiePorcentaje,
    piePorcentaje,
    formInfo,
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
      const formattedPie = parseFloat(pie.toFixed(2));
      if (formattedPie !== Number(watch("pie"))) {
        setFormInfo({
          ...formInfo,
          pie: formattedPie,
          piePorcentaje: parseFloat(
            ((formattedPie / costoInmueble) * 100).toFixed(2)
          ),
        });
        setValue("pie", formattedPie);
      }
    }

    if (
      bonoPiePorcentaje !== null &&
      bonoPiePorcentaje !== undefined &&
      costoInmueble !== null &&
      costoInmueble !== undefined
    ) {
      const bonoPie = (costoInmueble * bonoPiePorcentaje) / 100;
      const formattedBonoPie = parseFloat(bonoPie.toFixed(2));
      if (formattedBonoPie !== Number(watch("bonoPie"))) {
        setFormInfo({
          ...formInfo,
          bonoPie: formattedBonoPie,
          bonoPiePorcentaje: parseFloat(
            ((formattedBonoPie / costoInmueble) * 100).toFixed(2)
          ),
        });
        setValue("bonoPie", formattedBonoPie);
      }
    }
  }, [piePorcentaje, bonoPiePorcentaje]);

  useEffect(() => {
    if (
      pie !== null &&
      pie !== undefined &&
      costoInmueble !== null &&
      costoInmueble !== undefined
    ) {
      const piePorcentaje = (pie / costoInmueble) * 100;
      const formattedPiePorcentaje = parseFloat(piePorcentaje.toFixed(2));
      if (formattedPiePorcentaje !== Number(watch("piePorcentaje"))) {
        setFormInfo({
          ...formInfo,
          piePorcentaje: formattedPiePorcentaje,
          pie: parseFloat(((pie * costoInmueble) / 100).toFixed(2)),
        });
        setValue("piePorcentaje", formattedPiePorcentaje);
      }
    }

    if (
      bonoPie !== null &&
      bonoPie !== undefined &&
      costoInmueble !== null &&
      costoInmueble !== undefined
    ) {
      const bonoPiePorcentaje = (bonoPie / costoInmueble) * 100;
      const formattedBonoPiePorcentaje = parseFloat(
        bonoPiePorcentaje.toFixed(2)
      );
      if (formattedBonoPiePorcentaje !== Number(watch("bonoPiePorcentaje"))) {
        setFormInfo({
          ...formInfo,
          bonoPiePorcentaje: formattedBonoPiePorcentaje,
          bonoPie: parseFloat(((bonoPie * costoInmueble) / 100).toFixed(2)),
        });
        setValue("bonoPiePorcentaje", formattedBonoPiePorcentaje);
      }
    }
  }, [pie, bonoPie]);

  useEffect(() => {
    if (costoInmueble !== null && costoInmueble !== undefined) {
      if (piePorcentaje !== null && piePorcentaje !== undefined) {
        const pie = (costoInmueble * piePorcentaje) / 100;
        const formattedPie = parseFloat(pie.toFixed(2));
        setFormInfo({
          ...formInfo,
          pie: formattedPie,
        });
        setValue("pie", formattedPie);
      }

      if (bonoPiePorcentaje !== null && bonoPiePorcentaje !== undefined) {
        const bonoPie = (costoInmueble * bonoPiePorcentaje) / 100;
        const formattedBonoPie = parseFloat(bonoPie.toFixed(2));
        setFormInfo({
          ...formInfo,
          bonoPie: formattedBonoPie,
        });
        setValue("bonoPie", formattedBonoPie);
      }
    }
  }, [costoInmueble]);

  /*   useEffect(() => {
   
  }, [valueType]);
 */
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
          max={costoInmueble - bonoPie}
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
