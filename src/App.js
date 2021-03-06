import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import Footer from './components/footer';
import HomePage from './components/homePage';
import ProtectedRoute from './components/protectedRoute';
import NotFound from './components/notFound';
import Login from './components/login';
import Logout from './components/logout';
import UserIndex from './components/users/userIndex';
import UserNew from './components/users/userNew';
import UserEdit from './components/users/userEdit';
import UserShow from './components/users/userShow';
import CategoryIndex from './components/categories/categoryIndex';
import CategoryNew from './components/categories/categoryNew';
import CategoryEdit from './components/categories/categoryEdit';
import QuizIndex from './components/quizzes/quizIndex';
import QuizNew from './components/quizzes/quizNew';
import QuizEdit from './components/quizzes/quizEdit';
import QuizShow from './components/quizzes/quizShow';
import QuestionNew from './components/questions/questionNew';
import QuestionEdit from './components/questions/questionEdit';
import UserQuizIndex from './components/user_quizzes/userQuizIndex';
import UserQuizNew from './components/user_quizzes/userQuizNew';
import UserQuizShow from './components/user_quizzes/userQuizShow';

class App extends Component {
  render() {
    return (
      <div className="custom-base-container">
        <NavBar className="custom-navbar"/>
        <main className="custom-container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute
              path="/users/index"
              component={UserIndex}
              redirect_path="/users/me/show"
              admin_required={true}
            />
            <Route path="/users/new" component={UserNew} />
            <ProtectedRoute
              path="/users/me/edit"
              component={UserEdit}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/users/me/show"
              component={UserShow}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/categories/index"
              component={CategoryIndex}
              redirect_path="/login"
              admin_required={true}
            />
            <ProtectedRoute
              path="/categories/new"
              component={CategoryNew}
              redirect_path="/categories/index"
              admin_required={true}
            />
            <ProtectedRoute
              path="/categories/:id/edit"
              component={CategoryEdit}
              redirect_path="/categories/index"
              admin_required={true}
            />
            <ProtectedRoute
              path="/quizzes/index"
              component={QuizIndex}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/quizzes/new"
              component={QuizNew}
              redirect_path="/quizzes/index"
              admin_required={true}
            />
            <ProtectedRoute
              path="/quizzes/:id/edit"
              component={QuizEdit}
              redirect_path="/quizzes/index"
              admin_required={true}
            />
            <ProtectedRoute
              path="/quizzes/:id/show"
              component={QuizShow}
              redirect_path="/quizzes/index"
              admin_required={true}
            />
            <ProtectedRoute
              path="/quizzes/:id/questions/new"
              component={QuestionNew}
              redirect_path="/quizzes/:id/show"
              admin_required={true}
            />
            <ProtectedRoute
              path="/quizzes/:id/questions/:questionId/edit"
              component={QuestionEdit}
              redirect_path="/quizzes/:id/show"
              admin_required={true}
            />
            <ProtectedRoute
              path="/user-quizzes/index"
              component={UserQuizIndex}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/user-quizzes/:id/show"
              component={UserQuizShow}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/user-quizzes/new"
              component={UserQuizNew}
              redirect_path="/login"
            />
            <Route path="/not-found" component={NotFound} />;
            <Route path="/" component={HomePage} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
