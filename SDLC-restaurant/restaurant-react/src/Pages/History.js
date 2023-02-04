import React from "react";
import HistoryDown from "../Components/History/HistoryDown";
import HistoryUp from "../Components/History/HistoryUp";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { authenticationService } from "../Components/Validator/_services";

export default class History extends React.Component {
  constructor() {
    super()
    if (!authenticationService.currentUserValue) {
      alert("You have to login first.")
      window.location.href ="/login";
    }
  }

  render() {
    return (
      <>
        <Header history="nav-item active"/>
        <div style={{ paddingTop: "15%" }}>
          <div style={{ textAlign: "center", width: "75%", margin: "auto" }}>
            <h1>RESERVATION INVOICE HISTORY</h1>
            <HistoryUp />
            <br></br>
            <h1>REVIEW OUR SERVICE</h1>
            <br></br>
            <HistoryDown />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
