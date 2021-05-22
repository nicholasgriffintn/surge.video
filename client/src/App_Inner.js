import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';

import Header from './components/header';

const NotFound = React.lazy(() => import('./pages/NotFound'));
const Home = React.lazy(() => import('./pages/Home'));
const Video = React.lazy(() => import('./pages/Video'));
const SignIn = React.lazy(() => import('./pages/SignIn'));

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
                  <React.Suspense
                    fallback={<div className="App-Loading"></div>}
                  >
                    <Home />
                  </React.Suspense>
                </Route>
                <Route exact path="/video/:id">
                  <React.Suspense
                    fallback={<div className="App-Loading"></div>}
                  >
                    <Video />
                  </React.Suspense>
                </Route>
                <Route exact path="/sign-in">
                  <React.Suspense
                    fallback={<div className="App-Loading"></div>}
                  >
                    <SignIn />
                  </React.Suspense>
                </Route>
                <Route>
                  <React.Suspense
                    fallback={<div className="App-Loading"></div>}
                  >
                    <NotFound />
                  </React.Suspense>
                </Route>
              </Switch>
            </section>
          </div>
        </Router>
      </div>
    );
  }
}

export default AppInner;
