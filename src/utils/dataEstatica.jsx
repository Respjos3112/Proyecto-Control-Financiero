import { v } from "../styles/variables";
import {
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineAnalytics } from "react-icons/md";
import {RiDashboard3Line} from "react-icons/ri";
import { MdImportExport } from "react-icons/md";


export const DesplegableUser = [
  {
    text: "Mi perfil",
    icono: <v.iconoUser/>,
    tipo: "miperfil",
  },
  {
    text: "Configuracion",
    icono: <v.iconoSettings/>,
    tipo: "configuracion",
  },
  {
    text: "Cerrar sesión",
    icono: <v.iconoCerrarSesion/>,
    tipo: "cerrarsesion",
  },
];

export const DataDesplegableTipo = [
  {
    text: "Categorias gastos",
    color:  v.colorGastos,
    tipo: "g",
    bgcolor:  v.colorbgGastos,
  },
  {
    text: "Categorias ingresos",
    color: v.colorIngresos,
    tipo: "i",
    bgcolor:  v.colorbgingresos,
  },
];
export const DataDesplegableMovimientos = [
  {
    text: "Gastos",
    color:  v.colorGastos,
    tipo: "g",
    bgcolor:  v.colorbgGastos,
  },
  {
    text: "Ingresos",
    color: v.colorIngresos,
    tipo: "i",
    bgcolor:  v.colorbgingresos,
  },
];

//data SIDEBAR
export const LinksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Categorias",
    icon: <MdOutlineAnalytics />,
    to: "/categorias",
  },
  {
    label: "Movimientos",
    icon: <AiOutlineApartment />,
    to: "/movimientos",
  },
  {
    label: "Dashboard",
    icon: <RiDashboard3Line />,
    to: "/informes",
  },
  {
    label: "Informes",
    icon: <MdOutlineAnalytics />,
    to: "/dashboard",
  },
  {
    label: "Importaciones",
    icon: <MdImportExport  />,
    to: "/importaciones",
  },
];
export const SecondarylinksArray = [
  {
    label: "Configuración",
    icon: <AiOutlineSetting />,
    to: "/configurar",
  },
  {
    label: "Acerca de",
    icon: <v.iconoacer />,
    to: "/",
  },
];
//temas
export const TemasData = [
  {
    icono: "🌞",
    descripcion: "light",
   
  },
  {
    icono: "🌚",
    descripcion: "dark",
    
  },
];
