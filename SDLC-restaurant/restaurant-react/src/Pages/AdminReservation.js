import React from "react";
import { Chat } from "../chat/Chat";
import HeaderAdmin from "../Components/Admin/HeaderAdmin";
import { ListReservation } from "../Components/Admin/ListReservation";
import { authenticationService } from "../Components/Validator/_services";
export default class About extends React.Component {
  constructor(props) {
    super(props)
    if (!authenticationService.currentAdminValue) {
      alert("You have to login first.")
      this.props.history.push('/admin/login');
    }
  }
  render() {


    return (
      <>

        <HeaderAdmin adminReservation="nav-item active" />
        <ListReservation />
      </>
    );
  }
}
