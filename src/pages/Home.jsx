import styled from "styled-components";
import { HomeTemplate,useAuthStore,UserAuth } from "../index";
export function Home() {
  const {signout} = useAuthStore();
  const {user} = UserAuth();

  return (
    <Container>
      <StyledH1>¡Un gusto verte! {user.full_name}</StyledH1>
      <img src={user}/>
    <HomeTemplate/>
    <StyledButton onClick={signout}>Cerrar</StyledButton>
    </Container>
  );
}
const Container = styled.div`

`
const StyledH1 = styled.h1`
  color: #582; /* Color del texto */
  font-size: 20px; /* Tamaño de fuente */
  /* Otros estilos que desees aplicar */
`;
const StyledButton = styled.button`
  background-color: #582; /* Color de fondo */
  color: #fff; /* Color del texto */
  padding: 10px 20px; /* Padding interno */
  border: none; /* Sin borde */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
`;
