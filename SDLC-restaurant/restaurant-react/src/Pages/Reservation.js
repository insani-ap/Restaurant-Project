import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ReservationContent from "../Components/Reservation/ReservationContent";
import Subheader from "../Components/Subheader";
import { authenticationService } from "../Components/Validator/_services";
import { Modal } from "react-bootstrap";
import Chat from "../chat/Chat";

export default class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: "",
    };
    if (!authenticationService.currentUserValue) {
      alert("For Reservation, you have to login.");
      this.props.history.push("/login");
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  componentDidMount() {
    if (authenticationService.currentUserValue) {
      let json = JSON.parse(localStorage.getItem("currentUser"));
      this.setState({ name: json.name });
    }
  }
  render() {
    return (
      <>
        <Header reservation="nav-item active" />
        <Subheader title="Reservation" />
        <ReservationContent />
        <a href="javascript:void(0);" onClick={this.showModal} class="float">
          <i class="fa fa-envelope my-float"></i>
        </a>
        <div class="label-container">
          <div class="label-text">Customer Service</div>
          <i class="fa fa-play label-arrow"></i>
        </div>
        <Modal size="lg" show={this.state.show} onHide={this.hideModal}>
          <Modal.Header>
            <Modal.Title>Customer Service Support</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Chat name={this.state.name} />
          </Modal.Body>
          <Modal.Footer>
            <button class="btn btn-common" onClick={this.hideModal}>
              Quit
            </button>
          </Modal.Footer>
        </Modal>
        <Footer />
      </>
    );
  }
}
