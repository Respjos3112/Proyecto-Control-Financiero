import styled from "styled-components";
import { BtnExcel } from "./../../index"; // Importar el componente BtnExcel desde su archivo
import { BtnPdf } from "./../../index"; // Importar el componente BtnPdf desde su archivo

export function DashboardTemplate() {
  return (
    <Container>
      <Title>Informes</Title>
      <Subtitle>Descarga tus informes:</Subtitle>
      <ButtonsContainer>
        <BtnExcel /> {/* Renderizar el componente BtnExcel */}
        <BtnPdf /> {/* Renderizar el componente BtnPdf */}
      </ButtonsContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 60px;
  background-color: #f0f0f0;
  border-radius: 90px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  color: #666;
  font-size: 18px;
  margin-bottom: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;
