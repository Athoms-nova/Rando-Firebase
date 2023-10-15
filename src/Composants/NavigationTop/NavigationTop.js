import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GestionContext } from "../../Context/GestionContext";
import logo from "../../icons/icon-home.png";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./NavigationTop.scss";

const MenuPourMobil = ({ onClick }) => {
  const styleButton = {
    width: "200px",
    height: "50px",
    margin: "10px 0 10px 0",
    textAlign: "start",
    fontSize: "18px"
  };
  return (
    <Navbar key={false} bg="light" expand={false}>
      <Container fluid>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${false}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
              <Link to={"/"} style={{textDecoration : "none"}}>
                <div className="d-flex align-items-end">
                  <img src={logo} alt="home" style={{width : "60px"}}/>
                  <h2 style={{
                    color : "black",
                    marginLeft : "20px"
                  }}> Home </h2>
                </div>
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column align-items-start">
            <Button onClick={() => onClick("Carte")} style={styleButton}>
              La Carte
            </Button>
            <Button onClick={() => onClick("Lieu")} style={styleButton}>
              Les Lieux
            </Button>
            <Button onClick={() => onClick("Randonnée")} style={styleButton}>
              Les Randonnées
            </Button>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

const NavigationTop = () => {
  const { OnClickButtonCardHome } = useContext(GestionContext);
  return (
    <div className="navigation-top">
      <Link to={"/"}>
        <div className="logo">
          <img src={logo} alt="home" />
        </div>
      </Link>
      <div className="navigation-menu">
        <Button onClick={() => OnClickButtonCardHome("Carte")}>La Carte</Button>
        <Button onClick={() => OnClickButtonCardHome("Lieu")}>Les Lieux</Button>
        <Button onClick={() => OnClickButtonCardHome("Randonnée")}>
          Les Randonnées
        </Button>
      </div>
      <div className="navigation-menu-mobile">
        <MenuPourMobil onClick={OnClickButtonCardHome} />
      </div>
    </div>
  );
};

export default NavigationTop;
