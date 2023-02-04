import React from "react";
import axios from "axios";
import { Card, Row } from "react-bootstrap";
class ListDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      totalResv: "",
      totalSeats: "",
      totalMenu: "",
      totalUser: "",
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/reservation`).then((res) => {
      const totalResv = res.data.length;
      this.setState({ totalResv });
    });
    axios.get(`http://localhost:8080/seat`).then((res) => {
      const totalSeats = res.data.length;
      this.setState({ totalSeats });
    });
    axios.get(`http://localhost:8080/menu`).then((res) => {
      const totalMenu = res.data.length;
      this.setState({ totalMenu });
    });
    axios.get(`http://localhost:8080/user`).then((res) => {
      const totalUser = res.data.length;
      this.setState({ totalUser });
    });
  }
  render() {
    return (
      <div>
        <Row style={{ margin: "auto" }}>
          <Card style={{ width: "20%", margin: "auto" }}>
            <a href="/admin/reservation">
              <Card.Header style={{ fontSize: "1.5vw" }}>
                Total Reservation
              </Card.Header>
              <Card.Body>
                <Card.Text
                  style={{
                    fontSize: "4vw",
                    color: "#d65106",
                    textAlign: "center",
                  }}
                >
                  {this.state.totalResv}
                </Card.Text>
              </Card.Body>
            </a>
          </Card>
          <Card style={{ width: "20%", margin: "auto" }}>
            <a href="/admin/seat">
              <Card.Header style={{ fontSize: "1.5vw" }}>
                Total Table
              </Card.Header>
              <Card.Body>
                <Card.Text
                  style={{
                    fontSize: "4vw",
                    color: "#d65106",
                    textAlign: "center",
                  }}
                >
                  {this.state.totalSeats}
                </Card.Text>
              </Card.Body>
            </a>
          </Card>
          <Card style={{ width: "20%", margin: "auto" }}>
            <a href="/admin/menu">
              <Card.Header style={{ fontSize: "1.5vw" }}>
                Total Menu
              </Card.Header>
              <Card.Body>
                <Card.Text
                  style={{
                    fontSize: "4vw",
                    color: "#d65106",
                    textAlign: "center",
                  }}
                >
                  {this.state.totalMenu}
                </Card.Text>
              </Card.Body>
            </a>
          </Card>
          <Card style={{ width: "20%", margin: "auto" }}>
            <Card.Header style={{ fontSize: "1.5vw" }}>Total User</Card.Header>
            <Card.Body>
              <Card.Text
                style={{
                  fontSize: "4vw",
                  color: "#d65106",
                  textAlign: "center",
                }}
              >
                {this.state.totalUser}
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row style={{ margin: "auto" }}>
        </Row>
      </div>
    );
  }
}

export { ListDashboard };
