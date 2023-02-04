import React from 'react';
import { authenticationService } from '../Components/Validator/_services';

export default class Logout extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <>
                <p>
                    <a onClick={authenticationService.logout} href="/" style={{color: 'blue'}}>Click here </a>
                     if you not redirecting...
                     {this.props.history.push("/")}
                </p>
            </>
        )
    }
}