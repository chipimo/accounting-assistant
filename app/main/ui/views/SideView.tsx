import React = require('react');
import { Paper } from 'react-md';
import { Avatar, Divider, FontIcon, List, ListItem, Subheader } from 'react-md';
import Group from 'material-ui-icons/Group';
import ShoppingCart from 'material-ui-icons/ShoppingCart';
import Assessment from 'material-ui-icons/Assessment';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

var call = 0;

class SideView extends React.Component {
  state = {
    usersActive: 'transparent',
    ShoppingCartActive: 'transparent',
    AssessmentActive: 'transparent',
    GeneralLedger: 'transparent',
    ManagementReports: 'transparent',
    FinanicalState: 'transparent',
  };

  setActiveList = e => {
    if (e === '/Users') {
      this.setState({
        usersActive: '#D4D4D4',
        ShoppingCartActive: 'transparent',
        AssessmentActive: 'transparent',
        GeneralLedger: 'transparent',
        ManagementReports: 'transparent',
        FinanicalState: 'transparent',
      });
    } else if (e === '/Sales') {
      this.setState({
        usersActive: 'transparent',
        ShoppingCartActive: '#D4D4D4',
        AssessmentActive: 'transparent',
        GeneralLedger: 'transparent',
        ManagementReports: 'transparent',
        FinanicalState: 'transparent',
      });
    } else if (e === '/StockControl') {
      this.setState({
        usersActive: 'transparent',
        ShoppingCartActive: 'transparent',
        AssessmentActive: '#D4D4D4',
        GeneralLedger: 'transparent',
        ManagementReports: 'transparent',
        FinanicalState: 'transparent',
      });
    } else if (e === '/GeneralLedger') {
      this.setState({
        usersActive: 'transparent',
        ShoppingCartActive: 'transparent',
        AssessmentActive: 'transparent',
        GeneralLedger: '#D4D4D4',
        ManagementReports: 'transparent',
        FinanicalState: 'transparent',
      });
    } else if (e === '/ManagementReports') {
      this.setState({
        usersActive: 'transparent',
        ShoppingCartActive: 'transparent',
        AssessmentActive: 'transparent',
        GeneralLedger: 'transparent',
        ManagementReports: '#D4D4D4',
        FinanicalState: 'transparent',
      });
    } else if (e === '/FinanicalState') {
      this.setState({
        usersActive: 'transparent',
        ShoppingCartActive: 'transparent',
        AssessmentActive: 'transparent',
        GeneralLedger: 'transparent',
        ManagementReports: 'transparent',
        FinanicalState: '#D4D4D4',
      });
    }
  };

  __appendRoutes = () => {
    if (call === 0) {
      this.props.dispatchEvent({
        type: 'AppendRoutes',
        payload: {
          type: 'Parent_secondary',
          routes: {
            name: 'accounts',
            Users: [{ main: '/Users', child: [] }],
            Sales: [{ main: '/Sales', child: [] }],
            StockControl: [{ main: '/StockControl', child: [] }],
            GeneralLedger: [{ main: '/GeneralLedger', child: [] }],
            ManagementReports: [{ main: '/ManagementReports', child: [] }],
            FinanicalState: [{ main: '/FinanicalState', child: [] }],
          },
          ActiveRoute: '/Users',
        },
      });
      call = 1;
    }
  };

  checkForRoutes = () => {
    if (
      Object.keys(this.props.routes.routes.ParentLeftSideBarRoutes_secondary)
        .length === 0
    ) {
      this.__appendRoutes();
    } else {
      var isAvelabel = false;
      this.props.routes.routes.ParentLeftSideBarRoutes_secondary.forEach(
        element => {
          if (element.name === 'accounts') {
            isAvelabel = true;
          }
        }
      );
      if (!isAvelabel) {
        this.__appendRoutes();
      }
    }
  };

  checkActiveRoute = () => {
    this.props.routes.routes.ParentLeftSideBarRoutes_secondary.forEach(
      element => {
        if (element.ActiveRoute) {
          this.setActiveList(element.ActiveRoute);
        }
      }
    );
  };

  componentWillMount() {
    this.checkForRoutes();
    this.checkActiveRoute();
  }

  render() {
    const {
      usersActive,
      ShoppingCartActive,
      AssessmentActive,
      GeneralLedger,
      ManagementReports,
      FinanicalState,
    } = this.state;
    return (
      <div>
        <Paper style={{ height: 50, padding: 10, background:'#3F51B5', color:'#fff '}}>
          <Typography variant="title" color='inherit' gutterBottom>
            {this.props.details.name}
          </Typography>
        </Paper>
        <div>
          <List style={{ background: 'transparent' }}>
            <Subheader primaryText="Control panel" />
            <ListItem
              leftAvatar={<Avatar icon={<Group />} />}
              primaryText="Users"
              primaryTextClassName="list-item"
              contentStyle={{
                borderColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: 2,
                borderBottomColor: usersActive,
              }}
              onClick={() => {
                this.setActiveList('/Users');
                this.props.dispatchEvent({
                  type: 'activeLink',
                  payload: {
                    type: 'Parent_secondary',
                    link: '/Users',
                  },
                });
              }}
              secondaryText="we have 30 users"
            >
              <NavLink
                to="/Users"
                style={{
                  width: '100%',
                  marginLeft: -16,
                  height: 52,
                  position: 'absolute',
                }}
              />
            </ListItem>
            <ListItem
              leftAvatar={<Avatar icon={<ShoppingCart />} />}
              primaryText="Sales control"
              contentStyle={{
                borderColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: 2,
                borderBottomColor: ShoppingCartActive,
              }}
              primaryTextClassName="list-item"
              onClick={() => {
                this.setActiveList('/Sales');
                this.props.dispatchEvent({
                  type: 'activeLink',
                  payload: {
                    type: 'Parent_secondary',
                    link: '/Sales',
                  },
                });
              }}
              secondaryText="Jan 17, 2014"
            />
            <ListItem
              leftAvatar={<Avatar icon={<Assessment />} />}
              primaryText="Stock control"
              contentStyle={{
                borderColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: 2,
                borderBottomColor: AssessmentActive,
              }}
              primaryTextClassName="list-item"
              onClick={() => {
                this.setActiveList('/StockControl');
                this.props.dispatchEvent({
                  type: 'activeLink',
                  payload: {
                    type: 'Parent_secondary',
                    link: '/StockControl',
                  },
                });
              }}
              secondaryText="Jan 28, 2014"
            />
            <Divider inset />
            <Subheader primaryText="Financial annaliysis" />
            <ListItem
              leftAvatar={<Avatar suffix="amber" icon={<Group />} />}
              primaryText="General (Nominal) Ledger"
              contentStyle={{
                borderColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: 2,
                borderBottomColor: GeneralLedger,
              }}
              onClick={() => {
                this.setActiveList('/GeneralLedger');
                this.props.dispatchEvent({
                  type: 'activeLink',
                  payload: {
                    type: 'Parent_secondary',
                    link: '/GeneralLedger',
                  },
                });
              }}
              primaryTextClassName="list-item"
              secondaryText="Jan 20, 2014"
            />
            <ListItem
              leftAvatar={<Avatar suffix="amber" icon={<Group />} />}
              primaryText="Management reports"
              primaryTextClassName="list-item"
              contentStyle={{
                borderColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: 2,
                borderBottomColor: ManagementReports,
              }}
              onClick={() => {
                this.setActiveList('/ManagementReports');
                this.props.dispatchEvent({
                  type: 'activeLink',
                  payload: {
                    type: 'Parent_secondary',
                    link: '/ManagementReports',
                  },
                });
              }}
              secondaryText="Jan 10, 2014"
            />
            <Divider inset />
            <Subheader primaryText="Financial state" />
            <ListItem
              leftAvatar={<Avatar suffix="blue" icon={<Group />} />}
              primaryText="Finanical state"
              primaryTextClassName="list-item"
              contentStyle={{
                borderColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: 2,
                borderBottomColor: FinanicalState,
              }}
              onClick={() => {
                this.setActiveList('/FinanicalState');
                this.props.dispatchEvent({
                  type: 'activeLink',
                  payload: {
                    type: 'Parent_secondary',
                    link: '/FinanicalState',
                  },
                });
              }}
              secondaryText="Jan 10, 2014"
            />
          </List>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideView);
