import { VscDebug } from 'react-icons/vsc';
import './Settings.scss';

const Settings = () => (
  <div className="Settings">
    <div className="Settings-leftbar">
      <VscDebug />
      <p>Oops! Mindows must be broken!!</p>
    </div>
    <div className="Settings-rightbar">
      <div>
        <p>There seems to be no Settings installed on the system.</p>
        <p>But wait... you can always add it and send a pull request.</p>
      </div>
    </div>
  </div>
);

export default Settings;
