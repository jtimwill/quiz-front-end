import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import { login, getCurrentUser } from '../services/authService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: ""
      },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password")
  };

  validate() {
    const { error: errors } = Joi.validate(this.state.user, this.schema, { abortEarly: false });
    if (!errors) return null;

    const found_errors = {};
    for (let error of errors.details) {
      found_errors[error.path[0]] = error.message;
    }
    return found_errors;
  }

  validateProperty({ name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  handleChange(event) {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event.currentTarget);
    if (errorMessage) {
      errors[event.currentTarget.name] = errorMessage;
    } else {
      delete errors[event.currentTarget.name];
    }

    const user = { ...this.state.user };
    user[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ user, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) { return; }

    try {
      const { user } = this.state;
      await login(user.email, user.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/users/me/show";
    } catch(exception) {
      if (exception.response && exception.response.status === 400){
        alert(exception.response.data);
      }
    }
  }

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="card bg-light">
          <div className="card-body">
            <h4>Login</h4>
            <div className="form-group">
              <label htmlFor="inlineFormInputEmail">Email</label>
              <input
                name="email"
                type="text"
                className="form-control"
                id="inlineFormInputEmail"
                value={this.state.username}
                onChange={this.handleChange}
              />
              {this.state.errors.email && <div className="alert alert-danger">{this.state.errors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputPassword">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="inlineFormInputPassword"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {this.state.errors.password && <div className="alert alert-danger">{this.state.errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
