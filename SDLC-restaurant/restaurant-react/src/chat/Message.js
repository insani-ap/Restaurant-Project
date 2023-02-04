import { Alert } from 'react-bootstrap'
import React, { Component } from 'react'

export class Message extends Component {

    render() {
        if (this.props.senderName === "Admin") {
            return (<div className="message-item" id="test">

                <div style={{ textAlign: this.props.align2 }}>
                    <Alert variant="primary">
                        <b>{this.props.senderName + " "}</b>
                        <p><span>{this.props.text}</span></p>
                    </Alert>
                </div>
            </div>)
        } else {
            return (<div className="message-item" id="test">
                <div style={{ textAlign: this.props.align }}>
                    <Alert variant="success">
                        <b>{this.props.senderName + " "}</b>
                        <p><span>{this.props.text}</span></p>

                    </Alert>
                </div>
            </div>)

        }



    }
}