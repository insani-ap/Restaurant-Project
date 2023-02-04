import React, { useEffect, useState } from "react";
import { authenticationService } from "../Components/Validator/_services";
import { ListCart } from "../Components/CategoryMenu/ListCart";
import { useSelector } from "react-redux";
import { selectCount } from "../Redux/counterSlice";
export default function Header(props) {
  //...
  const [status, setStatus] = useState("");
  const [click, setClick] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [name, setName] = useState("");
  const count = useSelector(selectCount);
  useEffect(() => {
    if (authenticationService.currentUserValue) {
      let name = localStorage["currentUser"];
      let user = JSON.parse(name);
      setStatus("/logout");
      setStatusValue("log out");
      setName(user.name);
    } else {
      setStatus("/login");
      setStatusValue("log in");
      setName("Guest");
    }
  }, []);
  return (
    <header class="top-navbar">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="/home">
            <img src="/assets/images/logo.png" alt="" />
          </a>
          <span>
            Welcome <b>{name}</b>
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
              <ListCart />
              <li class="nav-item" className={props.home}>
                <a class="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li class="nav-item" className={props.menu}>
                <a class="nav-link" href="/menu">
                  Menu
                </a>
              </li>
              <li class="nav-item" className={props.reservation}>
                <a class="nav-link" href="/reservation">
                  Reservation
                </a>
              </li>
              <li class="nav-item" className={props.about}>
                <a class="nav-link" href="/about">
                  About
                </a>
              </li>
              <li
                class="nav-item"
                className={props.history}
                style={{ marginRight: "25px" }}
              >
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
                  href={status}
                  style={{ color: "white" }}
                >
                  {statusValue}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
