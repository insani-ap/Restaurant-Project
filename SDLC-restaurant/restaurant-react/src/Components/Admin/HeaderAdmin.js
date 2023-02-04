import React from 'react';
import { authenticationService } from '../Validator/_services';

export default class HeaderAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            click: '',
            statusValue: '',
            name: ''
        }
    }
    componentDidMount() {
        if (authenticationService.currentAdminValue) {
            let name = localStorage["currentAdmin"];
            let user = JSON.parse(name);
            this.setState({ status: "/admin/login" });
            this.setState({ statusValue: "Log Out" });
            this.setState({ name: user.name })
        }
    }
    render() {
        return (
            <header class="top-navbar">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container">
                        <a class="navbar-brand" href="/admin/dashboard">
                            <img src="/assets/images/logo.png" alt="" />
                        </a>
                        <span>Welcome <b>{this.state.name}</b></span>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars-rs-food" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbars-rs-food">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item" className={this.props.adminDashboard}><a class="nav-link" href="/admin">Dashboard</a></li>
                                <li class="nav-item" className={this.props.adminMenu}><a class="nav-link" href="/admin/menu">Menu</a></li>
                                <li class="nav-item" className={this.props.adminReservation}><a class="nav-link" href="/admin/reservation">Reservation</a></li>
                                <li class="nav-item" className={this.props.adminSeat}><a class="nav-link" href="/admin/seat">Table</a></li>
                                <li class="nav-item active" style={{ marginLeft: '100px', borderRadius: '5px' }}><a class="nav-link" onClick={authenticationService.logoutAdmin} href={this.state.status} style={{ color: 'white' }}>{this.state.statusValue}</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}