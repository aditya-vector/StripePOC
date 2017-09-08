import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import CssModules from 'react-css-modules';

import * as actionCreators from '../../actions/auth';
import PrimaryTextInput from '../../components/PrimaryTextInput';
import PrimaryButton from '../../components/PrimaryButton';
import InlineMessage from '../../components/InlineMessage';

import styles from './styles.css';

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const validate = ({email, password, passwordConfirmation}) => {
  const errors = {};
  if (!email) {
    errors.email = 'Required';
  } else if (email.length <= 6) {
    errors.email = 'email must be 6 characters or more';
  }

  if (!password) {
    errors.password = 'Required';
  } else if (password.length < 8) {
    errors.password = 'password must be 8 characters or more';
  }

  if (passwordConfirmation !== password) {
    errors.passwordConfirmation = 'Password and Password Confirmation does not match';
  }

  return errors;
};

class Signup extends Component {


  componentWillMount() {
    const handler = Window.StripeCheckout.configure({
      key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
      token: function(token) {
        signup()
      }
    });
    this.setState(handler);
  }

  submit(data) {

  }

  render() {
    const {
      fields: {
        email,
        password,
        passwordConfirmation
      },
      auth: {authFetch, errorMessage},
      handleSubmit,
      actions: {
        signup
      }
    } = this.props;
    return (
      <div>
        <form styleName={'form'} onSubmit={handleSubmit(data => signup(data))}>
          <h1> Signup </h1>
          {email.touched && email.error && <InlineMessage type={'error'} message={email.error}/>}
          <PrimaryTextInput type={'text'} placeholder={'email'} {...email}/>
          {password.touched && password.error && <InlineMessage type={'error'} message={password.error}/>}
          <PrimaryTextInput type={'password'} placeholder={'Password'} {...password}/>
          {passwordConfirmation.touched && passwordConfirmation.error && <InlineMessage type={'error'} message={passwordConfirmation.error}/>}
          <PrimaryTextInput type={'passwordConfirmation'} placeholder={'Confirm Password'} {...passwordConfirmation}/>
          <div className={'clear-fix'} styleName={'actions'}>
            <PrimaryButton onClick={handleSubmit(data => signup(data))} loading={authFetch}>Signup</PrimaryButton>
          </div>
          <div>
            {errorMessage}
          </div>
        </form>
      </div>
      );
  }
}

Signup.propTypes = {
  fields: PropTypes.shape({
    email: PropTypes.object,
    password: PropTypes.object,
    passwordConfirmation: PropTypes.object
  }),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,

  // Our defined Props
  auth: PropTypes.shape({
    errorMessage: PropTypes.string,
    authFetch: PropTypes.bool.isRequired,
    authFailed: PropTypes.bool.isRequired
  }),
  actions: PropTypes.object
};


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirmation'],
  validate
})(CssModules(Signup, styles)));
