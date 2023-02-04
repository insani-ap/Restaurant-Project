import React from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../Header2";
import Footer from "../Footer";
import Subheader from "../Subheader";
import { Col, Container, Row } from "react-bootstrap";
import { increment } from "../../Redux/counterSlice";
import { useDispatch } from "react-redux";

const ShowDetailsMenu = (_) => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  if (state === undefined) {
    window.location.href="/menu";
  } else {
    return (
      <>
        <Header menu="nav-item active" />
        <Subheader title="Details Menu" />
        <Container style={{ margin: "5% 0" }}>
          <Row>
            <Col sm={6}>
              <div class="heading-title text-center">
                <img src={state.menus.image} alt="Image Menu" width="60%"></img>
              </div>
            </Col>
            <Col sm={6}>
              <div class="heading-title text-center">
                <h2>{state.menus.name}</h2>
                <h3>
                  {" "}
                  <span style={{ marginRight: "1%" }}>{state.menus.valuta}</span>
                  <span>{state.menus.price}.00</span>
                </h3>
                <p>{state.menus.description}</p>
              </div>
              <div class="text-center">
                {" "}
                <button
                  className="btn btn-common"
                  onClick={() => dispatch(increment(state.menus))}
                >
                  Add to Cart
                </button>
              </div>
            </Col>
          </Row>
        </Container>
        <div style={{ margin: "1% 1%" }}>
          <Link to="/menu">
            <button class="btn btn-common">Back</button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }
};

export default ShowDetailsMenu;
