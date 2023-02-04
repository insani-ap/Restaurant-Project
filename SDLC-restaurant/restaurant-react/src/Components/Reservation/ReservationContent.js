import React from "react";
import axios from "axios";
import { Alert, ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ReservationModal from "./ReservationModal";

export default class ResvContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      id: "",
      name: "",
      guestAmount: "",
      date: "",
      time: "",
      timeInterval: "",
      service: "",
    };
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();

    let name = localStorage["currentUser"];
    let users = JSON.parse(name);
    let seats = localStorage["seatUser"];
    let seatU = JSON.parse(seats);
    let postData = {
      name: this.state.name,
      guestAmount: this.state.guestAmount,
      date: this.state.date,
      time: this.state.time,
      status: "Waiting for Approvement",
      orderList: null,
      timeInterval: this.state.timeInterval,
      seat: seatU,
      user: users,
    }
    if (this.state.service.match("Only Table Reservation")) {
      axios.post("http://localhost:8080/resvpublic", postData);
      alert(
        "Thankyou for reserving at Nexsoft Restaurant. Please check your email within 24 hours for further information."
      );
      window.location.href="/history"
    } if (this.state.service.match("With Meal")) {
      alert(
        "Please select your meal"
      );
      window.location.href = "/menu";
      localStorage.setItem("resvData", JSON.stringify(postData))
    }

  }

  render() {
    return (
      <Container style={{ width: "100%", margin: "50px auto" }}>
        <h1>CREATE NEW RESERVATION</h1>
       <Form onSubmit={(e) => {this.submit(e)}}> 
        <Row>
          <Col>
            
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  class="form-control"
                  id="name"
                  name="name"
                  onChange={(e) => this.setState({ name: e.target.value })}
                  value={this.state.name}
                  type="text"
                  placeholder="Your Name"
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
                  min="1"
                  placeholder="Select Guest Amount"
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
            
            <ReservationModal date={this.state.date} />
          </Col>
          <Col>
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
                  required
                  as="select"
                  class="form-control"
                  id="timeInterval"
                  name="timeInterval"
                  onChange={(e) =>
                    this.setState({ timeInterval: e.target.value })
                  }
                  value={this.state.timeInterval}
                >
                  <option value="">Select Time Interval</option>
                  <option value="Regular">Regular</option>
                  <option value="Full Day Book">Full Day Book</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Service</Form.Label>
                <Form.Control
                  required
                  as="select"
                  class="form-control"
                  id="service"
                  name="service"
                  onChange={(e) =>
                    this.setState({ service: e.target.value })
                  }
                  value={this.state.service}
                >
                  <option value="">Select Service</option>
                  <option value="Only Table Reservation">Only Table Reservation</option>
                  <option value="With Meal">With Meal</option>
                </Form.Control>
              </Form.Group>
            
            <Alert variant="warning">
              Make sure you have filled the form correctly before submit.
            </Alert>
            <div class="submit-button text-right">

              <Button
                variant="success"
                type="submit"
                name="action"
              >
                BOOKING
              </Button>
            </div>
          </Col>
        </Row>
        </Form>
        <br></br>
        <Alert variant="info">
          Please contact customer services for reschedule and cancellation!
        </Alert>
      </Container>
    );
  }
}
