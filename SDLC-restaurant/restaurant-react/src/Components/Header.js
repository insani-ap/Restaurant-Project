import React from "react";
import { authenticationService } from "../Components/Validator/_services";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      click: "",
      statusValue: "",
      name: "",
    };
  }
  componentDidMount() {
    if (authenticationService.currentUserValue) {
      let name = localStorage["currentUser"];
      let user = JSON.parse(name);
      this.setState({ status: "/logout" });
      this.setState({ statusValue: "Log Out" });
      this.setState({ name: user.name });
    } else {
      this.setState({ status: "/login" });
      this.setState({ statusValue: "Log In" });
      this.setState({ name: "Guest" });
    }
  }

  render() {
    return (
      <header class="top-navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
            <a class="navbar-brand" href="/home">
              <img src="/assets/images/logo.png" alt="" />
            </a>
            <span>
              Welcome <b>{this.state.name}</b>
            </span>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbars-rs-food"
              aria-controls="navbars-rs-food"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbars-rs-food">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item" className={this.props.home}>
                  <a class="nav-link" href="/home">
                    Home
                  </a>
                </li>
                <li class="nav-item" className={this.props.menu}>
                  <a class="nav-link" href="/menu">
                    Menu
                  </a>
                </li>
                <li class="nav-item" className={this.props.reservation}>
                  <a class="nav-link" href="/reservation">
                    Reservation
                  </a>
                </li>
                <li class="nav-item" className={this.props.about}>
                  <a class="nav-link" href="/about">
                    About
                  </a>
                </li>
                <li class="nav-item" className={this.props.history} style={{ marginRight: "25px" }}>
                  <a class="nav-link" href="/history">
                    <img
                      width="25px"
                      height="25px"
                      src="/assets/images/32223.png"
                    ></img>
                  </a>
                </li>
                <li class="nav-item active" style={{ borderRadius: "5px" }}>
                  <a
                    class="nav-link"
                    onClick={authenticationService.logout}
                    href={this.state.status}
                    style={{ color: "white" }}
                  >
                    {this.state.statusValue}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
