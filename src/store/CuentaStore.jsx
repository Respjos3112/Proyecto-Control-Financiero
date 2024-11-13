import { create } from "zustand";
import { MostrarCuentas } from "../index";
export const useCuentaStore = create((set) => ({
  cuentaItemSelect: [],
  datacuentas: [],
  mostrarCuentas: async (p) => {
    const response = await MostrarCuentas(p);
    set({ datacuentas: response });
    set({ cuentaItemSelect: response });
    return response;
  },
}));