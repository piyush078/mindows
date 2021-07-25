import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

import { selectUsers } from './redux/auth/auth.selectors';
import { checkUserSession } from "./redux/auth/auth.actions";
import SwitchUser from './pages/SwitchUser/SwitchUser';
import BootScreen from './pages/BootScreen/BootScreen';
import NewAccount from './pages/NewAccount/NewAccount';
import './App.scss';

const App = () => {

  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => setTimeout(() => dispatch(checkUserSession()), 2000), [dispatch]);

  return (
    <div className="App">
      <Switch location={location} key={location.pathname}>

        <Route exact
          path='/'
          render={() => users
            ? users.length
              ? <Redirect to='/switchuser' /> : <Redirect to='/newaccount' />
            : <BootScreen />} />

        <Route
          path='/switchuser'
          render={() => users
            ? users.length
              ? <SwitchUser user={users} /> : <Redirect to='/newaccount' />
            : <Redirect to='/' />} />

        <Route
          path='/newaccount'
          render={() => users
            ? <NewAccount />
            : <Redirect to='/' />} />

      </Switch>
    </div>
  );
}

export default App;
