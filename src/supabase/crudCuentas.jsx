import { supabase } from "../index";

export async function MostrarCuentas(p) {
  try {
    const { data, error, count } = await supabase
      .from("cuenta")
      .select()
      .eq("idusuario", p.idusuario)
      .single();

    if (error) {
      throw error;
    }

    if (count === 0) {
      return null; // No se encontraron cuentas asociadas al usuario
    }

    return data;
  } catch (error) {
    console.error("Error en MostrarCuentas:", error);
    return null;
  }
}
