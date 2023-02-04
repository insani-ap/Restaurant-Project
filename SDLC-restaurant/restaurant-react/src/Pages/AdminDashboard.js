import React, { Component } from "react";
import ChatAdmin from "../chat/ChatAdmin";
import HeaderAdmin from "../Components/Admin/HeaderAdmin";
import { ListDashboard } from "../Components/Admin/ListDashboard";
import { authenticationService } from "../Components/Validator/_services";
import { Modal } from 'react-bootstrap';
export default class AdminDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
      // name: ""
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
    if (!authenticationService.currentAdminValue) {
      alert("You have to login first.")
      this.props.history.push('/admin/login');
    }
  }
  render() {
    return (
      <div>
        {" "}
        <HeaderAdmin adminDashboard="nav-item active" />
        <div style={{ paddingTop: "20%" }}>
          <ListDashboard />
          <a href="javascript:void(0);" onClick={this.showModal} class="float">
            <i class="fa fa-envelope my-float"></i>
          </a>
          <Modal size="lg" show={this.state.show} onHide={this.hideModal}>
            <Modal.Header>
              <Modal.Title>Customer Service Support</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ChatAdmin name="ADMIN" />
            </Modal.Body>
            <Modal.Footer>
              <button class="btn btn-common" onClick={this.hideModal}>Quit</button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
