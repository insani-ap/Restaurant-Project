import React from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Col, Form, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
class ListSeat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seats: [],
      id: 0,
      name: "",
      capacity: "",
      status: "",
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8080/seat/").then((res) => {
      this.setState({
        seats: res.data,
        id: 0,
        name: "",
        capacity: "",
        status: "",
      });
    });
  }
  submit(event, id) {
    event.preventDefault();
    if (id === 0) {
      axios
        .post("http://localhost:8080/seat/", {
          name: this.state.name,
          capacity: this.state.capacity,
          status: this.state.status,
        })
        .then((res) => {
          this.componentDidMount();
        });
    } else {
      axios
        .put("http://localhost:8080/seat/" + id, {
          id: this.state.id,
          name: this.state.name,
          capacity: this.state.capacity,
          status: this.state.status,
        })
        .then(() => {
          this.componentDidMount();
        });
    }
  }
  delete(id) {
    axios.delete(`http://localhost:8080/seat/${id}`).then(() => {
      this.componentDidMount();
    });
  }
  edit(id) {
    axios.get(`http://localhost:8080/seat/${id}`).then((res) => {
      this.setState({
        id: res.data.id,
        name: res.data.name,
        capacity: res.data.capacity,
        status: res.data.status,
      });
    });
  }
  render() {
    var liSEAT = this.state.seats.map((seat) => {
      return (
        <tr key={seat.id}>
          <td>{seat.id}</td>
          <td>{seat.name}</td>
          <td>{seat.capacity}</td>
          <td>{seat.status}</td>
          <td>
            <button
              class="btn btn-success"
              onClick={(e) => this.edit(seat.id)}
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
              onClick={(e) => this.delete(seat.id)}
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
        <h1>Tables</h1>
        <div style={{ width: "90%", margin: "150px auto" }}>
          <Table striped bordered hover variant="light">
            <thead class="text-center">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody class="text-center">{liSEAT}</tbody>
          </Table>
        </div>
        <div
          className="container"
          style={{ width: "100%", margin: "50px auto" }}
        >
          <a href="/admin/seat">
            <h1>CREATE NEW TABLE</h1>
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
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control
                    class="form-control"
                    id="capacity"
                    name="capacity"
                    onChange={(e) =>
                      this.setState({ capacity: e.target.value })
                    }
                    value={this.state.capacity}
                    type="number"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    class="form-control"
                    id="status"
                    name="status"
                    onChange={(e) => this.setState({ status: e.target.value })}
                    value={this.state.status}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Broken">Broken</option>
                    <option value="Repairing">Repairing</option>
                  </Form.Control>
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

export { ListSeat };
