import { formProps } from "../../store/store";

export const totalInteresesPagados = (
  duracion: number,
  pagoMensual: number,
  montoPrestamoCalculado: number
): number => {
  return parseFloat(
    (duracion * 12 * pagoMensual - montoPrestamoCalculado).toFixed(2)
  );
};

export const duracionTotal = (duracion: number): number => {
  return duracion * 12;
};

export const prestamoConIntereses = (
  duracion: number,
  pagoMensual: number
): number => {
  return parseFloat((duracion * 12 * pagoMensual).toFixed(2));
};

export const calcularCae = (
  montoPrestamoCalculado: number,
  tasaDeInteres: number
): number => {
  return Number((montoPrestamoCalculado * (Number(tasaDeInteres) + 1)) / 100);
};
export const calcularGastosOperacionales = (
  montoPrestamoCalculado: number
): number => {
  return parseFloat(((montoPrestamoCalculado * 1) / 100).toFixed(2));
};

export const calcularMontoTotal = (
  costoInmueble: number,
  pie: number,
  bonoPie: number,
  totalIntereses: number,
  cae: number,
  gastosOperacionales: number
) => {
  return (
    Number(costoInmueble) +
    Number(pie) +
    Number(bonoPie) +
    Number(totalIntereses) +
    Number(cae) +
    Number(gastosOperacionales)
  );
};

export const calcularPorcentajeIncidencia = (item: number, total: number) => {
  return Number((Number(item) * 100) / Number(total)).toFixed(2);
};

export const calcularTablaAmortizacionMensual = (
  montoPrestamo: number,
  tasaInteres: number,
  duracion: number
) => {
  const tasaMensual = tasaInteres / 100 / 12;
  const totalPagos = duracion * 12;

  // Fórmula de cuota fija (método francés)
  const cuotaMensual =
    (montoPrestamo * tasaMensual) /
    (1 - Math.pow(1 + tasaMensual, -totalPagos));

  let saldoPendiente = montoPrestamo;
  const tabla = [];

  for (let mes = 1; mes <= totalPagos; mes++) {
    const intereses = saldoPendiente * tasaMensual;
    const amortizacion = cuotaMensual - intereses;
    saldoPendiente -= amortizacion;

    tabla.push({
      mes,
      cuotaMensual: cuotaMensual.toFixed(2),
      intereses: intereses.toFixed(2),
      amortizacion: amortizacion.toFixed(2),
      saldoPendiente: saldoPendiente > 0 ? saldoPendiente.toFixed(2) : "0.00",
    });
  }

  return tabla;
};

export const calcularTablaAmortizacionAnual = (
  formInfo: formProps,
  montoPrestamoCalculado: number
) => {
  const tasaDecimal = formInfo.tasaDeInteres / 100;
  const cuotaAnual =
    (montoPrestamoCalculado * tasaDecimal) /
    (1 - Math.pow(1 + tasaDecimal, -formInfo.duracion));

  let saldo = montoPrestamoCalculado;
  return Array.from({ length: formInfo.duracion }, (_, i) => {
    const interes = saldo * tasaDecimal;
    const abonoCapital = cuotaAnual - interes;
    saldo -= abonoCapital;

    return {
      anio: i + 1,
      cuotaAnual: cuotaAnual.toFixed(2),
      interes: interes.toFixed(2),
      abonoCapital: abonoCapital.toFixed(2),
      saldoRestante: saldo.toFixed(2),
    };
  });
};
