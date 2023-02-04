import React from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Col, Form, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
class ListMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      id: 0,
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
      valuta: "",
      imageFile: null,
      req: false,
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8080/menu/").then((res) => {
      this.setState({
        menus: res.data,
        id: 0,
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
        valuta: "",
      });
    });
    this.setState({ req: true });
    this.setState({ imageFile: null });
  }
  submit(event, id) {
    event.preventDefault();
    if (id === 0) {
      const formData = new FormData();
      const menuData = {
        name: this.state.name,
        price: this.state.price,
        category: this.state.category,
        description: this.state.description,
        valuta: this.state.valuta,
      };

      formData.append(
        "imgMenu",
        this.state.imageFile,
        this.state.imageFile.name
      );

      formData.append(
        "menu",
        new Blob([JSON.stringify(menuData)], { type: "application/json" })
      );

      axios.post("http://localhost:8080/menu", formData).then((res) => {
        this.componentDidMount();
      });
    } else {
      const menuData = {
        id: this.state.id,
        name: this.state.name,
        price: this.state.price,
        category: this.state.category,
        description: this.state.description,
        valuta: this.state.valuta,
      };
      if (this.state.imageFile === null) {
        axios
          .put("http://localhost:8080/menunofile/" + id, menuData)
          .then(() => {
            this.componentDidMount();
          });
      } else {
        const formData = new FormData();

        formData.append(
          "imgMenu",
          this.state.imageFile,
          this.state.imageFile.name
        );

        formData.append(
          "menu",
          new Blob([JSON.stringify(menuData)], { type: "application/json" })
        );

        axios.put("http://localhost:8080/menu/" + id, formData).then(() => {
          this.componentDidMount();
        });
      }
    }
  }
  delete(id) {
    axios.delete(`http://localhost:8080/menu/${id}`).then(() => {
      this.componentDidMount();
    });
  }
  edit(id) {
    axios.get(`http://localhost:8080/menu/${id}`).then((res) => {
      this.setState({
        id: res.data.id,
        name: res.data.name,
        price: res.data.price,
        category: res.data.category,
        image: res.data.image,
        description: res.data.description,
        valuta: res.data.valuta,
      });
    });
    this.setState({ req: false });
  }
  render() {
    var liMENU = this.state.menus.map((menu) => {
      return (
        <tr key={menu.id}>
          <td>{menu.id}</td>
          <td>{menu.name}</td>
          <td>{menu.price}</td>
          <td>{menu.valuta}</td>
          <td>{menu.category}</td>
          <td>
            <img src={menu.image} width="50%" />
          </td>
          <td>{menu.description}</td>
          <td>
            <button
              class="btn btn-success"
              onClick={(e) => this.edit(menu.id)}
              type="submit"
              name="action"
            >
              EDIT
            </button>
          </td>
          <td>
            <button
              class="btn btn-danger"
              style={{ color: "white", textDecoration: "none" }}
              onClick={(e) => this.delete(menu.id)}
              type="submit"
              name="action"
            >
              DELETE
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <h1>Reservation</h1>
        <div style={{ width: "90%", margin: "150px auto" }}>
          <Table striped bordered hover variant="light" responsive="xl">
            <thead class="text-center">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Valuta</th>
                <th>Category</th>
                <th>Image</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody class="text-center">{liMENU}</tbody>
          </Table>
        </div>
        <div
          className="container"
          style={{ width: "100%", margin: "50px auto" }}
        >
          <a href="/admin/menu">
            <h1>CREATE NEW MENU</h1>
          </a>
          <Row>
            <Col>
              <Form onSubmit={(e) => this.submit(e, this.state.id)}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    class="form-control"
                    id="name"
                    name="name"
                    onChange={(e) => this.setState({ name: e.target.value })}
                    value={this.state.name}
                    type="text"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    class="form-control"
                    id="price"
                    name="price"
                    onChange={(e) => this.setState({ price: e.target.value })}
                    value={this.state.price}
                    type="number"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Valuta</Form.Label>
                  <Form.Control
                    as="select"
                    class="form-control"
                    id="valuta"
                    name="valuta"
                    onChange={(e) => this.setState({ valuta: e.target.value })}
                    value={this.state.valuta}
                    required
                  >
                    <option value="">Select Valuta</option>
                    <option value="USD">USD</option>
                    <option value="IDR">IDR</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    class="form-control"
                    id="category"
                    name="category"
                    onChange={(e) =>
                      this.setState({ category: e.target.value })
                    }
                    value={this.state.category}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Drink">Drink</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form onSubmit={(e) => this.submit(e, this.state.id)}>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    class="form-control"
                    id="image"
                    name="image"
                    onChange={(e) =>
                      this.setState({ imageFile: e.target.files[0] })
                    }
                    type="file"
                    required={this.state.req}
                    style={{ width: "37%" }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    class="form-control"
                    id="description"
                    name="description"
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                    value={this.state.description}
                    type="textarea"
                    required
                  />
                </Form.Group>
                <br></br>
                <Button variant="success" type="submit" name="action">
                  SAVE
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export { ListMenu };
