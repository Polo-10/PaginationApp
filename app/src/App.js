import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import Pagination from "./Page/Pagination";
import AboutUs from "./Page/AboutUs";
import Home from "./Page/Home";
import NotFound from "./Page/NotFound";

import "./style/App.css";

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navigation">
          <ul className="navigationList">
            <li className="navigationItems">
              <NavLink to="/" exact activeClassName="home">
                Home
              </NavLink>
            </li>
            <li className="navigationItems">
              <NavLink to="/Pagination" activeClassName="pagination">
                Pagination
              </NavLink>
            </li>
            <li className="navigationItems">
              <NavLink to="/AboutUs" activeClassName="about">
                Abouts Us
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Pagination/:id" component={Pagination} />
          <Route path="/Pagination" exact component={Pagination} />
          <Route path="/AboutUs" exact component={AboutUs} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
