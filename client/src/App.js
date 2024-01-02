import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import OrderPage from './components/OrderPage'; // Import the OrderPage component

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
      <h2>
        <Link to="/order">Order Page</Link> {/* Add link to the Order Page */}
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
          <Route path="/order" component={OrderPage} /> {/* Add the route for the OrderPage */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
