import React = require('react');
import { Paper } from 'react-md';
import SideView from './views/SideView';
import Mainview from './views/Mainview';
import UserDashboard from './views/componentsViews/UserDashboard';
const socketIOClient = require('socket.io-client');
import Typography from 'material-ui/Typography';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge, IconButton } from 'material-ui';
import Mail from 'material-ui-icons/Mail';
import Settings from 'material-ui-icons/Settings';
import { USER_CONNECTED, LOGOUT, PRIVATE_MESSAGE } from '../../events/Events';
import { Socket } from 'dgram';

const socketUrl = 'http://localhost:3200';

class WindowUi extends React.Component {
  state = {
    socket: null,
    ConntionState: '',
    users: [],
  };

  checkActiveRoute = () => {
    this.props.routes.routes.ParentLeftSideBarRoutes_secondary.forEach(
      element => {
        if (element.ActiveRoute) {
          <Redirect to={element.ActiveRoute} />;
        }
      }
    );
  };
 
  componentWillMount() {
    this.initiSocket();
    this.checkActiveRoute();
  }

  initiSocket = () => {
    const socket = socketIOClient(socketUrl);
    socket.on('connect', () => {
      this.setState({ ConntionState: 'Connted to server' });
    });
    socket.on('NEW_TILL', this.newEvent);
    // socket.emit('PRIVATE_MESSAGE', { reciver: 'main', sender: 'tail1' });
    this.setState({ socket });
  };

  newEvent = e => {
    this.props.dispatchEvent({ type: 'NEW_TILL' });
  };

  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.state.users.push(user);
  };

  UserLogout = user => {
    const { socket } = this.state;
    socket.emit(LOGOUT, user);
    var old = this.state.users;

    this.setState({ user });
  };

  render() {
    const { ConntionState } = this.state;
    const { socket } = this.state;
    return (
      <Router>
        <div style={{ height: '100vh', width: '100%', background: '#fff' }}>
          <Paper
            style={{
              width: 300,
              height: '100vh',
              background: '#FAFAFA',
              zIndex: 2,
              overflow: 'auto',
            }}
          >
            <SideView />
          </Paper>
          <Paper
            style={{
              width: 1070,
              height: '100vh',
              position: 'fixed',
              top: 0,
              right: 0,
              zIndex: 1,
              background: '#fff',
            }}
          >
            <div>
              <div>
                <Paper
                  style={{
                    height: 50,
                    padding: 10,
                    background: '#F5F5F5',
                    borderColor: 'transparent',
                    borderStyle: 'solid',
                    borderWidth: 3,
                    borderTopColor: '#C4C0BE',
                  }}
                >
                  <Typography variant="subheading" gutterBottom>
                    Haeder items here
                    <div style={{ marginLeft: 910, marginTop: -30 }}>
                      <IconButton>
                        <Mail />
                      </IconButton>
                      <IconButton>
                        <Settings />
                      </IconButton>
                    </div>
                  </Typography>
                </Paper>
              </div>
              <div>
                <UserDashboard socket={socket} />
                <Route path="/Users" component={UserDashboard} />
              </div>
            </div>
          </Paper>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    details: state.company,
    routes: state.routes,
    user: state.user,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: data => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowUi);
