import React from "react";
import HeaderAdmin from "../Components/Admin/HeaderAdmin";
import { ListSeat } from "../Components/Admin/ListSeat";
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
        <HeaderAdmin adminSeat="nav-item active" />
        <ListSeat />
      </>
    );
  }
}
