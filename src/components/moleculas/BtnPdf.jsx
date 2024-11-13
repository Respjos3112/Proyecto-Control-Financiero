import  { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import image from '../../assets/logocontafaq.png';

const supabase = createClient('https://bpucfybagvektjwxklsv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdWNmeWJhZ3Zla3Rqd3hrbHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzOTUzODEsImV4cCI6MjAxOTk3MTM4MX0.cX8mhj0Pzon9jO8f114MA5AA8eaa2iV1pd7QzpxMk9E');

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
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
};

export function BtnPdf() {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga de datos

  useEffect(() => {
    async function fetchMovimientos() {
      try {
        const { data, error } = await supabase
          .from('movimientos')
          .select('descripcion, valor, fecha, estado');

        if (error) {
          console.error('Error fetching data:', error.message);
          return;
        }

        setMovimientos(data);
        setLoading(false); // Marcamos que los datos se han cargado correctamente
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchMovimientos();
  }, []);

  const exportToPDF = () => {
    if (loading) return;

    const doc = new jsPDF();

    // Agrega la imagen al encabezado
    doc.addImage(image, 'PNG', 10, 10, 25, 20);

    // Agrega el título "Informe" en el encabezado
    doc.setFontSize(25);
    doc.text('Informe', 40, 20);

    // Agrega la tabla debajo del encabezado
    doc.autoTable({
      startY: 40, // Comienza la tabla a partir de esta posición
      head: [['Descripción', 'Valor', 'Fecha', 'Estado']],
      body: movimientos.map(({ descripcion, valor, fecha, estado }) => [descripcion, valor, fecha, estado]),
    });

    doc.save('informe_movimientos.pdf');
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.button}
        onClick={exportToPDF}
        onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
      >
        Exportar a PDF
      </button>
    </div>
  );
}
