import React, { Component } from 'react';
import Joi from 'joi-browser';
import { getUser, updateUser } from '../../services/userService.js';
import { loginWithJwt } from '../../services/authService';

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
      },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    name: Joi.string().required().min(3).label('User Name'),
    email: Joi.string().required().email().label("Email")
  };

  async componentDidMount() {
    try {
      const { data } = await getUser();
      const user = {
        name: data.name,
        email: data.email,
      };
      this.setState({ user });
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

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
      const response = await updateUser(this.state.user);
      loginWithJwt(response.headers["x-auth-token"]);
      window.location = '/';
    } catch (exception) {
      if (exception.response && exception.response.status === 400) {
        alert(exception.response.data);
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="card bg-light">
          <div className="card-body">
            <h4>Edit User</h4>
            <div className="form-group">
              <label htmlFor="inlineFormInputName">Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="inlineFormInputName"
                value={this.state.user.name}
                onChange={this.handleChange}
              />
              {this.state.errors.name && <div className="alert alert-danger">{this.state.errors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputPassword">Email</label>
              <input
                name="email"
                type="text"
                className="form-control"
                id="inlineFormInputPassword"
                value={this.state.user.email}
                onChange={this.handleChange}
              />
              {this.state.errors.email && <div className="alert alert-danger">{this.state.errors.email}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserEdit;
