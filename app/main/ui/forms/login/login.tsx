import React = require('react');
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Button from 'material-ui/Button';
import { Paper } from 'react-md';
import { connect } from 'react-redux';
import { USER_LOG_IN } from '../../../../actions/types';
// import WinDialog from '../../../../../dialogs/dialog';
import { Dimmer, Header, Loader, Divider } from 'semantic-ui-react';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';

var usersList = false;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        userName: '',
        Password: '',
      },
      checked: false,
      EmailErr: '',
      PassErr: '',
      EmailErrB: false,
      PassErrB: false,
      active: false,
      CheckboxState: false,
      password: '',
      showPassword: false,
      signedIn: false,
    };
  }

  componentWillMount() {
    if (this.props.user.usersList) usersList = true;

    if (!this.props.user.user[0]) { 
      this.setState({
        CheckboxState: true,
      });
      usersList = false; 

      // WinDialog({
      //   type: 'info',
      //   title: 'Sign in',
      //   message:
      //     'Since their are no users added yet, you can use your company email and password to sign in.',
      //   Action: false,
      // });
    }
  }

  HandleSubmit = data => {
    if (!this.state.data.userName) {
      this.setState({
        EmailErrB: true,
        PassErrB: false,
        EmailErr: "Email can't be blank",
        PassErr: '',
      });
    } else if (!this.state.data.Password) {
      this.setState({
        EmailErr: '',
        PassErrB: true,
        EmailErrB: false,
        PassErr: "Password can't be blank",
      });
    } else {
      if (usersList) {
        this.props.UpdateData({
          type: USER_LOG_IN,
          payload: {
            name: this.state.data.userName,
            password: this.state.data.Password,
            KeepSignedIn: this.state.signedIn,
          },
        });
        this.GetResponce('user');
      } else {
        this.props.UpdateData({
          type: USER_LOG_IN,
          payload: {
            email: this.state.data.userName,
            password: this.state.data.Password,
          },
        });
        this.GetResponce('entry');
      }
      this.handleShow();
    }
  };

  GetResponce = e => {
    setTimeout(() => {
      this.props.user.user.forEach(user => {
        if (user.state) {
          this.props.SignInSuccess(true);
        } else {
          if (e === 'entry') {
            if (!user.email) {
              this.setState({
                EmailErr: 'This email is not found',
                PassErr: '',
                EmailErrB: true,
                PassErrB: false,
              });
            } else {
              this.setState({
                EmailErr: '',
                PassErr: 'The password is not correct',
                EmailErrB: false,
                PassErrB: true,
              });
            }
          } else {
            if (!user.Username) {
              this.setState({
                EmailErrB: true,
                PassErrB: false,
                EmailErr: 'User name is not found',
                PassErr: '',
              });
            } else {
              this.setState({
                EmailErrB: false,
                PassErrB: true,
                EmailErr: '',
                PassErr: 'The password is not correct',
              });
            }
          }
        }
      });
      this.handleHide();
    }, 1000);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  HandleOnChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
      EmailErr: '',
      PassErr: '',
      EmailErrB: false,
      PassErrB: false,
    });
  };

  updateCheck() {
    this.setState(oldState => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false });

  render() {
    const { data, EmailErr, PassErr } = this.state;
    const { active, CheckboxState, signedIn, PassErrB, EmailErrB } = this.state;

    return (
      <div>
        <div style={{ paddingTop: 20, background: '#F3F3F3', height: '100vh' }}>
          <div style={{ width: 500, margin: 'auto', textAlign: 'center' }}>
            <h3 className="animated fadeIn mb-4">{this.props.details.name}</h3>
          </div>

          <Paper
            zDepth={2}
            style={{
              width: 500,
              margin: 'auto',
              background: '#fff',
            }}
          >
            <Dimmer.Dimmable dimmed={active}>
              <Dimmer active={active} inverted>
                <Loader>Processing</Loader>
              </Dimmer>
              <div
                style={{
                  margin: 'auto',
                  width: 100,
                  height: 100,
                  paddingTop: 20,
                }}
              >
                <AccountCircle
                  style={{ width: 100, height: 100, color: '#ccc' }}
                />
              </div>
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                Sign in with your account
              </div>

              <div style={{ padding: 20, width: 300, margin: 'auto' }}>
                <FormControl error aria-describedby="name-error-text">
                  <TextField
                    error={EmailErrB}
                    id="with-placeholder"
                    name="userName"
                    style={{ width: 260 }}
                    value={data.userName}
                    onChange={this.HandleOnChange}
                    label="User name"
                    type="text"
                    placeholder="Placeholder"
                    margin="normal"
                  />
                  <FormHelperText id="name-error-text">
                    {EmailErr}
                  </FormHelperText>
                </FormControl>
                <br />
                <FormControl error aria-describedby="name-error-text">
                  <TextField
                    error={PassErrB}
                    id="adornment-password"
                    style={{ width: 260 }}
                    type={this.state.showPassword ? 'text' : 'password'}
                    name="Password"
                    label="Password"
                    value={data.Password}
                    onChange={this.HandleOnChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText id="name-error-text">
                    {PassErr}
                  </FormHelperText>
                </FormControl>
                <br />
                <div style={{ marginTop: 30, paddingLeft: 5 }}>
                  <Button
                    variant="raised"
                    style={{ width: 250 }}
                    color="primary"
                    onClick={this.HandleSubmit}
                  >
                    Sign in
                  </Button>
                </div>

                <div
                  style={{
                    marginTop: 15,
                    marginBottom: 20,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.signedIn}
                        onChange={this.handleChange('signedIn')}
                        value="signedIn"
                        disabled={CheckboxState}
                      />
                    }
                    label="Keep me signed in"
                  />
                </div>
                <Divider />
                <div
                  style={{
                    marginTop: 15,
                    marginBottom: 20,
                    marginLeft: 40,
                  }}
                >
                  {/* <FlatButton
                    //onClick={this.KeepSigned}
                    label="Forgot password?"
                    primary={true}
                  /> */}
                </div>
              </div>
            </Dimmer.Dimmable>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    details: state.company,
    user: state.user,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    UpdateData: data => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
