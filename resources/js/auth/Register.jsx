import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import classNames from "classnames";
import AuthService from "../service";
import debounce from "../debounce";

class Register extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            response: {
                error: false,
                message: ""
            },
            loading: false,
            success: false
        };
    }

    handleChange = e => {
        const { name, value } = e.target;

        this.supplyData(name, value);
    };

    supplyData = debounce((name, value) => {
        this.setState({
            [name]: value
        });
    }, 500);

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });
        const { name, email, password, password_confirmation } = this.state;
        const credentials = {
        name,
            email,
            password,
            password_confirmation
        };

        this.submit(credentials);
    };

    submit(credentials) {
        this.props
            .dispatch(AuthService.register(credentials))
            .then(() => {
                this.registrationForm.reset();
                this.setState({ loading: false, success: true });
            })
            .catch(err => {
                const errors = Object.values(err.errrors);
                errors.join(" ");
                const response = {
                    error: true,
                    message: errors
                };
                this.setState({ response, loading: false });
            });
    }

    render() {
        // If user is already authenticated we redirect to dashboard.
        if (this.props.isAuthenticated) {
            return <Redirect to="/" replace />;
        }

        const { loading } = this.state;

        const form = (
            <form
                className="form-horizontal"
                method="POST"
                onSubmit={this.handleSubmit}
                ref={el => {
                    this.registrationForm = el;
                }}
            >
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="name"
                        name="name"
                        className={classNames("form-control")}
                        placeholder="Enter name"
                        disabled={loading}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className={classNames("form-control")}
                        placeholder="Enter email"
                        disabled={loading}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        className={classNames("form-control")}
                        name="password"
                        placeholder="Enter password"
                        disabled={loading}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password_confirmation">
                        Password Confirmation
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        className={classNames("form-control")}
                        name="password_confirmation"
                        placeholder="Confirm password"
                        disabled={loading}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group text-center">
                    <button
                        type="submit"
                        className={classNames("btn btn-primary")}
                        disabled={loading}
                    >
                        Register
                    </button>
                </div>
            </form>
        );

        return (
            <div>
                <div className="d-flex flex-column flex-row align-content-center py-5">
                    <div className="container">
                        <div className="row">
                            <div className="section-login col-lg-6 ml-auto mr-auto">
                                <h4>Register for the App</h4>

                                <div className="card-login card mb-3">
                                    <div className="card-body">
                                        {this.state.success && (
                                            <div
                                                className="alert alert-success text-center"
                                                role="alert"
                                            >
                                                Registration successful.
                                                <br />
                                                <Link to="/" href="/">
                                                    Please log in with your new
                                                    email and password.
                                                </Link>
                                            </div>
                                        )}

                                        {!this.state.success && form}
                                    </div>
                                </div>

                                <div className="password-reset-link text-center">
                                    <Link to="/" href="/">
                                        Already registered? Log in.
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated
});

export default connect(mapStateToProps)(Register);
