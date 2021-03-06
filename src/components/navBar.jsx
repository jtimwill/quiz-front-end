import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

class NavBar extends Component {
  state = {
    show: false
  };

  handleToggler = () => {
    const show = !this.state.show;
    this.setState({show});
  };

  hideDropdown = () => {
    this.setState({show: false});
  };

  render() {
    const user = getCurrentUser();

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          onClick={this.handleToggler}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">QuizTracker</Link>
        <div className="navbar-collapse" id="navbarNav">
          <div
            className={"navbar-nav custom-" + (this.state.show ? "show" : "hide")}
            onClick={this.hideDropdown}
          >
            {!user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/users/new">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/logout">
                  Logout
                </NavLink>
                <NavLink className="nav-item nav-link" to="/users/me/show">
                  Profile
                </NavLink>
                <NavLink className="nav-item nav-link" to="/user-quizzes/index">
                  YourQuizzes
                </NavLink>
                <NavLink className="nav-item nav-link" to="/quizzes/index">
                  Quizzes
                </NavLink>
              </React.Fragment>
            )}
            {user && user.admin && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/users/index">
                  Users
                </NavLink>
                <NavLink className="nav-item nav-link" to="/categories/index">
                  Categories
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
