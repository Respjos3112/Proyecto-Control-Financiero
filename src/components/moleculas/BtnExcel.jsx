import  { useEffect, useRef, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import "handsontable/dist/handsontable.full.css";

// Inicializar cliente de Supabase
const supabase = createClient(
  'https://bpucfybagvektjwxklsv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdWNmeWJhZ3Zla3Rqd3hrbHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzOTUzODEsImV4cCI6MjAxOTk3MTM4MX0.cX8mhj0Pzon9jO8f114MA5AA8eaa2iV1pd7QzpxMk9E'
);

// Ejecutar para obtener todas las funciones de handsontable
registerAllModules();
registerLanguageDictionary(esMX);

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
  hotTableContainer: {
    marginTop: '20px',
  },
};

export function BtnExcel() {
  const [movimientos, setMovimientos] = useState([]);
  const hotTableComponent = useRef(null);

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase
        .from('movimientos')
        .select('descripcion, valor, fecha, estado');

      if (error) {
        console.error('Error fetching data:', error.message);
        return;
      }

      setMovimientos(data);
    }

    getData();
  }, []);

  const descargarArchivo = () => {
    const pluginDescarga =
      hotTableComponent.current.hotInstance.getPlugin("exportFile");

    pluginDescarga.downloadFile("csv", {
      filename: "ContafaqReporte",
      fileExtension: "csv",
      mimeType: "text/csv",
      columnHeaders: true,
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Descarga tu informe:</h2>
      <button
        style={styles.button}
        onClick={descargarArchivo}
        onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
      >
        Exportar a Excel
      </button>
      {movimientos && (
        <div style={styles.hotTableContainer}>
          <HotTable
            ref={hotTableComponent}
            language={esMX.languageCode}
            data={movimientos}
            licenseKey="non-commercial-and-evaluation"
            colHeaders={true}
            rowHeaders={true}
            columnSorting={true}
            mergeCells={true}
            contextMenu={["row_above", "row_below"]}
            readOnly={false}
          >
            <HotColumn data="descripcion" title="Descripción" />
            <HotColumn data="valor" title="Valor" />
            <HotColumn data="fecha" title="Fecha" />
            <HotColumn data="estado" title="Estado" />
          </HotTable>
        </div>
      )}
    </div>
  );
}