import { z } from "zod";

export type FormValues = z.infer<typeof schema>;

export const schema = z.object({
  costoInmueble: z.coerce
    .number({
      required_error: "El valor es requerido",
      invalid_type_error: "El costo del inmueble debe ser un número",
    })
    .gt(0, "El valor debe ser mayor a 0"),
  pie: z.coerce
    .number({
      required_error: "El valor es requerido",
      invalid_type_error: "El Pie debe ser un número",
    })
    .gte(0, "El valor debe ser mayor a 0"),
  bonoPie: z.coerce
    .number({
      required_error: "El valor es requerido",
      invalid_type_error: "El Bono Pie debe ser un número",
    })
    .gte(0, "El valor debe ser mayor a 0"),
  /* montoPrestamo: z.coerce
      .number({
        required_error: "El valor es requerido",
        invalid_type_error: "El Monto del préstamo debe ser un número",
      })
      .gt(0, "El valor debe ser mayor a 0"), */
  tasaDeInteres: z.coerce
    .number({
      required_error: "El valor es requerido",
      invalid_type_error: "La Tasa de Interés debe ser un número",
    })
    .gt(0, "El valor debe ser mayor a 0"),
  duracion: z.coerce
    .number({
      required_error: "El valor es requerido",
      invalid_type_error: "La duración debe ser un número",
    })
    .int("El número debe ser entero")
    .gt(0, "El valor debe ser mayor a 0"),
});
/*  .refine(
    (data) =>
      data.montoPrestamo === data.costoInmueble - data.bonoPie - data.pie,
    {
      message: "Los valores son inválidos",
      path: ["montoPrestamo"],
    }
  ); */
