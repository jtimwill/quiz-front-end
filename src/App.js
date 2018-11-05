import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import Footer from './components/footer';
import HomePage from './components/homePage';
import ProtectedRoute from './components/protectedRoute';
import NotFound from './components/notFound';

class App extends Component {
  render() {
    return (
      <div className="custom-base-container">
        <NavBar className="custom-navbar"/>
        <main className="custom-container">
          <Switch>
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
