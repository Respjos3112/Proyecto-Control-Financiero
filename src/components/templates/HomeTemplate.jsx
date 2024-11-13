import styled from "styled-components";
import {Carousel} from "../../index";
export function HomeTemplate() {
  return (<Main>
    <Container>
<Box>
<Carousel/>
</Box>
<Title>
Bienvenido a Contafaq GT <br /> 
</Title>
<SubText>
  CONTAFAQ GT: La herramienta digital creada para simplificar tu gestión financiera ¡Siempre al día y bajo control! <br/>
</SubText>
<ContainerAutor>
<div className="contentImg">
            <img src="https://i.ibb.co/L9XV60p/Ruleta10.jpg" />
          </div>
          <div className="contentDescripcion">
            <b>Consultores B.Holdcorp</b>
            <span>S.A.P.I de C.V.</span>
          </div>
</ContainerAutor>
    </Container>
  </Main>);
}
const Main =styled.main`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props)=> props.theme.bgtotal};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`

const Container =styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Box = styled.div`
  width: 50%;
  height: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

@media (max-widht: 40em){
  min-height: 50vh;
}
`
const Title = styled.h2`
font-size: ${(props)=> props.theme.fontxxl};
text-transform: capitalize;
  
color: ${(props) => props.theme.text};
align-self: flex-start;
width: 48%;
margin: 0 auto;

@media (max-width: 64em){
  width: 100%;
  text-align: center;

}
@media (max-width: 40em){
  font-size: ${(props)=> props.theme.fontxl};
}
  
`
const SubText = styled.p`
  font-size: ${(props) => props.theme.fontlg};
  color: #8e8c86;
  align-self: flex-start;
  width: 80%;
  margin: 1rem auto;
  font-weight: 400;

  @media (max-width: 64em) {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontsm};
  }
`
const ContainerAutor = styled.div`
  display:flex;
  align-items: center;
  gap:20px;
  .contentImg{
    width: 80px;
    height: 80;
    border-radius: 0%;
    overflow: hidden;
    img{
      width: 100%;
      object-fit: contain;

    }
  }
  .contentDescripcion {
    display: flex;
    flex-direction: column;
    b{
      color: ${(props) => props.theme.text};
    }
    span {
      color: #8c8c8c;
    }
  }
  `;