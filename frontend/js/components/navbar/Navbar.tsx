import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Bar from "react-bootstrap/Navbar";

import KabutoImageSource from "../../../assets/images/kabuto.png";

// TO-DO: Delete recommendations link after linked from generate button in home pg
export default function Navbar() {
  return (
    <Bar className="bg-header-c flex-grow-1 px-5" expand="lg">
      <Container>
        <Bar.Brand
          className="d-flex align-items-center inter fw-bold"
          href="/"
          style={{ color: "#FDFDFD" }}
        >
          <Image
            className="object-fit-contain"
            src={KabutoImageSource}
            style={{ height: "1.5em", marginRight: "1em" }}
          />
          KabutoRecs
        </Bar.Brand>
        <Bar.Toggle aria-controls="basic-Bar-nav" />
        <Bar.Collapse
          className="flex-column align-items-end"
          id="basic-Bar-nav"
        >
          <Nav className="ms-auto">
            <Nav.Link
              className="px-5 inter fw-bold"
              href="/"
              style={{ color: "#FDFDFD" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              className="px-5 inter fw-bold"
              href="/about"
              style={{ color: "#FDFDFD" }}
            >
              About Us
            </Nav.Link>
          </Nav>
        </Bar.Collapse>
      </Container>
    </Bar>
  );
}
