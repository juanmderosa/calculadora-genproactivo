import { create } from "zustand";

export interface formProps {
  costoInmueble: number;
  pie: number;
  bonoPie: number;
  tasaDeInteres: number;
  duracion: number;
  piePorcentaje: number;
  bonoPiePorcentaje: number;
}

interface StoreState {
  showMonthlyTable: boolean;
  setShowMontlyTable: () => void;
  showYearTable: boolean;
  setShowYearTable: () => void;
  formInfo: formProps;
  montoPrestamoCalculado: number;
  ufValue: number;
  setUfValue: (value: number) => void;
  pagoMensual: number;
  valueType: string;
  setValueType: (value: string) => void;
  setFormInfo: (newFormInfo: formProps) => void;
  setMontoPrestamoCalculado: (
    costoInmueble: number,
    pie: number,
    bonoPie: number
  ) => void;
  setPagoMensual: (
    montoPrestamoCalculado: number,
    tasaDeInteres: number,
    duracion: number
  ) => void;
}

export const useFormStore = create<StoreState>((set) => ({
  showMonthlyTable: false,
  setShowMontlyTable: () => {
    set((state) => ({
      showMonthlyTable: !state.showMonthlyTable,
      showYearTable: false,
    }));
  },
  showYearTable: false,
  setShowYearTable: () => {
    set((state) => ({
      showYearTable: !state.showYearTable,
      showMonthlyTable: false,
    }));
  },
  ufValue: 0,
  setUfValue: (value: number) => {
    set({ ufValue: value });
  },
  formInfo: {
    costoInmueble: 0,
    pie: 0,
    bonoPie: 0,
    tasaDeInteres: 0,
    duracion: 0,
    piePorcentaje: 0,
    bonoPiePorcentaje: 0,
  },
  montoPrestamoCalculado: 0,
  pagoMensual: 0,
  valueType: "uf",
  setValueType: (value: string) => {
    set({ valueType: value });
  },
  setFormInfo: (newFormInfo: formProps) =>
    set((state) => ({
      formInfo: { ...state.formInfo, ...newFormInfo },
    })),

  setMontoPrestamoCalculado: (
    costoInmueble: number,
    pie: number,
    bonoPie: number
  ) => {
    const monto = parseFloat((costoInmueble - pie - bonoPie).toFixed(2));
    set({ montoPrestamoCalculado: monto });
  },
  setPagoMensual: (
    montoPrestamoCalculado: number,
    tasaDeInteres: number,
    duracion: number
  ) => {
    const tasaMensual = tasaDeInteres / 100 / 12;
    const meses = duracion * 12;

    if (montoPrestamoCalculado > 0 && tasaMensual > 0 && meses > 0) {
      const pago =
        (montoPrestamoCalculado * tasaMensual) /
        (1 - Math.pow(1 + tasaMensual, -meses));

      set({ pagoMensual: parseFloat(pago.toFixed(2)) });
      return;
    }
    set({ pagoMensual: 0 });
  },
}));
