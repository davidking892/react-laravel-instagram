import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import debounce from "../debounce";
import AuthService from "../service";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            loading: false
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

        const { email, password } = this.state;

        const credentials = {
            email,
            password
        };

        this.submit(credentials);
    };

    submit(credentials) {
        this.props
            .dispatch(AuthService.login(credentials))
            .then(res => {
                this.loginForm.reset();
                this.setState({
                    loading: false
                });
            })
            .catch(err => {
                this.loginForm.reset();
                const errors = Object.values(err.errors);
                errors.join(" ");
                const response = {
                    error: true,
                    message: errors
                };
                this.setState({ response, loading: true });
            });
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const { loading } = this.state;

        const form = (
            <form
                className="form-horizontal"
                method="POST"
                ref={el => {
                    this.loginForm = el;
                }}
            >
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className={classNames("form-control")}
                        placeholder="Enter email"
                        onChange={this.handleChange}
                        disabled={loading}
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
                        onChange={this.handleChange}
                        disabled={loading}
                    />
                </div>

                <div className="form-group text-center">
                    <button
                        className={classNames("btn btn-primary")}
                        onClick={this.handleSubmit}
                        disabled={loading}
                    >
                        Sign In
                    </button>
                </div>

                <div className="login-invite-text text-center">
                    No account?
                    <Link to="/register">Register</Link>.
                </div>
            </form>
        );

        return (
            <div>
                <div className="d-flex flex-column flex-row align-content-center py-5">
                    <div className="container">
                        <div className="row">
                            <div className="section-login col-lg-6 ml-auto mr-auto">
                                <h4>Log in to the App</h4>

                                <div className="card-login card mb-3">
                                    <div className="card-body">{form}</div>
                                </div>

                                <div className="password-reset-link text-center">
                                    <Link
                                        to="/forgot-password"
                                        href="/forgot-password"
                                    >
                                        Forgot Your Password?
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

export default connect(mapStateToProps)(Login);
