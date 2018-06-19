import React = require('react');
import { connect } from 'react-redux';

import { Button, Label } from 'semantic-ui-react';
const updateJsonFile = require('update-json-file');

const electron = require('electron');
const remote = electron.remote;

const path = 'acca_modules/Reducers/settings/appConfig/config.json';
const { webFrame } = require('electron');
import { Form, Icon, Message } from 'semantic-ui-react';
import { login } from './actions/auth/login';
var validator = require('email-validator');

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';
import { Paper } from 'react-md';
// import WinDialog from '../dialogs/dialog';
import Login from './main/ui/forms/login/login';
import PropTypes from 'prop-types';
import { getAssetsPath } from './assets/path';
import WindowUi from './main/ui/windowUi';
 
var bg = getAssetsPath + 'img' + '/' + '2.jpg';

class Logger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true, //this.props.isRemmebered,
    };
  }

  setSignIn = e => {
    this.setState({
      loggedIn: e,
    });
  };

  componentWillMount() {}

  render() {
    const { loggedIn } = this.state;
    return (
      <div>
        {loggedIn && <div><WindowUi/></div>}
        {!loggedIn && <Login SignInSuccess={this.setSignIn} />}
      </div>
    );
  }
}

const styles = {
  Singup: {
    width: '50%',
    padding: 20,
    background: '#fff',
    margin: 'auto',
  },
};

class Accapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Component: null,
      store: {},
      activeThemeLight: null,
      activeThemeDark: null,
      msgError: false,
      msgIcon: 'gift',
      msgHeader: 'Welcome to Accounting Assistant!',
      globleError: 'Fill out the form below to sign-up for a new account',
      errors: {
        businessName: '',
        email: '',
        contact: '',
        website: '',
        password: '',
        confirmPass: '',
      },
      formLoader: false,
      isEmail: false,
      submit: false,
      data: {
        businessName: '',
        email: '',
        contact: '',
        website: '',
        password: '',
        confirmPass: '',
        selectedFile: null,
      },
      isSet: false,
    };
  }

  HandleOnTextChange = e => {
    if (e.target.name === 'email') {
      if (!validator.validate(e.target.value)) {
        if (e.target.value) {
          this.setState({
            errors: {
              ...this.state.errors,
              [e.target.name]: '- ( Invelid email )',
            },
            data: { ...this.state.data, [e.target.name]: e.target.value },
            isEmail: true,
          });
        } else {
          this.setState({
            errors: {
              ...this.state.errors,
              [e.target.name]: '- ( Email is required )',
            },
            data: { ...this.state.data, [e.target.name]: e.target.value },
            isEmail: true,
          });
        }
      } else {
        this.setState({
          errors: { ...this.state.errors, [e.target.name]: '' },
          data: { ...this.state.data, [e.target.name]: e.target.value },
          isEmail: false,
        });
      }
    } else if (e.target.name === 'businessName') {
      if (e.target.value === '') {
        this.setState({
          errors: {
            ...this.state.errors,
            [e.target.name]: '- ( Business name is required )',
          },
          data: { ...this.state.data, [e.target.name]: e.target.value },
        });
      } else {
        this.setState({
          errors: { ...this.state.errors, [e.target.name]: '' },
          data: { ...this.state.data, [e.target.name]: e.target.value },
        });
      }
    } else if (e.target.name === 'contact') {
      if (e.target.value === '') {
        this.setState({
          errors: {
            ...this.state.errors,
            [e.target.name]: '- ( Contact number is required )',
          },
          data: { ...this.state.data, [e.target.name]: e.target.value },
        });
      } else {
        this.setState({
          errors: { ...this.state.errors, [e.target.name]: '' },
          data: { ...this.state.data, [e.target.name]: e.target.value },
        });
      }
    } else if (e.target.name === 'password') {
      if (e.target.value === '') {
        this.setState({
          errors: {
            ...this.state.errors,
            [e.target.name]: '- ( Password is required )',
          },
          data: { ...this.state.data, [e.target.name]: e.target.value },
        });
      } else {
        this.setState({
          errors: { ...this.state.errors, [e.target.name]: '' },
          data: { ...this.state.data, [e.target.name]: e.target.value },
        });
      }
    } else if (e.target.name === 'confirmPass') {
      this.setState({
        errors: {
          ...this.state.errors,
          confirmPass: '',
        },
        data: { ...this.state.data, [e.target.name]: e.target.value },
      });
    } else {
      this.setState({
        formState: '',
        data: { ...this.state.data, [e.target.name]: e.target.value },
      });
    }
  };

  checkFormState = () => {
    var cleared = false;
    Object.keys(this.state.data).map(data => {
      if (!this.state.data.businessName) {
        this.setState({
          errors: {
            ...this.state.errors,
            businessName: '- ( Business name is required )',
          },
        });
        return;
      } else if (!this.state.data.email) {
        this.setState({
          errors: {
            ...this.state.errors,
            email: '- ( Email is required )',
          },
          isEmail: true,
        });
        return;
      } else if (!this.state.data.contact) {
        this.setState({
          errors: {
            ...this.state.errors,
            contact: '- ( contact is required )',
          },
        });
        return;
      } else if (!this.state.data.password) {
        this.setState({
          errors: {
            ...this.state.errors,
            password: '- ( Password is required )',
          },
        });
        return;
      } else if (!this.state.data.confirmPass) {
        this.setState({
          errors: {
            ...this.state.errors,
            confirmPass: '- ( You must confirm your password )',
          },
        });
        return;
      } else {
        var password = this.state.data.password;

        if (!validator.validate(this.state.data.email)) {
          this.setState({
            errors: {
              ...this.state.errors,
              email: '- ( Invelid email )',
            },
            isEmail: true,
          });
          return;
        } else if (password.length < 6) {
          this.setState({
            errors: {
              ...this.state.errors,
              password: '- ( Password too short must be 6 or more charecters )',
            },
          });
          return;
        } else if (this.state.data.confirmPass !== this.state.data.password) {
          this.setState({
            errors: {
              ...this.state.errors,
              confirmPass: "- ( This password didn't march )",
            },
          });
          return;
        } else {
          cleared = true;
        }
      }
    });
    if (cleared) this.submit(this.state.data);
  };

  data = value => {
    switch (value) {
      case 'details':
        return this.props.details;
      case 'country':
        return this.props.countries;
      default:
        return null;
    }
  };

  LoginData = data => {};

  componentWillMount() {
    if (
      !this.props.details.name ||
      !this.props.details.api_key ||
      !this.props.details.id ||
      !this.props.details.password
    ) {
      this.setState({
        isSet: false,
      });
    } else {
      this.setState({
        isSet: true,
      });
    }
  }

  fileChangedHandler = event => {
    var file = event.target.files[0].path.replace(/\\/g, "/");
    this.setState({
      data: { ...this.state.data, selectedFile: file },
    });
  };

  submit = data => {
    this.setState({ formLoader: true });
    setTimeout(() => {
      this.props
        .login(data)
        .then(e => {
          this.setState({
            formLoader: false,
            isSet: false,
          });
          // WinDialog({
          //   type: 'info',
          //   title: 'Regstration successfull',
          //   Action: true,
          //   message:
          //     'Thank you for choseing Accounting Assistant, please valify your cloud and Mobile pleate forms by valifying your email. \n press ok to Sign in',
          // });
        })
        .catch(err => {
          try {
            if (err.response.data.errors) {
              this.setState({
                globleError: err.response.data.errors.global,
                formLoader: false,
                msgError: true,
                msgIcon: 'warning sign',
                msgHeader: err.response.data.errors.msgHeader,
              });
            }
          } catch (error) {
            this.setState({
              msgError: true,
              msgIcon: 'warning sign',
              msgHeader: 'Connection Error',
              globleError:
                'You are not connected to the internet. Connect to the internet and try again',
              formLoader: false,
            });
          }
        });
    }, 500);
  };

  render() {
    const { appTheme, Component, isEmail, submit, isSet } = this.state;
    const {
      data,
      errors,
      formLoader,
      globleError,
      msgHeader,
      msgIcon,
      msgError,
    } = this.state;

    if (this.state.isSet) {
      return (
        <Router>
          <div>
            <Logger
              submitLoginData={this.LoginData}
              data={this.props.details}
              isRemmebered={this.props.user.KeepSignedIn}
            />
          </div>
        </Router>
      );
    } else {
      return (
        <div
          style={{
            background: 'linear-gradient(to bottom right, #37B9E9, #1BBCB1)',
            backgroundImage: 'url(' + bg + ')',
            backgroundSize: 'caver',
            backgroundRepeat: 'no-repeat',
            paddingTop: 20,
            height: '100vh',
          }}
        >
          <Paper style={styles.Singup} zDepth={2}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>Sign up</div>
            <div>
              <Message attached icon error={msgError}>
                <Icon name={msgIcon} loading={false} />
                <Message.Content>
                  <Message.Header>{msgHeader}</Message.Header>
                  {globleError}
                </Message.Content>
              </Message>

              <Form
                loading={formLoader}
                onSubmit={this.checkFormState}
                className="attached fluid segment"
                style={{ color: '#B73A38' }}
              >
                <Form.Group widths="equal">
                  <Form.Input
                    error={!!errors.businessName}
                    name="businessName"
                    value={data.businessName}
                    onChange={this.HandleOnTextChange}
                    fluid
                    label={`Business Name ${errors.businessName}`}
                    placeholder="Business Name"
                    type="text"
                  />
                  <Form.Input
                    error={isEmail}
                    name="email"
                    value={data.email}
                    onChange={this.HandleOnTextChange}
                    fluid
                    label={`Email ${errors.email}`}
                    placeholder="business@example.com"
                    type="text"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    name="website"
                    value={data.website}
                    onChange={this.HandleOnTextChange}
                    fluid
                    label="Website"
                    placeholder="Business Website"
                    type="text"
                  />
                  <Form.Input
                    error={!!errors.contact}
                    name="contact"
                    value={data.contact}
                    onChange={this.HandleOnTextChange}
                    fluid
                    label={`Business contact ${errors.contact}`}
                    placeholder="contact number"
                    type="number"
                  />
                </Form.Group>

                <Form.Input
                  error={!!errors.password}
                  name="password"
                  value={data.password}
                  onChange={this.HandleOnTextChange}
                  label={`Password ${errors.password}`}
                  placeholder="Make it secure"
                  type="password"
                />

                <Form.Input
                  label={`Confirm Password ${errors.confirmPass}`}
                  type="password"
                  name="confirmPass"
                  value={data.confirmPass}
                  onChange={this.HandleOnTextChange}
                  error={!!errors.confirmPass}
                />
                <Label>business Logo</Label>
                <input type="file" onChange={this.fileChangedHandler} />
                <Form.Checkbox
                  inline
                  label="I agree to the terms and conditions"
                />
                <Button color="blue" disabled={submit}>
                  Submit
                </Button>
              </Form>

              <Message attached="bottom" warning>
                <Icon name="help" />
                Already signed up?&nbsp;<a href="#">Login here</a>&nbsp;instead.
              </Message>
            </div>
          </Paper>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    details: state.company,
    user: state.user,
  };
}

export default connect(mapStateToProps, { login })(Accapp);
