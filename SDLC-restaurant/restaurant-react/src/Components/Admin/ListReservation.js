import React from "react";
import axios from "axios";
import { Alert, Table } from "react-bootstrap";
import { Col, Form, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ReservationModal from "../Reservation/ReservationModal";

class ListReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      id: 0,
      name: "",
      guestAmount: "",
      date: "",
      time: "",
      status: "",
      timeInterval: "",
      notes: "",
      seat: "",
      user: "",
      orderList:"",
      orderMenu:""
    };
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    axios.get("http://localhost:8080/reservation/").then((res) => {
      this.setState({
        reservations: res.data,
      });
    });
  }
  submit(event, id, status) {
    event.preventDefault();
    let name = localStorage["currentAdmin"];
    let users = JSON.parse(name);
    let seats = localStorage["seatUser"];
    let seatU = JSON.parse(seats);

    if (id === 0) {
      axios.post("http://localhost:8080/reservation/", {
        name: this.state.name,
        guestAmount: this.state.guestAmount,
        date: this.state.date,
        time: this.state.time,
        status: this.state.status,
        timeInterval: this.state.timeInterval,
        notes: this.state.notes,
        seat: seatU,
        user: users,
      });
    } else {
      axios.put("http://localhost:8080/reservation/" + id, {
        id: this.state.id,
        name: this.state.name,
        guestAmount: this.state.guestAmount,
        date: this.state.date,
        time: this.state.time,
        status: this.state.status,
        timeInterval: this.state.timeInterval,
        notes: this.state.notes,
        seat: seatU,
        user: this.state.user,
        orderList:this.state.orderList,
      });
    }

    if(status === 10) {
      window.location.reload();
    }
  }
  delete(id) {
    axios.delete(`http://localhost:8080/reservation/${id}`).then(() => {
      this.componentDidMount();
    });
  }
  edit(id) {
    axios.get(`http://localhost:8080/reservation/${id}`).then((res) => {
      this.setState({
        id: res.data.id,
        name: res.data.name,
        guestAmount: res.data.guestAmount,
        date: res.data.date,
        time: res.data.time,
        status: res.data.status,
        timeInterval: res.data.timeInterval,
        notes: res.data.notes,
        seat: res.data.seat,
        user: res.data.user,
        orderList: res.data.orderList,
      });
      localStorage.setItem('seatUser', JSON.stringify(res.data.seat));
    });
  }
  render() {
    var liRESERVATIONS = this.state.reservations.map((reservation) => {
      if(reservation.orderList===null){
        return (
          <tr key={reservation.id}>
            <td>{reservation.id}</td>
            <td>{reservation.name}</td>
            <td>{reservation.guestAmount}</td>
            <td>{reservation.date}</td>
            <td>{reservation.time}</td>
            <td>{reservation.status}</td>
            <td>{reservation.notes}</td>
            <td>{reservation.timeInterval}</td>
            <td>
              <ol>
                {reservation.seat.map((seat) => {
                  return <li>{seat.name}</li>;
                })}
              </ol>
            </td>
            <td>{reservation.user.name}</td>
            <td>
              <ol> 
                -
              </ol>
            </td>
            <td>
              <button
                class="btn btn-success"
                onClick={(e) => this.edit(reservation.id)}
                type="submit"
                name="action"
              >
                EDIT
              </button>
            </td>
            <td>
              <button class="btn btn-danger"                   style={{ color: "white", textDecoration: "none" }}
                  onClick={(e) => this.delete(reservation.id)}
                  type="submit"
                  name="action">
                  DELETE
              </button>
            </td>
          </tr>
        )
      }else{
        return (
          <tr key={reservation.id}>
            <td>{reservation.id}</td>
            <td>{reservation.name}</td>
            <td>{reservation.guestAmount}</td>
            <td>{reservation.date}</td>
            <td>{reservation.time}</td>
            <td>{reservation.status}</td>
            <td>{reservation.notes}</td>
            <td>{reservation.timeInterval}</td>
            <td>
              <ol>
                {reservation.seat.map((seat) => {
                  return <li>{seat.name}</li>;
                })}
              </ol>
            </td>
            <td>{reservation.user.name}</td>
            <td>
              <ol> 
                {
                reservation.orderList.menu.map((orderMenu) => {
                  return <li>{orderMenu.name} : $ {orderMenu.price}</li>;
                })}
              </ol>
            </td>
            <td>
              <button
                class="btn btn-success"
                onClick={(e) => this.edit(reservation.id)}
                type="submit"
                name="action"
              >
                EDIT
              </button>
            </td>
            <td>
              <button class="btn btn-danger">
                <a
                  href=""
                  style={{ color: "white", textDecoration: "none" }}
                  onClick={(e) => this.delete(reservation.id)}
                  type="submit"
                  name="action"
                >
                  DELETE
                </a>
              </button>
            </td>
          </tr>
        )
      }
      
    });

    return (
      <div>
        <h1>Reservation</h1>
        <div style={{ width: "90%", margin: "150px auto" }}>
          <Table striped bordered hover variant="light">
            <thead class="text-center">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Guest Amount</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Time Interval</th>
                <th>Seat</th>
                <th>User</th>
                <th>Order List</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody class="text-center">{liRESERVATIONS}</tbody>
          </Table>
        </div>
        <div
          className="container"
          style={{ width: "100%", margin: "50px auto" }}
        >
          <a href="/admin/reservation">
            <h1>APPROVAL RESERVATION</h1>
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
                  <Form.Label>Guest Amount</Form.Label>
                  <Form.Control
                    class="form-control"
                    id="guestAmount"
                    name="guestAmount"
                    onChange={(e) =>
                      this.setState({ guestAmount: e.target.value })
                    }
                    value={this.state.guestAmount}
                    type="number"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    class="form-control"
                    id="date"
                    name="date"
                    onChange={(e) => this.setState({ date: e.target.value })}
                    value={this.state.date}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    class="form-control"
                    id="time"
                    name="time"
                    onChange={(e) => this.setState({ time: e.target.value })}
                    value={this.state.time}
                    type="time"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Time Interval</Form.Label>
                  <Form.Control
                    as="select"
                    class="form-control"
                    id="timeInterval"
                    name="timeInterval"
                    onChange={(e) =>
                      this.setState({ timeInterval: e.target.value })
                    }
                    value={this.state.timeInterval}
                    required
                  >
                    <option value="">Select Time Interval</option>
                    <option value="Regular">Regular</option>
                    <option value="Full Day Book">Full Day Book</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <ReservationModal date={this.state.date} />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form onSubmit={(e) => this.submit(e, this.state.id, 10)}>
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
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                    <option value="Paid">Paid</option>
                    <option value="Check In">Check In</option>
                    <option value="Check Out">Check Out</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    class="form-control"
                    id="notes"
                    name="notes"
                    onChange={(e) => this.setState({ notes: e.target.value })}
                    value={this.state.notes}
                    type="textarea"
                    required
                  />
                </Form.Group>
                <Alert variant="warning">
                  Don't forget to give confirmation notes when doing approval or
                  declination.
                </Alert>
                <div class="submit-button text-right">
                  <Button variant="success" type="submit" name="action">
                    SAVE
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export { ListReservation };
