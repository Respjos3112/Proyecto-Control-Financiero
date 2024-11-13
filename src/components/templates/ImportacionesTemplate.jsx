import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useCategoriasStore, ListaGenerica, Selector } from "../../index";
import { useCuentaStore, InsertarMovimientos } from "../../index";

const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #218838;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const ContainerCategoria = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const parseDate = (dateString) => {
  if (typeof dateString === 'string') {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  } else if (typeof dateString === 'number') {
    const date = new Date(Math.round((dateString - 25569) * 864e5));
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${year}-${month}-${day}`;
  } else {
    console.error('Fecha no es una cadena ni un número:', dateString);
    return null;
  }
};

export function ImportacionesTemplate() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [stateCategorias, setStateCategorias] = useState(false);
  const { datacategoria, categoriaItemSelect, selectCategoria } = useCategoriasStore();
  const { cuentaItemSelect, mostrarCuentas } = useCuentaStore();

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        // Simplemente como ejemplo, se asume que el id de usuario es 1
        await mostrarCuentas(1); // Asegúrate de pasar el id de usuario correcto
      } catch (error) {
        console.error('Error al cargar cuentas:', error);
      }
    };

    fetchCuentas();
  }, [mostrarCuentas]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setFileName("");
  };

  const handleImport = async () => {
    if (!file) {
      Swal.fire({
        icon: 'warning',
        title: 'No se ha seleccionado ningún archivo',
        text: 'Por favor, seleccione un archivo primero.',
      });
      return;
    }

    if (!categoriaItemSelect) {
      Swal.fire({
        icon: 'warning',
        title: 'No se ha seleccionado ninguna categoría',
        text: 'Por favor, seleccione una categoría primero.',
      });
      return;
    }

    if (!cuentaItemSelect) {
      Swal.fire({
        icon: 'error',
        title: 'Cuenta no seleccionada',
        text: 'Por favor, seleccione una cuenta primero.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log('Datos del Excel:', jsonData);

        const validData = jsonData.map(row => {
          if (row.Fecha) {
            row.Fecha = parseDate(row.Fecha);
          }
          const isValid = row.Descripción && row.Valor && row.Fecha && row.Estado;
          if (!isValid) {
            console.warn('Fila inválida:', row);
          }
          return isValid ? {
            descripcion: row.Descripción,
            valor: row.Valor,
            fecha: row.Fecha,
            estado: row.Estado,
            tipo: row.Tipo || "default",
            idcategoria: categoriaItemSelect.id,
            idcuenta: cuentaItemSelect.id,
          } : null;
        }).filter(row => row !== null);

        if (validData.length === 0) {
          Swal.fire({
            icon: 'warning',
            title: 'Datos inválidos',
            text: 'No se encontraron datos válidos para importar.',
          });
          return;
        }

        await InsertarMovimientos(validData);

      } catch (error) {
        console.error('Error al procesar el archivo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al procesar el archivo: ' + error.message,
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Container>
      <h1>Importa y gestiona tus movimientos</h1>
      <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
      {fileName && <p>Archivo seleccionado: {fileName}</p>}
      <ContainerCategoria>
        <label>Categoria: </label>
        <Selector
          color="#e14e19"
          texto1={categoriaItemSelect?.icono}
          texto2={categoriaItemSelect?.descripcion}
          funcion={() => setStateCategorias(!stateCategorias)}
        />
      </ContainerCategoria>
      {stateCategorias && (
        <ListaGenerica
          bottom="23%"
          scroll="scroll"
          setState={() => setStateCategorias(!stateCategorias)}
          data={datacategoria}
          funcion={selectCategoria}
        />
      )}
      <Button onClick={handleImport}>Importar Datos</Button>
      {file && <DeleteButton onClick={handleFileRemove}>Quitar Archivo</DeleteButton>}
    </Container>
  );
}
