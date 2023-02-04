import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
class Register extends Component {
    constructor() {
        super()
        this.sendToDatabase = this.sendToDatabase.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault();
        if (document.getElementById("password").value !== document.getElementById("repassword").value) {
            alert("Please retype password correctly.")
        } else {
            this.sendToDatabase();
            // window.location.href = "/login"
        }
    }
    sendToDatabase = () => {
        let data =
        {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            username: document.getElementById("uname").value,
            name: document.getElementById("name").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            role: "User"
        }
        fetch("http://localhost:8080/user/add", {
            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify(data),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                alert("You have successfully registered")
                window.location.href = "/login"
            } else {
                alert("Cannot register. Email/username/phone number have been registered. Please enter another email/username/password.")
            }
        })
    }

    render() {
        return (
            <div className="about-section-box">
                <div style={{ width: "50%", margin: "auto", backgroundColor: "white", borderRadius: "20px", padding: "30px" }}>
                    <h1 style={{ textAlign: "center" }}>Register</h1>
                    <Form onSubmit={(e) => this.handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required id="email" type="email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required id="uname" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required id="name" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control required id="phoneNumber" pattern=".*[0-9].*" type="tel" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required id="password" type="password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Re-Type Password</Form.Label>
                            <Form.Control required id="repassword" type="password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>

            </div>
        )
    }
}
export { Register };