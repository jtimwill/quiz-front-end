import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/authService';

const HomePage = () => {
  const btn = "btn btn-lg btn-";

  async function exampleUserLogin() {
    await login("adam@example.com", "123456");
    window.location = "/users/me/show";
  }
  return(
    <React.Fragment>
      <div className="jumbotron custom-center">
        <h1 className="display-4">Welcome to QuizTracker!</h1>
        <p className="lead">
          This project provides users with a simple interface for taking quizzes
          and tracking their progress.
        </p>
        <hr className="my-4"/>
        <Link
          to="/users/new"
          className={`${btn}danger custom-right-margin custom-add-margin-top`}>
          Register New Account
        </Link>
        <button
          onClick={exampleUserLogin}
          className={`${btn}info  custom-add-margin-top`}>
          View Example Account
        </button>
      </div>
      <div className="custom-flex-grow-column"/>
    </React.Fragment>
  );
};

export default HomePage;
