import React from "react";
import {Row, Col, Container} from "react-bootstrap";
import Account from "../components/Account/Account";
import Menu from "../components/Menu/Menu";
import SideMenu from "../components/Account/SideMenu";
import "../components/Account/Account.css";

export default function ProfilePage() {
  return (
    <div className="App">
      <header style={{ marginTop: 100 }}>
        <div>
          <Menu />
        </div>
      </header>
      <body className="mt-5">
        <Container>
          <Row>
            <Col md={3}>
              <SideMenu/>
            </Col>
            <Col>
              <Account />
            </Col>
          </Row>
        </Container>
      </body>
    </div>
  );
}