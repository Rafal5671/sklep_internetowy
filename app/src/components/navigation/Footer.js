import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#2c3e50",
        color: "white",
        textAlign: "center",
        padding: "20px 0",
      }}
    >
      <Container>
        <Row>
          <Col md={3} lg={3} xl={3} className="mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">E-Amator</h6>
            <p>
              Twoje miejsce na najwyższej jakości elektronikę i akcesoria.
              Oferujemy szeroki wybór produktów, aby zaspokoić wszystkie Twoje
              potrzeby technologiczne.
            </p>
          </Col>

          <Col md={3} lg={3} xl={3} className="mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Produkty</h6>
            <p>Laptopy i komputery</p>
            <p>Smartfony</p>
            <p>Tablety</p>
            <p>Smartwatche</p>
            <p>Telewizory</p>
            <p>Monitory</p>
          </Col>

          <Col md={3} lg={3} xl={3} className="mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              Przydatne linki
            </h6>
            <p>O nas</p>
            <p>Obsługa klienta</p>
            <Link
              to="/terms"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <p>Regulamin</p>
            </Link>
            <p>Polityka prywatności</p>
          </Col>

          <Col md={3} lg={3} xl={3} className="mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Kontakt</h6>
            <p>
              <HomeIcon /> Łódź, Polska
            </p>
            <p>
              <EmailIcon /> E-Amator@gmail.com
            </p>
            <p>
              <PhoneIcon /> +48 123 456 789
            </p>
          </Col>
        </Row>

        <hr className="my-3" style={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

        <Row className="d-flex align-items-center">
          <Col md={7} lg={8} className="text-center text-md-start">
            <div className="p-3">
              © {new Date().getFullYear()} Prawa autorskie: E-Amator
            </div>
          </Col>
          <Col md={5} lg={4} className="text-center text-md-end">
            <Button variant="outline-light" className="btn-floating m-1">
              <FacebookIcon />
            </Button>
            <Button variant="outline-light" className="btn-floating m-1">
              <TwitterIcon />
            </Button>
            <Button variant="outline-light" className="btn-floating m-1">
              <GoogleIcon />
            </Button>
            <Button variant="outline-light" className="btn-floating m-1">
              <InstagramIcon />
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
