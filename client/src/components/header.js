import { useSelector, useDispatch } from 'react-redux';

import logo from './logo.svg';

import { Link } from 'react-router-dom';

export default function Header() {
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
      <div
        className="flex"
        style={{
          color: 'white',
          backgroundColor: 'transparent',
        }}
      >
        <Link title="Go to the homepage" to="/">
          <img src={logo} className="App-logo" alt="Surge Video" />
        </Link>
        <div
          className="box"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
        <input className="App-header-search" placeholder="Search" />
        <div
          className="box"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
        <nav>
          {currentUser && currentUser.attributes && (
            <div className="App-CurrentUser">
              <span>{currentUser.attributes.email}</span>
            </div>
          )}
          {console.debug('Current User => ', currentUser)}
          {currentUser && currentUser.attributes && (
            <>
              <div
                className="box"
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
              <button
                className="button button-outline btn-header"
                type="button"
                onClick={() => dispatch({ type: 'LOGOUT' })}
              >
                Log out
              </button>
            </>
          )}
          <ul>
            {!currentUser && (
              <li>
                <Link
                  className="button btn-primary btn-header-signin"
                  to="/sign-in"
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
