import React from "react";
import HeaderAdmin from "../Components/Admin/HeaderAdmin";
import { ListMenu } from "../Components/Admin/ListMenu";
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
        <HeaderAdmin adminMenu="nav-item active" />
        <ListMenu />
      </>
    );
  }
}
