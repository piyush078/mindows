import LockScreen from '../../components/LockScreen/LockScreen';
import LoginScreen from '../../components/LoginScreen/LoginScreen';
import './SwitchUser.scss';

const SwitchUser = () => {

  return (
    <div className="LogOff">
      <LoginScreen />
      <LockScreen />
    </div>
  );
};

export default SwitchUser;