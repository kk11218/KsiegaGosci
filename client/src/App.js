import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import RegisterForm from './components/Auth/Registration/RegisterForm';
import LoginForm from './components/Auth/Login/LoginForm';
import UserDashboard from './components/Dashboard/UserDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const formLinks = !loggedInUser && (
    <>
      <h2>
        <Link to="/register">Registration Form</Link>
      </h2>
      <h2>
        <Link to="/login">Login Form</Link>
      </h2>
    </>
  );

  return (
    <Router>
      <div className="App">
        <h1>{loggedInUser ? `Witaj, ${loggedInUser.name}!` : 'Rejestracja i Logowanie'}</h1>
        <div>{formLinks}</div>
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route
            path="/login"
            render={(props) => (
              <LoginForm {...props} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
            )}
          />
          <Route
            path="/user-home"
            render={() => (loggedInUser ? <UserDashboard loggedInUser={loggedInUser} /> : <Redirect to="/" />)}
          />
          <Route path="/admin-home" component={AdminDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
