export const calcularPagoMensual = (
  montoPrestamoCalculado: number,
  tasaDeInteres: number,
  duracion: number
): number => {
  const tasaMensual = tasaDeInteres / 100 / 12; // Convertir a tasa mensual
  const meses = duracion * 12; // Convertir años a meses

  if (montoPrestamoCalculado > 0 && tasaMensual > 0 && meses > 0) {
    return (
      (montoPrestamoCalculado * tasaMensual) /
      (1 - Math.pow(1 + tasaMensual, -meses))
    );
  }

  return 0;
};

export const calcularMontoPrestamoCalculado = (
  costoInmueble: number,
  pie: number,
  bonoPie: number
): number => {
  return parseFloat((costoInmueble - pie - bonoPie).toFixed(2));
};

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

export const calcularCae = (montoPrestamoCalculado: number): number => {
  return parseFloat(((montoPrestamoCalculado * 1) / 100).toFixed(2));
};
export const calcularGastosOperacionales = (
  montoPrestamoCalculado: number
): number => {
  return parseFloat(((montoPrestamoCalculado * 1) / 100).toFixed(2));
};
