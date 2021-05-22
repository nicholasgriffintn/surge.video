import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

import { Box, Flex } from 'rebass';

import logo from './logo.svg';
import './App.css';

import AmplifyReduxAuth from './components/auth/Wrapper';
import { useSelector, useDispatch } from 'react-redux';

function NotFound() {
  return (
    <section className="App-Page App-Page-Homepage">
      <h1>404 Not Found</h1>
      <p>Sorry, we couldn't find this page</p>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </section>
  );
}
function Home() {
  return (
    <section className="App-Page App-Page-Homepage">
      <h1>This is the homepage</h1>
      <p>We'll show a list of videos here</p>
      <p>
        <Link to="/video/2">Go to the sample video</Link>
      </p>
    </section>
  );
}

function Video() {
  const { id } = useParams();

  return (
    <section className="App-Page App-Page-Video">
      <h1>This is the video page</h1>
      <p>We'll show a video player here</p>
      <p>Video ID: {id}</p>
    </section>
  );
}

function SignIn() {
  return (
    <AmplifyReduxAuth header={false}>
      <h1>You've already signed in!</h1>
      <p>
        <Link to="/video/2">Go to the sample video</Link>
      </p>
    </AmplifyReduxAuth>
  );
}

function Header() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.currentUser);

  return (
    <header
      className="App-header"
      style={{
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <Flex color="white" bg="transparent" alignItems="center">
        <Link title="Go to the homepage" to="/">
          <img src={logo} className="App-logo" alt="Surge Video" />
        </Link>
        <Box mx="auto" />
        <input className="App-header-search" placeholder="Search" />
        <Box mx="auto" />
        <nav>
          {currentUser && currentUser.attributes && (
            <div className="App-CurrentUser">
              <span>{currentUser.attributes.email}</span>
            </div>
          )}
          {console.debug('Current User => ', currentUser)}
          {currentUser && currentUser.attributes && (
            <>
              <Box mx="auto" />
              <Button
                className="btn btn-secondary btn-header"
                type="button"
                onClick={() => dispatch({ type: 'LOGOUT' })}
              >
                LOGOUT
              </Button>
            </>
          )}
          <ul>
            {!currentUser && (
              <li>
                <Link
                  className="btn btn-primary btn-header-signin"
                  to="/sign-in"
                >
                  Sign In
                </Link>
              </li>
            )}
            <li>
              <Link className="nav-link" to="/video/1">
                Sample Video
              </Link>
            </li>
          </ul>
        </nav>
      </Flex>
    </header>
  );
}

class AppInner extends Component {
  render() {
    return (
      <div className="App-wrap">
        <Router>
          <div>
            <Header />
            <section
              className="App-main"
              style={{
                paddingTop: '10px',
                paddingBottom: '10px',
                paddingLeft: '20px',
                paddingRight: '20px',
              }}
            >
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/video/:id">
                  <Video />
                </Route>
                <Route exact path="/sign-in">
                  <SignIn />
                </Route>
                <Route component={NotFound} />
              </Switch>
            </section>
          </div>
        </Router>
      </div>
    );
  }
}

export default AppInner;
