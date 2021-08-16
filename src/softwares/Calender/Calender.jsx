import { VscDebug } from 'react-icons/vsc';
import './Calender.scss';

const Calender = () => (
  <div className="Calender">
    <div className="Calender-leftbar">
      <VscDebug />
      <p>Oops! Mindows must be broken!!</p>
    </div>
    <div className="Calender-rightbar">
      <div>
        <p>There seems to be no Calender installed on the system.</p>
        <p>But wait... you can always add it and send a pull request.</p>
      </div>
    </div>
  </div>
);

export default Calender;
