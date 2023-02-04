import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '../Components/Validator/_services';
class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        if (authenticationService.currentAdminValue) {
            this.props.history.push('/admin');
        }
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
                            authenticationService.loginAdmin(username, password)
                                .then(
                                    user => {
                                        if (!user) {
                                            const { from } = this.props.location.state || { from: { pathname: "/admin/login" } };
                                            this.props.history.push(from);
                                        } else {
                                            window.location.reload();
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
                            </Form>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export { AdminLogin };