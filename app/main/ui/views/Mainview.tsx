import React = require('react');
import { Paper } from 'react-md';
import Typography from 'material-ui/Typography';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';
import UserDashboard from './componentsViews/UserDashboard';
import { connect } from 'react-redux';

class Mainview extends React.Component {
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
    this.checkActiveRoute();
  }

  render() {
    return (
      <Router>
        <div>
          <div>
            <Paper style={{ height: 50, padding: 10 }}>
              <Typography variant="subheading" gutterBottom>
                Haeder items here
              </Typography>
            </Paper>
          </div>
          <div>
            <Route path="/Users" component={UserDashboard} />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Mainview);
