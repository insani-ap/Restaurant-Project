import React, { Component } from "react";
import { ListGroup, Modal, Table, Col, Row } from "react-bootstrap";

export default class HistoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <>
        <ListGroup as="ul">
          <ListGroup.Item variant="light" onClick={this.handleShow}>
            <Row>
              <Col>{this.props.date}</Col>
              <Col>{this.props.name}</Col>
              <Col>{this.props.time}</Col>
              <Col>${this.props.pay}</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover size="sm">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{this.props.name}</td>
                </tr>
                <tr>
                  <td>Guest Amount</td>
                  <td>{this.props.guestAmount}</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{this.props.date}</td>
                </tr>
                <tr>
                  <td>Time</td>
                  <td>{this.props.time}</td>
                </tr>
                <tr>
                  <td>Reservation Status</td>
                  <td>{this.props.status}</td>
                </tr>
                <tr>
                  <td>Time Interval</td>
                  <td>{this.props.timeInterval}</td>
                </tr>
                <tr>
                  <td>Notes</td>
                  <td>{this.props.notes}</td>
                </tr>
                <tr>
                  <td>Seat</td>
                  <td>{this.props.seat}</td>
                </tr>
                <tr>
                  <td>Order List</td>
                  <td>{this.props.orderList}</td>
                </tr>
                <tr>
                  <td>Total Order</td>
                  <td>$ {this.props.totalPrice}</td>
                </tr>
                <tr>
                  <td>Full Day Book Charge</td>
                  <td>$ {this.props.fullCharge}</td>
                </tr>
                <tr>
                  <td>Reservation Charge </td>
                  <td>$ {this.props.charge}</td>
                </tr>
                <tr>
                  <td>Tax (10%) </td>
                  <td>$ {this.props.tax}</td>
                </tr>
                <tr>
                  <td>Total Payment </td>
                  <td>$ {this.props.pay}</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <button class="btn btn-common" onClick={this.handleClose}>
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
