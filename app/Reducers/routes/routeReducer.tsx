var jsonfile = require('jsonfile');
import { getRoutesPath } from './route/path';

var routes;
var obj = {
  name: 'App routes',
  routes: {
    ParentToolBarRoutes: [],
    ParentLeftSideBarRoutes_primary: [],
    ParentLeftSideBarRoutes_secondary: [],
    ParentLeftSideBarRoutes_secondary_child: [],
    AppSettingsRoutes: [],
  },
};
function loadfile() {
  try {
    routes = jsonfile.readFileSync(getRoutesPath);
  } catch (error) {
    jsonfile.writeFileSync(getRoutesPath, obj);
    routes = jsonfile.readFileSync(getRoutesPath);
  }
}

loadfile();

const RoutesReducer = (state, action) => {
  switch (action.type) {
    case 'AppendRoutes':
      if (action.payload.type === 'Parent_primary') {
        routes.routes.ParentLeftSideBarRoutes_primary = [action.payload.routes];

        jsonfile.writeFileSync(getRoutesPath, routes);
        var UpdatedRoutes = jsonfile.readFileSync(getRoutesPath);
        return UpdatedRoutes;
      } else if (action.payload.type === 'Parent_secondary') {
        var ActiveByDefualt = { ActiveRoute: '/Users' };
        if (
          Object.keys(routes.routes.ParentLeftSideBarRoutes_secondary)
            .length === 0
        ) {
          routes.routes.ParentLeftSideBarRoutes_secondary = [
            ActiveByDefualt,
            action.payload.routes,
          ];
        } else {
          var objR = routes.routes.ParentLeftSideBarRoutes_secondary;
          objR.push(action.payload.routes);
        }

        jsonfile.writeFileSync(getRoutesPath, routes);
        var UpdatedRoutes = jsonfile.readFileSync(getRoutesPath);
        return UpdatedRoutes;
      } else if (action.payload.type === 'Secondary_child') {
        if (
          Object.keys(routes.routes.ParentLeftSideBarRoutes_secondary_child)
            .length === 0
        ) {
          routes.routes.ParentLeftSideBarRoutes_secondary_child = [
            action.payload.routes,
          ];
        } else {
          var objR = routes.routes.ParentLeftSideBarRoutes_secondary_child;
          objR.push(action.payload.routes);
        }

        jsonfile.writeFileSync(getRoutesPath, routes);
        var UpdatedRoutes = jsonfile.readFileSync(getRoutesPath);
        return UpdatedRoutes;
      } else if (action.payload.type === 'Secondary_child_inner') {
        routes.routes.ParentLeftSideBarRoutes_secondary.forEach(element => {
          if (element.name === action.payload.target) {
            element.stock_control[0].child.push(action.payload.routes);
          }
        });
        jsonfile.writeFileSync(getRoutesPath, routes);
        var UpdatedRoutes = jsonfile.readFileSync(getRoutesPath);
        return UpdatedRoutes;
      }
      break;
    case 'activeLink':
      if (action.payload.type === 'Parent_primary') {
        routes.routes.ParentLeftSideBarRoutes_primary.forEach(element => {
          if (element.ActiveRoute) {
            element.ActiveRoute = action.payload.link;
          }
        });

        jsonfile.writeFileSync(getRoutesPath, routes);
        var UpdatedRoutes = jsonfile.readFileSync(getRoutesPath);
        return UpdatedRoutes;
      } else if (action.payload.type === 'Parent_secondary') {
        routes.routes.ParentLeftSideBarRoutes_secondary.forEach(element => {
          if (element.ActiveRoute) {
            element.ActiveRoute = action.payload.link;
          }
        });

        jsonfile.writeFileSync(getRoutesPath, routes);
        var UpdatedRoutes = jsonfile.readFileSync(getRoutesPath);
        return UpdatedRoutes;
      } else if (action.payload.type === 'Secondary_child_inner') {
        routes.routes.ParentLeftSideBarRoutes_secondary.forEach(element => {
          if (element.name === action.payload.target) {
            element[action.payload.main].forEach(main => {
              if (main) {
                main.child.forEach(child => {
                  if (child.name === action.payload.name) {
                    if (action.payload.data) {
                      if (Object.keys(child.data).length !== 0) {
                        child.data.forEach(data => {
                          if (data) {
                            if (
                              data.component === action.payload.temp.component
                            ) {
                              data.data = action.payload.temp.data;
                            } else {
                              data.data.push(action.payload.temp);
                            }
                          }
                        });
                      } else {
                        child.data.push(action.payload.temp);
                      }
                    } else {
                      child.ActiveRoute = action.payload.link;
                    }
                  }
                });
              }
            });
          }
        });

        jsonfile.writeFileSync(getRoutesPath, routes);
        var UpdatedRoutes = jsonfile.readFileSync(getRoutesPath);
        return UpdatedRoutes;
      }
      break;
    default:
      return routes;
  }
};

export default RoutesReducer;
