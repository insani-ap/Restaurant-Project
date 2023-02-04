import React, { useEffect, useState } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { increment } from "../../Redux/counterSlice";

function ListCat2(props) {
  const [menus, setMenus] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };
  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:8080/menu`);
      const json = await response.json();
      setMenus(json);
    } catch (error) {
      console.log(error);
    }
  }, []);

  var liALL = menus.map((menu) => {
    let cutAll = menu.description.slice(0, 75);
    return (
      <>
        <div class="col-lg-4 col-md-6 special-grid drinks">
          <div class="gallery-single fix">
            <img src={menu.image} class="img-fluid" alt="Image" width="100%" />
            <div class="why-text" onClick={showModal}>
              <h4>{menu.name}</h4>
              <p>{cutAll}...</p>
              <h5>
                <span style={{ marginRight: "5%" }}>{menu.valuta}</span>
                <span>{menu.price}.00</span>
              </h5>
              <span style={{ marginRight: "5%" }}>
                <Link
                  to={{
                    pathname: `/view-menu-details/${menu.id}`,
                    state: { menus: menu },
                  }}
                >
                  <button className="btn btn-common" width="50%">
                    Details
                  </button>
                </Link>
              </span>
              <span>
                <button
                  className="btn btn-common"
                  onClick={() => dispatch(increment(menu))}
                >
                  +
                </button>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  });
  var liAPPETIZER = menus.map((menu) => {
    let cutApp = menu.description.slice(0, 75);
    if (menu.category === "Appetizer") {
      return (
        <div class="col-lg-4 col-md-6 special-grid drinks">
          <div class="gallery-single fix">
            <img src={menu.image} class="img-fluid" alt="Image" width="100%" />
            <div class="why-text">
              <h4>{menu.name}</h4>
              <p>{cutApp}...</p>
              <h5>
                <span style={{ marginRight: "5%" }}>{menu.valuta}</span>
                <span>{menu.price}.00</span>
              </h5>
              <span style={{ marginRight: "5%" }}>
                <Link
                  to={{
                    pathname: `/view-menu-details/${menu.id}`,
                    state: { menus: menu },
                  }}
                >
                  <button className="btn btn-common" width="50%">
                    Details
                  </button>
                </Link>
              </span>
              <span>
                <button
                  className="btn btn-common"
                  onClick={() => dispatch(increment(menu))}
                >
                  +
                </button>
              </span>
            </div>
          </div>
        </div>
      );
    }
  });
  var liMAINCOURSE = menus.map((menu) => {
    let cutMain = menu.description.slice(0, 75);
    if (menu.category === "Main Course") {
      return (
        <div class="col-lg-4 col-md-6 special-grid drinks">
          <div class="gallery-single fix">
            <img src={menu.image} class="img-fluid" alt="Image" width="100%" />
            <div class="why-text">
              <h4>{menu.name}</h4>
              <p>{cutMain}...</p>
              <h5>
                <span style={{ marginRight: "5%" }}>{menu.valuta}</span>
                <span>{menu.price}.00</span>
              </h5>
              <span style={{ marginRight: "5%" }}>
                <Link
                  to={{
                    pathname: `/view-menu-details/${menu.id}`,
                    state: { menus: menu },
                  }}
                >
                  <button className="btn btn-common" width="50%">
                    Details
                  </button>
                </Link>
              </span>
              <span>
                <button
                  className="btn btn-common"
                  onClick={() => dispatch(increment(menu))}
                >
                  +
                </button>
              </span>
            </div>
          </div>
        </div>
      );
    }
  });
  var liDESSERT = menus.map((menu) => {
    let cutDes = menu.description.slice(0, 75);
    if (menu.category === "Dessert") {
      return (
        <div class="col-lg-4 col-md-6 special-grid drinks">
          <div class="gallery-single fix">
            <img src={menu.image} class="img-fluid" alt="Image" width="100%" />
            <div class="why-text">
              <h4>{menu.name}</h4>
              <p>{cutDes}...</p>
              <h5>
                <span style={{ marginRight: "5%" }}>{menu.valuta}</span>
                <span>{menu.price}.00</span>
              </h5>
              <span style={{ marginRight: "5%" }}>
                <Link
                  to={{
                    pathname: `/view-menu-details/${menu.id}`,
                    state: { menus: menu },
                  }}
                >
                  <button className="btn btn-common" width="50%">
                    Details
                  </button>
                </Link>
              </span>
              <span>
                <button
                  className="btn btn-common"
                  onClick={() => dispatch(increment(menu))}
                >
                  +
                </button>
              </span>
            </div>
          </div>
        </div>
      );
    }
  });
  var liDRINK = menus.map((menu) => {
    let cutDr = menu.description.slice(0, 75);
    if (menu.category === "Drink") {
      return (
        <div class="col-lg-4 col-md-6 special-grid drinks">
          <div class="gallery-single fix">
            <img src={menu.image} class="img-fluid" alt="Image" width="100%" />
            <div class="why-text">
              <h4>{menu.name}</h4>
              <p>{cutDr}...</p>
              <h5>
                <span style={{ marginRight: "5%" }}>{menu.valuta}</span>
                <span>{menu.price}.00</span>
              </h5>
              <span style={{ marginRight: "5%" }}>
                <Link
                  to={{
                    pathname: `/view-menu-details/${menu.id}`,
                    state: { menus: menu },
                  }}
                >
                  <button className="btn btn-common" width="50%">
                    Details
                  </button>
                </Link>
              </span>
              <span>
                <button
                  className="btn btn-common"
                  onClick={() => dispatch(increment(menu))}
                >
                  +
                </button>
              </span>
            </div>
          </div>
        </div>
      );
    }
  });
  return (
    <div className="tab-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <Tab.Container defaultActiveKey="appetizer">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="all">All</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="appetizer">Appetizer</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="main course">Main Course</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="dessert">Dessert</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="drink">Drink</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="all">
                      <div class="row">{liALL}</div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="appetizer">
                      <div class="row">{liAPPETIZER}</div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="main course">
                      <div class="row">{liMAINCOURSE}</div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="dessert">
                      <div class="row">{liDESSERT}</div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="drink">
                      <div class="row">{liDRINK}</div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ListCat2 };
