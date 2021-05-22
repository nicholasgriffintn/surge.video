import React from 'react';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import SetNewPasswordForm from './SetNewPasswordForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';

const mapStateToProps = (state) => ({
  authState: state.session,
});

const Auth = ({ header, logoText, authState }) => (
  <>
    {!header ? (
      <div className="homepage_na">
        <div
          className="box auth_box"
          style={{
            maxWidth: 640,
            margin: 'auto',
            padding: 3,
          }}
        >
          {authState.authStatus === 'signIn' ? (
            <LoginForm logoText={logoText} />
          ) : (
            <></>
          )}
          {authState.authStatus === 'requireNewPassword' ? (
            <SetNewPasswordForm />
          ) : (
            <></>
          )}
          {authState.authStatus === 'forgotPassword' ? (
            <ForgotPasswordForm />
          ) : (
            <></>
          )}
          {authState.authStatus === 'resetPassword' ? (
            <ResetPasswordForm />
          ) : (
            <></>
          )}
        </div>
      </div>
    ) : (
      <button className="btn btn-primary btn-header-signin">Sign In</button>
    )}
  </>
);

export default compose(connect(mapStateToProps, null))(Auth);
