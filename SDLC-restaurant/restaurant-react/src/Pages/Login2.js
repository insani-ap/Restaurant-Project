import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '../Components/Validator/_services';
// import { configureFakeBackend } from '../Components/Validator/_helpers';
// configureFakeBackend();
class Login2 extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    }
    redirectToRegister() {
        window.open('http://localhost:3000/register');
    }
    render() {
        return (

            <div className="about-section-box">
                <div style={{ height: "20px" }}></div>
                <div style={{ borderStyle: "double", padding: "20px", borderRadius: "20px", backgroundColor: "white", width: "50%", margin: "auto" }}>
                    <h2 style={{ textAlign: "center" }}>Login</h2>
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        validationSchema={Yup.object().shape({
                            username: Yup.string().required('Username is required'),
                            password: Yup.string().required('Password is required')
                        })}
                        onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                            setStatus();
                            authenticationService.login(username, password)
                                .then(
                                    user => {
                                        if (!user) {
                                            const { from } = this.props.location.state || { from: { pathname: "/login" } };
                                            this.props.history.push(from);
                                        } else {
                                            let data = user.role;
                                            if (data === "User") {
                                                
                                                const { from } = this.props.location.state || { from: { pathname: "/" } };
                                                this.props.history.push(from);

                                            } else {
                                                const { from } = this.props.location.state || { from: { pathname: "/admin" } };
                                                this.props.history.push(from);
                                            }

                                        }

                                    }
                                );
                        }}
                        render={({ errors, status, touched, isSubmitting }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                                <div className="form-group">
                                    <button onClick={this.redirectToRegister} type="button" className="btn btn-secondary">REGISTER</button>
                                </div>
                                {status &&
                                    <div className={'alert alert-danger'}>{status}</div>
                                }
                            </Form>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export { Login2 };