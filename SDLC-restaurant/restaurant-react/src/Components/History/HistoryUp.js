import axios from "axios";
import React, { Component } from "react";
import HistoryModal from "./HistoryModalUp";
import { Alert } from "react-bootstrap";

export default class HistoryUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listResv: [],
      listSeat: "",
      show: false,
    };
  }
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  fetchData = () => {
    let jsonUser = JSON.parse(localStorage.getItem("currentUser"));
    let userId = jsonUser.id;
    axios
      .get("http://localhost:8080/reservation/user/" + userId)
      .then((response) => {
        let sorted = response.data.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        this.setState({ listResv:sorted});
      });
  };
  componentDidMount() {
    this.fetchData();
  }
  render() {
    if (this.state.listResv.length === 0) {
      return <Alert variant="danger">There are no reservation.</Alert>;
    } else {
      return (
        <div style={{ margin: "20px" }}>
          {this.state.listResv.map((data, index) => {
            if (data.orderList === null) {
              if (data.timeInterval === "Full Day Book") {
                let totalPrice = 0;
                let fCharge = 30 + data.guestAmount * 5;
                let nmCharge = data.guestAmount * 5;
                let taxAmount = ((totalPrice + fCharge + nmCharge) * 10) / 100;
                let totPay = ((totalPrice + fCharge + nmCharge) * 110) / 100;
                return (
                  <HistoryModal
                    date={data.date}
                    title={"Reservation ID " + data.id}
                    name={data.name}
                    guestAmount={data.guestAmount}
                    date={data.date}
                    time={data.time}
                    status={data.status}
                    timeInterval={data.timeInterval}
                    notes={data.notes}
                    seat={data.seat.map((dataSeat) => {
                      return dataSeat.name + " ";
                    })}
                    orderList={data.orderList}
                    totalPrice={totalPrice}
                    charge={nmCharge}
                    fullCharge={fCharge}
                    tax={taxAmount}
                    pay={totPay}
                  />
                );
              }
              if (data.timeInterval === "Regular") {
                let totalPrice = 0;
                let fCharge = 0;
                let nmCharge = data.guestAmount * 5;
                let taxAmount = ((totalPrice + fCharge + nmCharge) * 10) / 100;
                let totPay = ((totalPrice + fCharge + nmCharge) * 110) / 100;
                return (
                  <HistoryModal
                    date={data.date}
                    title={"Reservation ID " + data.id}
                    name={data.name}
                    guestAmount={data.guestAmount}
                    date={data.date}
                    time={data.time}
                    status={data.status}
                    timeInterval={data.timeInterval}
                    notes={data.notes}
                    seat={data.seat.map((dataSeat) => {
                      return dataSeat.name + " ";
                    })}
                    orderList={data.orderList}
                    totalPrice={totalPrice}
                    charge={nmCharge}
                    fullCharge={fCharge}
                    tax={taxAmount}
                    pay={totPay}
                  />
                );
              }
            } else {
              if (data.timeInterval === "Full Day Book") {
                let fCharge = 30 + data.guestAmount * 5;
                let totalPrice = 0;
                let nmCharge = 0;
                return (
                  <HistoryModal
                    date={data.date}
                    title={"Reservation ID " + data.id}
                    name={data.name}
                    guestAmount={data.guestAmount}
                    date={data.date}
                    time={data.time}
                    status={data.status}
                    timeInterval={data.timeInterval}
                    notes={data.notes}
                    seat={data.seat.map((dataSeat) => {
                      return <p>{dataSeat.name}</p>;
                    })}
                    orderList={data.orderList.menu.map((dataOrder) => {
                      totalPrice = totalPrice + Number(dataOrder.price);
                      return (
                        <p>
                          {dataOrder.name} : {dataOrder.valuta}{" "}
                          {dataOrder.price}
                        </p>
                      );
                    })}
                    totalPrice={totalPrice}
                    charge={nmCharge}
                    fullCharge={fCharge}
                    tax={((totalPrice + fCharge + nmCharge) * 10) / 100}
                    pay={((totalPrice + fCharge + nmCharge) * 110) / 100}
                  />
                );
              }
              if (data.timeInterval === "Regular") {
                let fCharge = 0;
                let totalPrice = 0;
                let nmCharge = 0;
                return (
                  <HistoryModal
                    date={data.date}
                    title={"Reservation ID " + data.id}
                    name={data.name}
                    guestAmount={data.guestAmount}
                    date={data.date}
                    time={data.time}
                    status={data.status}
                    timeInterval={data.timeInterval}
                    notes={data.notes}
                    seat={data.seat.map((dataSeat) => {
                      return <p>{dataSeat.name}</p>;
                    })}
                    orderList={data.orderList.menu.map((dataOrder) => {
                      totalPrice = totalPrice + Number(dataOrder.price);
                      return (
                        <p>
                          {dataOrder.name} : {dataOrder.valuta}{" "}
                          {dataOrder.price}
                        </p>
                      );
                    })}
                    totalPrice={totalPrice}
                    charge={nmCharge}
                    fullCharge={fCharge}
                    tax={((totalPrice + fCharge + nmCharge) * 10) / 100}
                    pay={((totalPrice + fCharge + nmCharge) * 110) / 100}
                  />
                );
              }
            }
          })}
        </div>
      );
    }
  }
}
