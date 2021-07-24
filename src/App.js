import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

import { selectCurrentUser } from './redux/auth/auth.selectors';
import { checkUserSession } from "./redux/auth/auth.actions";
import SwitchUser from './pages/SwitchUser/SwitchUser';
import BootScreen from "./pages/BootScreen/BootScreen";
import './App.scss';

const App = () => {

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => setTimeout(() => dispatch(checkUserSession()), 2000), [dispatch]);

  return (
    <div className="App">
      <Switch location={location} key={location.pathname}>

        <Route exact
          path='/'
          render={() => currentUser
            ? <Redirect to='/switchuser' />
            : <BootScreen />} />

        <Route
          path='/switchuser'
          render={() => currentUser
            ? <SwitchUser user={currentUser} />
            : <Redirect to='/' />} />

      </Switch>
    </div>
  );
}

export default App;
