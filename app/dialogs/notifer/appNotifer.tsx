import React = require('react');
import Transition from 'react-transition-group/Transition';
import Paper from 'material-ui/Paper';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import AlertErrorWarning from 'material-ui/svg-icons/alert/warning';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import ActionList from 'material-ui/svg-icons/action/list';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import SwipeableViews from 'react-swipeable-views';
import DropDownMenu from 'material-ui/DropDownMenu';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { red400, blue500, yellow600 } from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import store from '../../renderer';
import {
  STATE,
  UPDATE,
  SET,
  AUTO_CLOSE,
  SHOW_ON_START,
} from '../../components/events/events';

import {
  grey400,
  darkBlack,
  lightBlue600,
  lightBlack,
} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import { getDatafilePath } from '../../Reducers/dataFiles/path';
import {
  getYear,
  getISOLocalDate,
  getMonthString,
  getMonth,
  getDateString,
} from '../../components/date/dates';
import { NavLink } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import { Button } from 'semantic-ui-react';
import { getAssetsPath } from '../../assets/path';

var audioFile = getAssetsPath + 'notifications' + '/' + 'to-the-point.mp3';
var audioPlayer;

var object_keys = 0;
var results = [];
var defaltMonth = '0' + getMonth(new Date());
var month = getMonthString(defaltMonth.slice(-2));
var count = 0;
var itemIndex = 0;

var __getFolders = function(dir) {
  var filesystem = require('fs');
  var removeItem = 'path.js';

  filesystem.readdirSync(dir).forEach(element => {
    results.push(element);
    count++;
    if (month === element) {
      itemIndex = count;
    }
  });

  results = results.filter(item => item !== removeItem);

  return results;
};

var fullPath = getDatafilePath + '/' + 'statements' + '/' + 'stocks' + '/';

__getFolders(fullPath);

var isShowing = false;
var list = [];

const errorIcon = (
  <AlertErrorOutline
    color="red"
    style={{
      position: 'fixed',
      marginLeft: 20,
      fontSize: 50,
    }}
  />
);
const SuccessIcon = (
  <ActionDoneAll
    color="green"
    style={{
      position: 'fixed',
      marginLeft: 20,
      fontSize: 50,
    }}
  />
);
const InfoIcon = (
  <ActionInfoOutline
    color="#fff"
    style={{
      position: 'fixed',
      marginLeft: 20,
      fontSize: 50,
    }}
  />
);

const ActionTryAgain = (
  <FlatButton
    keyboardFocused={true}
    label="Try again"
    primary={true}
    style={{
      backgroundColor: ' rgba(102, 240, 68, 0.377)',
      color: '#fff',
      marginRight: 20,
    }}
  />
);

var ActionsYesNo;

class AppNotifer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transform2: 'translate3d(0, -30vh, 0)',
      errorList2: 'translate3d(0, -150vh, 0)',
      listView: false,
      index: 0,
      open: false,
      openPoup: false,
      autoClose: null,
      ShowonStart: false,
      autoCloseTemp: false,
      d_auto_close_toggle: false,
      auto_close_toggle: true,
      closed: true,
      theme: lightBaseTheme,
      lightTheme: null,
      darkTheme: null,
      value: itemIndex,
      selectedText: '',
      IconIndcator: <AlertErrorWarning />,
      backgroundColor: red400,
      IconIndcator2: <ActionDoneAll />,
      backgroundColor2: blue500,
      state: InfoIcon,
      actions: null,
      request: '',
      message:
        ' To view all the errors click on the list view icon to open error list, from there you can view and fix these errors ',
    };
  }

  audio = () => {
    audioPlayer = new Audio(audioFile);
    audioPlayer.play();
  };

  auto = timeout => {
    setTimeout(() => {
      this.__autoClose();
      isShowing = false;
      list = [];
    }, timeout);
  };

  __autoClose = () => {
    if (this.state.autoCloseTemp) {
      if (this.state.listView) {
        this.setState({
          errorList2: 'translate3d(0, -150vh, 0)',
        });

        setTimeout(() => {
          this.setState({
            transform2: 'translate3d(0, -30vh, 0)',
          });
        }, 700);

        setTimeout(() => {
          this.setState({
            open: false,
            closed: true,
          });
        }, 900);
      } else {
        setTimeout(() => {
          this.setState({
            transform2: 'translate3d(0, -30vh, 0)',
          });
        }, 700);

        setTimeout(() => {
          this.setState({
            open: false,
            closed: true,
          });
        }, 900);
      }
    }
  };

  close = () => {
    isShowing = false;
    list = [];

    if (this.state.listView) {
      this.setState({
        errorList2: 'translate3d(0, -150vh, 0)',
      });

      setTimeout(() => {
        this.setState({
          transform2: 'translate3d(0, -30vh, 0)',
        });
      }, 700);

      setTimeout(() => {
        this.setState({
          open: false,
          closed: true,
        });
      }, 900);
    } else {
      setTimeout(() => {
        this.setState({
          transform2: 'translate3d(0, -30vh, 0)',
        });
      }, 700);

      setTimeout(() => {
        this.setState({
          open: false,
          closed: true,
        });
      }, 900);
    }
  };

  open = e => {
    if (!isShowing) {
      
      if(e.sound) this.audio();
      
      if (e.msg) {
        this.setState({
          message: e.msg,
        });
      }

      if (e.autoClose) {
        this.setState({
          autoCloseTemp: true,
        });
        this.auto(e.autoClose);
      }

      if (e.list) {
        e.list.map(group => {
          list.push(group);
        });
      }

      if (e.actions) {
        if (e.actions.type === 'ActionsYesNo') {
          this.setState({
            actions: ActionsYesNo,
            request: e.actions.request,
          });
        }
      }

      if (e.type === 'error') {
        this.setState({ state: errorIcon });
      } else if (e.type === 'success') {
        this.setState({ state: SuccessIcon });
      } else if (e.type === 'info') {
        this.setState({ state: InfoIcon });
      }

      if (this.state.closed) {
        this.setState({
          open: true,
          closed: false,
        });

        setTimeout(() => {
          this.setState({
            transform2: 'translate3d(0, 0, 0)',
          });
          isShowing = true;
        }, 700);

        if (this.props.notifications.auto_close) {
          this.setAutoClose(9000);
        }
      }
    }
  };

  InlineError = error => {
    if (error) {
      this.setState({
        InlineError: error,
      });
      this.open;
    }
  };

  closeList = () => {
    this.setState({
      errorList2: 'translate3d(0, -150vh, 0)',
    });
  };

  openListView = e => {
    if (e === 'list') {
      this.setState({
        errorList2: 'translate3d(0, 0, 0)',
        index: 0,
        listView: true,
      });
    } else {
      this.setState({
        errorList2: 'translate3d(0, 0, 0)',
        index: 1,
        listView: true,
      });
    }
  };

  handleChangeMain = event => {
    this.setState({
      index: event,
    });
  };

  autoClose = () => {
    if (this.props.notifications.auto_close) {
      this.setState({
        autoClose: false,
      });
    } else {
      this.setState({
        autoClose: true,
      });
    }
  };

  setAutoClose = time => {
    if (this.props.notifications.auto_close) {
      this.auto(time);
    }
  };

  ShowonStart = () => {
    if (this.state.ShowonStart) {
      this.setState({
        ShowonStart: false,
      });
    } else {
      this.setState({
        ShowonStart: false,
      });
    }
  };

  handleToggleChange = evant => {
    this.setState({
      d_auto_close_toggle: !this.state.d_auto_close_toggle,
    });
    this.autoClose();
    store.dispatch({
      type: 'UPDATE',
      payload: { type: 'AUTO_CLOSE', state: this.state.autoClose },
    });
  };

  handleTheme = theme => {
    if (theme.palette.alternateTextColor === '#ffffff') {
      this.setState({
        lightTheme: true,
        darkTheme: false,
      });
    } else {
      this.setState({
        darkTheme: true,
        lightTheme: false,
      });
    }

    this.setState({
      theme: theme,
    });
    store.dispatch({
      type: 'UPDATE',
      payload: { type: 'THEME', theme: theme },
    });
  };

  handleClick = event => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      openPoup: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      openPoup: false,
    });
  };

  componentDidMount() {
    this.props.onRef(this);
    this.setState({
      autoClose: this.props.notifications.auto_close,
      theme: this.props.notifications.theme,
    });
    if (
      this.props.notifications.theme.palette.alternateTextColor === '#ffffff'
    ) {
      this.setState({
        lightTheme: true,
        darkTheme: false,
      });
    } else {
      this.setState({
        darkTheme: true,
        lightTheme: false,
      });
    }
  }

  handleChange = (event, index, value) => {
    store.dispatch({
      type: 'ChangeMonth',
      payload: event.target.innerText,
    });
    this.setState({
      selectedText: 'March',
    });

    this.setState({ value });
  };

  componentWillMount() {
    var keys = this.props.statementfiles.logs;
    object_keys = Object.keys(keys).length;

    this.setState({});
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      autoClose: this.props.notifications.auto_close,
    });

    var keys = this.props.statementfiles.logs;

    if (keys) {
      var NOerrors = 0;
      var name;
      var ErrorMsg;

      keys.map(group => {
        if (group.state === 'Error') NOerrors++;
        group.link, group.state;
      });
    }
  }

  render() {
    const {
      index,
      open,
      autoClose,
      ShowonStart,
      d_auto_close_toggle,
      theme,
      lightTheme,
      darkTheme,
      openPoup,
      IconIndcator,
      backgroundColor,
      IconIndcator2,
      backgroundColor2,
      message,
      state,
      actions,
    } = this.state;

    ActionsYesNo = (
      <div style={{ marginTop: 10, marginLeft: 20 }}>
        <button
          onClick={() => {this.props.ExcuteRequest(this.state.request) this.close()} }
          style={{
            backgroundColor: ' rgba(102, 240, 68, 0.377)',
            color: '#fff',
            marginRight: 20,
            borderRadius: 2,
            padding: 6,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Yes go on
        </button>
        <button
          onClick={this.close}
          style={{
            backgroundColor: 'rgba(241, 74, 74, 0.473)',
            color: '#fff',
            borderRadius: 2,
            padding: 6,
            cursor: 'pointer',
            border: 'none',
          }}
        >
          No thanks
        </button>
      </div>
    );

    var keyItem = 0;

    const iconButtonElement = (
      <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    if (open) {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
          <div
            style={{
              height: 100,
              width: 500,
              zIndex: 2000,
              top: 20,
              right: 10,
              position: 'fixed',
            }}
            onMouseLeave={() => {
              this.setState({
                autoCloseTemp: true,
              });
              this.setAutoClose(9000);
            }}
            onMouseEnter={() => {
              this.setState({
                autoCloseTemp: false,
              });
            }}
          >
            <Paper
              style={{
                height: 500,
                width: 450,
                marginTop: 120,
                marginLeft: 23,
                borderRadius: 5,
                position: 'fixed',
                transform: this.state.errorList2,
              }}
              zDepth={3}
            >
              <div style={{ paddingTop: 10 }}>
                <IconButton tooltip="Close" onClick={this.closeList}>
                  <NavigationClose />
                </IconButton>
                <DropDownMenu
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  {results.map(
                    results => (
                      keyItem++,
                      (
                        <MenuItem
                          value={keyItem}
                          key={keyItem}
                          primaryText={results}
                        />
                      )
                    )
                  )}
                </DropDownMenu>
              </div>
              <div
                style={{
                  paddingTop: 10,
                }}
              >
                <SwipeableViews
                  index={index}
                  onChangeIndex={this.handleChangeMain}
                >
                  <div
                    style={{
                      overflow: 'auto',
                      paddingBottom: 50,
                      width: '95%',
                      margin: 'auto',
                      height: 395,
                    }}
                  >
                    <div
                      style={{
                        width: '95%',
                        margin: 'auto',
                      }}
                    >
                      <Divider inset={true} />

                      <List>
                        {this.props.statementfiles.logs.map(group => {
                          if (group.message.err.state === 'error') {
                            return (
                              <ListItem
                                leftAvatar={
                                  <Avatar
                                    icon={IconIndcator}
                                    backgroundColor={backgroundColor}
                                  />
                                }
                                key={group.id}
                                primaryText={group.message.err.msg}
                                secondaryText={
                                  <p>
                                    <span style={{ color: lightBlue600 }}>
                                      {group.date}
                                    </span>
                                    <br />
                                    {group.message.err.state}
                                  </p>
                                }
                                secondaryTextLines={2}
                              >
                                <NavLink
                                  to={group.link}
                                  style={{
                                    width: '100%',
                                    marginLeft: -72,
                                    marginTop: -20,
                                    height: 90,
                                    position: 'absolute',
                                  }}
                                />
                              </ListItem>
                            );
                          } else {
                            return (
                              <ListItem
                                leftAvatar={
                                  <Avatar
                                    icon={IconIndcator2}
                                    backgroundColor={backgroundColor2}
                                  />
                                }
                                key={group.id}
                                primaryText={group.message.err.msg}
                                secondaryText={
                                  <p>
                                    <span style={{ color: lightBlue600 }}>
                                      {group.date}
                                    </span>
                                    <br />
                                    {group.message.err.state}
                                  </p>
                                }
                                secondaryTextLines={2}
                              >
                                <NavLink
                                  to={group.link}
                                  style={{
                                    width: '100%',
                                    marginLeft: -72,
                                    marginTop: -20,
                                    height: 90,
                                    position: 'absolute',
                                  }}
                                />
                              </ListItem>
                            );
                          }
                        })}
                      </List>
                      <Divider inset={true} />
                    </div>
                  </div>

                  <div
                    style={{
                      overflow: 'auto',
                      paddingBottom: 50,
                      width: '90%',
                      margin: 'auto',
                      height: 395,
                    }}
                  >
                    <div
                      style={{
                        width: '95%',
                        margin: 'auto',
                      }}
                    >
                      <List>
                        <Subheader>Notification Settings</Subheader>
                        <ListItem
                          primaryText="Always auto close"
                          rightToggle={
                            <Toggle
                              onToggle={this.handleToggleChange.bind(this)}
                              defaultToggled={
                                this.props.notifications.auto_close
                              }
                              toggle={d_auto_close_toggle.toString()}
                            />
                          }
                        />
                      </List>
                      <Divider />
                      <List>
                        <Subheader> Themes</Subheader>
                        <ListItem
                          primaryText="Light"
                          leftCheckbox={
                            <Checkbox
                              onClick={() => {
                                this.handleTheme(lightBaseTheme);
                              }}
                              checked={lightTheme}
                            />
                          }
                        />
                        <ListItem
                          primaryText="Dark"
                          leftCheckbox={
                            <Checkbox
                              onClick={() => {
                                this.handleTheme(darkBaseTheme);
                              }}
                              checked={darkTheme}
                            />
                          }
                        />
                      </List>
                    </div>
                  </div>
                </SwipeableViews>
              </div>
            </Paper>
            <Paper
              style={{
                height: 150,
                width: 500,
                zIndex: 1,
                borderRadius: '0 0 10 10',
                padding: 10,
                marginTop: -20,
                transform: this.state.transform2,
              }}
              zDepth={5}
            >
              <div>
                <div
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: '50%',
                    marginRight: 10,
                    marginLeft: 10,
                    marginTop: 10,
                    position: 'absolute',
                  }}
                />
                <div style={{ marginLeft: 30, paddingBottom: 20 }}>
                  Notification
                </div>
                <div>{state}</div>
                <div
                  style={{
                    position: 'fixed',
                    right: 20,
                    marginTop: -50,
                    fontSize: 10,
                    marginLeft: 50,
                  }}
                >
                  <IconButton
                    tooltip="List view"
                    onClick={() => {
                      this.openListView('list');
                    }}
                  >
                    <ActionList color="#9C9C9C" hoverColor="#EBEBEB" />
                  </IconButton>

                  <IconButton
                    tooltip="Settings"
                    onClick={() => {
                      this.openListView('settings');
                    }}
                  >
                    <ActionSettings color="#9C9C9C" hoverColor="#EBEBEB" />
                  </IconButton>

                  <IconButton tooltip="Close" onClick={this.close}>
                    <NavigationClose color="#9C9C9C" hoverColor="#EBEBEB" />
                  </IconButton>
                </div>
                <div
                  style={{
                    width: '80%',
                    height: 65,
                    overflow: 'auto',
                    marginLeft: 70,
                    marginTop: -10,
                  }}
                >
                  {message}
                  <div>
                    <ul>
                      {list.map(li => {
                        return <li key={li}>{li}</li>;
                      })}
                    </ul>
                  </div>
                </div>
                <div>{actions}</div>
              </div>
            </Paper>
          </div>
        </MuiThemeProvider>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    statementfiles: state.statementLogs,
    statements: state.statementOfaccounts,
    notifications: state.notifications,
  };
}

export default connect(mapStateToProps)(AppNotifer);
