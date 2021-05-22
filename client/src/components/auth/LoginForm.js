import React from 'react';
import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose';
import { setAuthStatus, login } from '../../store/actions/session';
import { bindActionCreators } from 'redux';

import ErrorMessage from './ErrorMessage';

const LoginForm = ({
  classes,
  logoText,
  login,
  handleInputChange,
  inputs,
  setAuthStatus,
  error,
}) => (
  <div className="auth_main">
    <div className="auth_card">
      <div className="auth_title">
        <h1>Sign in to start sharing today</h1>
        <p>Enter your credentials below to sign in</p>
      </div>
      <form
        className="auth_form"
        onSubmit={(e) => {
          e.preventDefault();
          login(inputs.username, inputs.password);
        }}
      >
        <fieldset className="auth_form_wrap">
          <ErrorMessage errorMessage={error} />
          <div className="auth_form_input">
            <label htmlFor="username">Username</label>
            <input
              required
              id="username"
              name="username"
              label="Username"
              placeholder="Enter your email address, username or phone number"
              value={inputs.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="auth_form_input">
            <label htmlFor="password">Password</label>
            <input
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={inputs.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="auth_card_actions">
            <button className="button btn-primary btn-full" type="submit">
              Login
            </button>
          </div>
          <div className="auth_card_actions">
            <button
              className="button button-outline btn-full"
              type="button"
              onClick={() => setAuthStatus('forgotPassword')}
            >
              Forgot your password?
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  error: state.session.error,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthStatus: bindActionCreators(setAuthStatus, dispatch),
  login: bindActionCreators(login, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    {
      inputs: {
        username: '',
        password: '',
      },
    },
    {
      handleInputChange:
        ({ inputs }) =>
        (e) => ({
          inputs: {
            ...inputs,
            [e.target.name]: e.target.value,
          },
        }),
    }
  )
)(LoginForm);
